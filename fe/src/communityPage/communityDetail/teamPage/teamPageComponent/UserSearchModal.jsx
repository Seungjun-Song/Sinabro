import { useState } from "react";
import UserSearchInfo from "./UserSearchInfo";
import UserSearchBar from "./UserSearchBar";
import UserSearchResult from "./UserSearchResult";
import { motion } from "framer-motion";
import { GlobalColor } from "../../../../services/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserSearch } from "../../../../store/userSearchSlice";
// import { addProjectMemberList } from "../../store/projectCreateSlice";
// import { clearInviteUser } from "../../store/inviteUserSlice";
// import { addInvitedUserList } from "../../store/invitedUserListSlice";
import getEnv from "../../../../utils/getEnv";
import axios from "axios";

const UserSearchModal = ({ setIsModalOpen, projectName, isDark, reloading, setReloading, teamInfo }) => {
  const [userName, setUserName] = useState("");
  const [selectedRole, setSelectedRole] = useState('')
  const handleChange = (event) => {
    // 입력값이 변경될 때마다 호출되는 함수
    setUserName(event.target.value); // 입력값으로 username 상태를 업데이트
    // console.log(userName)
  };

  const dispatch = useDispatch()

  const myCurrentProject = useSelector(state => state.myCurrentProject.value)

  useEffect(() => {
    return () => {
      dispatch(clearUserSearch()) // 모달이 언마운트되면 검색 결과를 제거
    }
  }, [])

  const invitedUser = useSelector(state => state.inviteUser) // teamInfo의 user 정보와 비교해서 없는값이면 조건부로 넣을 수 있음

  const back_url = getEnv('BACK_URL')

  const invitingUser = async () => {
    const categoryId =
      selectedRole === "FE"
        ? 100
        : selectedRole === "BE"
          ? 200
          : selectedRole === "FULL"
            ? 300
            : null;
    if (categoryId === null) {
      alert("역할을 선택하세요.")
      return
    }
    try {
      const res = await axios.post(`${back_url}/teams`, {
        memberId: invitedUser.value.memberId,
        categoryId: categoryId,
        projectId: myCurrentProject.projectId
      })
      console.log(res.data)
      setReloading(!reloading)

    }
    catch (err) {
      console.error(err)
    }

    setIsModalOpen(false)
  }

  return (
    <motion.div
      onClick={() => setIsModalOpen(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        // display: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      {console.log(invitedUser)}
      <motion.div
        className="shadow p-5 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          height: "90%",
          width: "40%",
          backgroundColor: isDark ? GlobalColor.colors.primary_purple : "white",
          borderRadius: "10px",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div style={{ width: "100%" }}>
          <UserSearchInfo isDark={isDark} projectName={projectName} />
          <UserSearchBar isDark={isDark} handleChange={handleChange} userName={userName} />
          <UserSearchResult isDark={isDark} setSelectedRole={setSelectedRole} selectedRole={selectedRole} />
          <motion.div
            whileHover={{ cursor: "pointer" }}
            style={{
              borderRadius: "1rem",
              display: "flex",
              width: "100%",
              padding: "1rem",
              backgroundColor: "#5255CC",
              marginTop: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={invitingUser}
          >
            <h3 style={{ margin: 0, color: "white" }}>초대</h3>
          </motion.div>
        </div>
        <motion.div
          whileHover={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(false)}
          style={{ height: "1.5rem", position: "absolute", right: "3rem" }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            size="2xl"
            color={isDark ? "white" : "#204FCF"}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserSearchModal;
