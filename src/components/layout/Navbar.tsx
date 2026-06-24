import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Megaphone, Flame, BadgeInfo } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [showPromo, setShowPromo] = useState(false);
  const [activeTab, setActiveTab] = useState<"promo" | "services">("promo");

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/courses", label: "Courses" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div 
        className="bg-primary text-primary-foreground py-2.5 px-4 text-center text-xs font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-primary/95 transition-all shadow-sm"
        onClick={() => { setShowPromo(true); setActiveTab("promo"); }}
      >
        <Flame className="h-4 w-4 text-accent animate-pulse fill-accent" />
        <span className="hidden sm:inline">LIMITED TIME OFFER: FLAT 10% OFF ON ALL SERVICES & SPECIAL PYTHON / DIGITAL MARKETING BATCHES</span>
        <span className="sm:hidden">FLAT 10% OFF ON ALL SERVICES & TRAINING BATCHES!</span>
        <Megaphone className="h-3.5 w-3.5 ml-1 hidden sm:inline" />
      </div>

      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <img src="/logo.png" alt="Business Positive Logo" className="h-9 w-9 rounded-full object-cover shadow-sm border border-border" />
                <span className="text-xl font-bold tracking-tight text-primary">Business Positive</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Promo Link with badge */}
                <button
                  onClick={() => { setShowPromo(true); setActiveTab("promo"); }}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors flex items-center gap-1.5 cursor-pointer relative"
                >
                  <Sparkles className="h-4 w-4 fill-accent animate-bounce" />
                  Latest Offers
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                </button>

                <Link href="/contact" className="ml-4">
                  <Button variant="outline" size="sm">Contact</Button>
                </Link>
                <Link href="/book-consultation" className="ml-2">
                  <Button size="sm">Book Consultation</Button>
                </Link>
              </div>
            </div>
            
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-background border-b">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Promo Link */}
              <button
                onClick={() => { setIsOpen(false); setShowPromo(true); setActiveTab("promo"); }}
                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-accent hover:bg-accent/10 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-5 w-5 fill-accent" />
                Latest Offers
              </button>

              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full justify-center">Contact</Button>
                </Link>
                <Link href="/book-consultation" className="w-full">
                  <Button className="w-full justify-center">Book Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Promotional Offers Advertisement Dialog */}
      <Dialog open={showPromo} onOpenChange={setShowPromo}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border border-border shadow-2xl rounded-xl">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Left: Interactive Media / Image Section */}
            <div className="w-full lg:w-1/2 bg-secondary/10 flex items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-border">
              <div className="relative group overflow-hidden rounded-lg shadow-md border border-border bg-black/5 w-full h-full max-h-[450px] lg:max-h-none flex items-center justify-center">
                <img 
                  src={activeTab === "promo" ? "/banner-promo.jpg" : "/banner-services.jpg"} 
                  alt={activeTab === "promo" ? "Digital Growth Solutions Flat 10% OFF Banner" : "Business Positive Services and BillBaaz AI Banner"} 
                  className="w-auto h-full max-h-[500px] object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Right: Detailed Description & Claim Form */}
            <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-card">
              <div>
                <DialogHeader className="mb-6">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <Sparkles className="h-5 w-5 fill-accent animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider">Business Positive Special</span>
                  </div>
                  <DialogTitle className="text-2xl font-bold tracking-tight text-foreground font-display">
                    Latest Promotions & Products
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    Explore our active growth campaigns, special training programs, and software products.
                  </DialogDescription>
                </DialogHeader>

                {/* Tab Switcher */}
                <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6 text-sm">
                  <button 
                    onClick={() => setActiveTab("promo")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors ${activeTab === "promo" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Flat 10% OFF
                  </button>
                  <button 
                    onClick={() => setActiveTab("services")}
                    className={`flex-1 py-2 px-3 rounded-md font-medium transition-colors ${activeTab === "services" ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Services & BillBaaz AI
                  </button>
                </div>

                {/* Offer Details */}
                <div className="space-y-4">
                  {activeTab === "promo" ? (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary font-display flex items-center gap-1.5">
                        <Flame className="h-5 w-5 text-accent fill-accent" />
                        Flat 10% OFF — Digital Growth Solutions
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Scale your local brand with our high-impact digital solutions. We provide tailored Meta & Google paid campaigns, brand promotions, professional video ads, SEO audits, and custom software systems.
                      </p>
                      
                      <div className="border-t border-border pt-3 mt-2">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Special Training Batches</h5>
                        <ul className="space-y-2.5">
                          <li className="text-sm border-l-2 border-accent pl-3">
                            <span className="font-semibold block text-foreground">Python Programming Weekend Batch:</span>
                            <span className="text-xs text-muted-foreground">Saturday & Sunday | Beginner to Advanced | Expert Guidance & Placement Support</span>
                            <div className="mt-1 flex gap-3 text-xs">
                              <span className="text-accent font-semibold">First 20 Students: ₹300/mo</span>
                              <span className="text-muted-foreground">After 20: ₹500/mo</span>
                            </div>
                          </li>
                          <li className="text-sm border-l-2 border-accent pl-3">
                            <span className="font-semibold block text-foreground">Digital Marketing Daily Batch:</span>
                            <span className="text-xs text-muted-foreground">Monday to Saturday | SEO, PPC, Analytics & Strategy | Certificate & Live Projects</span>
                            <div className="mt-1 flex gap-3 text-xs">
                              <span className="text-accent font-semibold">First 20 Students: ₹500/mo</span>
                              <span className="text-muted-foreground">After 20: ₹700/mo</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-primary font-display flex items-center gap-1.5">
                        <BadgeInfo className="h-5 w-5 text-accent" />
                        BillBaaz AI & Full Corporate Services
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Discover our comprehensive software tools and corporate services designed to accelerate retail and business growth.
                      </p>

                      <div className="border-t border-border pt-3 mt-2 space-y-2.5">
                        <div className="text-sm">
                          <span className="font-semibold text-foreground flex items-center gap-1">
                            <Sparkles className="h-4 w-4 text-accent fill-accent" />
                            BillBaaz AI (Smart Invoicing & Retail Intel)
                          </span>
                          <span className="text-xs text-muted-foreground block mt-0.5">
                            A premium Business Positive product featuring GST billing, barcode scans, retail inventory logs, sales reporting, customer profiles, and secured cloud integration.
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-foreground">Corporate Setup Services:</span>
                          <span className="text-xs text-muted-foreground block mt-0.5">
                            GST registration, Income Tax Return filing, MSME listings, financial/loan advisory, customer service helpdesks, and custom CMS/CRM software installations.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => { setShowPromo(false); window.location.href = "/contact"; }}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3 px-4 rounded-lg text-sm hover:bg-primary/95 transition-all text-center cursor-pointer shadow-md"
                >
                  Claim Offer / Register
                </button>
                <button
                  onClick={() => { setShowPromo(false); window.location.href = "/book-consultation"; }}
                  className="flex-1 bg-secondary text-secondary-foreground font-semibold py-3 px-4 rounded-lg text-sm hover:bg-secondary/90 transition-all border border-border text-center cursor-pointer"
                >
                  Book Free Call
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
