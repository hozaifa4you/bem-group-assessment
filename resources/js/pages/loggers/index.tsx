import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Logger } from '@/types/logger';
import { Head } from '@inertiajs/react';
import { Filter, RefreshCw, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface LoggersPageProps {
   loggers: Logger[];
}

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
   {
      title: 'Email Logs',
      href: '/email-logs',
   },
];

export default function LoggersPage({ loggers }: LoggersPageProps) {
   const [searchTerm, setSearchTerm] = useState('');
   const [statusFilter, setStatusFilter] = useState('all');
   const [typeFilter, setTypeFilter] = useState('all');

   const filteredLogs = useMemo(() => {
      return loggers.filter((log) => {
         const matchesSearch =
            log.to_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.type.toLowerCase().includes(searchTerm.toLowerCase());

         const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
         const matchesType = typeFilter === 'all' || log.type === typeFilter;

         return matchesSearch && matchesStatus && matchesType;
      });
   }, [loggers, searchTerm, statusFilter, typeFilter]);

   const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleString();
   };

   const getStatusBadge = (status: string) => {
      return (
         <Badge
            variant={status === 'success' ? 'default' : 'destructive'}
            className={status === 'success' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
         >
            {status}
         </Badge>
      );
   };

   const getTypeBadge = (type: string) => {
      const colors = {
         welcome: 'bg-blue-100 text-blue-800',
         password_reset: 'bg-orange-100 text-orange-800',
         newsletter: 'bg-purple-100 text-purple-800',
         verification: 'bg-yellow-100 text-yellow-800',
         transactional: 'bg-green-100 text-green-800',
         report: 'bg-gray-100 text-gray-800',
         security: 'bg-red-100 text-red-800',
         promotional: 'bg-pink-100 text-pink-800',
      };

      return (
         <Badge variant="secondary" className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
            {type.replace('_', ' ')}
         </Badge>
      );
   };

   const uniqueTypes = [...new Set(loggers.map((log) => log.type))];

   return (
      <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Email Logs" />

         <Card className="w-full border-none shadow-none">
            <CardHeader>
               <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Email Logs
               </CardTitle>
               <CardDescription>Monitor and track all email communications sent from your application</CardDescription>
            </CardHeader>
            <CardContent>
               {/* Filters */}
               <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                     <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                     <Input
                        placeholder="Search emails, subjects, or types..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                     />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                     <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                     </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                     <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {uniqueTypes.map((type) => (
                           <SelectItem key={type} value={type}>
                              {type.replace('_', ' ')}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>

               {/* Results count */}
               <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                     Showing {filteredLogs.length} of {loggers.length} email logs
                  </p>
               </div>

               {/* Table */}
               <div className="overflow-hidden rounded-md border">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>To Email</TableHead>
                           <TableHead>Subject</TableHead>
                           <TableHead>Status</TableHead>
                           <TableHead>Type</TableHead>
                           <TableHead>Sent At</TableHead>
                           <TableHead>Error Message</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredLogs.length === 0 ? (
                           <TableRow>
                              <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                                 No email logs found matching your criteria
                              </TableCell>
                           </TableRow>
                        ) : (
                           filteredLogs.map((log) => (
                              <TableRow key={log.id} className="hover:bg-muted/50">
                                 <TableCell className="font-medium">{log.to_email}</TableCell>
                                 <TableCell className="max-w-xs truncate" title={log.subject}>
                                    {log.subject}
                                 </TableCell>
                                 <TableCell>{getStatusBadge(log.status)}</TableCell>
                                 <TableCell>{getTypeBadge(log.type)}</TableCell>
                                 <TableCell className="text-sm text-muted-foreground">{formatDate(log.sent_at)}</TableCell>
                                 <TableCell className="max-w-xs">
                                    {log.error_message ? (
                                       <span className="block truncate text-sm text-red-600" title={log.error_message}>
                                          {log.error_message}
                                       </span>
                                    ) : (
                                       <span className="text-sm text-muted-foreground">-</span>
                                    )}
                                 </TableCell>
                              </TableRow>
                           ))
                        )}
                     </TableBody>
                  </Table>
               </div>

               {/* Summary stats */}
               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card>
                     <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">{loggers.filter((log) => log.status === 'success').length}</div>
                        <p className="text-xs text-muted-foreground">Successful Emails</p>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-red-600">{loggers.filter((log) => log.status === 'failed').length}</div>
                        <p className="text-xs text-muted-foreground">Failed Emails</p>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className="pt-6">
                        <div className="text-2xl font-bold">
                           {Math.round((loggers.filter((log) => log.status === 'success').length / loggers.length) * 100)}%
                        </div>
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                     </CardContent>
                  </Card>
               </div>
            </CardContent>
         </Card>
      </AppLayout>
   );
}
