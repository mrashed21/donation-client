import UserProfile from "@/components/user/profile/UserProfile";
import { userService } from "@/services/user.service";

const UserProfilePage = async () => {
  const { data } = await userService.getSession();

  return (
    <section>
      <UserProfile user={data?.user} />
    </section>
  );
};

export default UserProfilePage;
