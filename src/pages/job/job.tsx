import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";

const Job = () => {
  const data = Array.from({ length: 6 }, (_, i) => i);
  return (
    <>
      {/* main title */}
      <h1 className="font-hero font-color" style={{ marginBottom: 24 }}>
        4th Grade Math Teacher
      </h1>
      {/* main section */}
      <div className="main-section">
        <section style={{ padding: 24, backgroundColor: "#ffffff" }}>
          {/* related skills */}
          <h2 className="font-color font-main" style={{ marginBottom: 12 }}>
            Related Skills:
          </h2>
          <ul>
            {data &&
              data.map((job, index) => (
                <li key={index} style={{ marginBottom: 16 }}>
                  <RelatedCard
                    relatedTitle="Airline Pilots, Copilots, and Flight Engineers"
                    relatedImportance="3.7"
                    relatedLevel="2.3"
                    relatedType="knowledge"
                    relatedLink="/skill/dasf325fe6"
                  />
                </li>
              ))}
          </ul>
        </section>
        {/* side menu */}
        <SideMenu
          menuTitle="Related Jobs"
          menuList={[
            { label: "Frontend Developer", path: "/job/frontend-developer" },
            { label: "Backend Developer", path: "/job/backend-developer" },
            { label: "UI/UX Designer", path: "/job/ui-ux-designer" },
            {
              label: "Full Stack Developer",
              path: "/jobs/full-stack-developer",
            },
            { label: "Data Scientist", path: "/job/data-scientist" },
            { label: "DevOps Engineer", path: "/job/devops-engineer" },
            { label: "Project Manager", path: "/job/project-manager" },
            { label: "Product Manager", path: "/job/product-manager" },
            { label: "Quality Assurance Engineer", path: "/job/qa-engineer" },
            { label: "Mobile Developer", path: "/job/mobile-developer" },
          ]}
        />
      </div>
    </>
  );
};

export default Job;
