import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearInviteUser, setInviteUser } from "../../store/inviteUserSlice";
// const DUMMY_DATA = [
//   {
//     id: 1,
//     img: "/images/juheon.png",
//     name: "주헌",
//     nameId: "JH201421228",
//   },
//   {
//     id: 2,
//     img: "/images/juheon.png",
//     name: "주헌",
//     nameId: "JH201421228",
//   },
//   {
//     id: 3,
//     img: "/images/juheon.png",
//     name: "주헌",
//     nameId: "JH201421228",
//   },
//   {
//     id: 4,
//     img: "/images/juheon.png",
//     name: "주헌",
//     nameId: "JH201421228",
//   },
// ];

const UserSearchResult = () => {
  // 마운트 될 때 선택한 유저가 없어야함(일부 리덕스 값을 초기화해야함)

  const [selectedUser, setSelectedUser] = useState(null)

  const userData = useSelector(state => state.userSearch.value)
  const invitedUser = useSelector(state => state.invitedUserList.value)

  console.log('invitedUser: ', invitedUser)

  const dispatch = useDispatch()

  const selectUser = (i) => {
    setSelectedUser(i)
    dispatch(setInviteUser(i))
  }

  return (
    <div
      style={{
        border: "3px solid transparent", // 투명한 테두리 설정
        marginTop: "1rem",
        overflow: "auto", // 스크롤이 가능하도록 설정
        height: "15rem", // 만약 내용이 높이를 넘어서면 최대 높이를 설정하여 스크롤이 나타나도록 함
        borderImage: "linear-gradient(to right, #204FCF, #3f2b96 )", // 그라데이션 테두리 이미지
        borderImageSlice: "1", // 이미지 슬라이스
      }}
    >
      <div>
        {userData.map((item, index) => (
          <motion.div
            style={{
              height: "5rem",
              display: "flex",
              //   justifyContent: "center",
              gap: "15px",
              alignItems: "center",
              paddingLeft: "1.5rem",
              backgroundColor: selectedUser && selectedUser.memberId === item.memberId ? '#ccd5f8' : 'white',
            }}
            key={index}
            whileHover={{ backgroundColor: "#CCD5F8", cursor: "pointer" }}
            onClick={() => selectUser(item)}
          >
            <img style={{ width: "3.5rem", height: "3.5rem" }} src={item.memberImg} />
            <div>
              <div>{item.memberId}</div>
              <div>{item.memberName}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserSearchResult;
