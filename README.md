# Business Positive - Reorganized React Website

A modern, highly premium website for **Business Positive**, built as a clean, standalone React single-page application (SPA). It uses Vite, TypeScript, Tailwind CSS (v4), Radix UI, and React Query.

The project has been Consolidated from a complex multi-module monorepo into a single, standard React codebase located at the workspace root, eliminating all unessential directories (Express backend, PostgreSQL db, OpenAPI schemas, and Replit configuration plugins).

## Features

- **Responsive Landing & Informational Pages**: Beautiful interactive pages for Home, About, Services, Courses, Portfolio, Blog, Careers, and Contact.
- **Interactive Forms**: Fully functional Consultation Bookings, Contact forms, Career Job applications, and Newsletter subscriptions.
- **Interactive Admin Panel**: Access a comprehensive administration dashboard to manage services, courses, blog posts, contacts, and job applications.
- **localStorage Mock API Engine**: Powered by React Query, the application seeds realistic initial data into browser `localStorage` on first load. Dynamic mutations (adding, updating, or deleting items) are persisted in the browser, rendering a fully operational product showcase without any server installation.

---

## Folder Structure

```text
├── public/                 # Static assets (favicons, graphs, robots.txt)
├── src/
│   ├── api/
│   │   └── api.ts          # Mock API Client (TypeScript types, React Query hooks, localStorage store)
│   ├── components/
│   │   ├── admin/          # Admin Dashboard layout components
│   │   ├── layout/         # General Page Header, Footer, and Main Layouts
│   │   └── ui/             # Reusable UI component library (Radix UI, shadcn styles)
│   ├── hooks/              # Custom React hooks (toast, mobile helpers)
│   ├── lib/                # Utility helper functions
│   ├── pages/
│   │   ├── admin/          # Admin Login, Dashboard, Contacts, Courses, Blogs, and Job views
│   │   └── ...             # Standard user-facing pages (Home, About, Contact, Blog, Careers, etc.)
│   ├── App.tsx             # Main router and providers configuration
│   ├── index.css           # Global stylesheet and Tailwind directives
│   └── main.tsx            # Application entrypoint
├── components.json         # Component library configurations
├── index.html              # HTML entrypoint template
├── package.json            # Node dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build and dev server config
```

---

## Setup & Running Locally

Ensure you have [Node.js](https://nodejs.org/) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Verify TypeScript Compilation
```bash
npm run typecheck
```

### 4. Build for Production
```bash
npm run build
```
Production assets will be generated in the `dist` directory.

---

## Admin Panel Access & Credentials

The admin portal link is kept private and secure by using a long, obscure route.

1. Navigate to `/secure-admin-portal-login-gate-8392` in your browser.
2. Login with the default credentials:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Once logged in, you can navigate to the **Credentials** settings page in the admin sidebar navigation to change your admin username and password. The updated credentials will be securely saved in your browser's `localStorage` for future sign-ins.
