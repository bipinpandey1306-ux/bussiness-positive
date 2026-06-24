import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Courses from "@/pages/Courses";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import BlogPostDetail from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import BookConsultation from "@/pages/BookConsultation";

// Admin routes
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminContacts from "@/pages/admin/Contacts";
import AdminConsultations from "@/pages/admin/Consultations";
import AdminBlog from "@/pages/admin/Blog";
import AdminCourses from "@/pages/admin/Courses";
import AdminServices from "@/pages/admin/Services";
import AdminPortfolio from "@/pages/admin/Portfolio";
import AdminCredentials from "@/pages/admin/Credentials";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/courses" component={Courses} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPostDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-consultation" component={BookConsultation} />
      
      {/* Admin Routes */}
      <Route path="/secure-admin-portal-login-gate-8392" component={AdminLogin} />
      <Route path="/secure-admin-portal-login-gate-8392/dashboard" component={AdminDashboard} />
      <Route path="/secure-admin-portal-login-gate-8392/contacts" component={AdminContacts} />
      <Route path="/secure-admin-portal-login-gate-8392/consultations" component={AdminConsultations} />
      <Route path="/secure-admin-portal-login-gate-8392/blog" component={AdminBlog} />
      <Route path="/secure-admin-portal-login-gate-8392/courses" component={AdminCourses} />
      <Route path="/secure-admin-portal-login-gate-8392/services" component={AdminServices} />
      <Route path="/secure-admin-portal-login-gate-8392/portfolio" component={AdminPortfolio} />
      <Route path="/secure-admin-portal-login-gate-8392/credentials" component={AdminCredentials} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
