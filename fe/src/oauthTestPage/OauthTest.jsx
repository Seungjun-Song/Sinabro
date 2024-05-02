import React, { useEffect, useState } from 'react';
import {Cookies} from 'react-cookie';
import axios from 'axios';

const OauthTest = () => {
    const [cookie, setCookie] = useState('');
    const cookies = new Cookies();

    const getCookies = () => {
        setCookie(cookies.get('Authorization'));
        console.log(cookie);
    }

    const useAxios = () => {
        // axios.get('http://localhost:8080/api/oauth2/authorization/github')
        axios.get(`https://k10e103.p.ssafy.io/api/oauth2/authorization/github`)
        .then((res) => {
            setCookie(res);
            console.log("cookie");
            console.log(JSON.stringify(cookie));
            
        })
        .catch((err) => {

        });
    }

    return (
      <div>
        <button onClick={() => getCookies()}>쿠키 내놔 시바 새꺄</button>
        <button onClick={() => useAxios()}>axios로 받고 다른페이지로 이동하기</button>
        <p>쿠키 값: { cookie }</p>
      </div>
    );
}

export default OauthTest;