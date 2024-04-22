const ProjectInfo = () => {
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
          borderLeftColor: "black", // 왼쪽 테두리 색상
          borderLeftStyle: "solid", // 왼쪽 테두리 스타일
          padding: "1rem",
        }}
      >
        <h4 style={{ margin: 0 }}>프로젝트 설명</h4>
      </div>
      <div className="shadow" style={{ marginTop: "2rem", height:"20rem",borderRadius:"1rem", padding:"1rem" ,overflow:"auto"}}>asdf</div>
    </div>
  );
};

export default ProjectInfo;
