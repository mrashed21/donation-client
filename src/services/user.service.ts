import { AUTH_URL } from "@/utils/BaseUrl";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-cache",
      });
      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "Someting went wrong" } };
      }
      return { data: session, error: null };
    } catch (error) {
      return {
        data: null,
        error: {
          message: "Someting went wrong",
        },
      };
    }
  },
};
