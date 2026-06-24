import * as React from "react";
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useListServices, Service } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Cpu, TrendingUp, Code, Briefcase, BookOpen, Check, HelpCircle } from "lucide-react";
import { Link } from "wouter";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu: Cpu,
  TrendingUp: TrendingUp,
  Code: Code,
  Briefcase: Briefcase,
  BookOpen: BookOpen,
};

export default function Services() {
  const { data: services, isLoading } = useListServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <MainLayout>
      <div className="bg-primary/5 py-12 md:py-20 relative overflow-hidden">
        {/* Decorative background shapes for premium look */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-primary blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <Badge variant="outline" className="mb-4 text-xs font-semibold px-3 py-1 text-primary border-primary bg-primary/5">
            ONE STOP SOLUTION FOR BUSINESS GROWTH
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 text-foreground">
            Our Services & Solutions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            From smart products and custom software development to advanced digital marketing, compliance, and professional training.
          </p>
        </div>
      </div>

      <div className="py-12 md:py-20 container mx-auto px-4">
        {/* Why Choose Us Header section for value props */}
        <div className="mb-10 md:mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">Why Choose Business Positive?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We deliver result-oriented business acceleration solutions. Our products and services are geared for peak performance, scale, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-xl" />
            ))
          ) : services?.filter(s => s.isActive).map((service) => (
            <div 
              key={service.id} 
              className="rounded-xl border bg-card p-6 md:p-8 shadow-sm flex flex-col transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:-translate-y-1 cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {React.createElement(iconMap[service.iconName || ""] || HelpCircle, {
                  className: "h-6 w-6"
                })}
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                  {service.category}
                </span>
                {service.tagline && (
                  <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-normal">
                    {service.tagline}
                  </Badge>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {service.name}
              </h3>
              
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed line-clamp-3">
                {service.description}
              </p>
              
              {service.features && service.features.length > 0 && (
                <div className="mb-6 mt-auto">
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Key offerings:</p>
                  <ul className="space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-primary font-medium pl-5">
                        + {service.features.length - 3} more...
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-border mt-6">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                  Learn More & Book
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Details Dialog */}
      <Dialog open={!!selectedService} onOpenChange={(open) => { if(!open) setSelectedService(null); }}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[95vw] sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs uppercase tracking-wider font-semibold">
                    {selectedService.category}
                  </Badge>
                  {selectedService.tagline && (
                    <Badge variant="outline" className="text-xs text-primary border-primary bg-primary/5">
                      {selectedService.tagline}
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    {React.createElement(iconMap[selectedService.iconName || ""] || HelpCircle, {
                      className: "h-5 w-5"
                    })}
                  </div>
                  <span>{selectedService.name}</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>
              
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="my-6">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-4 border-b pb-2">
                    Key Features & Solutions
                  </h4>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-snug">
                        <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t mt-6">
                <Button variant="ghost" onClick={() => setSelectedService(null)} className="sm:w-auto w-full">
                  Close
                </Button>
                <Link href={`/book-consultation?service=${encodeURIComponent(selectedService.name)}`} className="flex-grow">
                  <Button className="w-full">
                    Book a Consultation
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
