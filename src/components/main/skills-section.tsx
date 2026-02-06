import { frontendSkills, backendSkills } from "@/data/skills";
import Card from "@/components/ui/card";

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="w-full max-w-[1200px] min-h-screen py-20 px-4 flex flex-col justify-center"
        >
            <h2 className="text-4xl font-bold text-left text-primary mb-12">
                Skills
            </h2>

            <div className="flex flex-col gap-16">
                <div>
                    <h3 className="text-xl font-bold mb-6">Front-end</h3>
                    <div className="flex flex-wrap gap-4">
                        {frontendSkills.map((skill) => (
                            <Card
                                key={skill.name}
                                hoverable
                                className="flex items-center gap-3 px-6 py-4"
                            >
                                <skill.icon className="text-2xl text-text-muted" />
                                <span className="text-lg text-text-muted font-medium">
                                    {skill.name}
                                </span>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-6">Back-end</h3>
                    <div className="flex flex-wrap gap-4">
                        {backendSkills.map((skill) => (
                            <Card
                                key={skill.name}
                                hoverable
                                className="flex items-center gap-3 px-6 py-4"
                            >
                                <skill.icon className="text-2xl text-text-muted" />
                                <span className="text-lg text-text-muted font-medium">
                                    {skill.name}
                                </span>
                            </Card>
                        ))}
                        {/* REST API Mock Chip */}
                        <Card
                            hoverable
                            className="flex items-center gap-3 px-6 py-4"
                        >
                            <span className="text-lg text-text-muted font-medium">
                                REST API
                            </span>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
