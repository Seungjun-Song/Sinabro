import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import WhatPos from "./WhatPos";
import WhatPosCard from "./WhatPosCard";
import FakeWhatPos from "./FakeWhatPos";
import { useSelector } from "react-redux";
import axios from "axios";
import getEnv from "../../utils/getEnv";

const DUMMY_DATA = [
  {
    id: 1,
    job: "FE",
    state: "Reader",
    name: "Juhun0283",
  },
  {
    id: 2,
    job: "FE",
    state: "Member",
    name: "Juhun0283",
  },
  {
    id: 3,
    job: "BE",
    state: "Member",
    name: "Juhun0283",
  },
  {
    id: 4,
    job: "FULL",
    state: "Member",
    name: "Juhun0283",
  },
];

const ProjectTeam = ({ setWhatUser, isDark }) => {
  const displayedRoles = [];

  const myCurrentProject = useSelector(state => state.myCurrentProject.value)
  const back_url = getEnv('BACK_URL')
  
  const [teamInfo, setTeamInfo] = useState([])

  useEffect(() => {
    const getProjectInfo = async () => {
      try {
        const res = await axios.get(`${back_url}/teams?projectId=${myCurrentProject.projectId}`)
        console.log(res.data)
        const transformedTeamInfo = res.data.result.teammateInfoList?.map(item => ({...item, teammateRole: convertTeammateRole(item.teammateRole)}))
        console.log(transformedTeamInfo)
        setTeamInfo(transformedTeamInfo)
      }
      catch (err) {
        console.error(err)
      }
    }
    getProjectInfo()
  }, [])

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
  }

  return (
    <motion.div
      style={{ display: "flex", gap: "1.5rem", height: "100%" }}
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
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
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
                state={item.teamReader ? 'Reader' : 'Member'}
                name={item.memberName}
              />
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={index}
              style={{
                display: "flex",
                gap: "1rem",
                flexDirection: "column",
                height: "100%",
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
                state={item.teamReader ? 'Reader' : 'Member'}
                name={item.memberName}
              />
            </motion.div>
          );
        }
      })}
    </motion.div>
  );
};

export default ProjectTeam;
