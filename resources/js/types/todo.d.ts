export type Todo = {
   id: number;
   title: string;
   slug: string;
   description: string | null;
   complete_at: Date;
   is_completed: boolean;
   is_reminder_sent: boolean;
   created_at: Date;
   updated_at: Date;
};

type PaginationLinks = {
   active: boolean;
   label: string;
   url: string | null;
};
