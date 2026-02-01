import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ProtectedNotice from "@/components/ui/ProtectedNotice";
import Toast, { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/context/AuthContext";
import {
    useCreateMedicalRecord,
    useCreatePrescription,
    useDiagnoses,
    useDoctorPatients,
    useMedicalRecords,
    usePrescriptions,
} from "@/features/clinical/queries";
import type { PatientOrder } from "@/features/clinical/api";

const DoctorClinical = () => {
    const { isAuthenticated, role } = useAuth();
    const { toast, showToast, clearToast } = useToast();

    const [patientOrder, setPatientOrder] = useState<PatientOrder>("alpha");
    const [selectedPatientId, setSelectedPatientId] = useState<number | "">("");
    const [selectedDiagnosisId, setSelectedDiagnosisId] = useState<number | "">("");
    const [selectedRecordId, setSelectedRecordId] = useState<number | null>(null);
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [duration, setDuration] = useState("");

    const {
        data: patients,
        isLoading: isPatientsLoading,
        error: patientsError,
    } = useDoctorPatients(patientOrder);
    const {
        data: diagnoses,
        isLoading: isDiagnosesLoading,
        error: diagnosesError,
    } = useDiagnoses();
    const {
        data: records,
        isLoading: isRecordsLoading,
        error: recordsError,
    } = useMedicalRecords();
    const {
        data: prescriptions,
        isLoading: isPrescriptionsLoading,
        error: prescriptionsError,
    } = usePrescriptions(selectedRecordId);

    const createRecordMutation = useCreateMedicalRecord();
    const createPrescriptionMutation = useCreatePrescription();

    const patientMap = useMemo(() => {
        const map = new Map<number, string>();
        patients?.forEach((patient) => {
            map.set(patient.id, patient.full_name || `Patient #${patient.id}`);
        });
        return map;
    }, [patients]);

    const getErrorMessage = (error: unknown, fallback: string) => {
        if (axios.isAxiosError(error)) {
            return (
                error.response?.data?.detail ||
                error.response?.data?.message ||
                fallback
            );
        }
        return fallback;
    };

    useEffect(() => {
        if (patientsError) {
            showToast(getErrorMessage(patientsError, "Unable to load patients."), "error");
        }
    }, [patientsError, showToast]);

    useEffect(() => {
        if (diagnosesError) {
            showToast(getErrorMessage(diagnosesError, "Unable to load diagnoses."), "error");
        }
    }, [diagnosesError, showToast]);

    useEffect(() => {
        if (recordsError) {
            showToast(getErrorMessage(recordsError, "Unable to load medical records."), "error");
        }
    }, [recordsError, showToast]);

    useEffect(() => {
        if (prescriptionsError) {
            showToast(
                getErrorMessage(prescriptionsError, "Unable to load prescriptions."),
                "error"
            );
        }
    }, [prescriptionsError, showToast]);

    if (!isAuthenticated || role !== "doctor") {
        return <ProtectedNotice />;
    }

    const handleCreateRecord = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedPatientId || !selectedDiagnosisId) {
            showToast("Please select a patient and diagnosis.", "error");
            return;
        }

        createRecordMutation.mutate(
            {
                patient: Number(selectedPatientId),
                diagnosis: Number(selectedDiagnosisId),
            },
            {
                onSuccess: () => {
                    showToast("Medical record created successfully.", "success");
                    setSelectedDiagnosisId("");
                },
                onError: (error) => {
                    showToast(
                        getErrorMessage(error, "Failed to create medical record."),
                        "error"
                    );
                },
            }
        );
    };

    const handleCreatePrescription = (event: React.FormEvent) => {
        event.preventDefault();

        if (!selectedRecordId) {
            showToast("Select a medical record first.", "error");
            return;
        }

        if (!medicationName || !dosage || !duration) {
            showToast("Fill in all prescription fields.", "error");
            return;
        }

        createPrescriptionMutation.mutate(
            {
                medicalRecordId: selectedRecordId,
                payload: {
                    medication_name: medicationName,
                    dosage,
                    duration,
                },
            },
            {
                onSuccess: () => {
                    showToast("Prescription added.", "success");
                    setMedicationName("");
                    setDosage("");
                    setDuration("");
                },
                onError: (error) => {
                    showToast(
                        getErrorMessage(error, "Failed to add prescription."),
                        "error"
                    );
                },
            }
        );
    };

    return (
        <div className="space-y-10">
            <Toast toast={toast} onClose={clearToast} />

            <section className="bg-white rounded-xl shadow-sm p-6 space-y-4 dark:bg-black">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Create Medical Record</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Select a patient tied to your appointments and assign a diagnosis.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <label htmlFor="patient-order" className="text-slate-600 dark:text-slate-400">
                            Order by
                        </label>
                        <select
                            id="patient-order"
                            value={patientOrder}
                            onChange={(event) => setPatientOrder(event.target.value as PatientOrder)}
                            className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                        >
                            <option value="alpha">Alphabetical</option>
                            <option value="recent">Most recent</option>
                        </select>
                    </div>
                </div>

                <form onSubmit={handleCreateRecord} className="grid gap-4 md:grid-cols-3">
                    <select
                        value={selectedPatientId}
                        onChange={(event) =>
                            setSelectedPatientId(event.target.value ? Number(event.target.value) : "")
                        }
                        className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                    >
                        <option className="dark:bg-slate-950" value="">Select patient</option>
                        {isPatientsLoading && <option>Loading patients...</option>}
                        {patients?.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.full_name} · {patient.gender || "Unknown"} · {patient.email}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedDiagnosisId}
                        onChange={(event) =>
                            setSelectedDiagnosisId(event.target.value ? Number(event.target.value) : "")
                        }
                        className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                    >
                        <option value="">Select diagnosis</option>
                        {isDiagnosesLoading && <option>Loading diagnoses...</option>}
                        {diagnoses?.map((diagnosis) => (
                            <option key={diagnosis.id} value={diagnosis.id}>
                                {diagnosis.name} ({diagnosis.code})
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="bg-cyan-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-cyan-700 disabled:opacity-60 dark:bg-cyan-700 dark:hover:bg-cyan-800"
                        disabled={createRecordMutation.isPending}
                    >
                        {createRecordMutation.isPending ? "Saving..." : "Create record"}
                    </button>
                </form>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 space-y-4 dark:bg-black">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Medical Records</h2>
                {isRecordsLoading && <p className="text-sm text-slate-500 dark:text-slate-400">Loading records...</p>}
                {!isRecordsLoading && (!records || records.length === 0) && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No medical records available.</p>
                )}

                <div className="grid gap-3">
                    {records?.map((record) => (
                        <button
                            key={record.id}
                            type="button"
                            onClick={() => setSelectedRecordId(record.id)}
                            className={`border rounded-lg p-4 text-left transition ${selectedRecordId === record.id
                                    ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900"
                                    : "border-slate-200 hover:border-cyan-200 dark:border-slate-700 dark:hover:border-cyan-700"
                                }`}
                        >
                            <div className="flex flex-wrap justify-between gap-2">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {record.diagnosis?.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Patient: {patientMap.get(record.patient ?? 0) || `Patient #${record.patient}`}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                    {new Date(record.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 space-y-4 dark:bg-black">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Prescriptions</h2>
                {!selectedRecordId && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">Select a medical record to view prescriptions.</p>
                )}

                {selectedRecordId && (
                    <>
                        {isPrescriptionsLoading && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">Loading prescriptions...</p>
                        )}
                        {!isPrescriptionsLoading && prescriptions?.length === 0 && (
                            <p className="text-sm text-slate-500 dark:text-slate-400">No prescriptions yet.</p>
                        )}
                        <ul className="space-y-2">
                            {prescriptions?.map((prescription) => (
                                <li key={prescription.id} className="border rounded-md p-3">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {prescription.medication_name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {prescription.dosage} · {prescription.duration}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <form onSubmit={handleCreatePrescription} className="grid gap-3 md:grid-cols-4">
                            <input
                                value={medicationName}
                                onChange={(event) => setMedicationName(event.target.value)}
                                placeholder="Medication name"
                                className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                            />
                            <input
                                value={dosage}
                                onChange={(event) => setDosage(event.target.value)}
                                placeholder="Dosage"
                                className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                            />
                            <input
                                value={duration}
                                onChange={(event) => setDuration(event.target.value)}
                                placeholder="Duration"
                                className="border border-slate-200 rounded-md px-3 py-2 text-sm dark:border-slate-700 dark:bg-black dark:text-slate-100"
                            />
                            <button
                                type="submit"
                                className="bg-emerald-600 text-white rounded-md px-4 py-2 text-sm font-semibold  hover:bg-emerald-700 disabled:opacity-60 dark:bg-emerald-700 dark:hover:bg-emerald-800"
                                disabled={createPrescriptionMutation.isPending}
                            >
                                {createPrescriptionMutation.isPending ? "Saving..." : "Add prescription"}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </div>
    );
};

export default DoctorClinical;