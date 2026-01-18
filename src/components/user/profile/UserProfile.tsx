// "use client";
// import { User } from "@/types/user.types";
// import { useEffect, useState } from "react";

// const UserProfile = (user: User) => {
//   console.log(user?.user?.name);
//   const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
//   useEffect(() => {
//     if (!user?.user?.profile_completed) {
//       setUserUpdateModalOpen(true);
//     }
//   }, [user]);
//   return (
//     <section>
//       UserProfile
//       {userUpdateModalOpen && <h1>update profile</h1>}
//     </section>
//   );
// };

// export default UserProfile;

"use client";

import { User } from "@/types/user.types";
import { useEffect, useState } from "react";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [userUpdateModalOpen, setUserUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (!user.profile_completed) {
      setUserUpdateModalOpen(true);
    }
  }, [user.profile_completed]);

  return (
    <section>
      UserProfile
      <p>{user.name}</p>
      {userUpdateModalOpen && <h1>update profile</h1>}
    </section>
  );
};

export default UserProfile;
