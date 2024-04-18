import React from 'react';
import styled from 'styled-components';

const MyPageMainPanelContainer = styled.div`
    border: 3px solid #A2A2A2;
    width: 70%;
    overflow-y: auto;
    margin-bottom: 3rem;
    border-radius: 1rem;
    margin-left: 1rem;
    padding-left: 4rem;
    padding-right: 4rem;
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
`;

const MyPageMainPanel = () => {
    return (
        <MyPageMainPanelContainer>
            <InnerArea>
                <InnerText>
                    Preference
                </InnerText>
                <InnerBox>
                    rr
                </InnerBox>
            </InnerArea>
            <InnerArea>
                <InnerText>
                    Works
                </InnerText>
                <InnerBox>
                    rr
                </InnerBox>
            </InnerArea>
        </MyPageMainPanelContainer>
    );
};

export default MyPageMainPanel;
