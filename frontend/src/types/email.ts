export interface EmailJob {
  id: string;
  senderEmail: string;
  recipient: string;
  subject: string;
  status: "scheduled" | "sent";
  scheduledAt: string;
  sentAt?: string;
}