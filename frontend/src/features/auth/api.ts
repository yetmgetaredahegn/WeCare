import { api, getAuthHeader } from "@/lib/api";

export type UserRole = "patient" | "doctor";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_patient: boolean;
  is_doctor: boolean;
};

export type UserWithRole = User & {
  role: UserRole | null;
};

export const deriveRole = (user: Pick<User, "is_patient" | "is_doctor">): UserRole | null => {
  if (user.is_doctor) return "doctor";
  if (user.is_patient) return "patient";
  return null;
};

export const fetchMe = async (): Promise<User> => {
  const response = await api.get("/auth/users/me/", {
    headers: getAuthHeader(),
  });
  return response.data;
};
