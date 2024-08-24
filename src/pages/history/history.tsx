import ErrorMessage from "../../components/common/error_messge/errorMessage";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { menuList } from "../../lib/types/propTypes";
import { VscSearchStop } from "react-icons/vsc";

const History = () => {
  const searchData: menuList[] = [
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
  ];
  return (
    <div>
      {searchData && searchData.length > 0 ? (
        <SideMenu menuTitle="Search history" menuList={searchData} />
      ) : (
        <ErrorMessage
          errorIcon={<VscSearchStop size={100} />}
          errorMessage="No search history yet."
        />
      )}
    </div>
  );
};

export default History;
