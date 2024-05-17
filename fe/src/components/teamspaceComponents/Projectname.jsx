import styled from "styled-components";
import "./Projectname.css";
import { motion } from "framer-motion";
import { GlobalColor } from "../../services/color";
import { useDispatch } from "react-redux";
import { saveProjectImg, saveProjectName } from "../../store/projectCreateSlice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../../firebase";

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
  align-items: flex-end;
`;

const Image = styled.img`
  height: 13rem;
  width: 13rem;
`;
const Input = styled.input`
  border: none;
  color: ${(props) => (props.isDark ? "black" : "white")};
  outline: none;
  background-color: ${(props) => (props.isDark ? "white" : "#564CAD")};

  &::placeholder {
    color: ${props => props.isDark ? "none" : "#d2d2d2"};
  }
`;

const Button = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  background: white;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
  cursor: pointer;
  &.shadow {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;

const ProjectName = ({ setProjectName, projectName, isDark, setImageUrl, imgUrl }) => {

  const dispatch = useDispatch()

  const settingProjectName = (e) => {
    dispatch(saveProjectName(e.target.value))
    setProjectName(e.target.value)
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    // Firebase Storage에 이미지 업로드
    const storage = getStorage(app);
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);

    // 업로드된 이미지의 다운로드 URL 받아오기
    const imageUrl = await getDownloadURL(storageRef);

    // 다운로드 URL을 state에 저장
    setImageUrl(imageUrl);
    dispatch(saveProjectImg(imageUrl))
  };

  return (
    <ProjectNameContainer>
      <ImageContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={imgUrl} />
          <Button
            // whileHover={{ y: -5 }}
            className="shadow mt-3"
            style={{
              backgroundColor: isDark
                ? "white"
                : "#564CAD",
                color : isDark ? "grey":"white" 
            }}
          >
            <input type="file" style={{ display: 'none' }} onChange={handleImageChange} />
            {/* <h5
              style={{
                fontSize: "1rem",
                marginBottom: 0,
                color: isDark ? "white" : "black",
              }}
            > */}
              대표이미지 설정
            {/* </h5> */}
          </Button>
        </div>
      </ImageContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
          justifyContent: "center",
          color: isDark ? "white" : "black",
        }}
      >
        <h1>프로젝트 명</h1>
        <div
          className="py-3 px-4 shadow"
          style={{
            backgroundColor: isDark ? "white" : "#564CAD",
            borderRadius: "7px",
            width: "20rem",
          }}
        >
          <Input
            isDark={isDark}
            onChange={e => settingProjectName(e)}
            placeholder="프로젝트 명을 입력해 주세요!"
            value={projectName}
          />
        </div>
      </div>
    </ProjectNameContainer>
  );
};

export default ProjectName;
