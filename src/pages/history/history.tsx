import { useSelector } from "react-redux";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { VscSearchStop } from "react-icons/vsc";
import { RootState } from "../../lib/redux/store";

const History = () => {
  // getting search history
  const { searchHistory }: { searchHistory: string[] } = useSelector(
    (state: RootState) => state.search
  );
  return (
    <div>
      {searchHistory && searchHistory.length > 0 ? (
        <SideMenu
          menuTitle="Search history"
          menuList={searchHistory.map((query) => ({
            label: query,
            path: `/search?query=${query}`,
          }))}
        />
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
