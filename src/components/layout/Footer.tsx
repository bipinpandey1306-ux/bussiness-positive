import { Link } from "wouter";
import { useSubscribeNewsletter } from "@/api/api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribe.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          toast({
            title: "Subscribed!",
            description: "You have successfully subscribed to our newsletter.",
          });
          setEmail("");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to subscribe. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Business Positive Logo" className="h-10 w-10 rounded-full object-cover border border-white/10" />
              <span className="text-2xl font-bold tracking-tight text-white block">
                Business Positive
              </span>
            </div>
            <p className="mt-4 text-sm text-secondary-foreground/80 max-w-xs">
              The ambitious local-made answer for Indian SMBs and startups seeking enterprise-level digital capability.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-secondary-foreground/60 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/services" className="hover:text-white">BillBaaz AI Billing</Link></li>
              <li><Link href="/services" className="hover:text-white">Digital Marketing</Link></li>
              <li><Link href="/services" className="hover:text-white">Technology Services</Link></li>
              <li><Link href="/services" className="hover:text-white">Business Services</Link></li>
              <li><Link href="/services" className="hover:text-white">Professional Courses</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contact Details</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary-foreground/80">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>Level 2, Tech Park, Startup Hub, India</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919140723680" className="hover:text-white transition-colors">+91 91407 23680</a>
                  <a href="tel:+917054518766" className="hover:text-white transition-colors">+91 70545 18766</a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <a href="mailto:vishwjeet@businesspositive.in" className="hover:text-white transition-colors">
                  vishwjeet@businesspositive.in
                </a>
              </li>
            </ul>
            
            <form onSubmit={handleSubscribe} className="mt-6 flex max-w-md gap-x-2">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                disabled={subscribe.isPending}
              >
                {subscribe.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs leading-5 text-secondary-foreground/60">
            &copy; {new Date().getFullYear()} Business Positive | Founded by Vishwajeet Tripathi
          </p>
        </div>
      </div>
    </footer>
  );
}
