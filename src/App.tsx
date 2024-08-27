import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Search from "./pages/search/search";
import Job from "./pages/job/job";
import Skill from "./pages/skill/skill";
import Wrapper from "./components/layout/wrapper/wrapper";
import NotFound from "./pages/not_found/notFound";
import Navbar from "./components/layout/navbar/navbar";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButton from "./components/layout/top_button/topButton";
import History from "./pages/history/history";
import useTopScroll from "./lib/utils/hooks/useTopScroll";

function App() {
  // scroll to top handler upon routes change
  useTopScroll();
  return (
    <>
      {/* React toast */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      {/* Layout */}
      <Navbar />
      {/* Main routes */}
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="history" element={<History />} />
          <Route path="job/:jobId" element={<Job />} />
          <Route path="skill/:skllId" element={<Skill />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <TopButton />
    </>
  );
}

export default App;
