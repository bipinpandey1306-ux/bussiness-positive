import { MainLayout } from "@/components/layout/MainLayout";
import { useListServices } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  return (
    <MainLayout>
      <div className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-foreground">Our Services</h1>
          <p className="text-xl text-muted-foreground">
            End-to-end digital solutions designed to accelerate your growth and streamline your operations.
          </p>
        </div>
      </div>

      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl" />
            ))
          ) : services?.map((service) => (
            <div key={service.id} className="rounded-xl border bg-card p-8 shadow-sm flex flex-col">
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                <span className="text-xl font-bold">{service.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{service.name}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
              <div className="pt-4 border-t border-border">
                <Link href="/book-consultation">
                  <Button variant="outline" className="w-full">Consult with us</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
