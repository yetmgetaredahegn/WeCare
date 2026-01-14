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
      {/* OPTIONAL background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-900/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">

          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900">
              {title}
            </h1>

            <p className="mt-6 text-lg text-slate-800">
              {subtitle}
            </p>
            <p className="text-sm font-semibold text-slate-500 hover:text-green-600">
              <Link to='/about'>Learn more →</Link>
            </p>

            <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row">
              <button
                onClick={onCtaClick}
                className="group relative flex items-center gap-2 rounded-lg bg-cyan-600 px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-cyan-700 hover:shadow-lg active:scale-95"
              >
                {ctaText}
                {/* Animated Arrow to draw the eye */}
                <span className="transition-transform duration-300 group-hover:translate-x-1">

                </span>
              </button>

              <p className="text-sm font-medium text-gray-500 sm:text-gray-400">
                Take one step for your healthcare
              </p>
            </div>

          </div>

          {/* Image */}
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
