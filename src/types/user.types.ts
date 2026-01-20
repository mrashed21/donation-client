export interface SessionResponse {
  user: User | null;
}

// types/user.types.ts
export interface User {
  user_type: "donor" | "requester";
  phone_number: string;
  date_of_birth: string;
  age: number;
  gender: "male" | "female";
  weight: number;
  blood_group: string;
  division: string;
  district: string;
  has_disease: boolean;
  disease_details?: string;
  smokes: boolean;
  takes_drugs: boolean;
  last_donate_date?: string;
  is_available: boolean;
  whatsapp_number?: string;
  facebook_link?: string;
  profile_completed: boolean;
}
