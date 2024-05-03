// components/Callback.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const [code, setCode ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const location = new URL(window.location.href);
        setCode(location.searchParams.get("code"));

        console.log(code);
        //navigate("/Mainpage");
    }, [])

    return(
        <>
            {'로그인 로딩 페이지'}
        </>
    )
};

export default Callback;