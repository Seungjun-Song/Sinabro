import { useNavigate } from 'react-router'
import styled, { css } from 'styled-components'
import { motion } from "framer-motion";
import { GlobalColor } from '../../services/color';

import Jobs from './Jobs';

const Detail = styled(motion.div)`
    font-family: Pretendard Medium;

    margin: 1.5rem 0;

    cursor: pointer;

    &::hover{
        border-color: rgba(0, 0, 0, 0.1);
    }
`

const MainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`
const Proceed = styled.div`
    background: ${ GlobalColor.colors.proceeded };

    border: 0px solid rgba(144, 158, 231, 0.4);
    border-radius: 7px;

    font-family: LaundryGothicRegular;
    color: rgba(52, 69, 156, 1);
    font-size: 70%;

    padding: 0.2rem 0.9rem;

    ${props => props.proceed && css`
        background: ${ GlobalColor.colors.proceeding};
        padding: 0.2rem 0.6rem;
    `}

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.proceeded_dark };
        color: white;

        ${props => props.proceed && css`
        background: ${ GlobalColor.colors.proceeding_dark};
        padding: 0.2rem 0.6rem;
        color: black;
        `}

    `}
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    font-family: Pretendard SemiBold;
`

const Content = styled.div`

display: flex;
align-items: center;
justify-content: space-between;
    font-size: 0.8rem;

    padding: 0.8rem;
`

const PlusInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Hashs = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`

const Hash = styled.div`
    background: ${ GlobalColor.colors.tag };

    border: 0px solid ${ GlobalColor.colors.tag };
    border-radius: 5px;

    color: ${ GlobalColor.colors.tagFont };
    font-size: 0.7rem;

    padding: 0.1rem 1rem;

    box-shadow: 3px 4px 3px #f5f5f5;

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.tag_dark };
        color: white;
        box-shadow: 3px 4px 3px gray;

    `}

`

const WriteInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family: Pretendard SemiBold;
    font-size: 0.7rem;
`

const Writer = styled.div`
`

const Date = styled.div`
`

const Post = ({post, kind, isDark}) => {    
    const navigate = useNavigate();

    return(
        <Detail 
            onClick={() => navigate('/communityDetail', {state: {kind: kind, postId: post.id} })}
            whileHover={{ cursor: "pointer", y: -3, scale: 1.05}}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', margin: '0 0 1rem 0'}}>
            <div>
            <MainInfo>
                <Proceed
                    proceed={post.proceed === false}
                    isDark={isDark}
                >
                    {kind.name === "member" || kind.name === "team" ?
                    (<>
                        {post.proceed === true ? 
                            (<>모집 중</>)
                            :
                            (<>모집 완료</>)
                        }
                    </>)
                    :
                    (<>
                        {post.proceed === true ? 
                            (<>구걸 중</>)
                            :
                            (<>구걸 완료</>)
                        }
                    
                    </>)}
                </Proceed>
                <Title>
                    {post.title}
                </Title>

                {/* <Jobs
                    kind={kind}
                    post={post}
                >
                </Jobs> */}
            </MainInfo>

            <Content>
            {new DOMParser().parseFromString(post.content, "text/html").body.textContent}
            {/* <Jobs
                    kind={kind}
                    post={post}
                >
            </Jobs> */}
            </Content>
            </div>
            <div>
                <Jobs
                    kind={kind}
                    post={post}
                >
            </Jobs>
            </div>
            </div>
            <PlusInfo>
                <Hashs>
                    {post.hash && post.hash.length > 0 && post.hash.map((tag, index) => {
                        return(    
                            <>
                            {tag.subCategoryName !== "" && 
                                <Hash 
                                    key={index}
                                    isDark={isDark}
                                >
                                    {tag.subCategoryName}
                                </Hash>
                            }
                        </>
                        )
                    })}
                </Hashs>
                <WriteInfo>
                    <Writer>
                        {post.writer}
                    </Writer>
                    .
                    <Date>
                        {post.time}
                    </Date>
                </WriteInfo>
            </PlusInfo>
        </Detail>
    )
}

export default Post;
