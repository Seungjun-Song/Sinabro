import styled, { css } from 'styled-components'

import MoveToPjt from '/image/community/moveToPjt.png'
import CommentWindow from './CommentWindow'

import ProfileTempImg from '/images/default_my_image.png'
import PjtImg from '/image/community/pjtTempImg.png'


const Detail = styled.div`
    display: flex;        
    flex-direction: column;
    width: 50%;
    margin: 4rem 20rem 0 5rem;

`

const Header = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;    
`

const MainInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 1rem;

    width: 100%;
    background: white;
`

const Proceed = styled.div`
    background: rgba(144, 158, 231, 0.4);

    border: 0px solid rgba(144, 158, 231, 0.4);
    border-radius: 7px;

    font-family: LaundryGothicRegular;
    color: rgba(52, 69, 156, 1);
    font-size: 70%;

    padding: 0.2rem 0.9rem;

    font-family: LaundryGothicRegular;

${props => props.$proceed && css`
    background: rgba(161, 175, 247, 1);
    padding: 0.2rem 0.6rem;
`}
`

const Title = styled.div`
`

const PlusInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 1rem 0 0 0;

    width: 100%;
    height: 2rem;
`

const Writer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 1rem;
    height: 100%;
`

const ProfileImg = styled.img`
    height: 90%;
`

const Date = styled.div`
    font-size: 80%;
`

const Middle = styled.div`
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

const Project = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 3rem;

    padding: 0.5rem 0.6rem 0.5rem 0.5rem;
    background: rgba(216, 245, 242, 1);

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
`

const PjtLink = styled.img`
`

const Comment = styled.div`
    background: green;
`

const Line = styled.hr`
`
const DetailMember = () => {
    const detailData = {
        id: 1,
        title: "웹 프로젝트 팀원 구합니다!",
        content: "웹 프로젝트 진행 예정임 팀원 구함. 현재 백 2명, 프론트3명있음 디자이너 급구합니다. 프로젝트의 주제는 너와 나의 연결고.....",
        hash: ["spring boot", "커피", "백엔드"],
        writername: "sil", 
        writerprofile: ProfileTempImg,
        time: "2024-01-03",
        proceed: true,
        projectId: 1,
        kind: "team"
    }

    const projectData = {
        id: 1,
        title: "BUNG",
        projectImg: PjtImg,

    }
    
    return(
        <Detail>
            <Header>
                <MainInfo>
                <Proceed
                    $proceed={detailData.proceed === false}
                >
                    {detailData.proceed === true ? 
                            ("모집 중")
                            :
                            ("모집 완료")
                    }
                </Proceed>
                    <Title>
                        {detailData.title}
                    </Title>
                </MainInfo>
                <PlusInfo>
                    <Writer>
                        <ProfileImg
                            src={detailData.writerprofile}
                        />
                        @{detailData.writername}
                    </Writer>
                    <Date>
                        {detailData.time}    
                    </Date>                    
                </PlusInfo>
            </Header>

            <Line/>
            
            <Middle>
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

                    <Project>
                        <PjtInfo>
                            <PjtProfile
                                src={projectData.projectImg}>
                            </PjtProfile>
                            <PjtName>
                                {projectData.title}
                            </PjtName>
                        </PjtInfo>

                        
                        <PjtLink
                            src={MoveToPjt}
                        >
                        </PjtLink>
                    </Project>
                </Bottom>
            </Middle>
            
            <Line/>

            <CommentWindow/>
        </Detail>
    )
}

export default DetailMember;