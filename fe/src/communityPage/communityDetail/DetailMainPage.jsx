import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Navbar from "../../components/navs/Navbar";
import DetailSideMenu from "./DetailSideMenu";
import DetailMember from "./DetailMember";
import DetailTeam from "./DetailTeam";
import DetailFeadback from "./DetailFeadback";
import { GlobalColor } from "../../services/color";
import ProfileTempImg from "/images/default_my_image.png";
import getEnv from "../../utils/getEnv";
import CalTime from "../CalTime";
import UserChat from "../chat/UserChat";

const Community = styled.div`
  display: flex;
  align-items: start;

  width: 100%;
  min-height: 100vh;
  padding: 2rem 0 0 0;

  margin: 3.5rem 0 0 0;

  ${(props) =>
    props.isDark &&
    css`
      background: ${GlobalColor.colors.primary_black};
    `}

  transition: 0.3s;
`;

const DetailMainPage = () => {
  const location = useLocation();
  const data = location.state;

  const [selected, setSelected] = useState({
    id: data.kind.id,
    name: data.kind.name,
  });
  const [post, setPost] = useState({});
  const [commentDate, setCommentDate] = useState([]);
  const [projectData, setProjectData] = useState({
    // id: 1,
    // title: "BUNG",
    // projectImg: PjtImg,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [openChat, setOpenChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);

  const postId = data.postId;
  const isDark = useSelector((state) => state.isDark.isDark);

  const back_url = getEnv("BACK_URL");
  useEffect(() => {
    const getTeammateInfo = async () => {
      try {
        const res = await axios.get(`${back_url}/members/${post.memberId}`);
        console.log(res.data.result.memberImg);
        // memberImg를 상태로 업데이트
        setPost(prevPost => ({
          ...prevPost,
          writerprofile: res.data.result.memberImg,
        }));
      } catch (err) {
        console.error(err);
      }
    };
  
    // 비동기 함수 호출
    getTeammateInfo();
  }, [post.memberId, setPost]);
  
  useEffect(() => {
    //게시글 조회
    axios
      .get(`${back_url}/communities/boards/${postId}`)
      .then((res) => {
        const getData = res.data.result;
        console.log(getData);
        const fullDate = new Date(getData.updatedDttm);
        const finalDate = CalTime(fullDate);

        setPost({
          id: postId,
          title: getData.boardTitle,
          content: getData.boardContent,
          hash: getData.tagDtos,
          writername: getData.memberName,
          memberId: getData.memberId,
          writerprofile: ProfileTempImg,
          time: finalDate,
          proceed: getData.communityProgress,
          projectId: getData.projectId,
          recruitedBack: getData.recruitedPeopleBackEnd,
          recruitedFront: getData.recruitedPeopleFrontEnd,
          requiredBack: getData.requiredBackEnd,
          requiredFront: getData.requiredFrontEnd,
          kind: "member",
        });

        //팀 정보 불러오기
        if (selected.name == "member" || selected.name == "feadback") {
          axios
            .get(`${back_url}/teams?projectId=${getData.projectId}`)
            .then((res) => {
              //console.log(res.data.result);

              const getProject = res.data.result;
              setProjectData({
                id: getData.projectId,
                title: getProject.projectName,
                projectImg: getProject.projectImg,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //댓글 조회
    axios
      .get(`${back_url}/communities/comments/${postId}/${currentPage - 1}`)
      .then((res) => {
        //console.log(res.data.result)
        setTotalCount(res.data.result.totalCount);
        setCommentDate(res.data.result.commentResponseDtos);
      })
      .catch((err) => {});
  }, [currentPage]);

  useEffect(() => {
    console.log(openChat);
  }, [openChat]);

  return (
    <>
      <Navbar></Navbar>
      <Community isDark={isDark}>
        <DetailSideMenu selected={selected} isDark={isDark}></DetailSideMenu>
        {selected.name === "member" ? (
          <DetailMember
            isDark={isDark}
            detailData={post}
            commentDate={commentDate}
            setCommentDate={setCommentDate}
            projectData={projectData}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOpenChat={setOpenChat}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setTotalCount={setTotalCount}
          />
        ) : (
          ""
        )}

        {selected.name === "team" ? (
          <DetailTeam
            isDark={isDark}
            detailData={post}
            commentDate={commentDate}
            setCommentDate={setCommentDate}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setTotalCount={setTotalCount}
          />
        ) : (
          ""
        )}

        {selected.name === "feadback" ? (
          <DetailFeadback
            isDark={isDark}
            detailData={post}
            commentDate={commentDate}
            setCommentDate={setCommentDate}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setTotalCount={setTotalCount}
          />
        ) : (
          ""
        )}
      </Community>
      <UserChat
        openChat={openChat}
        setOpenChat={setOpenChat}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default DetailMainPage;
