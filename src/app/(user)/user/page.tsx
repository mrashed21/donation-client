import UserProfile from "@/components/user/profile/UserProfile";

const UserProfilePage = async () => {
  // const { data } = await userService.getSession();

  return (
    <section>
      <UserProfile />
      {/* <UserProfile user={data?.user} /> */}
    </section>
  );
};

export default UserProfilePage;
