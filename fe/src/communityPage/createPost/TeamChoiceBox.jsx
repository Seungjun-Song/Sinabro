import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

import TeamListBox from './TeamListBox';

const TeamChoice = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.8rem;

    padding: 0.2rem 1rem;

    width: 17%;
    
    background: rgba(240, 240, 240, 1);
    color: rgba(86, 76, 173, 1);

    border: 0px solid black;
    border-radius: 10px;

    cursor: pointer; 
`

const DropDownPage = styled.div`
  position: absolute; /* 절대 위치 지정 */
  z-index: 999;

  top: 8.8rem;
  width: 9%;
`;

const DropDownButton = styled.div``;

const TeamChoiceBox = () => {
    const [dropDown, setDropDown] = useState(false);

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
    
    return(
        <TeamChoice>
            <div>팀 선택하기</div>
            <DropDownButton
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <motion.div
              transition={{ duration: 0.3 }}
              animate={{ rotate: dropDown ? 180 : 0 }}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </motion.div>
          </DropDownButton>

          <DropDownPage>
            <AnimatePresence>
              {dropDown && (
                <motion.div
                className="shadow"
                style={{borderRadius:"0.5rem"}}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <TeamListBox />
                </motion.div>
              )}
            </AnimatePresence>
          </DropDownPage>
        </TeamChoice>
    )
}

export default TeamChoiceBox;