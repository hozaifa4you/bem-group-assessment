import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { getReminderTime } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Clock, Plus, X } from 'lucide-react';
import { FormEventHandler } from 'react';
import DateTimePicker from 'react-datetime-picker';

import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

interface CreateTodoForm {
   title: string;
   description?: string;
   complete_at: Date | null; // ISO datetime string
}

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Todos',
      href: '/todos',
   },
   { title: 'Create', href: route('todos.create') },
];

const CreateTodo = () => {
   const { data, setData, post, processing, errors, reset } = useForm<Required<CreateTodoForm>>({
      title: '',
      description: '',
      complete_at: new Date(new Date().getTime() + 30 * 60 * 1000),
   });

   const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route('todos.store'), {
         onFinish: () => reset('complete_at', 'description', 'title'),
      });
   };

   return (
      <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Create Todo" />

         <div className="min-h-screen bg-gray-50/50">
            <div className="container mx-auto max-w-2xl px-4 py-8">
               {/* Header */}
               <div className="mb-8">
                  <div className="mb-4 flex items-center gap-4">
                     <Button variant="ghost" size="sm" className="p-2">
                        <ArrowLeft className="h-4 w-4" />
                     </Button>
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
                        <p className="mt-1 text-gray-600">Add a new task to your todo list</p>
                     </div>
                  </div>
               </div>

               {/* Form Card */}
               <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Task Details
                     </CardTitle>
                     <CardDescription>Fill in the information below to create your new task</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form className="space-y-6" onSubmit={submit}>
                        {/* Title Field */}
                        <div className="space-y-2">
                           <Label htmlFor="title" className="text-sm font-medium">
                              Title <span className="text-red-500">*</span>
                           </Label>
                           <Input
                              id="title"
                              type="text"
                              placeholder="Enter task title..."
                              className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                              value={data.title}
                              onChange={(e) => setData('title', e.target.value)}
                           />
                           {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Description Field */}
                        <div className="space-y-2">
                           <Label htmlFor="description" className="text-sm font-medium">
                              Description
                           </Label>
                           <Textarea
                              id="description"
                              placeholder="Enter task description (optional)..."
                              value={data.description}
                              onChange={(e) => setData('description', e.target.value)}
                              rows={4}
                              className="resize-none"
                           />
                           <p className="text-xs text-gray-500">Provide additional details about your task (optional)</p>
                        </div>

                        {/* Complete At Field */}
                        <div className="space-y-2">
                           <Label htmlFor="complete_at" className="inline-block w-1/3 text-sm font-medium">
                              Due Date & Time <span className="text-red-500">*</span>
                           </Label>
                           <div className="w-full">
                              <DateTimePicker
                                 minDate={new Date()}
                                 className="w-full"
                                 onChange={(date) => setData('complete_at', date)}
                                 value={data.complete_at}
                                 format="y-MM-dd h:mm a"
                                 disableClock={false}
                                 calendarIcon={<Calendar className="size-4" />}
                                 clearIcon={<X className="size-4" />}
                              />
                           </div>
                           {errors.complete_at && <p className="text-sm text-red-600">{errors.complete_at}</p>}
                           <p className="text-xs text-gray-500">Select when you want to complete this task</p>
                        </div>

                        {/* Reminder Info */}
                        {data.complete_at && (
                           <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                              <div className="mb-2 flex items-center gap-2">
                                 <Clock className="h-4 w-4 text-blue-600" />
                                 <span className="text-sm font-medium text-blue-800">Automatic Reminder</span>
                              </div>
                              <p className="text-sm text-blue-700">
                                 You'll be reminded at{' '}
                                 <span className="font-medium">
                                    {getReminderTime(new Date(data.complete_at))?.toLocaleDateString()} at{' '}
                                    {getReminderTime(new Date(data.complete_at))?.toLocaleTimeString([], {
                                       hour: '2-digit',
                                       minute: '2-digit',
                                    })}
                                 </span>{' '}
                                 (10 minutes before due time)
                              </p>
                           </div>
                        )}

                        {/* Form Actions */}
                        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                           <Button type="submit" className="flex-1">
                              {processing ? (
                                 <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                    Creating Task...
                                 </>
                              ) : (
                                 <>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Task
                                 </>
                              )}
                           </Button>
                           <Button onClick={() => reset()} type="button" variant="outline" className="flex-1 sm:flex-none">
                              Clear Form
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>

               {/* Help Text */}
               <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                     Need help? Tasks with reminders will automatically notify you 10 minutes before the due time.
                  </p>
               </div>
            </div>
         </div>
      </AppLayout>
   );
};

export default CreateTodo;
