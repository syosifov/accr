import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../../store/AuthSlice';
import { accActions, accDataSel } from '../../store/AccSlice';
import { useNavigate } from 'react-router-dom';

import * as U from "../../utils/utils";


import * as C from '../../C'

const T1 = () => {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const navigate = useNavigate();
    const accData = useSelector(accDataSel);
   
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
            navigate("/");
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

    const accounts = async () => {
        // https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
        try {
            const esc = encodeURIComponent;
            const params = {
                page: 0,
                size: 300
            }
            const query = Object.keys(params).map(k => `${esc(k)}=${esc(params[k])}`).join('&')
            const resp = await fetch(C.ACCOUNTS+'?'+query, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token
                }
            });
            console.log(resp);
            if (!resp.ok) {
                throw new Error('Request failed');
            }
            const data = await resp.json();
            console.log(data);
            const aData = await data._embedded.accounts;
            console.log(aData);
            dispatch(accActions.loadData(aData));
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const testAssign = async () => {
        // const token = await U.checkToken(authData,dispatch,authActions); //TODO
        const token = "";

        const acc = {};
        acc.description = "Third record";
        acc.lstAssgn = [{debit: '50301', credit: '111', value: 60, vm: null},
                        {debit: '50401', credit: '111', value: 40.01, vm: 20},
                        ]
        acc.amount = 100.01;
        const sacc = JSON.stringify(acc);

        console.log("testAssign", sacc);
        try {
            const resp = await fetch(C.ASSIGN,{
                method: "POST",
                body: sacc,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            });
            console.log(resp);
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const reverseAssign = async () => {
        // const token = await U.checkToken(authData,dispatch,authActions); //TODO
        const token = "";

        const data = {};
        data.description = "Поправка на грешка";
        data.ledgerRecId = 2;
        const sData = JSON.stringify(data);

        console.log('reverseAssign', sData);

        try {
            const resp = await fetch(C.REVERSE,{
                method: "POST",
                body: sData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            });
            console.log(resp);
        }
        catch (err) {
            console.error(err.message);
        }
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
            <button onClick={accounts}>Get accounts</button>
            <button onClick={testAssign}>Test assign</button>
            <button onClick={reverseAssign}>Reverse assign</button>
        </div>
    )
}

export default T1
