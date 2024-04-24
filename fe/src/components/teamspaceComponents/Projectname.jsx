import styled from "styled-components";
import "./Projectname.css";
import {motion} from "framer-motion"
const ProjectNameContainer = styled.div`
  display: flex;
  gap: 5rem;
  align-items: center;
  width: 60%;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Image = styled.img`
  height: 13rem;
  width: 13rem;
`;
const Input = styled.input`
  background-color: #7375ca;
  border: none;
  color: white;
  outline: none;

  &::placeholder {
    color: white; /* placeholder 텍스트의 색상을 설정합니다. */
  }
`;

const Button = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  background: white;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  
  &.shadow {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;

const ProjectName = ({ setProjectName, projectName }) => {

  return (
    <ProjectNameContainer>
      <ImageContainer className="align-items-center">
        <Image className="shadow" src="/images/pjtimg.png" />
        <Button whileHover={{y:-5}} className="shadow mt-3">
          <h5 style={{ fontSize: "1rem", marginBottom: 0 }}>대표이미지 설정</h5>
        </Button>
      </ImageContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <h1>프로젝트 명</h1>
        <div
          className="py-3 px-4 shadow"
          style={{
            backgroundColor: "#7375CA",
            borderRadius: "7px",
            width: "20rem",
          }}
        >
          <Input
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="프로젝트 명을 입력해 주세요!"
            value={projectName}
          />
        </div>
      </div>
    </ProjectNameContainer>
  );
};

export default ProjectName;
