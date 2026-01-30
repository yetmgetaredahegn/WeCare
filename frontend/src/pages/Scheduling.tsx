import { useAuth } from "@/context/AuthContext";
import PatientScheduling from "./PatientScheduling";
import DoctorScheduling from "./DoctorScheduling";

const Scheduling = () => {
  const { role, isUserLoading } = useAuth();

  if (isUserLoading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center text-slate-600 dark:text-slate-300">
        Loading scheduling details...
      </section>
    );
  }

  if (!role) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center text-slate-600 dark:text-slate-300">
        We could not determine your role. Please update your profile.
      </section>
    );
  }

  return (
    role === "patient" ? <PatientScheduling /> : <DoctorScheduling />
  );
};


export default Scheduling;
