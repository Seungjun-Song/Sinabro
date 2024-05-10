import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Projectname from "../components/teamspaceComponents/Projectname";
import ProjectInfo from "../components/teamspaceComponents/ProjectInfo";
import ProjectInvite from "../components/teamspaceComponents/ProjectInvite";
import { useState } from "react";
import UserSearchModal from "../components/teamspaceComponents/UserSearchModal";
import { AnimatePresence } from "framer-motion";
import ProjectGitConnect from "../components/teamspaceComponents/ProjectGitConnect";
import Navbar from "../components/navs/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { GlobalColor } from "../services/color";
import ProjectCreateBtn from "../components/teamspaceComponents/ProjectCreateBtn";
import { useEffect } from "react";
import { clearProjectCreate, saveProjectMemberId, setProjectMemberList } from "../store/projectCreateSlice";
import { clearInvitedUserList, setInvitedUserList } from "../store/invitedUserListSlice";


const TeamSpacePage = () => {
  const [imgUrl, setImgUrl] = useState("/images/pjtimg.png")
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [projectinfo, setProjectInfo] = useState(null);
  const [roleCheck, setRoleCheck] = useState(false)

  const isDark = useSelector(state => state.isDark.isDark)
  const userInfo = useSelector(state => state.user)

  const hadlebutton = () => {
    setIsModalOpen(() => !IsModalOpen);
    console.log(IsModalOpen);
  };

  const dispatch = useDispatch()

  const createProjectInfo = useSelector(state => state.projectCreate)

  console.log(createProjectInfo.value)

  useEffect(() => {
    dispatch(saveProjectMemberId()) // 나중에 멤버 아이디 받아서 넣어야함 // 토큰 넣으면 된다고?
    dispatch(setInvitedUserList(
      [{
        memberId: userInfo.currentUser.uid,
        memberName: userInfo.currentUser.displayName,
        memberImg: userInfo.currentUser.photoURL,
      }]
    ))
    dispatch(setProjectMemberList(
      [{
        memberId: userInfo.currentUser.uid,
        categoryId: null,
      }]
    ))
    return () => {
      dispatch(clearProjectCreate()) // 언마운트 될 때 프로젝트 생성 정보를 초기화
      dispatch(clearInvitedUserList())
    }

  }, [])

  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column"
        style={{
          width: "100vw",
          backgroundColor: isDark ? GlobalColor.colors.primary_black : "white",
          alignItems: "center",
          paddingTop: "7rem",
          // backgroundColor: "rgba(212, 223, 255, 0.2)",
          transition: "0.3s"
        }}
      >
        <Projectname
          setProjectName={setProjectName}
          projectName={projectName}
          isDark={isDark}
          imgUrl={imgUrl}
          setImageUrl={setImgUrl}
        />
        <ProjectGitConnect isDark={isDark} />
        <ProjectInfo
          setProjectInfo={setProjectInfo}
          projectinfo={projectinfo}
          isDark={isDark}
        />

        <ProjectInvite
          hadlebutton={hadlebutton}
          setIsModalOpen={setIsModalOpen}
          IsModalOpen={IsModalOpen}
          isDark={isDark}
        />
        <AnimatePresence>
          {IsModalOpen && (
            <UserSearchModal
              projectName={projectName}
              setIsModalOpen={setIsModalOpen}
              isDark={isDark}
            />
          )}
        </AnimatePresence>
        <ProjectCreateBtn isDark={isDark} setRoleCheck={setRoleCheck}/>
        {roleCheck === true ? window.alert('팀원의 역할을 선택해 주세요') && setRoleCheck(false) : null}
      </div>
    </>
  );
};

export default TeamSpacePage;
