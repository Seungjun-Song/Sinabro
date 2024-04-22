import React, { useState } from 'react';
import styled from 'styled-components';
import SkillBox from './SkillBox';
import Navbar from '../components/navs/Navbar'

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
      <>
      <Navbar></Navbar>
        <SurveyContainer>
            <SurveyBox>
                <Title>
                    <p>기술 스택</p>
                </Title>
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
                        <SendButton>
                            완료
                        </SendButton>
                    }
                </SendButtonContainer>
            </SurveyBox>
        </SurveyContainer>
        </>
    );
}

export default SurveyPage;
