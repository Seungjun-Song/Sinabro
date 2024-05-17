import React from 'react';
import styled from 'styled-components';
import OpenViduVideoComponent from './OvVideo';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserVideoWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const UserImg = styled.img`
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease;
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the image */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;

  ${UserVideoWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

export default function UserVideoComponent({ streamManager }) {
  const getUserImg = () => {
    return JSON.parse(streamManager.stream.connection.data).clientURL;
  };

  const getUserName = () => {
    return JSON.parse(streamManager.stream.connection.data).clientName;
  };

  return (
    <Container>
      {streamManager !== undefined ? (
        <UserVideoWrapper>
          <div style={{ height: '0', width: '0' }}>
            <OpenViduVideoComponent streamManager={streamManager} />
          </div>
          <UserImg src={getUserImg()} alt="" />
          <Tooltip>{getUserName()}</Tooltip>
        </UserVideoWrapper>
      ) : null}
    </Container>
  );
}
