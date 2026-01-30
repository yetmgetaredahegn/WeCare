import { useMemo, useState, type FormEvent } from "react";
import axios from "axios";
import {
    useAppointments,
    useCreateAppointment,
    useDoctors,
    useUpdateAppointmentStatus,
} from "@/features/scheduling/queries";

const PAGE_SIZE = 10;
const AVAILABILITY_PAGE_SIZE = 100;
const DAY_OPTIONS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

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

const PatientScheduling = () => {
    const [doctorPage, setDoctorPage] = useState(1);
    const [appointmentsPage, setAppointmentsPage] = useState(1);
    const [availableDay, setAvailableDay] = useState("");
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");

    const doctorsQuery = useDoctors({
        page: doctorPage,
        pageSize: PAGE_SIZE,
        availableDay: availableDay || undefined,
    });

    const appointmentsQuery = useAppointments({
        page: appointmentsPage,
        pageSize: PAGE_SIZE,
    });

    const availabilityQuery = useAppointments(
        {
            page: 1,
            pageSize: AVAILABILITY_PAGE_SIZE,
            doctorId: selectedDoctorId ?? undefined,
            scheduleDate: scheduleDate || undefined,
        },
        {
            enabled: !!selectedDoctorId && !!scheduleDate,
        }
    );

    const createAppointmentMutation = useCreateAppointment();
    const updateAppointmentMutation = useUpdateAppointmentStatus();

    const bookedTimes = useMemo(() => {
        const appointments = availabilityQuery.data?.results ?? [];
        return new Set(
            appointments
                .filter((appointment) => appointment.status === "P" || appointment.status === "C")
                .map((appointment) => appointment.schedule_time.slice(0, 5))
        );
    }, [availabilityQuery.data?.results]);

    const doctorTotalPages = Math.max(
        1,
        Math.ceil((doctorsQuery.data?.count ?? 0) / PAGE_SIZE)
    );

    const appointmentTotalPages = Math.max(
        1,
        Math.ceil((appointmentsQuery.data?.count ?? 0) / PAGE_SIZE)
    );

    const isSelectedTimeBooked = scheduleTime
        ? bookedTimes.has(scheduleTime.slice(0, 5))
        : false;

    const handleCreateAppointment = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedDoctorId || !scheduleDate || !scheduleTime) {
            return;
        }

        createAppointmentMutation.mutate({
            doctor_id: selectedDoctorId,
            schedule_date: scheduleDate,
            schedule_time: scheduleTime,
        });
    };

    const handleCancelAppointment = (id: number) => {
        updateAppointmentMutation.mutate({ id, status: "X" });
    };

    return (
        <section className="mx-auto max-w-6xl px-6 py-10 space-y-10">
            <header className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    Patient Scheduling
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                    Choose a doctor, check availability, and book your appointment.
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                Doctors
                            </h2>
                            <select
                                value={availableDay}
                                onChange={(event) => {
                                    setAvailableDay(event.target.value);
                                    setDoctorPage(1);
                                }}
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                            >
                                <option value="">All days</option>
                                {DAY_OPTIONS.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {doctorsQuery.isLoading ? (
                            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                                Loading doctors...
                            </p>
                        ) : doctorsQuery.isError ? (
                            <p className="mt-6 text-sm text-rose-600">
                                {getErrorMessage(doctorsQuery.error)}
                            </p>
                        ) : (
                            <div className="mt-6 space-y-4">
                                {doctorsQuery.data?.results.map((doctor) => (
                                    <div
                                        key={doctor.id}
                                        className={`rounded-lg border p-4 transition ${selectedDoctorId === doctor.id
                                                ? "border-cyan-500 bg-cyan-50/50 dark:border-cyan-400/60 dark:bg-cyan-950/40"
                                                : "border-slate-200 dark:border-slate-800"
                                            }`}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-100">
                                                    {doctor.user}
                                                </p>
                                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                                    {doctor.specialization || "General Practitioner"}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedDoctorId(doctor.id)}
                                                className="rounded-lg border border-cyan-600 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-200 dark:hover:bg-cyan-950"
                                            >
                                                {selectedDoctorId === doctor.id ? "Selected" : "Select"}
                                            </button>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            {doctor.bio || "Experienced clinician available for appointments."}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {doctor.available_days.map((day) => (
                                                <span
                                                    key={day}
                                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                                >
                                                    {day}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            {Array.from({ length: doctorTotalPages }, (_, index) => index + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setDoctorPage(page)}
                                        className={`h-9 w-9 rounded-md text-sm font-semibold ${page === doctorPage
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
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            Book an appointment
                        </h2>

                        <form className="mt-4 space-y-4" onSubmit={handleCreateAppointment}>
                            <div>
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Selected doctor
                                </label>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    {selectedDoctorId
                                        ? `Doctor ID: ${selectedDoctorId}`
                                        : "Select a doctor from the list."}
                                </p>
                            </div>

                            <div className="grid gap-3">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={scheduleDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(event) => setScheduleDate(event.target.value)}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                                />
                            </div>

                            <div className="grid gap-3">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Time
                                </label>
                                <input
                                    type="time"
                                    value={scheduleTime}
                                    onChange={(event) => setScheduleTime(event.target.value)}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                                />
                            </div>

                            {availabilityQuery.isFetching && (
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Checking availability...
                                </p>
                            )}

                            {selectedDoctorId && scheduleDate && (
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                                    {bookedTimes.size > 0 ? (
                                        <div className="space-y-2">
                                            <p className="font-medium">Booked times</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(bookedTimes).map((time) => (
                                                    <span
                                                        key={time}
                                                        className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-600 dark:bg-rose-950/40 dark:text-rose-200"
                                                    >
                                                        {time}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No bookings for this date. You can select any time.</p>
                                    )}
                                </div>
                            )}

                            {isSelectedTimeBooked && (
                                <p className="text-sm text-rose-600">
                                    This time slot is already booked. Please choose another time.
                                </p>
                            )}

                            {createAppointmentMutation.isError && (
                                <p className="text-sm text-rose-600">
                                    {getErrorMessage(createAppointmentMutation.error)}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    !selectedDoctorId ||
                                    !scheduleDate ||
                                    !scheduleTime ||
                                    isSelectedTimeBooked ||
                                    createAppointmentMutation.isPending
                                }
                                className="w-full rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {createAppointmentMutation.isPending
                                    ? "Booking..."
                                    : "Book appointment"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Your appointments
                    </h2>
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
                                    <th className="py-2 pr-4">Doctor</th>
                                    <th className="py-2 pr-4">Date</th>
                                    <th className="py-2 pr-4">Time</th>
                                    <th className="py-2 pr-4">Status</th>
                                    <th className="py-2 pr-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700 dark:text-slate-200">
                                {appointmentsQuery.data?.results.map((appointment) => (
                                    <tr key={appointment.id} className="border-t border-slate-200 dark:border-slate-800">
                                        <td className="py-3 pr-4">Doctor #{appointment.doctor_id}</td>
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
                                            <button
                                                type="button"
                                                onClick={() => handleCancelAppointment(appointment.id)}
                                                disabled={
                                                    appointment.status === "X" ||
                                                    updateAppointmentMutation.isPending
                                                }
                                                className="rounded-md border border-rose-500 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400 dark:text-rose-200 dark:hover:bg-rose-950"
                                            >
                                                Cancel
                                            </button>
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

export default PatientScheduling;