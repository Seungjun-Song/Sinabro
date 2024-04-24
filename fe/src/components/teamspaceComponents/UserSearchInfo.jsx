const UserSearchInfo = ({projectName}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/githublogo.png"
          style={{ width: "8rem", height: "8rem" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flex: 5,
          flexDirection: "column",
          height: "7rem",
          justifyContent: "center",
          // alignItems:"center",
          gap: "0.75rem",
        }}
      >
        <h3 style={{ color: "#204FCF", fontWeight: "bold", margin: 0 }}>
          유저 검색
        </h3>
        {projectName && <h5 style={{ margin: 0 }}>{projectName}의 팀원을 추가하세요!</h5>}
        {!projectName && <h5 style={{ margin: 0 }}>팀원을 추가하세요!</h5>}
      </div>
    </div>
  );
};

export default UserSearchInfo;
