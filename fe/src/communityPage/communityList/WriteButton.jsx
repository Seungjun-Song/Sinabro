import styled, { css } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

import WriteIcon from '/image/community/writeIcon.png'
import { GlobalColor } from '../../services/color';

const Button = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: start;

    background: ${ GlobalColor.colors.writeButton};

    border: 2px solid ${ GlobalColor.colors.writeButton};
    border-radius: 50px;

    width: 8rem;
    gap: 0.5rem;

    font-family: LaundryGothicRegular;
    color: white;

    padding: 0 0.8rem;
    
    box-shadow: 3px 4px 3px gray;

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.writeButton_dark};
        border: 2px solid ${ GlobalColor.colors.writeButton_dark};
    `}
`
const WriteButton = ({kind, isDark}) => {

    const navigate = useNavigate()
    
    return(
        <Button
            onClick={() => navigate('/createPost', {state: {kind: kind}})}
            whileHover={{cursor: "pointer", y: -3}}
            isDark={isDark}
            >
        <img
            src={WriteIcon}
        >
        </img>{" "}
        글 쓰기
        </Button>
    )
}

export default WriteButton;