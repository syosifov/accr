import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../../store/AuthSlice';

import * as U from "../../utils/utils";


import * as C from '../../C'

const T1 = () => {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
   
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
        const token = await U.checkToken(authData,dispatch,authActions);
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
        const token = await U.checkToken(authData,dispatch,authActions);
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
            U.upgradeAuthData(data,dispatch,authActions);
        }
        catch (err) {
            console.error("err", err.message);
        }
    }

    const logout = () => {
        dispatch(authActions.lgt())
    }

    const testToken = async () => {
        const token = await U.checkToken(authData,dispatch,authActions);
        console.log("testToken", token);
    }

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>
            <button onClick={fetchCompany}>Get a Company</button>
            <button onClick={fetchCompanies}>Get Companies</button>
            <button onClick={login}>Login</button>
            <button onClick={()=>U.refresh(authData,dispatch,authActions)}>Refresh</button>
            <button onClick={logout}>Logout</button>
            <button onClick={testToken}>testToken</button>
        </div>
    )
}

export default T1
