import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyPageMainPanelContainer = styled.div`
    border: 3px solid #A2A2A2;
    width: 70%;
    overflow-y: auto;
    margin-bottom: 3rem;
    border-radius: 1rem;
    margin-left: 1rem;
    padding-left: 4rem;
    padding-right: 4rem;
    max-height: 550px;
`;

const InnerArea = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const InnerText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #204FCF;
`;

const InnerBox = styled.div`
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
`;

const SkillBox = styled.div`
    background-color: #F2F2F2;
    padding: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
    border-radius: 0.8rem;
    display: flex;
    gap: 1rem;
`

const SkillDelBtn = styled.div`
    color: #39A0BA;
    font-weight: bold;
    cursor: pointer;
`

const SearchIcon = styled(FontAwesomeIcon)`
    color: #613ACD;
    cursor: pointer;
    margin-left: auto;
`;

const PjtImg = styled.img`
    width: 25%;
    padding: 1rem;
`

const MyPageMainPanel = () => {

    return (
        <MyPageMainPanelContainer>
            <InnerArea>
                <InnerText>
                    Skills
                </InnerText>
                <InnerBox>
                    <SkillBox>
                        {/* {없을 때 띄울 글자 생각해야함} */}
                        React
                        <SkillDelBtn>
                            X
                        </SkillDelBtn>
                    </SkillBox>
                    <SearchIcon icon={faSearch} />
                </InnerBox>
            </InnerArea>
            <InnerArea>
                <InnerText>
                    Works
                </InnerText>
                <InnerBox style={{padding: '0', gap: '0', marginBottom: '1rem'}}>
                    {/* {없을 때 띄울 글자, 각 프로젝트로 링크 연결해야함} */}
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                    <PjtImg src={'/images/default_pjt_img.png'}/>
                </InnerBox>
            </InnerArea>
        </MyPageMainPanelContainer>
    );
};

export default MyPageMainPanel;
