import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ============================================================================
// TYPE DEFINITIONS (Matching OpenAPI Spec)
// ============================================================================

export interface Service {
  id: number;
  name: string;
  category: string;
  description: string;
  iconName?: string | null;
  isActive: boolean;
}

export interface ServiceInput {
  name: string;
  category: string;
  description: string;
  iconName?: string;
  isActive?: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface CourseInput {
  title: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  author: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string;
  author: string;
  isPublished?: boolean;
}

export interface BlogPostUpdate {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  author?: string;
  isPublished?: boolean;
}

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  createdAt: string;
}

export interface PortfolioProjectInput {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  type: string;
  avatarUrl?: string | null;
}

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

export interface JobInput {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive?: boolean;
}

export interface Contact {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  companyName?: string | null;
  serviceInterested: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ContactInput {
  fullName: string;
  email: string;
  mobileNumber: string;
  companyName?: string;
  serviceInterested: string;
  message: string;
}

export interface Consultation {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  company?: string | null;
  serviceType: string;
  preferredDate: string;
  message?: string | null;
  status: string;
  createdAt: string;
}

export interface ConsultationInput {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  serviceType: string;
  preferredDate: string;
  message?: string;
}

export interface Application {
  id: number;
  jobId?: number | null;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string | null;
  createdAt: string;
}

export interface ApplicationInput {
  jobId?: number;
  fullName: string;
  email: string;
  phone: string;
  coverLetter?: string;
}

export interface DashboardStats {
  totalContacts: number;
  unreadContacts: number;
  totalCourses: number;
  totalBlogPosts: number;
  totalPortfolioProjects: number;
  totalTestimonials: number;
  totalJobs: number;
  totalApplications: number;
  totalConsultations: number;
  pendingConsultations: number;
  recentContacts: Contact[];
  recentConsultations: Consultation[];
}

// ============================================================================
// SEED DATA FOR STATIC/PERSISTENT STORE
// ============================================================================

const defaultServices: Service[] = [
  {
    id: 1,
    name: "Software & Web Development",
    category: "Development",
    description: "We build highly performant, feature-rich web and mobile applications using React, Next.js, and Node.js. Tailored to your exact business specifications with strict attention to performance and security.",
    iconName: "Code",
    isActive: true
  },
  {
    id: 2,
    name: "IT Strategy & Consulting",
    category: "Consulting",
    description: "Align your technology roadmap with business outcomes. We perform architecture audits, design scalable database schemas, and establish modern DevOps pipelines.",
    iconName: "Briefcase",
    isActive: true
  },
  {
    id: 3,
    name: "Cloud Solutions & DevOps",
    category: "Cloud",
    description: "Implement robust cloud infrastructure (AWS/GCP/Azure) with automated continuous integration and continuous deployment pipelines for zero-downtime releases.",
    iconName: "Cloud",
    isActive: true
  },
  {
    id: 4,
    name: "Digital Marketing & Brand Growth",
    category: "Marketing",
    description: "Maximize user acquisition and retention with data-driven SEO, Google Ads, and targeted social media marketing campaigns.",
    iconName: "TrendingUp",
    isActive: true
  },
  {
    id: 5,
    name: "Corporate Tech Training",
    category: "Training",
    description: "Upskill your engineering and design team. We offer customized bootcamps covering modern React, TypeScript, Node.js, and cloud engineering best practices.",
    iconName: "BookOpen",
    isActive: true
  },
  {
    id: 6,
    name: "UI/UX Product Design",
    category: "Design",
    description: "Establish high-fidelity designs, rapid interactive prototypes, and modern user-centric interfaces designed for peak conversion and engagement.",
    iconName: "Layout",
    isActive: true
  }
];

const defaultCourses: Course[] = [
  {
    id: 1,
    title: "Python Programming Masterclass",
    description: "Learn Python from the ground up. Covers syntax, OOPs, data structures, libraries (Pandas, NumPy), and file handling. Ideal for beginners and data science aspirants.",
    duration: "6 Weeks",
    price: 0,
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Advanced Django Web Development",
    description: "Build scalable, secure web applications using Django. Master model relationships, ORM queries, middleware, user authentication, and REST API creation with Django REST Framework.",
    duration: "8 Weeks",
    price: 0,
    category: "Web Frameworks",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "FastAPI Asynchronous Backend Development",
    description: "Design high-performance asynchronous APIs using Python's FastAPI. Covers data validation with Pydantic, SQL databases with SQLAlchemy, dependency injection, and Docker deployment.",
    duration: "6 Weeks",
    price: 0,
    category: "APIs & Microservices",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    isActive: true,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Unlocking Enterprise Tech for Startups",
    slug: "unlocking-enterprise-tech-startups",
    excerpt: "Startups don't need massive IT budgets to build enterprise-grade software systems. Learn how we deliver scalable infrastructure at startup speed.",
    content: "<h2>The Tech Strategy for Ambition</h2><p>For most early-stage startups, software engineering is a bottleneck. Finding high-quality talent is difficult, and architecting reliable infrastructure takes time. At Business Positive, we believe in democratizing enterprise-grade software development. Using modern toolsets like React, Tailwind, and Node.js, we construct robust platforms in days, not months.</p><p>We build with standard design systems, clean architectures, and automated regression testing. This ensures that when your business grows, your tech stack scales with you instead of collapsing under tech debt.</p>",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    author: "Elena Rostova",
    isPublished: true,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Why We Built Business Positive",
    slug: "why-built-business-positive",
    excerpt: "Our founding story: bridging the gap between expensive IT consulting firms and unreliable freelance talent for local businesses.",
    content: "<h2>Bridging the Digital Divide</h2><p>Enterprise IT consulting companies command thousands of dollars in hourly fees, pricing out small to medium-sized local enterprises. On the other end, freelance markets are flooded with developers of varying qualities, leading to buggy software, project abandonment, and wasted capital.</p><p>Business Positive was launched to solve this specific challenge. We provide top-tier professional engineering, marketing, and training services at reasonable, accessible local price points. We act as your fractional CTO and digital innovation partner.</p>",
    category: "Company",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    author: "Alex Mercer",
    isPublished: true,
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "The Future of Full-Stack Web Development in 2026",
    slug: "future-fullstack-dev-2026",
    excerpt: "With frameworks evolving rapidly and AI assistants becoming mainstream, what does it mean to be a full-stack engineer in 2026?",
    content: "<h2>Engineering in the AI Era</h2><p>Full-stack development has changed. In 2026, building software is no longer just about writing boilerplate boilerplate. AI code generators and frameworks like Vite/Next.js have accelerated development. The modern developer must focus on systems design, user experience design, database performance, and robust prompt engineering.</p><p>In this post, we discuss the core skills developers need to stay relevant, including TypeScript safety, state management, and serverless microservices.</p>",
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    author: "Sarah Chen",
    isPublished: true,
    publishedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultPortfolio: PortfolioProject[] = [
  {
    id: 1,
    title: "Fintech Transaction Dashboard",
    description: "A real-time financial tracking dashboard built with React and Tailwind CSS. Features animated charts, customizable tables, and multi-currency conversions.",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    liveUrl: "https://example.com/fintech",
    tags: ["React", "Recharts", "Tailwind CSS"],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Telemedicine Patient App",
    description: "A secure patient portal for booking virtual consultations, secure instant messaging, and electronic health record downloads.",
    category: "Mobile Apps",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    liveUrl: "https://example.com/telehealth",
    tags: ["React Native", "TypeScript", "WebRTC"],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    title: "B2B SaaS CRM Integration",
    description: "Automated data sync system between HubSpot, Salesforce, and a custom billing platform, syncing over 50,000 active records daily.",
    category: "Cloud Solutions",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    liveUrl: "",
    tags: ["Node.js", "Serverless", "AWS Lambda"],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Watson",
    role: "Founder & CEO",
    company: "Nexus Fintech",
    content: "Business Positive delivered our transaction dashboard in record time. Their engineers are exceptionally skilled, responsive, and easy to work with.",
    rating: 5,
    type: "Client",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "David Miller",
    role: "Operations Manager",
    company: "AeroLogistics",
    content: "The cloud architecture audit they conducted uncovered multiple vulnerabilities and saved us over 30% in monthly hosting costs. Highly recommended.",
    rating: 5,
    type: "Client",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    name: "Rohan Sharma",
    role: "Full-Stack Graduate",
    company: "Currently at TCS",
    content: "The 12-week bootcamp was intense but completely worth it. The instructors are practitioners, and the project-oriented curriculum helped me land my dream role.",
    rating: 5,
    type: "Student",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

const defaultJobs: Job[] = [
  {
    id: 1,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We are looking for a Senior React Engineer to lead the development of enterprise-grade custom web portals. You will build highly responsive UI components and establish testing architectures.",
    requirements: [
      "5+ years of production experience with React and TypeScript",
      "Deep understanding of state management (Zustand, React Query)",
      "Experience building responsive layouts with Tailwind CSS",
      "Strong communication skills and client-facing confidence"
    ],
    isActive: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Hybrid (Mumbai)",
    type: "Full-time",
    description: "Join our growth team to drive acquisition and SEO performance for our diverse client portfolio. You will manage ads campaigns and optimize landing page conversions.",
    requirements: [
      "3+ years of digital marketing or SEO agency experience",
      "Proven track record running profitable Google Ads/Meta campaigns",
      "Familiarity with analytics tooling (GA4, GTM, SEMrush)"
    ],
    isActive: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultContacts: Contact[] = [
  {
    id: 1,
    fullName: "Mark Zuckerberg",
    email: "mark@meta.com",
    mobileNumber: "1234567890",
    companyName: "Meta",
    serviceInterested: "Software & Web Development",
    message: "Hey, we need a custom dashboard built for a sub-team at Meta. Let's talk ASAP.",
    isRead: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    fullName: "Elon Musk",
    email: "elon@spacex.com",
    mobileNumber: "9876543210",
    companyName: "SpaceX",
    serviceInterested: "IT Strategy & Consulting",
    message: "Need consultation on optimizing our telemetry analysis tooling frontend.",
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultConsultations: Consultation[] = [
  {
    id: 1,
    fullName: "Sundar Pichai",
    email: "sundar@google.com",
    phone: "5551234567",
    company: "Google",
    serviceType: "Corporate Tech Training",
    preferredDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    message: "Interested in a customized bootcamp for our cloud teams.",
    status: "Pending",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    fullName: "Satya Nadella",
    email: "satya@microsoft.com",
    phone: "5559876543",
    company: "Microsoft",
    serviceType: "Cloud Solutions & DevOps",
    preferredDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    message: "Let's align on Azure automation strategies.",
    status: "Approved",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const defaultApplications: Application[] = [
  {
    id: 1,
    jobId: 1,
    fullName: "Jane Doe",
    email: "jane.doe@gmail.com",
    phone: "1234567890",
    coverLetter: "I have been building React apps for 6 years and I am excited about the work Business Positive is doing.",
    createdAt: new Date().toISOString()
  }
];

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const isBrowser = typeof window !== "undefined";

function getLocalStorage<T>(key: string, defaultValue: T[]): T[] {
  if (!isBrowser) return defaultValue;
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
}

function setLocalStorage<T>(key: string, data: T[]): void {
  if (!isBrowser) return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ============================================================================
// QUERY KEY GETTERS
// ============================================================================

export const getListServicesQueryKey = () => ["services"];
export const getListCoursesQueryKey = () => ["courses"];
export const getListBlogPostsQueryKey = () => ["blogPosts"];
export const getGetBlogPostQueryKey = (id: number) => ["blogPost", id];
export const getListPortfolioQueryKey = () => ["portfolio"];
export const getListJobsQueryKey = () => ["jobs"];
export const getListContactsQueryKey = () => ["contacts"];
export const getGetStatsQueryKey = () => ["stats"];

// ============================================================================
// REACT QUERY HOOKS (READS)
// ============================================================================

export function useListServices() {
  return useQuery<Service[]>({
    queryKey: getListServicesQueryKey(),
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return getLocalStorage<Service>("bp_services", defaultServices);
    }
  });
}

export function useListCourses() {
  return useQuery<Course[]>({
    queryKey: getListCoursesQueryKey(),
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return getLocalStorage<Course>("bp_courses_v3", defaultCourses);
    }
  });
}

export function useListBlogPosts(params?: { publishedOnly?: boolean }) {
  return useQuery<BlogPost[]>({
    queryKey: [...getListBlogPostsQueryKey(), params],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      let posts = getLocalStorage<BlogPost>("bp_blog_posts", defaultBlogPosts);
      if (params?.publishedOnly) {
        posts = posts.filter(p => p.isPublished);
      }
      return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  });
}

export function useGetBlogPost(id: number, options?: any) {
  return useQuery<BlogPost | null>({
    queryKey: getGetBlogPostQueryKey(id),
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 200));
      const posts = getLocalStorage<BlogPost>("bp_blog_posts", defaultBlogPosts);
      return posts.find(p => p.id === id) || null;
    },
    ...options?.query
  });
}

export function useListPortfolio(params?: { category?: string }) {
  return useQuery<PortfolioProject[]>({
    queryKey: [...getListPortfolioQueryKey(), params],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      let projects = getLocalStorage<PortfolioProject>("bp_portfolio", defaultPortfolio);
      if (params?.category) {
        projects = projects.filter(p => p.category === params.category);
      }
      return projects;
    }
  });
}

export function useListTestimonials(params?: { type?: string }) {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", params],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Testimonial>("bp_testimonials", defaultTestimonials);
      if (params?.type) {
        list = list.filter(t => t.type === params.type);
      }
      return list;
    }
  });
}

export function useListJobs() {
  return useQuery<Job[]>({
    queryKey: getListJobsQueryKey(),
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return getLocalStorage<Job>("bp_jobs", defaultJobs);
    }
  });
}

export function useListContacts(params?: { search?: string; unreadOnly?: boolean }) {
  return useQuery<Contact[]>({
    queryKey: [...getListContactsQueryKey(), params],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Contact>("bp_contacts", defaultContacts);
      if (params?.unreadOnly) {
        list = list.filter(c => !c.isRead);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(c => c.fullName.toLowerCase().includes(q) || c.message.toLowerCase().includes(q));
      }
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  });
}

export function useListConsultations() {
  return useQuery<Consultation[]>({
    queryKey: ["consultations"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Consultation>("bp_consultations", defaultConsultations);
      return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  });
}

export function useListApplications() {
  return useQuery<Application[]>({
    queryKey: ["applications"],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      return getLocalStorage<Application>("bp_applications", defaultApplications);
    }
  });
}

export function useGetStats(options?: any) {
  return useQuery<DashboardStats>({
    queryKey: getGetStatsQueryKey(),
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 300));
      const contacts = getLocalStorage<Contact>("bp_contacts", defaultContacts);
      const consultations = getLocalStorage<Consultation>("bp_consultations", defaultConsultations);
      const courses = getLocalStorage<Course>("bp_courses_v3", defaultCourses);
      const blogPosts = getLocalStorage<BlogPost>("bp_blog_posts", defaultBlogPosts);
      const portfolio = getLocalStorage<PortfolioProject>("bp_portfolio", defaultPortfolio);
      const testimonials = getLocalStorage<Testimonial>("bp_testimonials", defaultTestimonials);
      const jobs = getLocalStorage<Job>("bp_jobs", defaultJobs);
      const applications = getLocalStorage<Application>("bp_applications", defaultApplications);

      return {
        totalContacts: contacts.length,
        unreadContacts: contacts.filter(c => !c.isRead).length,
        totalCourses: courses.length,
        totalBlogPosts: blogPosts.length,
        totalPortfolioProjects: portfolio.length,
        totalTestimonials: testimonials.length,
        totalJobs: jobs.length,
        totalApplications: applications.length,
        totalConsultations: consultations.length,
        pendingConsultations: consultations.filter(c => c.status === "Pending").length,
        recentContacts: contacts.slice(0, 5),
        recentConsultations: consultations.slice(0, 5)
      };
    },
    ...options?.query
  });
}

