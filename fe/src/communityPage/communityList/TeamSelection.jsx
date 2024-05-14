import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

import { GlobalColor } from '../../services/color'

const Selection = styled(motion.div)`
    position: absolute;
    z-index: 999;

    background-color: ${GlobalColor.colors.teamToggle};
    color: white;

    margin-top: 2%;
    width: 7rem;

    border: 2px solid ${ GlobalColor.colors.teamToggle};
    border-radius: 10px;

    font-family: LaundryGothicRegular;

    ${props => props.isDark && css`
        background-color: ${GlobalColor.colors.teamToggle_dark};
        border: 2px solid ${ GlobalColor.colors.teamToggle_dark};
    `}

`
const Option = styled(motion.div)`
    text-align: center
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

const Line = styled.hr`
    border-top: 2px solid gray;
    width: 70%;
    margin: 0.3rem auto;

`

const TeamSelection = ({teamOption, setTeamOption, setTeamToggle, isDark}) => {
    const teamList = [
        {
            id: 200,
            name: "Back"
        },
        {
            id: 100,
            name: "Front",
        },
    ]

    const changeOption = (option) => {
        setTeamOption(option);
        setTeamToggle(false);
    }

    return (
        <Selection
            {...toggleBoxMotion}
            isDark={isDark}
        >
            <Option onClick={() => changeOption({id: 0, name: "분야 선택"})}>
                분야 선택
                <Line/>
            </Option>
            {teamList.map((team, index) => (
                <motion.div
                key={index}
                variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 10 },
                }}
                transition={{ duration: 0.2 }}
            >
                <Option key={index} onClick={() => changeOption(team)}>
                    {team.name}
                    <Line/>
                </Option>
                </motion.div>
            ))}
        </Selection>
    )

}

export default TeamSelection;