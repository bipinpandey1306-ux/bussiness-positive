import { MainLayout } from "@/components/layout/MainLayout";
import { useListCourses } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Courses() {
  const { data: courses, isLoading } = useListCourses();

  return (
    <MainLayout>
      <div className="bg-secondary py-20 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Master the Future</h1>
          <p className="text-xl text-secondary-foreground/80">
            Industry-aligned training programs designed to transform beginners into professionals.
          </p>
        </div>
      </div>

      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
            ))
          ) : courses?.map((course) => (
            <div key={course.id} className="rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col">
              <div className="h-48 bg-muted flex items-center justify-center">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-muted-foreground font-medium">Course Image</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{course.category}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">{course.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-sm font-medium text-muted-foreground">{course.duration}</span>
                  <Link href="/contact">
                    <Button>Enroll Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
