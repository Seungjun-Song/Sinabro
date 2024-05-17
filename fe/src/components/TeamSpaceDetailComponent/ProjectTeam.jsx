import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import WhatPos from "./WhatPos";
import WhatPosCard from "./WhatPosCard";
import FakeWhatPos from "./FakeWhatPos";
import { useSelector } from "react-redux";
import axios from "axios";
import getEnv from "../../utils/getEnv";
import UserSearchModal from "./UserSearchModal";

const ProjectTeam = ({ setWhatUser, isDark }) => {
  const displayedRoles = [];

  const myCurrentProject = useSelector((state) => state.myCurrentProject.value);
  const back_url = getEnv("BACK_URL");

  const [teamInfo, setTeamInfo] = useState([]);
  const [teamLeader, setTeamLeader] = useState(null);
  const [reloading, setReloading] = useState(false);
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const userInfo = useSelector((state) => state.user);

  const hadlebutton = () => {
    setIsModalOpen(() => !IsModalOpen);
    console.log(IsModalOpen);
  };

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(
          `${back_url}/teams?projectId=${myCurrentProject.projectId}`
        );
        console.log(res.data);
        setTeamLeader(res.data.result.teammateInfoList[0]?.memberId);
        const transformedTeamInfo = res.data.result.teammateInfoList?.map(
          (item) => ({
            ...item,
            teammateRole: convertTeammateRole(item.teammateRole),
          })
        );
        console.log(transformedTeamInfo);
        setTeamInfo(transformedTeamInfo);
      } catch (err) {
        console.error(err);
      }
    };
    getProjectInfo();
  }, [myCurrentProject, reloading]);

  const convertTeammateRole = (originalRole) => {
    switch (originalRole) {
      case "프론트엔드":
        return "FE";
      case "백엔드":
        return "BE";
      case "풀스택":
        return "FULL";
      default:
        return originalRole;
    }
  };

  return (
    <motion.div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexWrap: "wrap",
        gap: "1rem",
      }}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {teamInfo.map((item, index) => {
        if (!displayedRoles.includes(item.teammateRole)) {
          displayedRoles.push(item.teammateRole); // 역할을 추가합니다.
          return (
            <motion.div
              // className="col-4"
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
                marginBottom: "1rem",
                // height:"15rem"
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <WhatPos item={item.teammateRole} isDark={isDark} />
              <WhatPosCard
                isDark={isDark}
                setWhatUser={setWhatUser}
                item={item.teammateRole}
                state={item.teamReader ? "Leader" : "Member"}
                name={item.memberName}
                memberId={item.memberId}
                teamLeader={teamLeader}
                memberImg={item.memberImg}
                techStack={item.techStack}
                teammateRole={item.teammateRole}
                setReloading={setReloading}
                reloading={reloading}
              />
            </motion.div>
          );
        } else {
          return (
            <motion.div
              // className="col-4"
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
                marginBottom: "1rem",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <FakeWhatPos isDark={isDark} />
              <WhatPosCard
                isDark={isDark}
                setWhatUser={setWhatUser}
                item={item.teammateRole}
                state={item.teamReader ? "Leader" : "Member"}
                name={item.memberName}
                memberId={item.memberId}
                teamLeader={teamLeader}
                memberImg={item.memberImg}
                techStack={item.techStack}
                teammateRole={item.teammateRole}
                setReloading={setReloading}
                reloading={reloading}
              />
            </motion.div>
          );
        }
      })}
      {userInfo.currentUser.uid === teamLeader && (
        <motion.div
          onClick={hadlebutton}
          whileHover={{ cursor: "pointer", y: -7 }}
          style={{
            justifySelf: "center",
            alignSelf: "center",
            minWidth: "5rem",
            border: "none",
            height: "5rem",
            borderRadius: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: isDark
              ? "linear-gradient(135deg, #d3d3d3, #383838)"
              : "linear-gradient(135deg, #C7D6FF, #7375CA)", // 그라데이션 효과 추가
          }}
        >
          <img
            style={{ width: "1.5rem", height: "1.5rem" }}
            src="/images/plus.png"
          />
        </motion.div>
      )}
      <AnimatePresence>
        {IsModalOpen && (
          <UserSearchModal
            projectName={myCurrentProject.projectName}
            setIsModalOpen={setIsModalOpen}
            isDark={isDark}
            reloading={reloading}
            setReloading={setReloading}
            teamInfo={teamInfo}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectTeam;
