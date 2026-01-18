import React from "react";
import { Link } from "react-router-dom";
import HeroImageSlider from "@/components/ui/HeroImageSlider";

interface ProtectedNoticeProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  showImages?: boolean;
}

const ProtectedNotice: React.FC<ProtectedNoticeProps> = ({
  title = "Restricted Access",
  description = "This section contains sensitive healthcare information. Please sign in to continue.",
  ctaText = "Sign in to your account",
  ctaLink = "/login",
  showImages = true,
}) => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center space-y-10 bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Text block */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>

        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed dark:text-slate-300">
          {description}
        </p>
      </div>

      {/* CTA */}
      <Link
        to={ctaLink}
        className="inline-flex items-center justify-center rounded-lg bg-cyan-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg active:scale-95"
      >
        {ctaText}
      </Link>

      {/* Optional visual reinforcement */}
      {showImages && (
        <div className="flex justify-center pt-10">
          <HeroImageSlider
            images={[
              "/assets/wecare.png",
              "/assets/9109665.png",
              "/assets/patient.jpg",
            ]}
          />
        </div>
      )}

    </section>
  );
};

export default ProtectedNotice;
