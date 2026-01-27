import { useMe } from "@/features/auth/queries";

const Profile = () => {
    const { data: user, isLoading } = useMe();

    if (isLoading) {
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
        <div className="flex justify-center px-4 sm:px-6">
            <div className="w-full max-w-md mt-12 mb-10 p-6 sm:p-7 border rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-slate-700">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Profile</h2>

                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="text-slate-500 dark:text-slate-400">First Name</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{user.first_name}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="text-slate-500 dark:text-slate-400">Last Name</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{user.last_name}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="text-slate-500 dark:text-slate-400">Email</span>
                        <span className="font-medium text-slate-900 dark:text-slate-100 break-words">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;