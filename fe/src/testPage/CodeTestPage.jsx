import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CodeTestPage = () => {

    const navigate = useNavigate()

    return (
        <div>

            <p>난 바보야</p>
            <button onClick={() => navigate(-1)}>돌아가기</button>
            <iframe
                title="code-server"
                src="https://enjoyhomecafe.shop:8500/"
                style={{ width: "80%", height: "80vh", border: "none" }}
            ></iframe>
            
        </div>
    );
};

export default CodeTestPage;
