"use client";

import { useGetme } from "@/api/user/user.api";
import { User } from "@/types/user.types";
import { useEffect, useState } from "react";

interface UserProfileProps {
  user: User;
}

const UserProfile = () => {
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetme();
  const user = data?.data;
  console.log("user form api:", user);
  useEffect(() => {
    if (user?.profile_completed === false) {
      setUserUpdateModalOpen(true);
    }
  }, [user?.profile_completed]);

  return (
    <section>
      <p>{user?.name}</p>
    </section>
  );
};

export default UserProfile;
