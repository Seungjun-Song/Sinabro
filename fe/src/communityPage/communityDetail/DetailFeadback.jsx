import styled from 'styled-components'

import CommentWindow from './CommentWindow'

import ProfileTempImg from '/images/default_my_image.png'
import PjtImg from '/image/community/pjtTempImg.png'
import DetailHeader from './DetailHeader'
import DetailMiddle from './DetailMiddleBox'

const Detail = styled.div`
    display: flex;        
    flex-direction: column;
    width: 50%;
    margin: 4rem 20rem 0 5rem;

`

const Line = styled.hr`
`
const DetailFeadback = () => {
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
            <DetailHeader
                kind="feadback"
                detailData={detailData}
            />
            
            <Line/>
            <DetailMiddle
                detailData={detailData}
                pjtData={projectData}
                kind="feadback"
            />
            
            <Line/>

            <CommentWindow/>
        </Detail>
    )
}

export default DetailFeadback;