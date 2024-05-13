import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInServer, logIn } from "../../oauthTestPage/OauthTest";

const wordlist = [
  {
    id: 1,
    word: "취준생",
    wordtyping: [
      "",
      "ㅊ",
      "추",
      "취",
      "췾",
      "취주",
      "취준",
      "취준ㅅ",
      "취준새",
      "취준생",
      "취준생",
      "취준생",
      "취준새",
      "취준ㅅ",
      "취준",
      "취",
      "",
    ],
  },
  {
    id: 2,
    word: "개발자",
    wordtyping: [
      "",
      "ㄱ",
      "개",
      "갭",
      "개바",
      "개발",
      "개발ㅈ",
      "개발자",
      "개발자",
      "개발자",
      "개발ㅈ",
      "개발",
      "개",
      "",
    ],
  },
  {
    id: 3,
    word: "프로젝트",
    wordtyping: [
      "",
      "ㅍ",
      "프",
      "플",
      "프로",
      "프롲",
      "프로제",
      "프로젝",
      "프로젝ㅌ",
      "프로젝트",
      "프로젝트",
      "프로젝트",
      "프로젝ㅌ",
      "프로젝",
      "프로",
      "프",
      "",
    ],
  },
  {
    id: 4,
    word: "팀워크",
    wordtyping: [
      "",
      "ㅌ",
      "티",
      "팀",
      "팀ㅇ",
      "팀우",
      "팀워",
      "팀웤",
      "팀워크",
      "팀워크",
      "팀워크",
      "팀워ㅋ",
      "팀워",
      "팀",
      "",
    ],
  },
];

const Section1 = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    let timeout;
    let wordIndex = 0;
    let characterIndex = 0;

    const showNextCharacter = () => {
      setCurrentWord(
        (prevWord) => wordlist[wordIndex].wordtyping[characterIndex]
      );
      characterIndex++;

      if (characterIndex < wordlist[wordIndex].wordtyping.length) {
        timeout = setTimeout(showNextCharacter, 150);
      } else {
        characterIndex = 0;
        wordIndex = (wordIndex + 1) % wordlist.length;
        timeout = setTimeout(showNextCharacter, 700);
      }
    };

    timeout = setTimeout(showNextCharacter, 700);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        style={{
          width: "85%",
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "80%",
            left: "10%",
            filter: "blur(130px)",
            width: "13rem",
            height: "13rem",

            backgroundColor: "rgba(86, 76, 173, 1)",
          }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "90%",
            filter: "blur(100px)",
            width: "10rem",
            height: "10rem",

            backgroundColor: "#bb19d4",
          }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            filter: "blur(150px)",
            width: "10rem",
            height: "10rem",

            backgroundColor: "#1900ff",
          }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          style={{
            position: "absolute",
            top: "0%",
            left: "10%",
            filter: "blur(150px)",
            width: "13rem",
            height: "13rem",

            backgroundColor: "#ff0059",
          }}
        ></motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 1 }}
        >
          <div style={{ display: "flex", fontSize: "5rem", gap: "1rem" }}>
            <h1 style={{ fontSize: "5rem" }}>잘되는</h1>
            <h1 style={{ fontSize: "5rem", color: "#f7bd2c" }}>"</h1>
            <h1 style={{ fontSize: "5rem" }}>{currentWord}</h1>
            <h1 style={{ fontSize: "5rem", color: "#f7bd2c" }}>"</h1>
            <h1 style={{ fontSize: "5rem" }}>의 비밀</h1>
          </div>
          <h1 style={{ fontSize: "5rem", color: "rgba(86, 76, 173, 1)" }}>
            시나브로
          </h1>
          <h5 style={{ marginTop: "3rem" }}>#개발자 #뉴비 #팀워크 #프로젝트</h5>
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 10 }}
          // exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "self-end",
            gap: "0.5rem",
            color: "#565656",
          }}
        >
          <h5 style={{ fontSize: "1.5rem" }}>개발의 시작을 시나브로와 함께!</h5>
          <h5 style={{ fontSize: "1.5rem" }}>새로운 경험을 함께하세요</h5>
          <motion.div
            whileHover={{ cursor: "pointer" }}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            style={{
              padding: " 1.5rem 4rem",
              // height: "5rem",
              // width: "10rem",
              display: "flex",
              // border: "3px solid black",
              borderRadius: "5rem",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(86, 76, 173)",
              color: "white",
              gap: "1rem",
              fontSize: "1.2rem",
              cursor: "pointer"
            }}
            onClick={() => logInServer()}
          >
            시작하기
            <motion.div animate={{ x: isHover ? 10 : 0 }}>
              <FontAwesomeIcon icon={faArrowRight} color="white" size="lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};
export default Section1;
