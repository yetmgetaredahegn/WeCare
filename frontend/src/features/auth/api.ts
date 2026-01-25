import { api, getAuthHeader } from "@/lib/api";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export const fetchMe = async (): Promise<User> => {
  const response = await api.get("/auth/users/me/", {
    headers: getAuthHeader(),
  });
  return response.data;
};
