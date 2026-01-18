import { userService } from "@/services/user.service";

const HomePage = async () => {
  const { data } = await userService.getSession();
  console.log(data);
  return <section>HomePage</section>;
};

export default HomePage;
