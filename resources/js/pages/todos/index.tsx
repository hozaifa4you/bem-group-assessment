import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Todo } from '@/types/todo';
import { Head } from '@inertiajs/react';
import { Calendar, CheckCircle2, Circle, Clock, Edit3, MoreVertical, Plus, Trash2 } from 'lucide-react';

interface TodosProps {
   todos: {
      data: Todo[];
   };
}

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
   {
      title: 'Todos',
      href: '/todos',
   },
];

const Todos = ({ todos: { data: todos } }: TodosProps) => {
   return (
      <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Dashboard" />
         <div className="min-h-screen bg-gray-50/50">
            <div className="container mx-auto max-w-6xl px-4 py-8">
               {/* Header */}
               <div className="mb-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                        <p className="mt-1 text-gray-600">Manage and track your daily tasks</p>
                     </div>
                     <Button className="w-fit">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Task
                     </Button>
                  </div>
               </div>

               {/* Todo List */}
               <div className="grid gap-4 md:grid-cols-2">
                  {todos.length > 0 ? (
                     todos.map((todo) => (
                        <Card key={todo.id} className="transition-shadow duration-200 hover:shadow-md">
                           <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                 <div className="flex items-center pt-1">
                                    <Checkbox checked={todo.is_completed} className="h-5 w-5" />
                                 </div>

                                 <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                       <div className="flex-1">
                                          <div className="mb-2 flex items-center gap-2">
                                             {todo.is_completed ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                             ) : (
                                                <Circle className="h-5 w-5 text-gray-400" />
                                             )}
                                             <h3
                                                className={`text-lg font-semibold ${todo.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}
                                             >
                                                {todo.title}
                                             </h3>
                                          </div>
                                          <p className="mb-3 leading-relaxed text-gray-600">{todo.description}</p>
                                          <div className="flex flex-wrap items-center gap-2">
                                             <Badge
                                                className={
                                                   todo.is_completed
                                                      ? 'border-green-200 bg-green-100 text-green-800'
                                                      : 'border-gray-200 bg-gray-100 text-gray-800'
                                                }
                                             >
                                                {todo.is_completed ? 'Completed' : 'Pending'}
                                             </Badge>

                                             {todo.reminder_at && (
                                                <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
                                                   <Calendar className="mr-1 h-3 w-3" />
                                                   Reminder: {new Date(todo.reminder_at).toLocaleDateString()}{' '}
                                                   {new Date(todo.reminder_at).toLocaleTimeString([], {
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                   })}
                                                </Badge>
                                             )}

                                             {todo.email_sent && <Badge className="border-blue-200 bg-blue-100 text-blue-800">Email Sent</Badge>}

                                             <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="mr-1 h-4 w-4" />
                                                Created: {new Date(todo.created_at).toLocaleDateString()}
                                             </div>
                                          </div>
                                       </div>

                                       <div className="flex items-center gap-2">
                                          <Button variant="ghost" size="sm">
                                             <Edit3 className="h-4 w-4" />
                                          </Button>
                                          <DropdownMenu>
                                             <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                   <MoreVertical className="h-4 w-4" />
                                                </Button>
                                             </DropdownMenuTrigger>
                                             <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                   <Edit3 className="mr-2 h-4 w-4" />
                                                   Edit Task
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                   <Calendar className="mr-2 h-4 w-4" />
                                                   Set Reminder
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                   {todo.is_completed ? (
                                                      <>
                                                         <Circle className="mr-2 h-4 w-4" />
                                                         Mark as Pending
                                                      </>
                                                   ) : (
                                                      <>
                                                         <CheckCircle2 className="mr-2 h-4 w-4" />
                                                         Mark as Complete
                                                      </>
                                                   )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                   <Trash2 className="mr-2 h-4 w-4" />
                                                   Delete Task
                                                </DropdownMenuItem>
                                             </DropdownMenuContent>
                                          </DropdownMenu>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     ))
                  ) : (
                     <p className="text-center text-gray-400">No tasks found</p>
                  )}
               </div>

               {/* Empty State (hidden when there are todos) */}
               <div className="hidden py-12 text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                     <CheckCircle2 className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No tasks yet</h3>
                  <p className="mb-4 text-gray-600">Get started by creating your first task</p>
                  <Button>
                     <Plus className="mr-2 h-4 w-4" />
                     Add Your First Task
                  </Button>
               </div>
            </div>
         </div>
      </AppLayout>
   );
};

export default Todos;
