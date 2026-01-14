import Hero from "@/components/ui/Hero";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-white">
      <Hero
        title="Welcome to WeCare"
        subtitle="
        A grand platform who care about your healthcare management needs. 
        Streamline scheduling, clinical data, and user management all in one place.
        "
        ctaText="Login"
        onCtaClick={() => navigate("/login")}
      />
    </div>
  );
};

export default Home;
