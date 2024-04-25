import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

import WriteIcon from '/image/community/writeIcon.png'

const Button = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: start;

    background: rgba(86, 76, 173, 1);

    border: 2px solid rgba(86, 76, 173, 1);
    border-radius: 50px;

    width: 8rem;
    gap: 0.5rem;

    font-family: LaundryGothicRegular;
    color: white;

    padding: 0 0.8rem;
`
const WriteButton = ({kind}) => {

    const navigate = useNavigate()
    
    return(
        <Button className='shadow'
            onClick={() => navigate('/createPost', {state: {kind: kind}})}
            whileHover={{cursor: "pointer", y: -3}}
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