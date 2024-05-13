import styled from 'styled-components'
import { motion } from "framer-motion"

import MoveToPjt from '/image/community/moveToPjt.png'
import { useNavigate } from 'react-router-dom'

const WriterBox = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 3rem;

    padding: 0.5rem 0.6rem 0.5rem 0.5rem;
    background: linear-gradient(to right, rgba(216, 245, 242, 1), rgba(242, 244, 179, 1));

    border: 1px solid rgba(216, 245, 242, 1);
    border-radius: 10px;

    color: black;


`

const WriterInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    height: 2rem;

    gap: 1rem;
`

const WriterProfile = styled.img`
    height: 3rem;

    border: 0px solid black;
    border-radius: 50px;

    height: 90%;

`

const WriterName = styled.div`
    font-family: Pretendard Medium;
`

const WriterLink = styled.img`
`

const WriterLinkBox = ({detailData}) => {

    const navigate = useNavigate();
    console.log("writerBox", detailData)
    return(
        <WriterBox
            whileHover={{ cursor: "pointer", y: -3}}
            onClick={() => navigate(`/writerPage`)}
        >
            <WriterInfo>
                <WriterProfile
                    src={detailData.writerprofile}>
                </WriterProfile>
                <WriterName>
                    @{detailData.writername}
                </WriterName>
            </WriterInfo>

        
            <WriterLink
                src={MoveToPjt}
            >
            </WriterLink>
        </WriterBox>
    )
}

export default WriterLinkBox;