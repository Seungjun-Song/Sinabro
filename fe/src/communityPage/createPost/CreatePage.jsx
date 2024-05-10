import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components'
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { Modal } from 'react-bootstrap';

import Navbar from '../../components/navs/Navbar';
import CreateMemberPost from './CreateMemberPost';
import CreateTeamPost from './CreateTeamPost';
import CreateFeadbackPost from './CreateFeadbackPost';
import TeamChoiceBox from './TeamChoiceBox';
import { faDesktop, faCog, faLeaf } from '@fortawesome/free-solid-svg-icons';

import { GlobalColor } from '../../services/color';

const Back = styled.div`
    height: 100%;

    ${props => props.isDark && css`
        background: ${GlobalColor.colors.primary_black};
    `}
`
const Create = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 65%;
    margin: 4rem auto 0 auto;
`
const Header = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    
`

const Options = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    gap: 1rem;

    margin: 3rem;

    width:100%;
`

const Option = styled.div`

    padding: 0.2rem 1rem;
    
    background: rgba(240, 240, 240, 1);
    color: rgba(86, 76, 173, 1);

    cursor: pointer; 
    
    font-family: Jamsil Regular;

    border: 0px solid black;
    border-radius: 10px;

    ${props => props.selected && css`
        background: rgba(86, 76, 173, 1);
        color: rgba(240, 240, 240, 1);
    `}
`

const headerMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    },
    transition: { duration: 0.3 }
}

const CreatePage = () => {
    const location = useLocation();
    const data = location.state;

    const [ selected, setSelected ] = useState({id: data.kind.id, name: data.kind.name});
    const [ postContent, setPostContent ] = useState({
        id: 0,
        title: '',
        content: '',
        tag: ''
    });
    const myProjectList = useSelector(state => state.myProjectList.value)

    const [ selectedPjt, setSelectedPjtId ] = useState({
        id: -1,
        projectName: "",
        projectImg: "",
    });

    const [ jobInfo, setJobInfo ] = useState([
            {
                id: 1,
                name: "백",
                borderColor: "#315DCC",
                icon: faCog,
                target: 0,
                total: 0,
            },
            {
                id: 2, 
                name: "프론트",
                borderColor: "#3DC7AE",
                icon: faDesktop,
                target: 0,
                total: 0,
            }
    ]);

    useEffect(() => {//글 수정시 데이터 초기세팅
        if(!data.isCreate){
            const post = data.detailData;

            //태그는 문자열로
            let tags = "";
            if(post.hash && post.hash.length > 0){
                post.hash.map((tag) => {
                    tags += tag.subCategoryName + " ";
                })
            }

            setPostContent({
                id: post.id,
                title: post.title,
                content: post.content,
                tag: tags,
                // recruitedBack: post.recruitedBack,
                // recruitedFront: post.recruitedFront,
                // requiredBack: post.requiredBack,
                // requiredFront: post.requiredFront,

            })

            //프로젝트 정보
            if(post.projectId !== null && post.projectId > 0){
                if(myProjectList && myProjectList.length > 0){
                    myProjectList.map((pjt, index) =>{
                        if(pjt.projectId == post.projetId){
                            
                            setSelectedPjtId({
                                id: pjt.projectId,
                                projectName: pjt.projectName,
                                projectImg: pjt.projectImg
                            })
                        }
                    })
                }
            }

            //인원수 정보
            if(data.kind.name === "member"){
                setJobInfo([
                    {
                        id: 1,
                        name: "백",
                        borderColor: "#315DCC",
                        icon: faCog,
                        target: post.requiredBack,
                        total: post.recruitedBack,
                    },
                    {
                        id: 2, 
                        name: "프론트",
                        borderColor: "#3DC7AE",
                        icon: faDesktop,
                        target: post.requiredFront,
                        total: post.recruitedFront,
                    }
                ])
            }
        }
    }, [])

    const isdark = useSelector(state =>state.isDark.isDark);

    const changeOption = (option) => {
        setSelected(option);
    }

    return(
        <>
            <Navbar>
            </Navbar>
            <Back style={{transition:"0.3s"}} isDark={isdark}>
            <Create
                isDark={isdark}
            >
                <Header
                    {...headerMotion}
                >
                    <Options>
                    <Option onClick={() => changeOption({id: 401, name: "member"})}
                        selected={selected.name === "member"}>
                        팀원 구해요
                    </Option>
                    <Option onClick={() => changeOption({id: 402, name: "team"})}
                        selected={selected.name === "team"}>
                        팀 구해요
                    </Option>
                    <Option onClick={() => changeOption({id: 403, name: "feadback"})}
                        selected={selected.name === "feadback"}>
                        피드백 원해요
                    </Option>
                    </Options>
                    {selected.name === "member" || selected.name === "feadback" ? (
                        <TeamChoiceBox
                            selectedPjt={selectedPjt}
                            setSelectedPjt={setSelectedPjtId}
                            myProjectList={myProjectList}
                        />
                    ) : ("")}
                </Header>

                {selected.name === "member" ? (
                    <CreateMemberPost
                        isdark={isdark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                        selectedPjtId={selectedPjt.id}
                        jobInfo={jobInfo}
                        setJobInfo={setJobInfo}
                    />
                ) : ("")}
                {selected.name === "team" ? (
                    <CreateTeamPost
                        isdark={isdark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                        
                    />
                ) : ("")}
                {selected.name === "feadback" ? (
                    <CreateFeadbackPost
                        isdark={isdark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                        selectedPjtId={selectedPjt.id}
                    />
                ) : ("")}
            </Create>
            </Back>
        </>
    )
}

export default CreatePage;