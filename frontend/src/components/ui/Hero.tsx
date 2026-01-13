import React from "react";

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
    <section className="relative overflow-hidden bg-gray-50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 to-white -z-10" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          
          {/* Left: Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {subtitle}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start">
              <button
                onClick={onCtaClick}
                className="px-8 py-3.5 text-base font-semibold text-white transition bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ctaText}
              </button>

              <a
                href="#learn-more"
                className="text-sm font-semibold text-gray-900 hover:text-indigo-600"
              >
                Learn more →
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/assets/9109665.png"
              alt="Healthcare illustration"
              className="w-full max-w-md object-contain rounded-4xl shadow-lg"
              
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
