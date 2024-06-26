import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chatlist from "./Chatlist";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import Chatdetail from "./Chatdetail";
import GPTChat from "./GPTChat";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { setMyChatingList } from "../../store/myChatingListSlice";
import { useDispatch, useSelector } from "react-redux";
import { setChatSize } from "../../store/sizeSlice";

const DUMMY_DATA = [
  {
    id: 0,
    projectName: "GPT",
    lastChat: "무엇을 도와드릴까요?",
    day: "2024.04.26",
    projectImg: "/images/gptblack.jpg",
  },
  {
    id: 1,
    projectname: "프로젝트명1",
    lastChat: "마지막채팅",
    day: "2024.04.26",
    projectimg: "/images/pjt1.png",
  },
  {
    id: 2,
    projectname: "프로젝트명",
    lastChat: "마지막채팅",
    day: "2024.04.26",
    projectimg: "/images/pjt2.png",
  },
  {
    id: 3,
    projectname: "프로젝트명",
    lastChat: "마지막채팅",
    day: "2024.04.26",
    projectimg: "/images/pjt3.png",
  },
  {
    id: 4,
    projectname: "프로젝트명",
    lastChat: "마지막채팅",
    day: "2024.04.26",
    projectimg: "/images/pjt4.png",
  },
  {
    id: 5,
    projectname: "프로젝트명",
    lastChat: "마지막채팅",
    day: "2024.04.26",
    projectimg: "/images/pjt5.png",
  },
];

const UserChat = () => {
  const [openChat, setOpenChat] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  //const [size, setSize] = useState({ width: 300, height: 400 });
  const [projectData, setProjectData] = useState([])
  const size = useSelector((state) => state.size.value);

  const dispatch = useDispatch();
  const myProjectList = useSelector(state => state.myProjectList.value)
  const userInfo = useSelector(state => state.user.currentUser)

  useEffect(() => {
    let fixData = [{projectId: userInfo.uid, projectName: 'GPT', projectImg: '/images/gptblack.jpg'}, ...myProjectList]

    const db = getDatabase();
    const chatRef = ref(db, `chatList/${userInfo.uid}`);
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if(data){
        const chatMessages = Object.values(data);
        fixData = [...fixData, ...chatMessages];
      }
    })
    setProjectData(fixData)
    console.log(fixData);

  }, []);


  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
    // console.log(data)
  };
  //   const handleResizeStop = (e, direction, ref, d) => {
  //     setSize({
  //       width: size.width + d.width,
  //       height: size.height + d.height,
  //     });
  //   };
  const [whatpjt, setWhatpjt] = useState(false); // 프로젝트 선택

  return (
    <>
      <motion.div
        onClick={() => (setOpenChat(!openChat), setWhatpjt(false))}
        whileHover={{ cursor: "pointer", opacity: 0.8 }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "3.5rem",
          height: "3.5rem",
          // border: "solid 3px black",
          borderRadius: "1.5rem",
          backgroundColor: "#564CAD",
          zIndex: "999999",
        }}
      >
        <motion.img
          initial={{ rotate: 0, scale: 1 }}
          whileHover={{ rotate: [0, -20, 20, 0], scale: 1.1 }}
          className=""
          style={{
            marginTop: "5px",
            marginLeft: "5px",
            height: "2rem",
            width: "2rem",
          }}
          src="/images/chatting.png"
          alt="채팅 아이콘"
        />
      </motion.div>
      <AnimatePresence>
        {openChat && (
          <motion.div
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 10 }} // 초기 상태에서 opacity를 0으로 설정
            animate={{ opacity: 1, y: 0 }} // 나타날 때 opacity를 1로 설정
            exit={{ opacity: 0, y: 10 }} // 사라질 때 opacity를 0으로 설정
            style={{
              position: "fixed",
              bottom: "6rem",
              right: "2rem",
              zIndex: "999999",
            }}
          >
            <Resizable
              size={size}
              minWidth={300}
              minHeight={400}
              maxHeight={550}
              maxWidth={550}
              onResizeStop={(e, direction, ref, d) => {(dispatch(
                setChatSize({
                  width: size.width + d.width,
                  height: size.height + d.height,
                })
              ),console.log(d))
                
              }}
            >
              <motion.div
                className="shadow"
                // whileHover={{ cursor: "pointer" }}
                style={{
                  backgroundColor: "#F5F8FF",
                  display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",

                  width: "100%",
                  height: "100%",
                  // maxHeight: "25rem",
                  flexDirection: "column",
                  borderRadius: "1rem",
                  //   padding: "1.5rem 0",
                  overflowY: whatpjt !== false ? "hidden" : "auto",
                }}
              >
                {whatpjt ? (
                  whatpjt.projectName === "GPT" ? (
                    <GPTChat setWhatpjt={setWhatpjt} whatpjt={whatpjt} />
                  ) : (
                    <Chatdetail setWhatpjt={setWhatpjt} whatpjt={whatpjt} />
                  )
                ) : (
                  <motion.div
                    style={{
                      padding: "0 1rem ",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.3rem",
                      width: "100%",
                    }}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        opacity: 1,
                        transition: {
                          when: "beforeChildren",
                          staggerChildren: 0.1, // 순차적으로 애니메이션 적용
                          // delay:0.2
                        },
                      },
                      hidden: { opacity: 0 },
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        borderBottom: "4px solid transparent", // 투명한 테두리 설정
                        borderImage:
                          "linear-gradient(to left, #a8c0ff, #3f2b96 )", // 그라데이션 테두리 이미지
                        borderImageSlice: "1", // 이미지 슬라이스
                        padding: "1rem",
                        // height: "5.5rem",
                        //   marginBottom: "0.5rem",
                      }}
                    >
                      <img src="/image/nav/Sinabro_blue.png" />
                    </div>
                    {projectData && projectData.map((item, index) => (
                      <motion.div
                        key={index}
                        variants={{
                          visible: { opacity: 1, y: 0 },
                          hidden: { opacity: 0, y: 30 },
                        }}
                      >
                        <Chatlist
                          setWhatpjt={setWhatpjt}
                          item={item}
                          whatpjt={whatpjt}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </Resizable>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserChat;
