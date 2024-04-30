import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

import Post from "./Post";

const List = styled(motion.div)`
    margin: 2rem;

    ${props => props.isDark && css`
        color: white;
    `}
    
`

const listMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}

const Line = styled.hr`
`

const Posts = ({kind, isDark}) => {
    const postList = [
        {
            id: 1,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: true,
        },
        {
            id: 2,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: false,
        },
        {
            id: 3,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: false,
        },
        {
            id: 4,
            title: "웹 프로젝트 팀원 구합니다!",
            content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
            hash: ["spring boot", "커피", "백엔드"],
            writer: "sil",
            time: "2024-01-03",
            proceed: true,
        },

    ]




    return(
        <List
            {...listMotion}
            isDark={isDark}
        >
        {postList.map((post, index) => (
            <>
            <Line key={index}/>
            <Post
                key={index} 
                post={post} 
                kind={kind}
                isDark={isDark}
            >
            </Post>
            </>
        ))}
        </List>
    )
}

export default Posts;