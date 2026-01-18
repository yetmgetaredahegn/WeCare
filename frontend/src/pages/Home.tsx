import Hero from "@/components/ui/Hero";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Hero
        title="Welcome to WeCare"
        subtitle="
        A grand platform who care about your healthcare management needs. 
        Streamline scheduling, clinical data, and user management all in one place.
        "
        ctaText="Get Started"
        onCtaClick={() => navigate("/login")}
      />
    </div>
  );
};

export default Home;
