import React, { useState } from 'react';
import styled from 'styled-components';
import SkillBox from './SkillBox';
import Navbar from '../components/navs/Navbar'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SurveyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('/images/survey_background.png');
  background-size: cover;
  background-position: center;
`;

const SurveyBox = styled.div`
  width: 640px;
  height: 400px;
  border: 3px solid #9AA5DE;
  border-radius: 10px;
  box-shadow: 0px 5px 5px black;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Title = styled.div`
  height: 20%;
  font-weight: bold;
  font-size: 2.5rem;
  color: #204FCF;
  margin-top: 5%;
`;

const Subtitle = styled.div`
  height: 10%;
  font-weight: bold;
`;

const SkillContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 40%;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 40%;
`

const SearchContainer = styled.div`
    width: 100%;
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    padding: 0.6rem;
    display: flex;
    align-items: center;
`

const SearchContainerLeftSide = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.3rem;
`

const SearchContainerRightSide = styled.div`
    height: 100%;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SkillDetail = styled.div`
    background-color: #F2F2F2;
    padding: 0.2rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    height: 1.8rem;
    border-radius: 0.8rem;
    display: flex;
    gap: 0.8rem;
    font-size: 0.8rem;
    align-items: center;
`

const SearchInput = styled.input`
    height: 1.8rem;
    flex: 1;
    border: none;
    outline: none;
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
    align-self: center;
`;

const SendButtonContainer = styled.div`
    display: flex;
    align-items: center;
    height: 25%;
`

const SendButton = styled.span`
    padding: 0.7rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    background-color: #566CDD;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    box-shadow: 0px 2px 2px black;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`

const SurveyPage = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [isFeSelected, setFeIsSelected] = useState(false)
    const [isBeSelected, setBeIsSelected] = useState(false)
    const [isFullSelected, setFullIsSelected] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const selectFeSkill = () => {
        if (!isSelected) {
            setIsSelected(!isSelected)
            setFeIsSelected(!isFeSelected)
        }
        else {
            if (isFeSelected) {
                setIsSelected(!isSelected)
                setFeIsSelected(!isFeSelected)
            }
        }
    }

    const selectBeSkill = () => {
        if (!isSelected) {
            setIsSelected(!isSelected)
            setBeIsSelected(!isBeSelected)
        }
        else {
            if (isBeSelected) {
                setIsSelected(!isSelected)
                setBeIsSelected(!isBeSelected)
            }
        }
    }

    const selectFullSkill = () => {
        if (!isSelected) {
            setIsSelected(!isSelected)
            setFullIsSelected(!isFullSelected)
        }
        else {
            if (isFullSelected) {
                setIsSelected(!isSelected)
                setFullIsSelected(!isFullSelected)
            }
        }
    }

    return (
        <SurveyContainer>
            <SurveyBox>
                <Title>
                    <p>기술 스택</p>
                </Title>
                {!isChecked === true ?
                    <>
                        <Subtitle>
                            <p>자신이 개발할 분야를 선택해주세요!</p>
                        </Subtitle>
                        <SkillContainer>
                            <div onClick={selectFeSkill}>
                                <SkillBox iconName='computer' borderColor='#3DC7AE' text='프론트 엔드' checked={isFeSelected} />
                            </div>
                            <div onClick={selectBeSkill}>
                                <SkillBox iconName='gear' borderColor='#315DCC' text='백 엔드' checked={isBeSelected} />
                            </div>
                            <div onClick={selectFullSkill}>
                                <SkillBox iconName='leaf' borderColor='#6C31CC' text='풀 스택' checked={isFullSelected} />
                            </div>
                        </SkillContainer>
                        <SendButtonContainer>
                            {isSelected &&
                                <SendButton onClick={() => setIsChecked(true)}>
                                    다음
                                </SendButton>
                            }
                        </SendButtonContainer>
                    </>
                    :
                    <>
                        <Subtitle>
                            <p>자신이 가진 기술 스택을 입력해주세요!</p>
                        </Subtitle>
                        <MainContainer>
                            <SearchContainer>
                                <SearchContainerLeftSide>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SkillDetail>
                                        {/* {없을 때 띄울 글자 생각해야함} */}
                                        React
                                        <SkillDelBtn>
                                            X
                                        </SkillDelBtn>
                                    </SkillDetail>
                                    <SearchInput />
                                </SearchContainerLeftSide>
                                <SearchContainerRightSide>
                                    <SearchIcon icon={faSearch} />
                                </SearchContainerRightSide>
                            </SearchContainer>
                        </MainContainer>
                        <SendButtonContainer>
                            <SendButton>
                                완료
                            </SendButton>
                        </SendButtonContainer>
                    </>
                }
            </SurveyBox>
        </SurveyContainer>
    );
}

export default SurveyPage;