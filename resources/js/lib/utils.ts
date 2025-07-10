import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const getReminderTime = (completeAt: Date) => {
   const time = new Date(completeAt);

   const reminderTime = new Date(time.getTime() - 10 * 60 * 1000); // 10 minutes before
   return reminderTime;
};

export const isOverdue = (completeAt: Date, isCompleted: boolean) => {
   const time = new Date(completeAt);
   return !isCompleted && new Date() > time;
};

export const isUpcoming = (completeAt: Date, isCompleted: boolean) => {
   const now = new Date();
   const time = new Date(completeAt);
   const reminderTime = getReminderTime(time);
   return !isCompleted && now >= reminderTime && now <= time;
};

export const formatDateTimeLocal = (date: Date) => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getMinDateTime = () => {
   const now = new Date();
   return formatDateTimeLocal(now);
};

// const todos = [
//    {
//       user: {
//          id: 3,
//          name: 'The A Team 2',
//          email: 'yousuf360.dev@gmail.com',
//          email_verified_at: '2025-07-09T18:55:30.000000Z',
//          created_at: '2025-07-09T18:55:14.000000Z',
//          updated_at: '2025-07-09T18:55:30.000000Z',
//       },
//       todos: [
//          {
//             id: 56,
//             title: 'The yousuf dev todo',
//             description: null,
//             complete_at: '2025-07-09T19:05:00.000000Z',
//             is_completed: false,
//             user_id: 3,
//             created_at: '2025-07-09T18:56:01.000000Z',
//             updated_at: '2025-07-09T18:57:38.000000Z',
//             slug: 'the-yousuf-dev-todo',
//             is_reminder_sent: false,
//          },
//          {
//             id: 57,
//             title: 'The todo description',
//             description: null,
//             complete_at: '2025-07-09T19:05:00.000000Z',
//             is_completed: false,
//             user_id: 3,
//             created_at: '2025-07-09T18:56:18.000000Z',
//             updated_at: '2025-07-09T18:57:32.000000Z',
//             slug: 'the-todo-description',
//             is_reminder_sent: false,
//          },
//       ],
//    },
// ];
