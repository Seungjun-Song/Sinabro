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

const Posts = ({kind, isDark, postList}) => {

    return(
        <List
            {...listMotion}
            isDark={isDark}
        >

        {postList && postList.length > 0 && postList.map((post, index) => (
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