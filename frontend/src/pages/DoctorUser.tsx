import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDoctorProfile, type DoctorProfile } from "@/features/auth/api";
import { useAuth } from "@/context/AuthContext";

const shortcuts = [
    {
        title: "Profile",
        description: "Update your details and avatar.",
        to: "/profile",
    },
    {
        title: "Docs",
        description: "Review clinical documents.",
        to: "/clinical",
    },
    {
        title: "Settings",
        description: "Manage account preferences.",
        to: "/profile",
    },
];

const DoctorUser = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<DoctorProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const data = await fetchDoctorProfile();
                if (isMounted) {
                    setProfile(data);
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
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome{user ? `, Dr ${user.first_name}` : ""}</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-300">Manage your profile, documents, and settings.</p>
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
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your profile snapshot</h2>
                {loading ? (
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading profile...</p>
                ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Specialization</p>
                            <p className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.specialization || "Not set"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Bio</p>
                            <p className="text-base font-medium text-slate-900 dark:text-slate-100">{profile?.bio || "Not set"}</p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default DoctorUser;