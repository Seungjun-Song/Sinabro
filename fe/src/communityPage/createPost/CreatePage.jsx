import { useLocation } from 'react-router-dom';
import styled from 'styled-components'

import Navbar from '../../components/navs/Navbar';

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
`

const TeamChoice = styled.div`
`

const CreatePage = () => {
    const location = useLocation();
    const data = location.state;
    
    const changeOption = () => {

    }

    return(
        <>
            <Navbar>
            </Navbar>
            <Create>
                <Header>
                    <Options>
                    <Option onClick={() => changeOption("member")}>
                        팀원 구해요
                    </Option>
                    <Option onClick={() => changeOption("team")}>
                        팀 구해요
                    </Option>
                    <Option onClick={() => changeOption("feadback")}>
                        피드백 원해요
                    </Option>
                    </Options>
                    <TeamChoice>
                        팀선택
                    </TeamChoice>
                </Header>

                {data.kind === "member" ? (
                    "member"
                ) : ("")}
                {data.kind === "team" ? (
                    "team"
                ) : ("")}
                {data.kind === "feadback" ? (
                    "feadback"
                ) : ("")}
            </Create>

        </>
    )
}

export default CreatePage;