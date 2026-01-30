import { api, getAuthHeader } from "@/lib/api";

export type UserRole = "patient" | "doctor";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_patient: boolean;
  is_doctor: boolean;
  avatar?: string | null;
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

export type PatientProfile = {
  id: number;
  user_id: number;
  age: number | null;
  phone: string;
};

export type DoctorProfile = {
  id: number;
  user?: string;
  user_id: number;
  specialization: string;
  bio: string;
  available_days?: string[];
};

export const updateMe = async (payload: FormData | Partial<Pick<User, "first_name" | "last_name">>): Promise<User> => {
  const isFormData = payload instanceof FormData;
  const response = await api.patch("/auth/users/me/", payload, {
    headers: {
      ...getAuthHeader(),
      ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}),
    },
  });
  return response.data;
};

export const setEmail = async (newEmail: string, currentPassword: string) => {
  const response = await api.post(
    "/auth/users/set_email/",
    {
      new_email: newEmail,
      current_password: currentPassword,
    },
    { headers: getAuthHeader() }
  );
  return response.data;
};

export const fetchPatientProfile = async (): Promise<PatientProfile> => {
  const response = await api.get("/users/patient/profile/", {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updatePatientProfile = async (
  payload: Partial<Pick<PatientProfile, "age" | "phone">>
): Promise<PatientProfile> => {
  const response = await api.patch("/users/patient/profile/", payload, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const fetchDoctorProfile = async (): Promise<DoctorProfile> => {
  const response = await api.get("/users/doctor/profile/", {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateDoctorProfile = async (
  payload: Partial<Pick<DoctorProfile, "specialization" | "bio">>
): Promise<DoctorProfile> => {
  const response = await api.patch("/users/doctor/profile/", payload, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const fetchDoctorsList = async (): Promise<DoctorProfile[]> => {
  const response = await api.get("/users/doctor/list_of_doctors/", {
    headers: getAuthHeader(),
  });

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return response.data?.results ?? [];
};


