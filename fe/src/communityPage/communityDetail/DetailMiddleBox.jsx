import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

import PjtLinkBox from './PjtLinkBox'
import WriterLinkBox from './WriterLinkBox'

import { GlobalColor } from '../../services/color'

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

    font-size: 1.5rem;

    font-family: Jamsil Light;
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

    flex-wrap: wrap;
    gap: 1rem;
    margin: 0 0 1.5rem 0;

`

const Hash = styled.div`
    background: ${ GlobalColor.colors.tag};

    border: 0px solid ${ GlobalColor.colors.tag};
    border-radius: 5px;

    color: ${ GlobalColor.colors.tagFont};
    font-size: 1rem;

    padding: 0.1rem 1rem;

    box-shadow: 3px 4px 3px #f5f5f5;

    ${props => props.isDark && css`
    background: ${ GlobalColor.colors.tag_dark };
    color: white;
    box-shadow: 3px 4px 3px gray;

`}

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

const LinkBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;

`

const DetailMiddle = ({detailData, pjtData, kind, isDark}) => {

    return(
    <Middle
    >
        <Content dangerouslySetInnerHTML={{ __html : detailData.content}}>
        </Content>
        <Bottom>
            <Hashs>
                {detailData.hash && detailData.hash.length > 0 && detailData.hash.map((tag, index) => {
                    return( 
                        <>
                        {tag.subCategoryName !== "" &&
                            <Hash key={index}
                                isDark={isDark}>
                                {tag.subCategoryName}
                            </Hash> 
                        }                       
                        </>
                    )
                })}
            </Hashs>
        </Bottom>
        <LinkBox>
        {kind.name === "team" ? (
                <WriterLinkBox
                    detailData={detailData}
                />
            ) : 
            (
                <PjtLinkBox
                pjtData={pjtData}
            />
            )}
        </LinkBox>
    </Middle>
    )
}

export default DetailMiddle;