import { Pagination } from '@/components/pagination';
import { TodoCard } from '@/components/todos/todo-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button, buttonVariants } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { PaginationLinks, Todo } from '@/types/todo';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, CheckCircle2Icon, Plus } from 'lucide-react';

interface TodosProps {
   todos: {
      data: Todo[];
      links: PaginationLinks[];
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

const Todos = ({ todos: { data: todos, links }, ...rest }: TodosProps) => {
   console.log(rest);

   return (
      <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Todos" />
         <div className="min-h-screen bg-gray-50/50">
            <div className="container mx-auto max-w-6xl px-4 py-8">
               {/* Header */}
               <div className="mb-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                     <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                        <p className="mt-1 text-gray-600">Manage and track your daily tasks</p>
                     </div>
                     <Link href={route('todos.create')} className={buttonVariants({ class: 'w-fit' })}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Task
                     </Link>
                  </div>
               </div>

               {/* Todo List */}
               <div className="grid gap-4 md:grid-cols-2">
                  {todos.length > 0 ? (
                     todos.map((todo) => <TodoCard todo={todo} key={todo.id} />)
                  ) : (
                     <div className="flex items-center justify-center md:col-span-2">
                        <Alert className="max-w-[650px]">
                           <CheckCircle2Icon />
                           <AlertTitle>Not found</AlertTitle>
                           <AlertDescription>No tasks found. You can create a new task by clicking the "Add New Task" button above.</AlertDescription>
                        </Alert>
                     </div>
                  )}
               </div>

               <Pagination links={links} />

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
