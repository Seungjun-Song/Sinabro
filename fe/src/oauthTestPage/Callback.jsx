// components/Callback.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setUser } from "../store/userSlice";

const Callback = () => {
    const [code, setCode ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchData = async () => {
            const location = new URL(window.location.href);
            const codeParam = location.searchParams.get("code");

            // console.log('in useEffect/ collback : ');
            // console.log(codeParam);
    
            if(codeParam){
                setCode(codeParam)
                //axios.get(`http://localhost:8080/api/oauth2/${codeParam}`)
                axios.get(`https://k10e103.p.ssafy.io/api/oauth2/${codeParam}`)
                .then((res) => {
                    // console.log(res.data)
                    // console.log(res.data.result.jwtAccessToken);
                    // console.log(res.data.result.memberId)
                    // console.log(res.data.result.memberName);
                    dispatch(setUser({
                        uid: res.data.result.memberId,
                        displayName: res.data.result.memberName,
                        token: res.data.result.jwtAccessToken,
                    }))

                })
                .catch((err) => {
        
                })
            }

        }

        fetchData();

        navigate('/mainPage');

    }, [])

    return(
        <>
            {code}
        </>
    )
};

export default Callback;