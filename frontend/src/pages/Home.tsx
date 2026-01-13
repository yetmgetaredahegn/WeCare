import Hero from "@/components/ui/Hero";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Hero
        title="Welcome to WeCare"
        subtitle="Your digital healthcare assistant"
        ctaText="Login"
        onCtaClick={() => navigate("/login")}
      />
    </div>
  );
};

export default Home;
