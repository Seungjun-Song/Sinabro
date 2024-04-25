import styled from 'styled-components'
import { motion } from "framer-motion";

import TeamSelection from './TeamSelection'

import DropDawnIcon from '/image/nav/dropdownIcon.png'

const Team = styled(motion.div)`
    display: flex;
    align-items: start;
    justify-content: center;

    font-family: LaundryGothicRegular;
`

const TeamToggle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(58, 166, 184, 1);
    padding: 0.2rem 1rem;

    width: 8rem;

    color: white;

    border: 2px solid rgba(58, 166, 184, 1);
    border-radius: 50px;
`

const TeamOption = ({teamOption, teamToggle, setTeamOption, setTeamToggle, kind}) => {
    return(
        <Team>
        <TeamToggle 
            className='shadow' 
            onClick={() => setTeamToggle(!teamToggle)}
            whileHover={{cursor: "pointer", y: -3}}>
        {teamOption}
        {teamToggle ? 
        <img
            src={DropDawnIcon}
            style={{ transform: 'rotate(180deg)', height: "50%" }}
        >
        </img> : 
        <img
            src={DropDawnIcon}
            style={{height:"50%"}}
        >
        </img>
        }
        </TeamToggle>
        {teamToggle && 
        <TeamSelection
            teamOption={teamOption}
            setTeamOption={setTeamOption}
            setTeamToggle={setTeamToggle}
            kind={kind}
        ></TeamSelection>}
    </Team>
    )
}

export default TeamOption;