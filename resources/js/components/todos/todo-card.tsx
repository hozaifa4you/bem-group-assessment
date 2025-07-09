import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getReminderTime, isOverdue, isUpcoming } from '@/lib/utils';
import { Todo } from '@/types/todo';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { Calendar, CheckCircle2, Circle, Clock, Edit3, MoreVertical, Trash2 } from 'lucide-react';

interface TodoCardProps {
   todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
   return (
      <Card key={todo.id} className="transition-shadow duration-200 hover:shadow-md">
         <CardContent className="p-6">
            <div className="flex items-start gap-4">
               <div className="flex items-center pt-1">
                  <Checkbox checked={todo.is_completed} className="h-5 w-5" />
               </div>

               <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                     <div className="flex-1">
                        <div className="flex-1">
                           <div className="mb-2 flex items-center gap-2">
                              {todo.is_completed ? (
                                 <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : isOverdue(todo.complete_at, todo.is_completed) ? (
                                 <Clock className="h-5 w-5 text-red-600" />
                              ) : isUpcoming(todo.complete_at, todo.is_completed) ? (
                                 <Calendar className="h-5 w-5 text-orange-600" />
                              ) : (
                                 <Circle className="h-5 w-5 text-gray-400" />
                              )}
                              <h3 className={`text-lg font-semibold ${todo.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                 {todo.title}
                              </h3>
                           </div>
                           {todo.description && <p className="mb-3 leading-relaxed text-gray-600">{todo.description}</p>}
                           <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                 className={
                                    todo.is_completed
                                       ? 'border-green-200 bg-green-100 text-green-800'
                                       : isOverdue(todo.complete_at, todo.is_completed)
                                         ? 'border-red-200 bg-red-100 text-red-800'
                                         : isUpcoming(todo.complete_at, todo.is_completed)
                                           ? 'border-orange-200 bg-orange-100 text-orange-800'
                                           : 'border-gray-200 bg-gray-100 text-gray-800'
                                 }
                              >
                                 {todo.is_completed
                                    ? 'Completed'
                                    : isOverdue(todo.complete_at, todo.is_completed)
                                      ? 'Overdue'
                                      : isUpcoming(todo.complete_at, todo.is_completed)
                                        ? 'Due Soon'
                                        : 'Pending'}
                              </Badge>

                              <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                                 <Calendar className="mr-1 h-3 w-3" />
                                 Due: {new Date(todo.complete_at).toLocaleDateString()}{' '}
                                 {new Date(todo.complete_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                 })}
                              </Badge>

                              {!todo.is_completed && (
                                 <Badge variant="outline" className="border-purple-200 bg-purple-50 text-purple-700">
                                    <Clock className="mr-1 h-3 w-3" />
                                    Reminder: {getReminderTime(todo.complete_at).toLocaleDateString()}{' '}
                                    {getReminderTime(todo.complete_at).toLocaleTimeString([], {
                                       hour: '2-digit',
                                       minute: '2-digit',
                                    })}
                                 </Badge>
                              )}

                              <div className="flex items-center text-sm text-gray-500">
                                 <Clock className="mr-1 h-4 w-4" />
                                 Created: {new Date(todo.created_at).toLocaleDateString()}
                              </div>
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
                                 Change Due Date
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
   );
};

export { TodoCard };
