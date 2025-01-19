import ExperienceCard from "@/components/ExperienceCard";
import Layout from "@/components/Layout";
import { experiences } from "@/app/constants/content";

  export default function Experience() {
    return (
      <Layout>
        <div className="experience-page overflow-y-auto snap-y snap-mandatory">
          <div className="grid gap-4 lg:grid-cols-1">
            {experiences.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
            ))}
          </div>
        </div>
      </Layout>
    );
}