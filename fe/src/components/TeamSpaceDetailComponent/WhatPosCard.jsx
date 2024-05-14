import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import { Modal, Button } from 'react-bootstrap'; // Bootstrap 모달 및 버튼을 불러옵니다.
import axios from 'axios'
import getEnv from '../../utils/getEnv'

const IconBox = styled.div`
    transition: transform 0.3 ease;
    &:hover {
      transform: scale(1.2)
    }
`

const WhatPosCard = ({ item, state, name, setWhatUser, isDark, teamLeader, memberId, memberImg, techStack, teammateRole, setReloading, reloading }) => {

  const userInfo = useSelector(state => state.user)
  const [showModal, setShowModal] = useState(false)

  console.log('userInfo : ', userInfo, '\n teamLeader : ', teamLeader, '\n memberId : ', memberId)

  const getColor = (item) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return item === "FE"
      ? "#3DC7AE"
      : item === "BE"
        ? "#315DCC"
        : item === "FULL"
          ? "#6C31CC"
          : "black";
  };
  const getJobColor = (item) => {
    // 여기에 item에 따라 적절한 색상을 반환하는 조건을 추가하세요
    // 예를 들어, item이 "A"일 때는 빨간색, "B"일 때는 파란색 등등...
    return item === "FE"
      ? "#075A19"
      : item === "BE"
        ? "#2447A1"
        : item === "FULL"
          ? "#391c68"
          : "black";
  };

  const back_url = getEnv('BACK_URL')

  const myCurrentProject = useSelector(state => state.myCurrentProject.value)
  console.log(memberId, myCurrentProject.projectId)

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const deleteMember = async () => {

    const data = {
      memberId: memberId,
      projectId: myCurrentProject.projectId
    }
    console.log(data)
    try {
      const res = await axios.delete(`${back_url}/teams`, {
        data: data
      })
      console.log(res.data)
      setReloading(!reloading)
    }
    catch (err) {
      console.error(err)
    }

    toggleModal();
  };

  return (
    <>
      <motion.div
        layout
        onClick={() => setWhatUser({ item: item, name: name, state: state, techStack: techStack, memberImg: memberImg, teammateRole: teammateRole, memberId: memberId })}
        whileHover={{ cursor: "pointer", y: -7 }}
        className="shadow d-flex gap-3 "
        style={{
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "3px solid",
          width: "12rem",
          justifyContent: "center",
          alignItems: "center",
          borderColor: getColor(item),
          flexDirection: "column",
          height: "100%",
          backgroundColor: isDark ? "#323232" : "white",
          position: "relative",
        }}
      >
        {userInfo.currentUser.uid === teamLeader && memberId !== userInfo.currentUser.uid &&
          <IconBox style={{ position: "absolute", top: '0.2rem', right: '0.2rem' }}>
            <FontAwesomeIcon icon={faTimesCircle} style={{ cursor: 'pointer', color: isDark ? 'white' : 'black' }} onClick={e => { e.stopPropagation(), toggleModal() }} />
          </IconBox>
        }
        <img style={{ width: "6rem"  ,height:"6rem" }} src={memberImg} />
        <div style={{ color: getJobColor(item) }}>{state}</div>
        <h5 style={{ margin: 0, color: isDark ? "white" : "black" }}>{name}</h5>
      </motion.div>

      {/* 모달 */}
      {showModal ?
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>팀원 삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>정말로 이 팀원을 삭제하시겠습니까?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              취소
            </Button>
            <Button variant="primary" onClick={deleteMember}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
        :
        null
      }
    </>
  );
};

export default WhatPosCard;
