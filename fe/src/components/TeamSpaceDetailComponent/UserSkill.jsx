import { useEffect, useState } from "react";
import ProjectTeam from "./ProjectTeam";
import Projectexplanation from "./Projectexplanation";
import TSDUserModal from "./TSDUserModal";
import { AnimatePresence } from "framer-motion";
// import { fas } from "@fortawesome/free-solid-svg-icons";

const UserSkill = ({ item }) => {
  //   const [imgsrc, setimgsrc] = useState(false);
  let imgsrc = "";
  const getimg = (item) => {
    if (item == "React") {
      return "/images/react.png";
    } else if (item == "Css") {
      return "/images/css.png";
    } else if (item == "Html") {
      return "/images/html.png";
    } else if (item == "JavaScript") {
      return "/images/js.png";
    } else if (item == "Vue") {
      return "/images/vue.png";
    } else if (item == "Java") {
      return "/images/java.png";
    } else if (item == "django") {
      return "/images/django.png";
    } else if (item == "Python") {
      return "/images/python.png";
    } else if (item == "Spring") {
      return "/images/spring.png";
    }
  };
  imgsrc = getimg(item);
  return (
    <>
      <img style={{ width: "4rem" }} src={getimg(item)} />
      <div
        className="px-3 py-1 mt-3"
        style={{
          backgroundColor: "#304895",
          color: "white",
          borderRadius: "3rem",
        }}
      >
        {item}
      </div>
    </>
  );
};

export default UserSkill;
