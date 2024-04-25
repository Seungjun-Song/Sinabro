import styled, { css } from 'styled-components'
import { motion } from "framer-motion"

const MenuList = styled(motion.div)`
    display: flex;          
    flex-direction: column;  
    align-items: start;
    width: 20%;            
    padding-left: 10rem;  
    margin-top: 5rem;        
    gap : 0.3rem;
  
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

    font-family: Pretendard Regular;


    ${props => props.selected && css`
        color: rgba(32, 79, 207, 1);
        font-family: Pretendard Bold;
    `}
`

// 애니메이션 변형을 위한 variants 객체
const menuMotion = {
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    },
    transition: { duration: 0.3 }
};

const SideMenu = ({selected, setSelected}) => {
    return (
        <MenuList 
            {...menuMotion}
            style={{fontFamily: "Pretendard Medium"}}
        >
            <Menu onClick={() => {setSelected("member")}}
                    selected={selected === "member"}>
                팀원 구해요
            </Menu>
            <Menu onClick={() => setSelected("team")}
                    selected={selected === "team"}>
                팀 구해요
            </Menu>
            <Menu onClick={() => setSelected("feadback")}
                    selected={selected === "feadback"}>
                피드백 원해요
            </Menu>
        </MenuList>
    )
}

export default SideMenu;