"use client";

import { useGetme } from "@/api/user/user.api";
import UserNavbar from "@/components/ui/user-navbar";
import UserSidebar from "@/components/ui/user-sidebar";
import ProfileCompleteModal from "@/components/user/profile/profile-complete-modal";
import { useEffect, useState } from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
  const { data, isLoading } = useGetme();

  const user = data?.data;

  useEffect(() => {
    if (user && user.profile_completed === false) {
      setUserUpdateModalOpen(true);
    }
  }, [user?.profile_completed]);

  if (isLoading) return null;

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        <UserNavbar user={user} />

        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Profile Complete Modal */}
      <ProfileCompleteModal
        open={userUpdateModalOpen}
        setOpen={setUserUpdateModalOpen}
      />
    </div>
  );
};

export default UserLayout;
