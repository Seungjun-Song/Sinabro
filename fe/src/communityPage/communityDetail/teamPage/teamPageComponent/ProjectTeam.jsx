import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import WhatPos from "./WhatPos";
import WhatPosCard from "./WhatPosCard";
import FakeWhatPos from "./FakeWhatPos";

const ProjectTeam = ({ setWhatUser, isDark, myCurrentProject, teamInfo, teamLeader, pjtId }) => {
  const displayedRoles = [];

  const [reloading, setReloading] = useState(false);

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
                state={item.teamReader ? "Reader" : "Member"}
                name={item.memberName}
                memberId={item.memberId}
                teamLeader={teamLeader}
                memberImg={item.memberImg}
                techStack={item.techStack}
                teammateRole={item.teammateRole}
                setReloading={setReloading}
                reloading={reloading}
                myCurrentProject={myCurrentProject}
                pjtId={pjtId}
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
                state={item.teamReader ? "Reader" : "Member"}
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
    </motion.div>
  );
};

export default ProjectTeam;
