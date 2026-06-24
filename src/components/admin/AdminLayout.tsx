import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  Briefcase, 
  FolderOpen,
  Calendar,
  MessageSquare,
  LogOut,
  Settings,
  Menu,
  X,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (isAuthenticated !== "true") {
      setLocation("/secure-admin-portal-login-gate-8392");
    }
  }, [location, setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    setLocation("/secure-admin-portal-login-gate-8392");
  };

  const navItems = [
    { href: "/secure-admin-portal-login-gate-8392/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/secure-admin-portal-login-gate-8392/contacts", label: "Contacts", icon: Users },
    { href: "/secure-admin-portal-login-gate-8392/consultations", label: "Consultations", icon: Calendar },
    { href: "/secure-admin-portal-login-gate-8392/courses", label: "Courses", icon: GraduationCap },
    { href: "/secure-admin-portal-login-gate-8392/blog", label: "Blog", icon: FileText },
    { href: "/secure-admin-portal-login-gate-8392/services", label: "Services", icon: Settings },
    { href: "/secure-admin-portal-login-gate-8392/portfolio", label: "Portfolio", icon: FolderOpen },
    { href: "/secure-admin-portal-login-gate-8392/credentials", label: "Credentials", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-card border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">BP Admin</h2>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  location === item.href ? "text-primary-foreground" : "text-muted-foreground"
                }`} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-card border-b px-4 h-16 flex items-center justify-between">
        <h2 className="text-xl font-bold text-primary">BP Admin</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-16">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  location === item.href 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t">
              <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:pl-64 pt-16 md:pt-0">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
