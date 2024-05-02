import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

import { GlobalColor } from '../../services/color'

const Selection = styled(motion.div)`
    position: absolute;
    z-index: 999;

    background-color: ${ GlobalColor.colors.proceedToggle };
    color: white;

    margin-top: 2%;
    width: 7rem;

    border: 2px solid ${ GlobalColor.colors.proceedToggle };
    border-radius: 10px;

    ${props => props.isDark && css`
        background-color: ${ GlobalColor.colors.proceedToggle_dark };
        border: 2px solid ${ GlobalColor.colors.proceedToggle_dark };
    `}

`

const Option = styled(motion.div)`
    text-align: center;


    font-family: LaundryGothicRegular;

`

const Line = styled.hr`
    border-top: 2px solid gray;
    width: 70%;
    margin: 0.3rem auto;

`

const toggleBoxMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        visible: { opacity: 1, 
                    transition: {
                        when: "beforeChildren",
                        staggerChildren: 0.1,
                    },
                    y: 0
                },
        hidden: { opacity: 0, y: 10 },
    },
    transition: { duration: 0.3 }
}

const ProceedSelection = ({proceedOption, setProceedOption, setProceedToggle, kind, isDark}) => {

    const changeOption = (option) => {
        setProceedOption(option);
        setProceedToggle(false);
    }

    const selectToggleData = ["모두", "모집 중", "모집 완료"];
    const feadbackToggleData = ["모두", "구걸 중", "구걸 완료"]

    return(
        <Selection
            {...toggleBoxMotion}
            isDark={isDark}
        >
            {kind === "team" || kind === "member" ? 
            (<>
                {selectToggleData.map((option, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 10 },
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <Option 
                            key={index}
                            onClick={() => changeOption(option)}    
                        >
                            {option}
                            <Line/>
                        </Option>
                        
                    </motion.div>
                ))}
            </>)
            :
            (<>
                {feadbackToggleData.map((option, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 10 },
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <Option 
                            key={index}
                            onClick={() => changeOption(option)}
                        >{option}</Option>
                    </motion.div>
                ))}

            </>)}

        </Selection>
    )
}


export default ProceedSelection;