

import styled from "styled-components";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    background: rgba(240, 240, 240, 1);
    border-radius: 0.5rem;

    padding: 0.5rem 1rem;
    width: 100%;

    color: rgba(86, 76, 173, 1);
`;
const TeamList = styled.div`
`;

const Line = styled.hr`
    
`

const TeamListBox = () => {
  //TODO : team list를 받아 와야함
  const teamList = [
    {
      id: 1,
      name: "7lans",
      pjtimg: "",
      date: "2024-02-01",
    },
    {
      id: 2,
      name: "minuet",
      pjtimg: "",
      date: "2024-02-01",
    },
  ];

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
        <TeamList>
          <motion.div
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 10 },
            }}
            transition={{ duration: 0.2 }}
          >
            {team.name}
            {/* <Line/> */}
          </motion.div>
        </TeamList>
      ))}
    </Box>
  );
};

export default TeamListBox;
