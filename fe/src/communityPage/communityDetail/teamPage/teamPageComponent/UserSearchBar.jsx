import axios from "axios";
import React from "react";
import getEnv from "../../../../utils/getEnv";
import { useDispatch } from "react-redux";
import { setUserSearch } from "../../../../store/userSearchSlice";

const UserSearchBar = ({ handleChange, userName }) => {

  const back_url = getEnv('BACK_URL')
  const dispatch = useDispatch()

  const searchUser = async (w) => {
    try {
      const res = await axios.get(`${back_url}/members?keyword=${w}&page=0`)
      if (res.data.result.searchList) {
        dispatch(setUserSearch(res.data.result.searchList))
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        onChange={handleChange} // 입력값이 변경될 때 handleChange 함수 호출
        placeholder="유저이름으로 검색"
        style={{
          display: "flex",
          height: "4rem",
          width: "100%",
          marginTop: "1rem",

          padding: "1rem",
          border: "3px solid transparent", // 투명한 테두리 설정
          borderImage: "linear-gradient(to right, #a8c0ff, #3f2b96 )", // 그라데이션 테두리 이미지
          borderImageSlice: "1", // 이미지 슬라이스
          outline: "none",
        }}
        value={userName}
      />
      <img
        style={{
          height: "1.5rem",
          width: "1.5rem",
          position: "absolute",
          right: "1rem",
          top: "1.25rem",
          cursor: 'pointer',
        }}
        onClick={() => searchUser(userName)}
        src="/images/Search.png"
      />
    </div>
  );
};

export default UserSearchBar;
