// components/Callback.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { setUser } from "../store/userSlice";
import getEnv from "../utils/getEnv";

const Callback = () => {
    const [code, setCode ] = useState('');

    const userInfo = useSelector(state => state.user.currentUser);

    const back_url = getEnv('BACK_URL');

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
                axios.get(`${back_url}/oauth2/${codeParam}`)
                //axios.get(`https://k10e103.p.ssafy.io/api/oauth2/${codeParam}`)
                .then((res) => {
                    // console.log(res.data)
                    // console.log(res.data.result.jwtAccessToken);
                    // console.log(res.data.result.memberId)
                    // console.log(res.data.result.memberName);
                    console.log(res.data.result)
                    
                    axios.get(`${back_url}/members/${res.data.result.memberId}`)
                    .then((result) => {
                        console.log(result.data)
                        dispatch(setUser({
                            uid: res.data.result.memberId,
                            photoURL: res.data.memberImg,
                            displayName: res.data.result.memberName,
                            token: res.data.result.jwtAccessToken,
                            newer: res.data.result.newer,
                            photoURL: res.data.result.memberImg,
                            memberEmail: result.data.memberEmail,
                            memberGit: res.data.result.memberGit
                        }))
                    })
                    if(res.data.result.newer == true){
                        navigate('/survey');
                    }
                    else{
                        navigate('/Mainpage');
                    }

                })
                .catch((err) => {
                    console.error(err)
                })
            }
            navigate('/Mainpage')
        }

        fetchData();
        
    }, [])

    return(
        <>
            {}
        </>
    )
};

export default Callback;