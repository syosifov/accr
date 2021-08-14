import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../../store/AuthSlice';
import jwt from 'jwt-decode';
import U from "../../utils/Utils";
import U2 from "../../utils/U2";


import * as C from '../../C'

function T1() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const uu = new U();

    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        console.log(resp);
        const data = await resp.json();
        console.log(data);
    }

    const fetchCompany = async () => {
        console.log("*** fetchCompany ***");
        const currTime = new Date().getTime();
        console.log("Time left:", authData.tokenExpiresAt - currTime);
        const token = await uu.checkToken()
        try {
            const resp = await fetch(C.COMPANIES + '/2', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(resp);
            if (!resp.ok) {
                throw new Error('Request failed');
            }
            const data = await resp.json();
            console.log(data);
        }
        catch (err) {
            console.error(err.message);
        }
    }



    const fetchCompanies = async () => {
        console.log("*** fetchCompanies ***");
        const currTime = new Date().getTime();
        console.log("Time left:", authData.tokenExpiresAt - currTime);
        const token = await checkToken();
        try {
            const resp = await fetch(C.COMPANIES + '', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log(resp);
            if (!resp.ok) {
                throw new Error('Request failed');
            }
            const data = await resp.json();
            console.log(data);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const checkToken = async() => {
        console.log("*** checkToken ***");
        const currTime = new Date().getTime();
        const timeLeft = authData.tokenExpiresAt - currTime;
        console.log("checkToken", "timeLeft", timeLeft);
        if(timeLeft < 1000) {
            const token = await refresh();
            return token;
        }
        return authData.token;
    }

    const login = async () => {
        console.log("*** login ***");
        try {
            const resp = await fetch(C.LOGIN, {
                method: "POST",
                body: JSON.stringify({
                    username: "annasmith",
                    password: "password"
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            console.log("resp", resp);
            if (!resp.ok) {
                throw new Error('Login failed');
            }
            const data = await resp.json();
            getData(data);
        }
        catch (err) {
            console.error("err", err.message);
        }
    }

    const getData = (data) => {
        const token = data.token;
        const decoded = jwt(token);
        data.tokenIssuedAt = decoded.iat * 1000;
        data.tokenExpiresAt = decoded.exp * 1000;

        let roles = [];
        try {
            roles = getRoles(token);
            data.roles = roles;
        }
        catch (err) {
            console.error(err);
        }
        
        const dat = new Date();
        dat.setTime(data.tokenIssuedAt);
        data.tokenIssuedAtDat = dat.toString();
        dat.setTime(data.tokenExpiresAt);
        data.tokenExpiresAtDat = dat.toString();

        const decodedRefreshToken = jwt(data.refreshToken);
        data.refreshTokenIssuedAt = decodedRefreshToken.iat * 1000;
        data.refreshTokenExpiresAt = decodedRefreshToken.exp * 1000;

        dat.setTime(data.refreshTokenIssuedAt);
        data.refreshTokenIssuedAtDat = dat.toString();
        dat.setTime(data.refreshTokenExpiresAt);
        data.refreshTokenExpiresAtDat = dat.toString();

        dispatch(authActions.lgn(data));
    }

    const refresh = async () => {
        console.log("*** refresh ***")
        try {
            const resp = await fetch(C.REFRESH, {
                method: "POST",
                body: JSON.stringify({ refreshToken: authData.refreshToken }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            console.log("resp", resp);
            if (!resp.ok) {
                throw new Error('Refresh failed');
            }
            const data = await resp.json();
            getData(data);
            return data.token;
        }
        catch (err) {
            console.error("err", err.message);
            return null;
        }
    }

    const decode = (tkn) => {
        console.log("*** decode ***")
        let decoded
        try {
            decoded = jwt(tkn);
        }
        catch (err) {
            return null;
        }
        return decoded;
    }

    const getRoles = (token) => {
        const decoded = decode(token);
        let saRoles;
        try {
            let aRoles = decoded.authorities;
            saRoles = aRoles.map(x => x.authority);
        }
        catch (err) {
            return null;
        }
        return saRoles;
    }

    const logout = () => {
        dispatch(authActions.lgt())
    }

    const testU2 = () => {
        const u2 = new U2();
        u2.sayHello();
    }

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>
            <button onClick={fetchCompany}>Get a Company</button>
            <button onClick={fetchCompanies}>Get Companies</button>
            <button onClick={login}>Login</button>
            <button onClick={refresh}>Refresh</button>
            <button onClick={() => decode(authData.token)}>Decode Token</button>
            <button onClick={() => decode(authData.refreshToken)}>Decode Refresh Token</button>
            <button onClick={getRoles}>Get Roles</button>
            <button onClick={logout}>Logout</button>
            <button onClick={testU2}>testU2</button>
        </div>
    )
}

export default T1
