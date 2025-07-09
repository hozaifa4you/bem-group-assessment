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
