import { motion } from "framer-motion";
const ProjectInvite = ({ hadlebutton ,IsModalOpen,setIsModalOpen}) => {
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
        <h4 style={{ margin: 0 }}>팀 초대</h4>
      </div>
      <div
        className="shadow px-5"
        style={{
          marginTop: "2rem",
          height: "8rem",
          borderRadius: "1rem",
          alignItems: "center",
          display: "flex",
          gap: "1rem",
        }}
      >
        <img
          className="shadow"
          src="/images/pjtimg.png"
          style={{ width: "4rem", height: "4rem", borderRadius: "2.5rem" }}
        />
        <img
          className="shadow"
          src="/images/pjtimg.png"
          style={{ width: "4rem", height: "4rem", borderRadius: "2.5rem" }}
        />
        <img
          className="shadow"
          src="/images/pjtimg.png"
          style={{ width: "4rem", height: "4rem", borderRadius: "2.5rem" }}
        />
        <motion.div
          onClick={() => hadlebutton()}
          whileHover={{cursor:"pointer" ,y:-7}}
          style={{
            width: "4rem",
            border: "none",
            height: "4rem",
            borderRadius: "2.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "linear-gradient(135deg, #C7D6FF, #7375CA)", // 그라데이션 효과 추가
          }}
        >
          <img
            style={{ width: "1.5rem", height: "1.5rem" }}
            src="/images/plus.png"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectInvite;
