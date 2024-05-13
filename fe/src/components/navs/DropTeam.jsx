import styled from "styled-components";
import { motion } from "framer-motion";
import Team from "./Team";
import Go from "./../../../public/image/nav/goTeamSpace.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMyCurrentProject } from "../../store/myCurrentProjectSlice";

const Box = styled(motion.div)`
  background-color: rgba(244, 249, 255, 1);
  /* border: 1px solid #ccc; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  border-radius: 0.5rem;

  padding: 20px;
  width: 100%;

  max-height: 30rem;
  overflow: auto;
  color: black;
`;
const TeamList = styled.div`
  margin-bottom: 20px;

  cursor: pointer;
`;

const Create = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: rgba(86, 76, 173, 0.6); */
  
  /* font-weight: bold; */
  color :"white";
  width: 13rem;
  height: 3rem;
  padding: 1rem;

  cursor: pointer;
`;

const DropTeam = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProjectList = useSelector((state) => state.myProjectList.value); // 잘 들어오는지 확인, 페이지 이동 잘 되는지 확인
  // console.log(myProjectList)
  //TODO : team list를 받아 와야함
  // const teamList = [
  //   {
  //     id: 1,
  //     name: "7lans",
  //     pjtimg: "",
  //     date: "2024-02-01",
  //   },
  //   {
  //     id: 2,
  //     name: "minuet",
  //     pjtimg: "",
  //     date: "2024-02-01",
  //   },
  // ];

  return (
    <Box
      transition={{ duration: 0.3 }}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1, // 순차적으로 애니메이션 적용
            // delay:0.2
          },
        },
        hidden: { opacity: 0 },
      }}
    >
      {/* <li>7lans</li>
            <li>minuet</li> */}
      {/* <Team></Team> */}
      {myProjectList?.map((team, index) => (
        <TeamList
          onClick={() => {
            dispatch(setMyCurrentProject(team)),
              navigate(`/TeamSpaceDetailPage/${team.projectId}`);
          }}
        >
          <motion.div
            whileHover={{ y: -5 }}
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.2 }}
          >
            <Team team={team} key={index}></Team>
          </motion.div>
        </TeamList>
      ))}

      {/* create team */}
      <motion.div
        whileHover={{ y: -5 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 10 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 * (myProjectList.length + 1), duration: 0.2  }}
      >
        <Create style={{color:"black"}} onClick={() => navigate("/TeamSpacePage")}>
          프로젝트 생성하기
          <img src={Go}></img>
        </Create>
      </motion.div>
    </Box>
  );
};

export default DropTeam;
