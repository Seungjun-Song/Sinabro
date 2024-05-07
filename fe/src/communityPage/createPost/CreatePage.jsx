import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled, { css } from 'styled-components'
import { motion } from "framer-motion"
import { useSelector } from "react-redux";
import { Modal } from 'react-bootstrap';

import Navbar from '../../components/navs/Navbar';
import CreateMemberPost from './CreateMemberPost';
import CreateTeamPost from './CreateTeamPost';
import CreateFeadbackPost from './CreateFeadbackPost';
import TeamChoiceBox from './TeamChoiceBox';

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

    const [ selected, setSelected ] = useState(data.kind);

    const [ postContent, setPostContent ] = useState({
        title: '',
        content: '',
        tag: ''
    });

    const isDark = useSelector(state =>state.isDark.isDark);

    const changeOption = (option) => {
        setSelected(option);
    }



    return(
        <>
            <Navbar>
            </Navbar>
            <Back style={{transition:"0.3s"}} isDark={isDark}>
            <Create
                isDark={isDark}
            >
                <Header
                    {...headerMotion}
                >
                    <Options>
                    <Option onClick={() => changeOption("member")}
                        selected={selected === "member"}>
                        팀원 구해요
                    </Option>
                    <Option onClick={() => changeOption("team")}
                        selected={selected === "team"}>
                        팀 구해요
                    </Option>
                    <Option onClick={() => changeOption("feadback")}
                        selected={selected === "feadback"}>
                        피드백 원해요
                    </Option>
                    </Options>
                    {selected === "member" || selected === "feadback" ? (
                        <TeamChoiceBox/>
                    ) : ("")}
                </Header>

                {selected === "member" ? (
                    <CreateMemberPost
                        isDark={isDark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                    />
                ) : ("")}
                {selected === "team" ? (
                    <CreateTeamPost
                        isDark={isDark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                        
                    />
                ) : ("")}
                {selected === "feadback" ? (
                    <CreateFeadbackPost
                        isDark={isDark}
                        postContent={postContent}
                        setPostContent={setPostContent}
                    />
                ) : ("")}
            </Create>
            </Back>
        </>
    )
}

export default CreatePage;