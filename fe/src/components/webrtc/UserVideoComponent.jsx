import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

export default function UserVideoComponent({ streamManager, path }) {

    const getNicknameTag = () => {
        // Gets the nickName of the user
        return JSON.parse(streamManager.stream.connection.data).clientData;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {streamManager !== undefined ? (
                <div>
                    {/* <div className="streamcomponent"> */}
                    <div style={{ height: '0', width: '0' }}>
                        <OpenViduVideoComponent streamManager={streamManager} />
                    </div>
                    {/* <div><p>{getNicknameTag()}</p></div> */}
                    <img src={path} alt="" style={{ height: '40px', borderRadius: '50%' }} />
                </div>
            ) : null}
        </div>
    );
}