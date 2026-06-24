import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <MainLayout>
      <div className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Business Positive</h1>
          <p className="text-xl text-secondary-foreground/80">
            We are on a mission to democratize enterprise-grade digital capability for Indian businesses.
          </p>
        </div>
      </div>

      <div className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="aspect-[3/4] md:aspect-square bg-muted rounded-2xl overflow-hidden border border-border shadow-md">
              <img src="/founder.jpg" alt="Vishwajeet Tripathi" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Founded by Vishwajeet Tripathi</h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Business Positive was built on a simple premise: ambitious Indian SMBs and startups shouldn't have to compromise on digital quality just because they don't have enterprise budgets.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Vishwajeet established the company to bridge the gap between world-class technical execution and practical, growth-oriented business strategy. We don't just write code or run ads — we build engines for growth.
            </p>
            <div className="flex gap-4">
              <Link href="/contact">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">200+</div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Students Trained</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Team Members</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
