import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAppointment,
  fetchDoctors,
  fetchSchedulingAppointments,
  updateAppointmentStatus,
  type AppointmentFilters,
  type DoctorFilters,
} from "./api";
import { useAuth } from "@/context/AuthContext";

type QueryOptions = {
  enabled?: boolean;
};

export const useAppointments = (
  filters: AppointmentFilters = {},
  options: QueryOptions = {}
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["appointments", filters],
    queryFn: () => fetchSchedulingAppointments(filters),
    enabled: isAuthenticated && (options.enabled ?? true),
  });
};

export const useDoctors = (
  filters: DoctorFilters = {},
  options: QueryOptions = {}
) => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["doctors", filters],
    queryFn: () => fetchDoctors(filters),
    enabled: isAuthenticated && (options.enabled ?? true),
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};