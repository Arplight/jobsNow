import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";

const Skill = () => {
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
          {/* description */}
          <div style={{ marginBottom: 24 }}>
            <h2 className="font-color font-main" style={{ marginBottom: 12 }}>
              Description:
            </h2>
            <p className="font-color font-paragraph">
              Skill description is not returned from the API, so this is
              placeholder text.
            </p>
          </div>
          {/* related jobs */}
          <h2 className="font-color font-main" style={{ marginBottom: 12 }}>
            Related Jobs:
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
                    relatedLink="/job/dasf325fe6"
                  />
                </li>
              ))}
          </ul>
        </section>
        {/* side menu */}
        <SideMenu
          menuTitle="Related Skills"
          menuList={[
            { label: "Frontend Developer", path: "/skill/frontend-developer" },
            { label: "Backend Developer", path: "/skill/backend-developer" },
            { label: "UI/UX Designer", path: "/skill/ui-ux-designer" },
            {
              label: "Full Stack Developer",
              path: "/skill/full-stack-developer",
            },
            { label: "Data Scientist", path: "/skill/data-scientist" },
            { label: "DevOps Engineer", path: "/skill/devops-engineer" },
            { label: "Project Manager", path: "/skill/project-manager" },
            { label: "Product Manager", path: "/skill/product-manager" },
            { label: "Quality Assurance Engineer", path: "/skill/qa-engineer" },
            { label: "Mobile Developer", path: "/skill/mobile-developer" },
          ]}
        />
      </div>
    </>
  );
};

export default Skill;
