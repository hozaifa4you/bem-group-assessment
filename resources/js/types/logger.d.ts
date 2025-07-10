export interface Logger {
   id: number;
   to_email: string;
   subject: string;
   status: 'success' | 'failed' | string;
   type: string;
   sent_at: string;
   error_message: string | null;
}
