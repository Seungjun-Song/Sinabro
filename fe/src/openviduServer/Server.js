// server.mjs

import express from 'express';
import http from 'http';
import OpenViduLib from 'openvidu-node-client';

const { OpenVidu, Session, TokenOptions } = OpenViduLib;

const app = express();
const server = http.createServer(app);

const OPENVIDU_URL = 'http://localhost:4443';
const OPENVIDU_SECRET = 'MY_SECRET';
const OPENVIDU_PORT = 5000;

const openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET, OPENVIDU_PORT);

app.get('/api/get-token/:sessionName/:role', async (req, res) => {
    const { sessionName, role } = req.params;

    const sessionOptions = {
        mediaMode: 'ROUTED',
        recordingMode: 'ALWAYS',
        defaultOutputMode: 'COMPOSED',
    };

    try {
        const session = await openvidu.createSession(sessionOptions);
        const tokenOptions = {
            data: `{"session": "${sessionName}"}`,
            role: role === 'publisher' ? 'PUBLISHER' : 'SUBSCRIBER',
        };
        const token = session.generateToken(new TokenOptions(tokenOptions));
        res.json({ sessionId: session.getSessionId(), token });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).send('Error creating session');
    }
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
