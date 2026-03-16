export interface ClinicSetting {
  id: string;
  key: string;
  value: string;
  updated_at?: string;
}

export interface ClinicSettings {
  phone: string;
  emergency_phone: string;
  email: string;
  address: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
  open_time: string;
  close_time: string;
}
