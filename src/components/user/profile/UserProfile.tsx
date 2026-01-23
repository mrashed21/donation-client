"use client";

import { useGetme } from "@/api/user/user.api";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";

const UserProfile = () => {
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetme();

  const user = data?.data;

  useEffect(() => {
    if (user && user.profile_completed === false) {
      setUserUpdateModalOpen(true);
    }
  }, [user]);

  if (isLoading) {
    return (
      <section className="max-w-3xl">
        <Skeleton className="h-40 w-full rounded-lg" />
      </section>
    );
  }

  if (!user) return null;

  return (
    <section className="space-y-6">
      <ProfileSection profile={user} />

      
      {/* {userUpdateModalOpen && (
        <UserUpdateModal
          open={userUpdateModalOpen}
          onClose={() => setUserUpdateModalOpen(false)}
          refetch={refetch}
        />
      )} */}
    </section>
  );
};

export default UserProfile;
