import Hero from "@/components/ui/Hero";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isUserLoading } = useAuth();

  const displayName = user?.first_name || user?.full_name;
  const title = isAuthenticated
    ? `Welcome back${displayName ? `, ${displayName}` : ""}`
    : "Welcome to WeCare";

  const subtitle = isAuthenticated
    ? "Manage your appointments, records, and care in one place."
    : `
        A grand platform who care about your healthcare management needs. 
        Streamline scheduling, clinical data, and user management all in one place.
        `;

  const ctaText = isAuthenticated ? "Go to Appointments" : "Get Started";
  const handleCtaClick = () =>
    navigate(isAuthenticated ? "/scheduling" : "/login");

  return (
    <div className="bg-gray-50 text-slate-900
        dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
      {!isUserLoading && (
        <Hero
          title={title}
          subtitle={subtitle}
          ctaText={ctaText}
          onCtaClick={handleCtaClick}
        />
      )}
    </div>
  );
};

export default Home;
