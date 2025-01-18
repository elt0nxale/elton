type Experience = {
    title: string;
    company: string;
    tools: string[];
    description: string[];
};

type CardProps = {
    experience: Experience;
};

const ExperienceCard: React.FC<CardProps> = ({ experience }) => {
    const { title, company, tools, description } = experience;

    return (
        <div className="p-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex items-center gap-2 mb-5">
                <h2 className="m-0 text-lg font-bold">{company}</h2>
            </div>
            <div className="flex flex-wrap mb-4">
                {tools.map((tool, index) => (
                    <div
                        key={index}
                        className="text-xs uppercase tracking-widest font-mono after:content-['•'] after:mx-2 last:after:content-['']"
                    >
                        {tool}
                    </div>
                ))}
            </div>
            <ul className="list-disc pl-5 space-y-2">
                {description.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceCard;
