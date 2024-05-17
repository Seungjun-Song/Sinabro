import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserVideoComponent({ streamManager }) {
    const getUserImg = () => {
        // Gets the clientURL of the user
        return JSON.parse(streamManager.stream.connection.data).clientURL;
    };

    const getUserName = () => {
        // Gets the clientName of the user
        return JSON.parse(streamManager.stream.connection.data).clientName;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {streamManager !== undefined ? (
                <div>
                    <div style={{ display: 'none' }}>
                        <OpenViduVideoComponent streamManager={streamManager} />
                    </div>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{getUserName()}</Tooltip>}
                    >
                        <img 
                            src={getUserImg()} 
                            alt="" 
                            style={{ height: '40px', borderRadius: '50%', cursor: 'pointer' }} 
                        />
                    </OverlayTrigger>
                </div>
            ) : null}
        </div>
    );
}
