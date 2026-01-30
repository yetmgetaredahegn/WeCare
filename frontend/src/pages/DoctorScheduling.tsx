import { useState } from "react";
import axios from "axios";
import {
    useAppointments,
    useUpdateAppointmentStatus,
} from "@/features/scheduling/queries";
import type { AppointmentStatus } from "@/features/scheduling/api";

const PAGE_SIZE = 10;

const getErrorMessage = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === "string") return data;
        if (data?.detail) return data.detail;
        if (data && typeof data === "object") {
            const firstKey = Object.keys(data)[0];
            if (firstKey) {
                const value = (data as Record<string, string[] | string>)[firstKey];
                return Array.isArray(value) ? value[0] : value;
            }
        }
    }
    return "Something went wrong. Please try again.";
};

const DoctorScheduling = () => {
    const [appointmentsPage, setAppointmentsPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<"" | AppointmentStatus>("");
    const [scheduleDate, setScheduleDate] = useState("");

    const appointmentsQuery = useAppointments({
        page: appointmentsPage,
        pageSize: PAGE_SIZE,
        status: statusFilter || undefined,
        scheduleDate: scheduleDate || undefined,
    });

    const updateAppointmentMutation = useUpdateAppointmentStatus();

    const appointmentTotalPages = Math.max(
        1,
        Math.ceil((appointmentsQuery.data?.count ?? 0) / PAGE_SIZE)
    );

    const handleStatusUpdate = (id: number, status: AppointmentStatus) => {
        updateAppointmentMutation.mutate({ id, status });
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-10 space-y-10">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Doctor Scheduling
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    Confirm or cancel patient appointments and review upcoming visits.
                </p>
            </header>

            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Appointments
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <select
                            value={statusFilter}
                            onChange={(event) => {
                                setStatusFilter(event.target.value as AppointmentStatus | "");
                                setAppointmentsPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        >
                            <option value="">All statuses</option>
                            <option value="P">Pending</option>
                            <option value="C">Confirmed</option>
                            <option value="X">Cancelled</option>
                        </select>
                        <input
                            type="date"
                            value={scheduleDate}
                            onChange={(event) => {
                                setScheduleDate(event.target.value);
                                setAppointmentsPage(1);
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                        />
                    </div>
                </div>

                {appointmentsQuery.isLoading ? (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        Loading appointments...
                    </p>
                ) : appointmentsQuery.isError ? (
                    <p className="mt-4 text-sm text-rose-600">
                        {getErrorMessage(appointmentsQuery.error)}
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="text-left text-slate-500 dark:text-slate-400">
                                <tr>
                                    <th className="py-2 pr-4">Patient</th>
                                    <th className="py-2 pr-4">Date</th>
                                    <th className="py-2 pr-4">Time</th>
                                    <th className="py-2 pr-4">Status</th>
                                    <th className="py-2 pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700 dark:text-slate-200">
                                {appointmentsQuery.data?.results.map((appointment) => (
                                    <tr
                                        key={appointment.id}
                                        className="border-t border-slate-200 dark:border-slate-800"
                                    >
                                        <td className="py-3 pr-4">Patient #{appointment.patient_id}</td>
                                        <td className="py-3 pr-4">{appointment.schedule_date}</td>
                                        <td className="py-3 pr-4">
                                            {appointment.schedule_time.slice(0, 5)}
                                        </td>
                                        <td className="py-3 pr-4">
                                            {appointment.status === "P"
                                                ? "Pending"
                                                : appointment.status === "C"
                                                    ? "Confirmed"
                                                    : "Cancelled"}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleStatusUpdate(appointment.id, "C")}
                                                    disabled={
                                                        appointment.status !== "P" ||
                                                        updateAppointmentMutation.isPending
                                                    }
                                                    className="rounded-md border border-emerald-500 px-3 py-1 text-xs font-semibold text-emerald-600 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-950"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleStatusUpdate(appointment.id, "X")}
                                                    disabled={
                                                        appointment.status === "X" ||
                                                        updateAppointmentMutation.isPending
                                                    }
                                                    className="rounded-md border border-rose-500 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400 dark:text-rose-200 dark:hover:bg-rose-950"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {updateAppointmentMutation.isError && (
                    <p className="mt-3 text-sm text-rose-600">
                        {getErrorMessage(updateAppointmentMutation.error)}
                    </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-2">
                    {Array.from({ length: appointmentTotalPages }, (_, index) => index + 1).map(
                        (page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setAppointmentsPage(page)}
                                className={`h-9 w-9 rounded-md text-sm font-semibold ${page === appointmentsPage
                                        ? "bg-cyan-600 text-white"
                                        : "border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default DoctorScheduling;