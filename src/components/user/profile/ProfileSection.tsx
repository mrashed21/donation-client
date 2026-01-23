"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type UserProfile = {
  name: string;
  email: string;
  phone_number: string;
  whatsapp_number: string;
  image?: string;
  role: string;
  user_type: string;
  gender: "male" | "female" | "other";
  age: number;
  date_of_birth: string;
  blood_group: string;
  weight: number;
  division: string;
  district: string;
  status: string;
  is_available: boolean;
  profile_completed: boolean;
};

interface ProfileSectionProps {
  profile: UserProfile;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean;
}) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">
      {typeof value === "boolean" ? (value ? "Yes" : "No") : value || "-"}
    </span>
  </div>
);

const ProfileSection = ({ profile }: ProfileSectionProps) => {
  const {
    name,
    email,
    phone_number,
    whatsapp_number,
    image,
    role,
    user_type,
    gender,
    age,
    date_of_birth,
    blood_group,
    weight,
    division,
    district,
    status,
    is_available,
    profile_completed,
  } = profile;

  return (
    <Card className="max-w-3xl">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <CardTitle className="text-xl">{name}</CardTitle>
          <p className="text-sm text-muted-foreground">{email}</p>

          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">{role}</Badge>
            <Badge variant="outline">{user_type}</Badge>
            <Badge variant={status === "active" ? "default" : "destructive"}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-6 pt-6">
        {/* Personal Info */}
        <div className="grid gap-3">
          <h4 className="font-semibold">Personal Information</h4>
          <InfoRow label="Gender" value={gender} />
          <InfoRow label="Age" value={age} />
          <InfoRow
            label="Date of Birth"
            value={new Date(date_of_birth).toLocaleDateString()}
          />
          <InfoRow label="Blood Group" value={blood_group} />
          <InfoRow label="Weight (kg)" value={weight} />
        </div>

        <Separator />

        {/* Contact Info */}
        <div className="grid gap-3">
          <h4 className="font-semibold">Contact Information</h4>
          <InfoRow label="Phone" value={phone_number} />
          <InfoRow label="WhatsApp" value={whatsapp_number} />
        </div>

        <Separator />

        {/* Location & Status */}
        <div className="grid gap-3">
          <h4 className="font-semibold">Location & Status</h4>
          <InfoRow label="Division" value={division} />
          <InfoRow label="District" value={district} />
          <InfoRow label="Available" value={is_available} />
          <InfoRow label="Profile Completed" value={profile_completed} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
