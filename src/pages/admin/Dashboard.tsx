import { AdminLayout } from "@/components/admin/AdminLayout";
import { useGetStats, getGetStatsQueryKey } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, Briefcase, Calendar, Folder } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetStats({
    query: {
      queryKey: getGetStatsQueryKey()
    }
  });

  const statCards = [
    { title: "Total Contacts", value: stats?.totalContacts || 0, icon: Users, href: "/secure-admin-portal-login-gate-8392/contacts", color: "text-blue-500" },
    { title: "Consultations", value: stats?.totalConsultations || 0, icon: Calendar, href: "/secure-admin-portal-login-gate-8392/consultations", color: "text-purple-500" },
    { title: "Courses", value: stats?.totalCourses || 0, icon: BookOpen, href: "/secure-admin-portal-login-gate-8392/courses", color: "text-green-500" },
    { title: "Blog Posts", value: stats?.totalBlogPosts || 0, icon: FileText, href: "/secure-admin-portal-login-gate-8392/blog", color: "text-orange-500" },
    { title: "Portfolio Items", value: stats?.totalPortfolioProjects || 0, icon: Folder, href: "/secure-admin-portal-login-gate-8392/portfolio", color: "text-pink-500" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your business metrics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))
        ) : (
          statCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-4 w-4 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : stats?.recentConsultations?.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">No recent consultations</div>
            ) : (
              <div className="space-y-4">
                {stats?.recentConsultations?.slice(0, 5).map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{consultation.fullName}</p>
                      <p className="text-sm text-muted-foreground">{consultation.serviceType}</p>
                    </div>
                    <div className="text-sm">
                      {new Date(consultation.preferredDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : stats?.recentContacts?.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">No recent contacts</div>
            ) : (
              <div className="space-y-4">
                {stats?.recentContacts?.slice(0, 5).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        {contact.fullName}
                        {!contact.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
