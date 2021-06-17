import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../../store/AuthSlice';

import * as C from '../../C'

function T1() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);

    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        console.log(resp);
        const data = await resp.json();
        console.log(data);
    }

    const fetchCompany = async () => {
        const currTime = new Date().getTime();
        console.log("Time left:", authData.expiresAt - currTime);
        const token = await checkTolen();
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
        const currTime = new Date().getTime();
        console.log("Time left:", authData.expiresAt - currTime);
        const token = await checkTolen();
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

    const checkTolen = async() => {
        const currTime = new Date().getTime();
        const timeLeft = authData.expiresAt - currTime;
        console.log("checkTolen", "timeLeft", timeLeft);
        if(timeLeft < 1000) {
            const token = await refresh();
            return token;
        }
        return authData.token;
    }

    const login = async () => {
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
            dispatch(authActions.lgn(data));
            console.log("data", data);
            console.log("token", data.token);
            console.log("issuedAt", data.issuedAt);
            console.log("expiresAt", data.expiresAt);
            let dat = new Date();
            dat.setTime(data.expiresAt);
            console.log("dat:", dat);
            console.log("refreshToken", data.refreshToken);

        }
        catch (err) {
            console.error("err", err.message);
        }
    }

    const refresh = async () => {
        console.log("refresh")
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
            dispatch(authActions.lgn(data));
            console.log("data", data);
            return data.token;
        }
        catch (err) {
            console.error("err", err.message);
            return null;
        }
    }

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>
            <button onClick={fetchCompany}>Get a Company</button>
            <button onClick={fetchCompanies}>Get Companies</button>
            <button onClick={login}>Login</button>
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}

export default T1
