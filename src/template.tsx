import JobCard from "./components/common/job_card/jobCard";
import RelatedCard from "./components/common/related_card/relatedCard";
import SearchBar from "./components/common/search_bar/searchBar";
import SideMenu from "./components/common/side_menu/sideMenu";
import SkillPill from "./components/common/skill_pill/skillPill";

const Template = () => {
  return (
    <div style={{ backgroundColor: "#838383", height: "150vh" }}>
      {/* typography */}
      <h1 className="font-hero font-color">Lorem ipsum</h1>
      <p className="font-input font-color">Lorem ipsum</p>
      <h2 className="font-main font-color">Lorem ipsum</h2>
      <p className="font-paragraph font-color">Lorem ipsum</p>
      <br />
      {/* skill pill */}
      <SkillPill skillName="operation monitoring lorem" skillLink="/lorem" />
      <br />
      <br />
      {/*template cards */}
      <JobCard
        jobTitle="4th Grade Math Teacher"
        jobLink="9b92abe6-3bf3-4cc6-8744-4de0c8af0630"
        jobSkills={[
          {
            skillName: "operation monitoring",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
          {
            skillName: "active listening",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
          {
            skillName: "information ordering",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
          {
            skillName: "operation monitoring",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
          {
            skillName: "active listening",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
          {
            skillName: "information ordering",
            skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
          },
        ]}
      />
      <br />
      {/* Related card */}
      <RelatedCard
        relatedTitle="Airline Pilots, Copilots, and Flight Engineers"
        relatedImportance="3.7"
        relatedLevel="2.3"
        relatedType="knowledge"
      />
      <br />
      {/* search bar */}
      <SearchBar />
      <br />
      {/* side menu */}
      <SideMenu
        menuTitle="Search history"
        menuList={[
          { label: "Frontend Developer", path: "/jobs/frontend-developer" },
          { label: "Backend Developer", path: "/jobs/backend-developer" },
          { label: "UI/UX Designer", path: "/jobs/ui-ux-designer" },
          { label: "Full Stack Developer", path: "/jobs/full-stack-developer" },
          { label: "Data Scientist", path: "/jobs/data-scientist" },
          { label: "DevOps Engineer", path: "/jobs/devops-engineer" },
          { label: "Project Manager", path: "/jobs/project-manager" },
          { label: "Product Manager", path: "/jobs/product-manager" },
          { label: "Quality Assurance Engineer", path: "/jobs/qa-engineer" },
          { label: "Mobile Developer", path: "/jobs/mobile-developer" },
        ]}
      />
    </div>
  );
};

export default Template;
