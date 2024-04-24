import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import styled, { css } from 'styled-components'

import Navbar from '../../components/navs/Navbar';
import CreateMemberPost from './CreateMemberPost';
import CreateTeamPost from './CreateTeamPost';
import CreateFeadbackPost from './CreateFeadbackPost';

const Create = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 65%;
    margin: auto;

`
const Header = styled.div`
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

    ${props => props.selected && css`
        background: rgba(86, 76, 173, 1);
        color: rgba(240, 240, 240, 1);
    `}
`

const TeamChoice = styled.div`
    padding: 0.2rem 1rem;

    width: 15%;
    
    background: rgba(240, 240, 240, 1);
    color: rgba(86, 76, 173, 1);

    cursor: pointer; 
`

const CreatePage = () => {
    const location = useLocation();
    const data = location.state;

    const [selected, setSelected] = useState(data.kind);
    
    const changeOption = (option) => {
        setSelected(option);
    }

    return(
        <>
            <Navbar>
            </Navbar>
            <Create>
                <Header>
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
                        <TeamChoice>
                            팀 선택하기
                        </TeamChoice>
                    ) : ("")}
                </Header>

                {selected === "member" ? (
                    <CreateMemberPost>
                    </CreateMemberPost>
                ) : ("")}
                {selected === "team" ? (
                    <CreateTeamPost/>
                ) : ("")}
                {selected === "feadback" ? (
                    <CreateFeadbackPost/>
                ) : ("")}
            </Create>

        </>
    )
}

export default CreatePage;