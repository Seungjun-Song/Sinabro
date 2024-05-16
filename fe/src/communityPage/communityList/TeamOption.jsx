import styled, { css } from 'styled-components'
import { motion } from "framer-motion";

import TeamSelection from './TeamSelection'

import DropDawnIcon from '/image/nav/dropdownIcon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { GlobalColor } from '../../services/color';

const Team = styled(motion.div)`
    display: flex;
    align-items: start;
    justify-content: center;

    font-size: 1.2rem;

    //font-family: LaundryGothicRegular;
`

const TeamToggle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: ${GlobalColor.colors.teamToggle};
    padding: 0.2rem 1.5rem;

    //width: 8rem;

    color: white;

    border: 2px solid ${GlobalColor.colors.teamToggle};
    border-radius: 50px;

    box-shadow: 3px 4px 3px gray;

    ${props => props.isDark && css`
        background: ${GlobalColor.colors.teamToggle_dark};
        border: 2px solid ${GlobalColor.colors.teamToggle_dark};
    `}
`

const TeamOption = ({teamOption, teamToggle, setTeamOption, setTeamToggle, kind, isDark}) => {
    return(
        <Team>
        <TeamToggle 
            onClick={() => setTeamToggle(!teamToggle)}
            whileHover={{cursor: "pointer", y: -3}}
            isDark={isDark}
            >
        {teamOption.name}
        <motion.div
            transition={{ duration: 0.3}}
            animate={{rotate: teamToggle ? 180 : 0}}
        >
                <FontAwesomeIcon icon={faCaretDown}/>
        </motion.div>
        </TeamToggle>
        {teamToggle && 
        <TeamSelection
            teamOption={teamOption}
            setTeamOption={setTeamOption}
            setTeamToggle={setTeamToggle}
            kind={kind}
            isDark={isDark}
        ></TeamSelection>}
    </Team>
    )
}

export default TeamOption;