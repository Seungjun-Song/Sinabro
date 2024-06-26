import { useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { GlobalColor } from '../../services/color'

const MenuList = styled.div`
    display: flex;          
    flex-direction: column;  
    align-items: start;
    width: 20%;            
    padding-left: 8rem;  
    margin: 5rem 0 0 4rem;        
    gap : 0.3rem;

    font-size: 1.2rem;
  
    position: relative;

    &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 2%; // 상단에서 25% 위치부터 시작
        bottom: 2%; // 하단에서 25% 위치까지
        width: 2px; // 테두리의 너비
        background-color: #BEBEBE; // 테두리의 색상
    }
`

const Menu = styled.button`
    background-color: white; // 배경색을 하얗게 설정
    border: none; // 테두리 제거
    color: black; // 글자색 설정
    text-align: left;


    ${props => props.selected && css`
        color: rgba(32, 79, 207, 1);
        font-family: Pretendard Bold;
    `}

    ${props => props.isDark && css`
        background: ${ GlobalColor.colors.primary_black };
        color: white;
        ${props => props.selected && css`
            color: ${ GlobalColor.colors.sideMenu_select_dark };
            font-family: Pretendard Bold;
        `}
    `}

    transition: 0.3s;
`
const DetailSideMenu = ({selected, isDark}) => {

    const navigate = useNavigate();

    return (
        <MenuList style={{fontFamily: "Pretendard Medium"}}>
            <Menu onClick={() => {navigate('/communityMainPage', {state: {kind: {id: 401, name: "member"}, page: 1}})}}
                    selected={selected.name === "member"}
                    isDark={isDark}>
                팀원 구해요
            </Menu>
            <Menu onClick={() => navigate('/communityMainPage', {state: {kind: {id: 402, name: "team"}, page: 1}})}
                    selected={selected.name === "team"}
                    isDark={isDark}>
                팀 구해요
            </Menu>
            <Menu onClick={() => navigate('/communityMainPage', {state: {kind: {id: 403, name: "feadback"}, page: 1}})}
                    selected={selected.name === "feadback"}
                    isDark={isDark}>
                피드백 원해요
            </Menu>
        </MenuList>
    )
}

export default DetailSideMenu;