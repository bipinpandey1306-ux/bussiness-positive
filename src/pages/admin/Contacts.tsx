import { AdminLayout } from "@/components/admin/AdminLayout";
import { useListContacts, useMarkContactRead, useDeleteContact, getListContactsQueryKey } from "@/api/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Contacts() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: contacts, isLoading } = useListContacts({ search: search || undefined });
  const markRead = useMarkContactRead();
  const deleteContact = useDeleteContact();

  const handleMarkRead = (id: number) => {
    markRead.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
          toast({ title: "Marked as read" });
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteContact.mutate(
        { id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
            toast({ title: "Message deleted" });
          }
        }
      );
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground mt-1">Manage inquiries from your website</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search names or emails..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Name / Email</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-16 float-right" /></TableCell>
                </TableRow>
              ))
            ) : contacts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              contacts?.map((contact) => (
                <TableRow key={contact.id} className={!contact.isRead ? "bg-muted/30" : ""}>
                  <TableCell>
                    {contact.isRead ? (
                      <Badge variant="outline" className="text-muted-foreground">Read</Badge>
                    ) : (
                      <Badge className="bg-primary hover:bg-primary">New</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{contact.fullName}</div>
                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                    <div className="text-xs text-muted-foreground">{contact.mobileNumber}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">{contact.serviceInterested}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm" title={contact.message}>{contact.message}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    {!contact.isRead && (
                      <Button variant="outline" size="icon" onClick={() => handleMarkRead(contact.id)} title="Mark as read">
                        <Check className="h-4 w-4 text-green-500" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={() => handleDelete(contact.id)} title="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
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
