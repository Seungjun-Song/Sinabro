import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import DetailProceed from "./DetailProceed";
import DetailJobs from "./DetailJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import getEnv from "../../utils/getEnv";

const Header = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const MainInfo = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.5rem;
`;

const PlusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 1rem 0 0 0;

  width: 100%;
  height: 2rem;
`;

const Writer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
  height: 100%;
`;

const ProfileImg = styled.img`
  height: 2rem;
  width: 2rem;

  border: 0px solid black;
  border-radius: 50%;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.6rem;
`;

const Date = styled.div`
  font-size: 80%;
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 0.2rem;
`;
const DeleteButton = styled.div`
  background: red;
  border: 0px solid red;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  color: white;

  cursor: pointer;
`;

const ModifyButton = styled.div`
  background: rgba(150, 143, 216, 1);
  border: 0px solid rgba(150, 143, 216, 1);
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
  color: white;
  font-family: Jamsil Regular;

  cursor: pointer;
`;

const headerMotion = {
  initial: "hidden",
  animate: "visible",
  exit: "hidden",
  variants: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  transition: { duration: 0.3 },
};

const DetailHeader = ({ kind, detailData, isDark }) => {
  const userInfo = useSelector((state) => state.user.currentUser);
  const back_url = getEnv("BACK_URL");
  // console.log(detailData)
  const navigate = useNavigate();

  const deletePost = () => {
    axios
      .delete(`${back_url}/communities/boards/${detailData.id}`)
      .then((res) => {
        navigate("/communityMainPage", {
          state: { kind: { id: 401, name: "member" }, page: 1 },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Header>
      <MainInfo>
        <DetailProceed detailData={detailData} kind={kind} isDark={isDark} />
        <Title>{detailData.title}</Title>
      </MainInfo>
      <DetailJobs kind={kind} post={detailData}></DetailJobs>
      <PlusInfo>
        {kind.name == "member" || kind.name == "feadback" ? (
          <Writer
            whileHover={{ cursor: "pointer", y: -3 }}
            onClick={() =>
              navigate(`/mypage`, { state: { memberId: detailData.memberId } })
            }
          >
            <ProfileImg src={detailData.writerprofile} />@
            {detailData.writername}
          </Writer>
        ) : (
          <Writer
          >
            <ProfileImg src={detailData.writerprofile} />@
            {detailData.writername}
          </Writer>
        )}

        <RightBox>
          <Date>{detailData.time}</Date>
          {detailData.memberId === userInfo.uid && (
            <Buttons>
              <ModifyButton
                onClick={() =>
                  navigate("/createPost", {
                    state: {
                      kind: kind,
                      isCreate: false,
                      detailData: detailData,
                    },
                  })
                }
              >
                수정
              </ModifyButton>
              <DeleteButton onClick={() => deletePost()}>삭제</DeleteButton>
            </Buttons>
          )}
        </RightBox>
      </PlusInfo>
    </Header>
  );
};

export default DetailHeader;
