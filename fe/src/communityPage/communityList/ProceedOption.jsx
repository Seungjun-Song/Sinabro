import styled, { css } from 'styled-components'
import { motion } from "framer-motion";

import DropDawnIcon from '/image/nav/dropdownIcon.png'
import ProceedSelection from './ProceedSelection'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { GlobalColor } from '../../services/color';
const Proceed = styled(motion.div)`
    display: flex;
    align-items: start;
    justify-content: center;

    font-size:1.2rem;

    //font-family: LaundryGothicRegular;
`

const ProceedToggle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: ${GlobalColor.colors.proceedToggle};
    padding: 0.2rem 1.5rem;

    //width: 8rem;

    color: white;

    border: 2px solid  ${GlobalColor.colors.proceedToggle};
    border-radius: 50px;

    box-shadow: 3px 4px 3px gray;

    ${props => props.isDark && css`
        background: ${GlobalColor.colors.proceedToggle_dark};
        border: 2px solid ${GlobalColor.colors.proceedToggle_dark};
    `}

`

const ProceedOption = ({proceedOption, proceedToggle, setProceedOption, setProceedToggle, kind, isDark}) => {
    return(
        <Proceed
        >
        <ProceedToggle
            onClick={() => setProceedToggle(!proceedToggle)}
            whileHover={{ cursor: "pointer", y: -3}}
            isDark={isDark}
        >
        {proceedOption.name}
        <motion.div
            transition={{ duration: 0.3}}
            animate={{rotate: proceedToggle ? 180 : 0}}
        >
            <FontAwesomeIcon icon={faCaretDown}/>
        </motion.div>
        </ProceedToggle>
        {proceedToggle && 
        <ProceedSelection
            proceedOption={proceedOption}
            setProceedOption={setProceedOption}
            setProceedToggle={setProceedToggle}
            kind={kind}
            isDark={isDark}
        ></ProceedSelection>}
    </Proceed>
    )
}

export default ProceedOption;