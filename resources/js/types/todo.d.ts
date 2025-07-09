export type Todo = {
   id: number;
   title: string;
   description: string | null;
   reminder_at: Date;
   email_sent: Date | null;
   is_completed: boolean;
   created_at: Date;
   updated_at: Date;
};

type PaginationLinks = {
   active: boolean;
   label: string;
   url: string | null;
};
