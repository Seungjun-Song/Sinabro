import { motion } from "framer-motion";
import ProjectInviteImg from "./ProjectInviteImg";
import { GlobalColor } from "../../services/color";
const DUMMY_DATA = [
  {
    id: 1,
    img: "/images/pjtimg.png",
    name: "주헌",
    nameId: "JH201421228",
  },
  {
    id: 2,
    img: "/images/pjtimg.png",
    name: "주헌",
    nameId: "JH201421228",
  },
  {
    id: 3,
    img: "/images/pjtimg.png",
    name: "주헌",
    nameId: "JH201421228",
  },
  {
    id: 4,
    img: "/images/pjtimg.png",
    name: "주헌",
    nameId: "JH201421228",
  },
];

const ProjectInvite = ({
  hadlebutton,
  IsModalOpen,
  setIsModalOpen,
  isDark,
}) => {
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
        }}
      >
        <h4 style={{ margin: 0, color: isDark ? "white" : "black" }}>
          팀원 초대
        </h4>
      </div>
      <div
        className="shadow px-5"
        style={{
          marginTop: "2rem",
          padding: "2rem",
          borderRadius: "1rem",
          alignItems: "center",
          display: "flex",
          gap: "2rem",
          backgroundColor: isDark ? GlobalColor.colors.primary_black50 : "white",
          // overflowX:"auto",
        }}
      >
        {DUMMY_DATA.map((item, index) => (
          <ProjectInviteImg
            isDark={isDark}
            img={item.img}
            name={item.name}
            nameId={item.nameId}
          />
        ))}

        <motion.div
          onClick={() => hadlebutton()}
          whileHover={{ cursor: "pointer", y: -7 }}
          style={{
            width: "5rem",
            border: "none",
            height: "5rem",
            borderRadius: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage:isDark ? "linear-gradient(135deg, #d3d3d3, #383838)" : "linear-gradient(135deg, #C7D6FF, #7375CA)", // 그라데이션 효과 추가
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
