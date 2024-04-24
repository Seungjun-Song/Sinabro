import styled from 'styled-components'

import Post from "./Post";

const List = styled.div`
`
const Posts = ({kind}) => {
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
        <List>
        {postList.map((post, index) => (
            <Post
                key={index} post={post} kind={kind}
            >
            </Post>

        ))}
        </List>
    )
}

export default Posts;