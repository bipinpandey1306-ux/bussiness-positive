import { MainLayout } from "@/components/layout/MainLayout";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@/api/api";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostDetail() {
  const { id } = useParams();
  const postId = parseInt(id || "0", 10);
  
  const { data: post, isLoading } = useGetBlogPost(postId, {
    query: {
      enabled: !!postId,
      queryKey: getGetBlogPostQueryKey(postId)
    }
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="py-20 container mx-auto px-4 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-6 w-64 mb-12" />
          <Skeleton className="h-96 w-full mb-12 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!post) {
    return (
      <MainLayout>
        <div className="py-32 container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-20 container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all posts
        </Link>
        
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-muted-foreground gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <span>•</span>
            <time dateTime={post.publishedAt || post.createdAt}>
              {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
        </div>

        {post.imageUrl && (
          <div className="mb-12 rounded-2xl overflow-hidden aspect-video bg-muted">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
          {/* Using dangerouslySetInnerHTML assuming content might be rich text. In a real app, use a proper sanitizer or markdown parser */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </MainLayout>
  );
}
