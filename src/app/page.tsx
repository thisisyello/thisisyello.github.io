import AboutSection from "@/components/main/about-section";
import ProjectSection from "@/components/main/project-section";
import SkillsSection from "@/components/main/skills-section";
import ContactSection from "@/components/main/contact-section";
import BlogSection from "@/components/main/blog-section";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full">
            <AboutSection></AboutSection>

            <ProjectSection></ProjectSection>

            <SkillsSection></SkillsSection>

            <BlogSection></BlogSection>

            <ContactSection></ContactSection>
        </div>
    );
}