// ============================================================================
// REACT QUERY HOOKS (MUTATIONS / WRITES)
// ============================================================================

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: { data: ContactInput }) => {
      const { data } = variables;
      await new Promise(r => setTimeout(r, 400));
      const contacts = getLocalStorage<Contact>("bp_contacts", defaultContacts);
      const newContact: Contact = {
        id: contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1,
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        companyName: data.companyName || null,
        serviceInterested: data.serviceInterested,
        message: data.message,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      contacts.unshift(newContact);
      setLocalStorage("bp_contacts", contacts);
      return newContact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useCreateConsultation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: { data: ConsultationInput }) => {
      const { data } = variables;
      await new Promise(r => setTimeout(r, 400));
      const list = getLocalStorage<Consultation>("bp_consultations", defaultConsultations);
      const item: Consultation = {
        id: list.length > 0 ? Math.max(...list.map(c => c.id)) + 1 : 1,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        serviceType: data.serviceType,
        preferredDate: data.preferredDate,
        message: data.message || null,
        status: "Pending",
        createdAt: new Date().toISOString()
      };
      list.unshift(item);
      setLocalStorage("bp_consultations", list);
      return item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (variables: { data: ApplicationInput }) => {
      const { data } = variables;
      await new Promise(r => setTimeout(r, 400));
      const list = getLocalStorage<Application>("bp_applications", defaultApplications);
      const item: Application = {
        id: list.length > 0 ? Math.max(...list.map(c => c.id)) + 1 : 1,
        jobId: data.jobId || null,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter || null,
        createdAt: new Date().toISOString()
      };
      list.unshift(item);
      setLocalStorage("bp_applications", list);
      return item;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (variables: { data: { email: string } }) => {
      await new Promise(r => setTimeout(r, 300));
      return { ok: true };
    }
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Service>("bp_services", defaultServices);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_services", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListServicesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Course>("bp_courses_v3", defaultCourses);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_courses_v3", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListCoursesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Job>("bp_jobs", defaultJobs);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_jobs", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListJobsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<BlogPost>("bp_blog_posts", defaultBlogPosts);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_blog_posts", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number; data: BlogPostUpdate }) => {
      await new Promise(r => setTimeout(r, 350));
      const list = getLocalStorage<BlogPost>("bp_blog_posts", defaultBlogPosts);
      const index = list.findIndex(item => item.id === vars.id);
      if (index !== -1) {
        list[index] = {
          ...list[index],
          ...vars.data,
          publishedAt: vars.data.isPublished && !list[index].isPublished ? new Date().toISOString() : list[index].publishedAt
        };
        setLocalStorage("bp_blog_posts", list);
        return list[index];
      }
      throw new Error("Post not found");
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetBlogPostQueryKey(vars.id) });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useMarkContactRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      const list = getLocalStorage<Contact>("bp_contacts", defaultContacts);
      const index = list.findIndex(item => item.id === vars.id);
      if (index !== -1) {
        list[index].isRead = true;
        setLocalStorage("bp_contacts", list);
        return list[index];
      }
      throw new Error("Contact not found");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<Contact>("bp_contacts", defaultContacts);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_contacts", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}

export function useDeletePortfolioProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (vars: { id: number }) => {
      await new Promise(r => setTimeout(r, 300));
      let list = getLocalStorage<PortfolioProject>("bp_portfolio", defaultPortfolio);
      list = list.filter(item => item.id !== vars.id);
      setLocalStorage("bp_portfolio", list);
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListPortfolioQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
    }
  });
}
