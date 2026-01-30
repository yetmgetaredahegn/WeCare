import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDoctorsList, type DoctorProfile } from "@/features/auth/api";
import { useAuth } from "@/context/AuthContext";

const shortcuts = [
    {
        title: "Profile",
        description: "Update your details and avatar.",
        to: "/profile",
    },
    {
        title: "Docs",
        description: "View your clinical documents.",
        to: "/clinical",
    },
    {
        title: "Settings",
        description: "Manage account preferences.",
        to: "/profile",
    },
];

const PatientUser = () => {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState<DoctorProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const list = await fetchDoctorsList();
                if (isMounted) {
                    setDoctors(list);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Failed to load doctors.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        void load();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome{user ? `, ${user.first_name}` : ""}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Quick access to your profile and available doctors.</p>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
                {shortcuts.map((shortcut) => (
                    <Link
                        key={shortcut.title}
                        to={shortcut.to}
                        className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{shortcut.title}</h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{shortcut.description}</p>
                    </Link>
                ))}
            </section>

            <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Available doctors</h2>
                {loading ? (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Loading doctors...</p>
                ) : error ? (
                    <p className="mt-4 text-sm text-red-500">{error}</p>
                ) : doctors.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">No doctors available right now.</p>
                ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="rounded-xl border p-4 dark:border-slate-800">
                                <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{doctor.user || "Doctor"}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{doctor.specialization || "General"}</p>
                                {doctor.available_days && doctor.available_days.length > 0 && (
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                        Available: {doctor.available_days.join(", ")}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default PatientUser;