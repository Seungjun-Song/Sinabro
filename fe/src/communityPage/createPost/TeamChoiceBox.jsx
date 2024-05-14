import styled from 'styled-components'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

import TeamListBox from './TeamListBox';

const TeamChoice = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.8rem;

    padding: 0.2rem 1rem;

    width: 17%;
    
    background: rgba(245, 248, 255, 1);
    color: rgba(86, 76, 173, 1);

    border: 0px solid black;
    border-radius: 10px;

    cursor: pointer; 
`

const DropDownPage = styled.div`
  position: absolute; /* 절대 위치 지정 */
  z-index: 999;

  border: 0px solid black;
  border-radius: 10px;

  top: 8.8rem;
  width: 15%;
`;

const ToggleBox = styled.div`
  display: flex;
  gap: 1rem;
`

const SelectedTeamBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 10rem;

  background: rgba(245, 248, 255, 1);
  text-align: center;
  margin: 0.5rem auto 0 auto;
  padding: 0.5rem auto 0.5rem auto;

`

const DropDownButton = styled.div``;

const TeamChoiceBox = ({ selectedPjt, setSelectedPjt, myProjectList }) => {
    const [dropDown, setDropDown] = useState(false);

    const teamRef = useRef();

    useEffect(() => {
      function handleClikcOutside(event){
          if(teamRef.current && !teamRef.current.contains(event.target)){
            setDropDown(false);
          }
      }

      document.addEventListener("mousedown", handleClikcOutside);
      return () => {
          document.removeEventListener("mousedown", handleClikcOutside);
      }
  }, [setDropDown]);
    
    return(
        <TeamChoice
          ref={teamRef}
        >
            <ToggleBox onClick={() => setDropDown(!dropDown)}>
            팀 선택하기
            <DropDownButton
          >
            <motion.div
              transition={{ duration: 0.3 }}
              animate={{ rotate: dropDown ? 180 : 0 }}
            >
              <FontAwesomeIcon icon={faCaretDown} />
            </motion.div>
          </DropDownButton>
          </ToggleBox>

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
                  <TeamListBox
                    selectedPjt={selectedPjt}
                    setSelectedPjt={setSelectedPjt}
                    myProjectList={myProjectList}
                  />
                </motion.div>
              )}
              {selectedPjt.id !== -1 && !dropDown &&
                <SelectedTeamBox>
                  <img src={selectedPjt.projectImg} style={{height: '3rem', borderRadius: '10rem', marginRight: '1rem'}}></img>
                    {selectedPjt.name}
                </SelectedTeamBox>
              }
            </AnimatePresence>
          </DropDownPage>
        </TeamChoice>
    )
}

export default TeamChoiceBox;