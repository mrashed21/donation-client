import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./../axios";

//* GET getme
const getMeApi = async () => {
  const { data } = await api.post("/user/get-me");
  return data;
};

//* GET getme hook
export const useGetme = () => {
  return useQuery({
    queryKey: ["api/v1/user/get-me"],
    queryFn: () => getMeApi(),
    // keepPreviousData: true,
  });
};

//todo CREATE user profile
const createUserProfileApi = async (payload: any) => {
  const { data } = await api.patch("/user/profile", payload);
  return data;
};

//todo CREATE user profile
export const useCreateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["api/v1/user/profile"],
      });
    },
  });
};
