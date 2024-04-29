const ProjectInfo = ({ projectinfo, setProjectInfo }) => {
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
          borderLeftColor: "#3f2b96", // 왼쪽 테두리 색상
          borderLeftStyle: "solid", // 왼쪽 테두리 스타일
        }}
      >
        <h4 style={{ margin: 0 }}>프로젝트 설명</h4>
      </div>
      <textarea
        className="shadow"
        placeholder="프로젝트에 관한 간단한 설명을 해주세요!"
        style={{
          marginTop: "2rem",
          height: "20rem",
          borderRadius: "1rem",
          padding: "1rem",
          overflow: "auto",
          outline:"none",
          border:"none",
          resize:"none"
        }}
      >
      </textarea>
    </div>
  );
};

export default ProjectInfo;
