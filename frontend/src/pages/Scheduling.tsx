import React from "react";
import ProtectedNotice from "@/components/ui/ProtectedNotice";

const Scheduling = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Appointment Scheduling
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Manage your upcoming appointments and schedule new visits.
        </p>
      </header>

      {/* Main content placeholder */}
      <div className="rounded-xl border bg-white p-6 shadow-sm
                      dark:border-slate-800 dark:bg-slate-900">
        <p className="text-slate-600 dark:text-slate-300">
          Scheduling features will appear here.
        </p>
      </div>
    </section>
  );
};


export default Scheduling;
