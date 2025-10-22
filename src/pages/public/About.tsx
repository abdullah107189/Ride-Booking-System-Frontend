import { AboutHero } from "@/components/modules/about/aboutHero";
import { CompanyBackground } from "@/components/modules/about/CompanyBackground";
import { MissionValues } from "@/components/modules/about/MissionValues";
import { TeamProfiles } from "@/components/modules/about/TeamProfiles";

const About = () => {
  return (
    <div>
      <AboutHero></AboutHero>
      <CompanyBackground />
      <MissionValues />
      <TeamProfiles />
    </div>
  );
};

export default About;
