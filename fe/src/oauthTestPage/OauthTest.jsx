import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import getEnv from '../utils/getEnv'

export const logIn = () => {
    const back_url = getEnv('BACK_URL')

    const CLIENT_ID = getEnv('CLIENT_ID');
    const CALLBACK_URL = getEnv('CALLBACK_URL');

    const GITHUB_AUTH_CODE_SERVER = getEnv('GITHUB_AUTH_CODE_SERVER')


    const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&scope=user&redirect_uri=${CALLBACK_URL}`;

    // 인가 서버에 GET 요청을 전송한다.
    window.location.assign(AUTHORIZATION_CODE_URL);
}

export const logInServer = () => {
    const CLIENT_ID = "218c974f1409ed1c47b2";
    const CALLBACK_URL = "https://k10e103.p.ssafy.io/callback";
    const GITHUB_AUTH_CODE_SERVER = "https://github.com/login/oauth/authorize";
    const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

    // 인가 서버에 GET 요청을 전송한다.
    window.location.assign(AUTHORIZATION_CODE_URL);
};

export const logInLocal = () => {
    const CLIENT_ID = "83e5d9fb40bfc85291f9";
    const CLIENT_SECRETS = "4490fac24eac201fd1dd3e4196e86a1f8f07f0ad";
    const CALLBACK_URL = "http://localhost:5173/callback";

    const GITHUB_AUTH_CODE_SERVER = "https://github.com/login/oauth/authorize";
    const GITHUB_AUTH_TOKEN_SERVER = "/login/oauth/access_token";
    const GITHUB_API_SERVER = "/user";

    const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

    // 인가 서버에 GET 요청을 전송한다.
    window.location.assign(AUTHORIZATION_CODE_URL);
}

const OauthTest = () => {
    const [cookie, setCookie] = useState('');
    const cookies = new Cookies();

    const getCookies = () => {
        setCookie(cookies.get('Authorization'));

        axios.get('https://api.github.com/user')
        console.log(cookie);
    }

    const useAxios = () => {
        axios.get('http://localhost:8080/api/oauth2/authorization/github')
            //axios.get(`https://k10e103.p.ssafy.io/api/oauth2/authorization/github`)
            .then((res) => {
                //setCookie(res);
                console.log("cookie");
                console.log(JSON.stringify(res));

            })
            .catch((err) => {

            });


    }

    const MemoApi = () => {
        console.log("in MemoApi")
        axios.get(`https://localhost:8080/api/memo`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {

            });
    }

    const getGitCode = () => {
        const CLIENT_ID = "218c974f1409ed1c47b2";
        const CLIENT_SECRETS = "c4404c995b5c19a69570db139fb789a25ddb4d10";
        const CALLBACK_URL = "https://k10e103.p.ssafy.io/callback";
        //const CALLBACK_URL = "http://localhost:5173/callback";

        const GITHUB_AUTH_CODE_SERVER = "https://github.com/login/oauth/authorize";
        const GITHUB_AUTH_TOKEN_SERVER = "/login/oauth/access_token";
        const GITHUB_API_SERVER = "/user";

        const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

        // 인가 서버에 GET 요청을 전송한다.
        window.location.assign(AUTHORIZATION_CODE_URL);


    }

    const logInLocal = () => {
        const CLIENT_ID = "83e5d9fb40bfc85291f9";
        const CLIENT_SECRETS = "4490fac24eac201fd1dd3e4196e86a1f8f07f0ad";
        const CALLBACK_URL = "http://localhost:5173/callback";

        const GITHUB_AUTH_CODE_SERVER = "https://github.com/login/oauth/authorize";
        const GITHUB_AUTH_TOKEN_SERVER = "/login/oauth/access_token";
        const GITHUB_API_SERVER = "/user";

        const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

        // 인가 서버에 GET 요청을 전송한다.
        window.location.assign(AUTHORIZATION_CODE_URL);
    }

    const logInServer = () => {
        const CLIENT_ID = "218c974f1409ed1c47b2";
        const CLIENT_SECRETS = "4490fac24eac201fd1dd3e4196e86a1f8f07f0ad";
        const CALLBACK_URL = "https://k10e103.p.ssafy.io/callback";

        const GITHUB_AUTH_CODE_SERVER = "https://github.com/login/oauth/authorize";
        const GITHUB_AUTH_TOKEN_SERVER = "/login/oauth/access_token";
        const GITHUB_API_SERVER = "/user";

        const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}`;

        // 인가 서버에 GET 요청을 전송한다.
        window.location.assign(AUTHORIZATION_CODE_URL);
    }

    return (
        <div>
            {/* <button onClick={() => getCookies()}>쿠키 내놔 새꺄</button>
        <button onClick={() => useAxios()}>axios로 받고 다른페이지로 이동하기, 아직 테스트 중</button>
        <button onClick={() => MemoApi()}>memo api</button> */}
            {/* <button onClick={() => getGitCode(false)}>git code받기-local용</button>
        <button onClick={() => getGitCode(true)}>git code받기-배포용</button> */}
            <button onClick={() => logInServer()}>로그인하기-배포용</button>
            <button onClick={() => logInLocal()}>로그인하기-로컬 테스트용</button>
            <p>쿠키 값: {cookie}</p>
        </div>
    );
}

export default OauthTest;
