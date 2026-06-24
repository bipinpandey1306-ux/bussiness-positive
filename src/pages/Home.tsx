import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useListServices, useListCourses } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useListServices();
  const { data: courses, isLoading: coursesLoading } = useListCourses();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Enterprise-Level Digital Capability. <br />
              <span className="text-primary">Startup Speed.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-8">
              Business Positive is the ambitious local-made answer to enterprise IT. We build software, drive growth, and train the next generation of digital leaders.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book-consultation" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-base">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="bg-secondary py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm uppercase tracking-wider text-secondary-foreground/80">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">200+</div>
              <div className="text-sm uppercase tracking-wider text-secondary-foreground/80">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm uppercase tracking-wider text-secondary-foreground/80">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">20+</div>
              <div className="text-sm uppercase tracking-wider text-secondary-foreground/80">Expert Team Members</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">Comprehensive solutions for business growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))
            ) : services?.map((service) => (
              <div key={service.id} className="rounded-xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>
                <div className="mt-auto">
                  <Link href="/services" className="text-primary font-medium flex items-center hover:underline">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to accelerate your growth?</h2>
          <p className="text-lg text-primary-foreground/90 mb-10">
            Let's discuss how Business Positive can help you achieve your business and technology goals.
          </p>
          <Link href="/book-consultation">
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base text-primary">
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
