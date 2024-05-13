import styled from 'styled-components'
import { motion } from "framer-motion"

import MoveToPjt from '/image/community/moveToPjt.png'
import { useNavigate } from 'react-router-dom'

const Box = styled(motion.div)`
    font-size: 0.5rem;
    color: rgba(171, 171, 171, 1);
`
const Project = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 3rem;

    padding: 0.5rem 0.6rem 0.5rem 0.5rem;
    background: linear-gradient(to right, rgba(216, 245, 242, 1), rgba(242, 244, 179, 1));

    border: 1px solid rgba(216, 245, 242, 1);
    border-radius: 10px;


`

const PjtInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`

const PjtProfile = styled.img`
    height: 3rem;
`

const PjtName = styled.div`
    font-family: Pretendard Medium;
    font-size: 1rem;
    color: black;
`

const Link = styled.img`
`

const pjtMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    },
    transition: { duration: 0.3 }
}

const PjtLinkBox = ({pjtData}) => {

    const navigate = useNavigate();
    console.log("in box", pjtData)
    return(
        <Box
            {...pjtMotion}
        >
            게시글과 관련된 프로젝트 정보를 확인해보세요 !
        <Project
            whileHover={{ cursor: "pointer", scale: 1.05}}
            transition={{ type: "spring", stiffness: 100 }}
            onClick={() => navigate(`/TeamSpaceDetailPage/${pjtData.id}`)}
        >
            <PjtInfo>
                <PjtProfile
                    src={pjtData.projectImg}>
                </PjtProfile>
                <PjtName>
                    {pjtData.title}
                </PjtName>
            </PjtInfo>

        
            <Link
                src={MoveToPjt}
            >
            </Link>
        </Project>
        </Box>
    )
}

export default PjtLinkBox;