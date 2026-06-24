import { AdminLayout } from "@/components/admin/AdminLayout";
import { useListConsultations } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Consultations() {
  const { data: consultations, isLoading } = useListConsultations();

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Consultations</h1>
        <p className="text-muted-foreground mt-1">Manage consultation requests</p>
      </div>

      <div className="rounded-md border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Preferred Date</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Requested On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                </TableRow>
              ))
            ) : consultations?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No consultations booked yet.
                </TableCell>
              </TableRow>
            ) : (
              consultations?.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>
                    <Badge variant={consultation.status === 'pending' ? 'default' : 'secondary'}>
                      {consultation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{consultation.fullName}</div>
                    <div className="text-sm text-muted-foreground">{consultation.email}</div>
                    <div className="text-xs text-muted-foreground">{consultation.phone}</div>
                    {consultation.company && <div className="text-xs font-medium mt-1">{consultation.company}</div>}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{consultation.serviceType}</Badge>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {format(new Date(consultation.preferredDate), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm" title={consultation.message || ""}>
                      {consultation.message || "-"}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(consultation.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
