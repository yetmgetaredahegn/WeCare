import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createMedicalRecord,
	createPrescription,
	fetchDiagnoses,
	fetchDoctorPatients,
	fetchMedicalRecords,
	fetchPrescriptions,
	type CreateMedicalRecordPayload,
	type CreatePrescriptionPayload,
	type PatientOrder,
} from "./api";
import { useAuth } from "@/context/AuthContext";

type QueryOptions = {
	enabled?: boolean;
};

export const useDiagnoses = (options: QueryOptions = {}) => {
	const { isAuthenticated, role } = useAuth();

	return useQuery({
		queryKey: ["clinical", "diagnoses"],
		queryFn: fetchDiagnoses,
		enabled: isAuthenticated && role === "doctor" && (options.enabled ?? true),
	});
};

export const useMedicalRecords = (options: QueryOptions = {}) => {
	const { isAuthenticated } = useAuth();

	return useQuery({
		queryKey: ["clinical", "medical-records"],
		queryFn: fetchMedicalRecords,
		enabled: isAuthenticated && (options.enabled ?? true),
	});
};

export const usePrescriptions = (
	medicalRecordId: number | null,
	options: QueryOptions = {}
) => {
	const { isAuthenticated } = useAuth();

	return useQuery({
		queryKey: ["clinical", "prescriptions", medicalRecordId],
		queryFn: () => fetchPrescriptions(medicalRecordId as number),
		enabled:
			isAuthenticated && !!medicalRecordId && (options.enabled ?? true),
	});
};

export const useDoctorPatients = (
	order: PatientOrder = "alpha",
	options: QueryOptions = {}
) => {
	const { isAuthenticated, role } = useAuth();

	return useQuery({
		queryKey: ["clinical", "doctor-patients", order],
		queryFn: () => fetchDoctorPatients(order),
		enabled: isAuthenticated && role === "doctor" && (options.enabled ?? true),
	});
};

export const useCreateMedicalRecord = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: CreateMedicalRecordPayload) =>
			createMedicalRecord(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["clinical", "medical-records"],
			});
		},
	});
};

export const useCreatePrescription = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			medicalRecordId,
			payload,
		}: {
			medicalRecordId: number;
			payload: CreatePrescriptionPayload;
		}) => createPrescription(medicalRecordId, payload),
		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["clinical", "prescriptions", variables.medicalRecordId],
			});
		},
	});
};
