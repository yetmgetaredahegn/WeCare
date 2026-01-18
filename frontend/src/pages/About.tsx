import React, { useState } from "react";

const About: React.FC = () => {
  const [expanded, setExpanded] = useState(false); // controls story expansion

  return (
    <section className="relative overflow-hidden bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Soft continuation background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-cyan-50  to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 items-center">

          {/* Text / Story */}
          <div className="space-y-8">
            <span className="inline-block rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700">
              Our Story
            </span>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
              Healthcare should feel simple, human, and connected
            </h2>

            <p className="text-lg leading-relaxed text-slate-700 max-w-xl">
              WeCare was created to remove friction between patients and
              healthcare providers. From appointments to prescriptions,
              everything is designed to be clear, secure, and accessible.
            </p>

            {/* EXPANDABLE CONTENT */}
            {expanded && (
              <div className="space-y-4 text-slate-600 max-w-xl">
                <p>
                  Many healthcare systems fail not because of lack of features,
                  but because they ignore real workflows. WeCare focuses on
                  simplicity, role-based access, and predictable behavior.
                </p>

                <p>
                  The platform is built with scalability in mind — starting as
                  an MVP and evolving into a modular healthcare ecosystem with
                  analytics, notifications, and integrations.
                </p>

                <p>
                  Security, performance, and clarity are not add-ons. They are
                  foundational design principles.
                </p>
              </div>
            )}

            {/* ACTION ROW */}
            <div className="flex items-center gap-6 pt-4">
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800 transition"
              >
                {expanded ? "Show less ↑" : "Read more ↓"}
              </button>

              <span className="text-sm text-slate-500">
                Designed for patients and clinics
              </span>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Patient-Centered",
                desc: "Designed around real patient journeys.",
              },
              {
                title: "Secure by Default",
                desc: "Authentication and permissions built-in.",
              },
              {
                title: "Clinic-Ready",
                desc: "Appointments and records aligned with workflows.",
              },
              {
                title: "Scalable Foundation",
                desc: "Built to grow beyond the MVP.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-bg-slate-500 p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
