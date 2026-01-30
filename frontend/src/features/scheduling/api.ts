import { api, getAuthHeader } from "@/lib/api";

export type AppointmentStatus = "P" | "C" | "X";

export type Appointment = {
  id: number;
  patient_id: number | null;
  doctor_id: number | null;
  schedule_date: string;
  schedule_time: string;
  status: AppointmentStatus;
};

export type DoctorProfile = {
  id: number;
  user: string;
  user_id: number;
  specialization: string;
  bio: string;
  available_days: string[];
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type AppointmentFilters = {
  page?: number;
  pageSize?: number;
  doctorId?: number;
  scheduleDate?: string;
  status?: AppointmentStatus;
};

export type DoctorFilters = {
  page?: number;
  pageSize?: number;
  availableDay?: string;
};

export type CreateAppointmentPayload = {
  doctor_id: number;
  schedule_date: string;
  schedule_time: string;
};

export type UpdateAppointmentPayload = {
  id: number;
  status: AppointmentStatus;
};

export const fetchSchedulingAppointments = async (
  filters: AppointmentFilters = {}
): Promise<PaginatedResponse<Appointment>> => {
  const params: Record<string, string | number | undefined> = {
    page: filters.page,
    page_size: filters.pageSize,
    doctor: filters.doctorId,
    schedule_date: filters.scheduleDate,
    status: filters.status,
  };

  const response = await api.get("/scheduling/appointments/", {
    headers: getAuthHeader(),
    params,
  });
  return response.data;
};

export const fetchDoctors = async (
  filters: DoctorFilters = {}
): Promise<PaginatedResponse<DoctorProfile>> => {
  const params: Record<string, string | number | undefined> = {
    page: filters.page,
    page_size: filters.pageSize,
    available_days: filters.availableDay,
  };

  const response = await api.get("/users/doctor/list_of_doctors/", {
    headers: getAuthHeader(),
    params,
  });

  return response.data;
};

export const createAppointment = async (
  payload: CreateAppointmentPayload
): Promise<Appointment> => {
  const response = await api.post("/scheduling/appointments/", payload, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateAppointmentStatus = async (
  payload: UpdateAppointmentPayload
): Promise<Appointment> => {
  const response = await api.patch(
    `/scheduling/appointments/${payload.id}/`,
    { status: payload.status },
    {
      headers: getAuthHeader(),
    }
  );
  return response.data;
};