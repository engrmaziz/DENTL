export interface Doctor {
  id: string;
  name: string;
  role: string;
  image_url?: string;
  bio?: string;
  specialties: string[];
  availability: DoctorAvailability;
  created_at?: string;
}

export interface DoctorAvailability {
  monday?: TimeSlot[];
  tuesday?: TimeSlot[];
  wednesday?: TimeSlot[];
  thursday?: TimeSlot[];
  friday?: TimeSlot[];
  saturday?: TimeSlot[];
  sunday?: TimeSlot[];
}

export interface TimeSlot {
  start: string; // "09:00"
  end: string;   // "17:00"
}
