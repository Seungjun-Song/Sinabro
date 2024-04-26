import styled from 'styled-components'
import { motion } from "framer-motion"

import PjtLinkBox from './PjtLinkBox'
import WriterLinkBox from './WriterLinkBox'

const Middle = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

`
const Content = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 0 2rem 0;
`

const Bottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`

const Hashs = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`

const Hash = styled.div`
    background: rgba(58, 207, 189, 0.2);

    border: 0px solid rgba(58, 207, 189, 0.2);
    border-radius: 5px;

    color: rgba(29, 102, 94, 1);
    font-size: 0.7rem;

    padding: 0.1rem 1rem;

`
const middleMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}

const DetailMiddle = ({detailData, pjtData, kind}) => {
    return(
    <Middle
        {...middleMotion}
    >
        <Content>
            {detailData.content}
        </Content>
        <Bottom>
            <Hashs>
                {detailData.hash.map((tag, index) => {

                    return( 
                        <Hash className='shadow' key={index}>
                            {tag}
                        </Hash>
                    )
                })}
            </Hashs>

            {kind === "team" ? (
                <WriterLinkBox
                    detailData={detailData}
                />
            ) : 
            (
                <PjtLinkBox
                pjtData={pjtData}
            />
            )}

        </Bottom>
    </Middle>
    )
}

export default DetailMiddle;