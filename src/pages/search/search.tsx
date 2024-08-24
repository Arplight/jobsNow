import JobCard from "../../components/common/job_card/jobCard";
import SideMenu from "../../components/common/side_menu/sideMenu";

const Search = () => {
  const skills = [
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
  ];
  const data = Array.from({ length: 12 }, (_, i) => i);
  return (
    <>
      {/* search title */}
      <h1
        className="font-hero font-color"
        style={{ marginBottom: 16, paddingLeft: 16 }}
      >
        “frontend” jobs (25)
      </h1>
      {/* main section */}
      <div className="main-section">
        {/* all search results */}

        <section>
          <ul className="jobs-grid">
            {data &&
              data.map((job, index) => (
                <li key={index}>
                  <JobCard
                    jobTitle="4th Grade Math Teacher"
                    jobLink="9b92abe6-3bf3-4cc6-8744-4de0c8af0630"
                    jobSkills={skills}
                  />
                </li>
              ))}
          </ul>
        </section>
        {/* side menu */}
        <SideMenu
          menuTitle="Search history"
          menuList={[
            { label: "Frontend Developer", path: "/jobs/frontend-developer" },
            { label: "Backend Developer", path: "/jobs/backend-developer" },
            { label: "UI/UX Designer", path: "/jobs/ui-ux-designer" },
            {
              label: "Full Stack Developer",
              path: "/jobs/full-stack-developer",
            },
            { label: "Data Scientist", path: "/jobs/data-scientist" },
            { label: "DevOps Engineer", path: "/jobs/devops-engineer" },
            { label: "Project Manager", path: "/jobs/project-manager" },
            { label: "Product Manager", path: "/jobs/product-manager" },
            { label: "Quality Assurance Engineer", path: "/jobs/qa-engineer" },
            { label: "Mobile Developer", path: "/jobs/mobile-developer" },
          ]}
        />
      </div>
    </>
  );
};

export default Search;
