import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projectname from "../components/teamspaceComponents/Projectname";
import ProjectInfo from "../components/teamspaceComponents/ProjectInfo";
import ProjectInvite from "../components/teamspaceComponents/ProjectInvite";
import { useState } from "react";
import UserSearchModal from "../components/teamspaceComponents/UserSearchModal";
import { AnimatePresence } from "framer-motion";
import ProjectGitConnect from "../components/teamspaceComponents/ProjectGitConnect";

const TeamSpacePage = () => {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const hadlebutton = () => {
    setIsModalOpen(() => !IsModalOpen);
    console.log(IsModalOpen);
  };
  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        marginTop:"5rem"
      }}
    >
      <Projectname />
      <ProjectInfo />
      <ProjectInvite
        hadlebutton={hadlebutton}
        setIsModalOpen={setIsModalOpen}
        IsModalOpen={IsModalOpen}
      />
      <AnimatePresence>
        {IsModalOpen && <UserSearchModal setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>
      <ProjectGitConnect/>
    </div>
  );
};

export default TeamSpacePage;
