import React, { useState } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';

// Import scrollbar styles
import './scrollbar.css';

const MyPageMainPanelContainer = styled.div`
    border: 3px solid #A2A2A2;
    width: 70%;
    overflow-y: auto;
    margin-bottom: 3rem;
    border-radius: 10px;
    margin-left: 1rem;
    padding-left: 4rem;
    padding-right: 4rem;
    max-height: 550px;
    padding-bottom: 2rem;
`;

const InnerArea = styled.div`
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const InnerText = styled.div`
    font-size: 2rem;
    font-weight: bold;
    color: #204FCF;
`;

const InnerBox = styled.div`
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
`;

const SkillBox = styled.div`
    background-color: #F2F2F2;
    padding: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
    border-radius: 0.8rem;
    display: flex;
    gap: 1rem;
`

const SkillDelBtn = styled.div`
    color: #39A0BA;
    font-weight: bold;
    cursor: pointer;
`

const SearchIcon = styled(FontAwesomeIcon)`
    color: #613ACD;
    cursor: pointer;
    margin-left: auto;
`;

const PjtImg = styled.img`
    width: 25%;
    padding: 1rem;
`

const MemoryGraphContainer = styled.div`
    display: flex;
`

const MemoryGraphMainBox = styled.div`
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    background-image: url('/images/obsidian.png');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 30rem;
    cursor: pointer;
    /* 커서 나중에 없애거나 해야함 */
    `

const MemoryGraphSideBox = styled.div`
    width: 50%;
    height: 30rem;
    display: flex;
    flex-direction: column;
`
const MemoryGraphDescribeBox = styled.div`
    border: 3px solid transparent;
    border-image: linear-gradient(to right, #3DC7AF, #613ACD);
    border-image-slice: 1;
    margin-left: 2rem;
    width: 100%;
    padding: 1rem;
    max-height: 26rem;
    overflow-y: auto;
    margin-bottom: 1rem;
`

const MemoryGraphButtonBox = styled.div`
    margin-left: 2rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const MemoryGraphButton = styled.div`
    font-size: 1rem;
    padding: 0.6rem;
    font-weight: bold;
    background-color: #6C32CD;
    color: white;
    border-radius: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const MyPageMainPanel = () => {
    const [isSideBoxVisible, setIsSidePanelVisible] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false)
    const handleShow = () => setShowModal(true)

    return (
        <MyPageMainPanelContainer>
            <InnerArea>
                <InnerText>
                    Skills
                </InnerText>
                <InnerBox>
                    <SkillBox>
                        {/* {없을 때 띄울 글자 생각해야함} */}
                        React
                        <SkillDelBtn onClick={handleShow}>
                            X
                        </SkillDelBtn>
                    </SkillBox>
                    <SearchIcon icon={faSearch} onClick={handleShow}/>
                </InnerBox>
            </InnerArea>
            <InnerArea>
                <InnerText>
                    Works
                </InnerText>
                <InnerBox style={{ padding: '0', gap: '0' }}>
                    {/* Works 내용 */}
                    <PjtImg src={'/images/default_pjt_img.png'} />
                    <PjtImg src={'/images/default_pjt_img.png'} />
                    <PjtImg src={'/images/default_pjt_img.png'} />
                    <PjtImg src={'/images/default_pjt_img.png'} />
                    <PjtImg src={'/images/default_pjt_img.png'} />
                </InnerBox>
            </InnerArea>
            <InnerArea>
                <InnerText>
                    Memory Graph
                </InnerText>
                <MemoryGraphContainer>
                    <MemoryGraphMainBox onClick={() => setIsSidePanelVisible(!isSideBoxVisible)}>

                    </MemoryGraphMainBox>
                    {isSideBoxVisible &&
                        <MemoryGraphSideBox>
                            <MemoryGraphDescribeBox>
                                <h1>제목</h1>
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                                내용내용내용내용내용내용
                            </MemoryGraphDescribeBox>
                            <MemoryGraphButtonBox>
                                <MemoryGraphButton onClick={handleShow}>
                                    Add Node
                                </MemoryGraphButton>
                                <MemoryGraphButton onClick={handleShow}>
                                    Edit
                                </MemoryGraphButton>
                            </MemoryGraphButtonBox>
                        </MemoryGraphSideBox>
                    }
                </MemoryGraphContainer>
            </InnerArea>
            {/* 아래부분 모달 코드이므로 추후에 수정 필요 */}
            {showModal &&
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>나중에</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>수정할게요</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </MyPageMainPanelContainer>
    );
};

export default MyPageMainPanel;
