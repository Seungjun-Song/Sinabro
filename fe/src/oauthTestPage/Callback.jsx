// components/Callback.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
    const [code, setCode ] = useState('');
    const navigate = useNavigate();

    const [ token, setToken ] = useState('');
    const [ name, setName ] = useState('');

    useEffect(() => {
        const location = new URL(window.location.href);
        setCode(location.searchParams.get("code"));

        //navigate("/Mainpage");
        axios.get(`https://k10e103.p.ssafy.io/api/oauth2/${code}`)
        //axios.get(`http://localhost:8080/api/oauth2/${code}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {

        })

    }, [])

    return(
        <>
            {code}
        
        </>
    )
};

export default Callback;