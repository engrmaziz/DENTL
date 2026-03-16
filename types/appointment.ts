export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_date: string;
  preferred_time: string;
  reason: string;
  created_at?: string;
}
