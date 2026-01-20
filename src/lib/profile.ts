export type UserProfile = {
  user_type: "donor" | "requester";
  profile_completed?: boolean;

  phone_number: string;
  date_of_birth: Date | null;
  age: number | null;
  gender: "male" | "female" | null;
  weight: number | null;

  blood_group: string;
  division: string;
  district: string;

  has_disease: boolean;
  disease_details?: string;

  smokes: boolean;
  takes_drugs: boolean;

  last_donate_date?: Date | null;
  availability_locked_until?: Date | null;
  is_available: boolean;

  whatsapp_number?: string;
  facebook_link?: string;
};

export const isProfileCompleted = (profile: UserProfile): boolean => {
  const requiredFields = [
    profile?.user_type,
    profile?.phone_number,
    profile?.date_of_birth,
    profile?.age,
    profile?.gender,
    profile?.weight,
    profile?.blood_group,
    profile?.division,
    profile?.district,
  ];

  const baseValid = requiredFields.every(Boolean);

  const diseaseValid =
    profile?.has_disease === false ||
    (profile?.has_disease === true && !!profile?.disease_details);

  return baseValid && diseaseValid;
};
