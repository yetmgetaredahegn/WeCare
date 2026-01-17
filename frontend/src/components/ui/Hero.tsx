import React from "react";
import HeroImageSlider from "./HeroImageSlider";
import { Link } from "react-router";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
}) => {
  return (
    <section className="relative overflow-hidden">
      {/* background glow stays — lightweight */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900/20 to-transparent" />

      {/* 🔹 RESPONSIVE padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">

          {/* TEXT */}
          <div className="text-center md:text-left">
            {/* 🔹 Better mobile scaling */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-800">
              {subtitle}
            </p>

            {/* 🔹 Spacing tightened */}
            <p className="mt-2 text-sm font-semibold text-slate-500 hover:text-green-600">
              <Link to="/about">Learn more →</Link>
            </p>

            {/* 🔹 Button stack optimized */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto group relative flex justify-center items-center gap-2 rounded-lg bg-cyan-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg active:scale-95"
              >
                {ctaText}
              </button>

              {/* 🔹 Hide helper text on very small screens */}
              <p className="hidden sm:block text-sm font-medium text-gray-500">
                Take one step for your healthcare
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center md:justify-end">
            <HeroImageSlider
              images={[
                "/assets/wecare.png",
                "/assets/9109665.png",
                "/assets/patient.jpg",
              ]}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
