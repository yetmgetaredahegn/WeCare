import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import {
    fetchDoctorProfile,
    fetchPatientProfile,
    setEmail,
    updateDoctorProfile,
    updateMe,
    updatePatientProfile,
} from "@/features/auth/api";

const MAX_AVATAR_SIZE = 5 * 1024 * 1024;
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Profile = () => {
    const { user, role, isUserLoading, refreshUser } = useAuth();
    const queryClient = useQueryClient();
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarObjectUrl, setAvatarObjectUrl] = useState<string | null>(null);

    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [bio, setBio] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [emailSuccess, setEmailSuccess] = useState<string | null>(null);

    const resolveAvatarUrl = (avatar?: string | null) => {
        if (!avatar) return null;
        if (avatar.startsWith("http")) return avatar;
        return `${api.defaults.baseURL ?? ""}${avatar}`;
    };

    useEffect(() => {
        if (!user) return;
        setFirstName(user.first_name ?? "");
        setLastName(user.last_name ?? "");
        setAvatarPreview(resolveAvatarUrl(user.avatar));
    }, [user]);

    useEffect(() => {
        if (!user || !role) return;
        setProfileLoading(true);
        setProfileError(null);

        const load = async () => {
            try {
                if (role === "patient") {
                    const profile = await fetchPatientProfile();
                    setAge(profile.age !== null ? String(profile.age) : "");
                    setPhone(profile.phone ?? "");
                }

                if (role === "doctor") {
                    const profile = await fetchDoctorProfile();
                    setSpecialization(profile.specialization ?? "");
                    setBio(profile.bio ?? "");
                }
            } catch (error) {
                setProfileError("Failed to load role profile.");
            } finally {
                setProfileLoading(false);
            }
        };

        void load();
    }, [user, role]);

    useEffect(() => {
        return () => {
            if (avatarObjectUrl) {
                URL.revokeObjectURL(avatarObjectUrl);
            }
        };
    }, [avatarObjectUrl]);

    const avatarSrc = useMemo(() => avatarPreview, [avatarPreview]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
            setSaveError("Avatar must be a jpg, png, or webp image.");
            return;
        }

        if (file.size > MAX_AVATAR_SIZE) {
            setSaveError("Avatar size must be 5MB or less.");
            return;
        }

        if (avatarObjectUrl) {
            URL.revokeObjectURL(avatarObjectUrl);
        }

        const objectUrl = URL.createObjectURL(file);
        setAvatarObjectUrl(objectUrl);
        setAvatarPreview(objectUrl);
        setAvatarFile(file);
    };

    const handleSave = async () => {
        if (!user || !role) return;
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(null);

        try {
            const tasks: Promise<unknown>[] = [];
            const formData = new FormData();
            formData.append("first_name", firstName.trim());
            formData.append("last_name", lastName.trim());
            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            tasks.push(updateMe(formData));

            if (role === "patient") {
                const parsedAge = age.trim() ? Number(age) : null;
                if (parsedAge !== null && Number.isNaN(parsedAge)) {
                    throw new Error("Age must be a valid number.");
                }
                tasks.push(
                    updatePatientProfile({
                        age: parsedAge,
                        phone: phone.trim(),
                    })
                );
            }

            if (role === "doctor") {
                tasks.push(
                    updateDoctorProfile({
                        specialization: specialization.trim(),
                        bio: bio.trim(),
                    })
                );
            }

            await Promise.all(tasks);
            await refreshUser();
            await queryClient.invalidateQueries({ queryKey: ["me"] });
            setSaveSuccess("Profile updated.");
            setAvatarFile(null);
        } catch (error) {
            setSaveError("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleEmailUpdate = async () => {
        if (!newEmail.trim() || !currentPassword) {
            setEmailError("Provide a new email and current password.");
            return;
        }

        setEmailError(null);
        setEmailSuccess(null);

        try {
            await setEmail(newEmail.trim(), currentPassword);
            setEmailSuccess("Email update requested. Check your inbox.");
            setNewEmail("");
            setCurrentPassword("");
        } catch (error) {
            setEmailError("Failed to update email.");
        }
    };

    if (isUserLoading || profileLoading) {
        return (
            <div className="flex justify-center px-4 sm:px-6">
                <p className="mt-16 text-gray-500 dark:text-slate-400">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center px-4 sm:px-6">
                <p className="mt-16 text-gray-500 dark:text-slate-400">No profile data found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
            <div className="mt-10 mb-10 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-gray-800">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-20 w-20 overflow-hidden rounded-full border bg-slate-100 dark:border-slate-700 dark:bg-slate-700">
                            {avatarSrc ? (
                                <img src={avatarSrc} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-slate-500 dark:text-slate-300">
                                    {user.first_name?.[0] ?? "U"}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Profile</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Role: {user.role ?? "Unknown"}</p>
                        </div>
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700">
                        <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleAvatarChange} />
                        Change avatar
                    </label>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                        <label className="text-sm text-slate-600 dark:text-slate-300">First name</label>
                        <input
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-600 dark:text-slate-300">Last name</label>
                        <input
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {role === "patient" && (
                        <>
                            <div>
                                <label className="text-sm text-slate-600 dark:text-slate-300">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(event) => setAge(event.target.value)}
                                    className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-600 dark:text-slate-300">Phone</label>
                                <input
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                                />
                            </div>
                        </>
                    )}
                    {role === "doctor" && (
                        <>
                            <div>
                                <label className="text-sm text-slate-600 dark:text-slate-300">Specialization</label>
                                <input
                                    value={specialization}
                                    onChange={(event) => setSpecialization(event.target.value)}
                                    className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-600 dark:text-slate-300">Bio</label>
                                <textarea
                                    value={bio}
                                    onChange={(event) => setBio(event.target.value)}
                                    className="mt-2 min-h-24 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                                />
                            </div>
                        </>
                    )}
                </div>

                {profileError && (
                    <p className="mt-4 text-sm text-red-500">{profileError}</p>
                )}
                {saveError && (
                    <p className="mt-4 text-sm text-red-500">{saveError}</p>
                )}
                {saveSuccess && (
                    <p className="mt-4 text-sm text-emerald-600">{saveSuccess}</p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:opacity-60"
                    >
                        {isSaving ? "Saving..." : "Save profile"}
                    </button>
                </div>
            </div>

            <div className="mb-12 rounded-2xl border bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Change email</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Email updates require your current password.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-sm text-slate-600 dark:text-slate-300">New email</label>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(event) => setNewEmail(event.target.value)}
                            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-slate-600 dark:text-slate-300">Current password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>
                </div>
                {emailError && <p className="mt-3 text-sm text-red-500">{emailError}</p>}
                {emailSuccess && <p className="mt-3 text-sm text-emerald-600">{emailSuccess}</p>}
                <button
                    type="button"
                    onClick={handleEmailUpdate}
                    className="mt-4 rounded-lg border px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                    Update email
                </button>
            </div>
        </div>
    );
};

export default Profile;