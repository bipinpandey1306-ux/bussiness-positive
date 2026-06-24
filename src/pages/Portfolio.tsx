import { MainLayout } from "@/components/layout/MainLayout";
import { useListPortfolio } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Portfolio() {
  const { data: projects, isLoading } = useListPortfolio();

  return (
    <MainLayout>
      <div className="bg-background py-20 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-foreground">Our Work</h1>
          <p className="text-xl text-muted-foreground">
            Explore our latest projects across web development, marketing, and mobile applications.
          </p>
        </div>
      </div>

      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))
          ) : projects?.map((project) => (
            <div key={project.id} className="group rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md">
              <div className="h-56 bg-muted relative overflow-hidden flex items-center justify-center">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <span className="text-muted-foreground font-medium">Project Preview</span>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors">
                      View Live
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
