import { useNavigate } from 'react-router'
import styled, { css } from 'styled-components'

const Detail = styled.div`
    font-family: Pretendard Medium;

    margin: 1.5rem 0;

    cursor: pointer;
`

const MainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;
`
const Proceed = styled.div`
    background: rgba(144, 158, 231, 0.4);

    border: 0px solid rgba(144, 158, 231, 0.4);
    border-radius: 7px;

    font-family: LaundryGothicRegular;
    color: rgba(52, 69, 156, 1);
    font-size: 70%;

    padding: 0.2rem 0.9rem;

    ${props => props.$proceed && css`
        background: rgba(161, 175, 247, 1);
        padding: 0.2rem 0.6rem;
    `}
`

const Title = styled.div`
    font-family: Pretendard SemiBold;
`

const Content = styled.div`
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
    background: rgba(58, 207, 189, 0.2);

    border: 0px solid rgba(58, 207, 189, 0.2);
    border-radius: 5px;

    color: rgba(29, 102, 94, 1);
    font-size: 0.7rem;

    padding: 0.1rem 1rem;

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

const Post = ({post, kind}) => {    
    const navigate = useNavigate();

    return(
        <Detail onClick={() => navigate('/communityDetail', {state: {kind: kind} })}>
            <MainInfo>
                <Proceed
                    $proceed={post.proceed === false}
                >
                    {kind === "member" || kind === "team" ?
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
            </MainInfo>

            <Content>
                {post.content}
            </Content>

            <PlusInfo>
                <Hashs>
                    {post.hash.map((tag, index) => {

                        return( 
                            <Hash className='shadow' key={index}>
                                {tag}
                            </Hash>
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
