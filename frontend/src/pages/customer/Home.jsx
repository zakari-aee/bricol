import FeaturesSection from "../../components/layout/FeaturesSection";
import GlobalBackground from "../../components/layout/GlobalBackground";
import HeroSection from "../../components/layout/HeroSection";
import HowItWorksSection from "../../components/layout/HowItWorksSection";

const Home = () => {
  return (
    <GlobalBackground>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </GlobalBackground>
  );
};

export default Home;
