import React from 'react';
import styled from 'styled-components';
import SkillBox from './SkillBox';

const SurveyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  width: 100%;
`;

const SurveyPage = () => {
  return (
    <SurveyContainer>
      <SurveyBox>
        <Title>
          <p>기술 스택</p>
        </Title>
        <Subtitle>
          <p>자신이 개발할 분야를 선택해주세요!</p>
        </Subtitle>
        <SkillContainer>
          <SkillBox iconName='computer' borderColor='#3DC7AE' text='프론트 엔드'/>
          <SkillBox iconName='gear' borderColor='#315DCC' text='백 엔드'/>
          <SkillBox iconName='leaf' borderColor='#6C31CC' text='풀 스택'/>
        </SkillContainer>
      </SurveyBox>
    </SurveyContainer>
  );
}

export default SurveyPage;
