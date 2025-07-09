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
   const reminderTime = getReminderTime(completeAt);
   return !isCompleted && now >= reminderTime && now <= time;
};
