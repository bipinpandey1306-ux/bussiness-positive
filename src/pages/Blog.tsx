import { MainLayout } from "@/components/layout/MainLayout";
import { useListBlogPosts } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts({ publishedOnly: true });

  return (
    <MainLayout>
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-foreground">Insights & Perspectives</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on technology, business growth, and digital transformation.
          </p>
        </div>
      </div>

      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))
          ) : posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <div className="group rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md h-full cursor-pointer">
                <div className="h-48 bg-muted relative overflow-hidden">
                  {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-medium bg-secondary/10">
                      Blog Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-muted-foreground">
                      {post.publishedAt ? format(new Date(post.publishedAt), 'MMM d, yyyy') : ''}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
