

import styled from "styled-components";
import { motion } from "framer-motion";

import TeamImg from "/image/community/pjtTempImg.png";
import CheckImg from "/image/community/checkInPost.png";
import { useState } from "react";

const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    background: rgba(245, 248, 255, 1);
    border-radius: 0.5rem;

    padding: 0.5rem 1rem;
    width: 100%;

`;
const TeamList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 2rem;

  width: 100%;
  padding: 1rem;
  margin: 1rem 1rem 0 1rem;

  
  background: white;


`;

const TeamProfile = styled.img`
  border-radius: 100rem;
  width: 2rem;
  height: 2rem;
`

const TeamInfo = styled.div`

`

const Title = styled.div`
  color: black;
  
  font-size: 0.9rem;
`

const Date = styled.div`
  font-size: 0.4rem;
  color: rgba(183, 183, 183, 1);
`

const Line = styled.hr`
    
`

const TeamListBox = () => {
  //TODO : team list를 받아 와야함
  const [ selected, setSelected ] = useState(0);

  const teamList = [
    {
      id: 1,
      name: "7lans",
      pjtimg: TeamImg,
      date: "2024-02-01",
    },
    {
      id: 2,
      name: "minuet",
      pjtimg: TeamImg,
      date: "2024-02-01",
    },
  ];

  const selectTeam = (index) =>{
    setSelected(index);
  }


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
      {teamList.map((team, index) => (
        <TeamList
          onClick={() => selectTeam(index)}
        >
          {/* <motion.div
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.2 }}
          > */}
          <div style={{display: "flex", gap: "1rem"}}> 
            <TeamProfile
              src={team.pjtimg}
            >
            </TeamProfile>
            <TeamInfo>
              <Title>
                {team.name}
              </Title>
              <Date>
                {team.date}
              </Date>
            </TeamInfo>
            </div>
            {selected === index && 
              <img
                src={CheckImg}
                style={{width: "0.8rem"}}
              />
            }
          {/* </motion.div> */}
        </TeamList>
      ))}
    </Box>
  );
};

export default TeamListBox;
