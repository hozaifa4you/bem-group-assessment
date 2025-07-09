import { cn } from '@/lib/utils';
import { PaginationLinks } from '@/types/todo';

interface PaginationProps {
   links: PaginationLinks[];
}

const Pagination = ({ links }: PaginationProps) => {
   return (
      <div className="my-4 flex items-center justify-center gap-4">
         {links.map((link) => (
            <a
               key={link.label}
               href={link.url ?? '#'}
               className={cn('rounded-sm border border-gray-500 px-3 py-1.5 text-gray-500', {
                  'border-blue-500 text-blue-500': link.active,
               })}
               dangerouslySetInnerHTML={{ __html: link.label }}
            />
         ))}
      </div>
   );
};

export { Pagination };
