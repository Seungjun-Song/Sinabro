import styled from "styled-components";
import { GlobalColor } from "../../services/color";
import { useDispatch } from "react-redux";
import { saveProjectInfo } from "../../store/projectCreateSlice";

const TextArea = styled.textarea`
  margin-top: 2rem;
  height: 20rem;
  border-radius: 1rem;
  padding: 1rem;
  overflow: auto;
  outline: none;
  border: none;
  resize: none;
  background-color: ${(props) =>
    props.isDark ? GlobalColor.colors.primary_black50 : "white"};
  color: ${(props) => (props.isDark ? "white" : "black")};

  &::placeholder {
    color: ${(props) => (props.isDark ? "white" : "none")};
  }
`;
const ProjectInfo = ({ projectinfo, setProjectInfo, isDark }) => {

  const dispatch = useDispatch()

  const settingProjectInfo = (e) => {
    dispatch(saveProjectInfo(e.target.value))
    setProjectInfo(e.target.value)
  }

  return (
    <div
      style={{
        width: "60%",
        display: "flex",
        marginTop: "3rem",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          borderLeftWidth: "5px", // 왼쪽 테두리 두께
          borderLeftColor: isDark ? "#a098c5" : "#3f2b96", // 왼쪽 테두리 색상
          borderLeftStyle: "solid", // 왼쪽 테두리 스타일
          color: isDark ? "white" : "black",
          transition: "0.3s",
        }}
      >
        <h4 style={{ margin: 0 }}>프로젝트 설명</h4>
      </div>
      <TextArea
        className="shadow"
        isDark={isDark}
        placeholder="프로젝트에 관한 간단한 설명을 해주세요!"
        onChange={e => settingProjectInfo(e)}
        value={projectinfo}
      />
    </div>
  );
};

export default ProjectInfo;
