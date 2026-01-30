import { api, getAuthHeader } from "@/lib/api";

export type Diagnosis = {
	id: number;
	name: string;
	code: string;
	description: string;
};

export type MedicalRecord = {
	id: number;
	patient: number | null;
	diagnosis: Diagnosis;
	created_at: string;
};

export type CreateMedicalRecordPayload = {
	patient: number;
	diagnosis: number;
};

export type Prescription = {
	id: number;
	medication_name: string;
	dosage: string;
	duration: string;
};

export type CreatePrescriptionPayload = {
	medication_name: string;
	dosage: string;
	duration: string;
};

export type DoctorPatientSummary = {
	id: number;
	full_name: string;
	gender: string;
	email: string;
};

export type PatientOrder = "alpha" | "recent";

export const fetchDiagnoses = async (): Promise<Diagnosis[]> => {
	const response = await api.get("/clinical/diagnoses/", {
		headers: getAuthHeader(),
	});
	return response.data;
};

export const fetchMedicalRecords = async (): Promise<MedicalRecord[]> => {
	const response = await api.get("/clinical/medical_records/", {
		headers: getAuthHeader(),
	});
	return response.data;
};

export const createMedicalRecord = async (
	payload: CreateMedicalRecordPayload
): Promise<MedicalRecord> => {
	const response = await api.post("/clinical/medical_records/", payload, {
		headers: getAuthHeader(),
	});
	return response.data;
};

export const fetchPrescriptions = async (
	medicalRecordId: number
): Promise<Prescription[]> => {
	const response = await api.get(
		`/clinical/medical_records/${medicalRecordId}/prescriptions/`,
		{
			headers: getAuthHeader(),
		}
	);
	return response.data;
};

export const createPrescription = async (
	medicalRecordId: number,
	payload: CreatePrescriptionPayload
): Promise<Prescription> => {
	const response = await api.post(
		`/clinical/medical_records/${medicalRecordId}/prescriptions/`,
		payload,
		{
			headers: getAuthHeader(),
		}
	);
	return response.data;
};

export const fetchDoctorPatients = async (
	order: PatientOrder = "alpha"
): Promise<DoctorPatientSummary[]> => {
	const response = await api.get("/scheduling/appointments/patients/", {
		headers: getAuthHeader(),
		params: { order },
	});
	return response.data;
};
