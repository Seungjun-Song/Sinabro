import styled from "styled-components";

import Go from "./../../../public/image/nav/goTeamSpace.png";
import TempImg from "./../../../public/image/nav/tempPjtImg.png";

const TeamDetail = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  background-color: white;
  /* padding-left:1rem; */
  padding-right:1rem;
  width: 13rem;
`;

const TotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TeamImage = styled.img`
  width: 1.8rem;
  justify-content: center;

  margin: 0.5rem;
`;

const TeamInfo = styled.div``;

const TeamName = styled.div`
  font-weight: bold;
  font-size: 0.8rem;
`;

const TeamDate = styled.div`
  font-size: 0.5rem;

  color: rgba(183, 183, 183, 1);
`;

const PjtLink = styled.img`
  align-self: center;
`;

const Team = ({ team }) => {
  //TODO : team 구성요소 변수명 맞춰야함
  return (
    <TeamDetail>
      <TotalInfo>
        <TeamImage src={team.projectImg}></TeamImage>

        <TeamInfo>
          <TeamName>{team.projectName}</TeamName>
          {/* <TeamDate>{team.date}</TeamDate> */}
        </TeamInfo>
      </TotalInfo>
      <PjtLink src={Go}></PjtLink>
    </TeamDetail>
  );
};

export default Team;
