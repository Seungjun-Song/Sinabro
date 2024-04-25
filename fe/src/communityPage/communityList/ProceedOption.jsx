import styled from 'styled-components'
import { motion } from "framer-motion";

import DropDawnIcon from '/image/nav/dropdownIcon.png'
import ProceedSelection from './ProceedSelection'

const Proceed = styled(motion.div)`
    display: flex;
    align-items: start;
    justify-content: center;

    font-family: LaundryGothicRegular;
`

const ProceedToggle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: rgba(62, 200, 175, 1);
    padding: 0.2rem 1rem;

    width: 8rem;

    color: white;

    border: 2px solid rgba(62, 200, 175, 1);
    border-radius: 50px;
`

const ProceedOption = ({proceedOption, proceedToggle, setProceedOption, setProceedToggle, kind, ref}) => {
    return(
        <Proceed
        >
        <ProceedToggle
            className='shadow' 
            onClick={() => setProceedToggle(!proceedToggle)}
            whileHover={{ cursor: "pointer", y: -3}}
        >
        {proceedOption}
        {proceedToggle ? 
        <img
            src={DropDawnIcon}
            style={{ transform: 'rotate(180deg)', height: "50%"}}
        >
        </img> : 
        <img
            src={DropDawnIcon}
            style={{height:"50%"}}
        >
        </img>
        }
        </ProceedToggle>
        {proceedToggle && 
        <ProceedSelection
            proceedOption={proceedOption}
            setProceedOption={setProceedOption}
            setProceedToggle={setProceedToggle}
            kind={kind}
        ></ProceedSelection>}
    </Proceed>
    )
}

export default ProceedOption;