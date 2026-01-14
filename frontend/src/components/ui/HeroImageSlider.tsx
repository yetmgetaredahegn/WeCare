import React, { useEffect, useState } from "react";

interface HeroImageSliderProps {
  images: string[];
  interval?: number;
}

const HeroImageSlider: React.FC<HeroImageSliderProps> = ({
  images,
  interval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full max-w-md aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt="Healthcare illustration"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};


export default HeroImageSlider;
