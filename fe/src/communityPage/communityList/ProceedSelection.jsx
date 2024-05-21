import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

import { GlobalColor } from '../../services/color'

const Selection = styled(motion.div)`
    position: absolute;
    z-index: 999;

    background-color: ${ GlobalColor.colors.proceedToggle };
    color: white;

    margin-top: 3%;
    width: 8.5rem;

    border: 2px solid ${ GlobalColor.colors.proceedToggle };
    border-radius: 10px;

    ${props => props.isDark && css`
        background-color: ${ GlobalColor.colors.proceedToggle_dark };
        border: 2px solid ${ GlobalColor.colors.proceedToggle_dark };
    `}

`

const Option = styled(motion.div)`
    text-align: center;


    //font-family: LaundryGothicRegular;

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

    const selectToggleData = [
        {
            id: 0,
            name: "모두"
        },
        {
            id: 502,
            name: "모집 중",
        },
        {
            id: 503,
            name: "모집 완료",
        }

    ]

    const feadbackToggleData = [
        {
            id: 0,
            name: "모두"
        },
        { 
            id: 502,
            name: "요청 중",
        },
        {
            id: 503,
            name: "요청 완료",
        }
    ]

    return(
        <Selection
            {...toggleBoxMotion}
            isDark={isDark}
        >
            {kind.name === "team" || kind.name === "member" ? 
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
                            {option.name}
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
                        >{option.name}
                        <Line/>
                        </Option>
                    </motion.div>
                ))}

            </>)}

        </Selection>
    )
}


export default ProceedSelection;