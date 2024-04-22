import { motion } from "framer-motion";
import { useState } from "react";
const ProjectGitConnect = ({ hadlebutton, IsModalOpen, setIsModalOpen }) => {
  const [isData, setIsData] = useState(null);
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
        }}
      >
        <h4 style={{ margin: 0 }}>Git Repository 연결</h4>
      </div>
      <div
        className="shadow px-5"
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          borderRadius: "1rem",
          alignItems: "center",
          display: "flex",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {!isData && (
          <div style={{ display: "flex", gap: 20 }}>
            <div>Git 과 연결을 해주세요</div>

            <div style={{ borderRadius: "1rem"}}>
              +
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectGitConnect;
