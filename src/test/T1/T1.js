import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel }  from '../../store/AuthSlice';

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

    const fetchCompanies = async () => {
        // 'Authorization': 'Bearer '+'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbm5hc21pdGgiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BQ0MifV0sImlkIjoyODEsImlhdCI6MTYyMzM5ODAwNSwiZXhwIjoxNjI0MjYyMDA1fQ.CSjyFW1T6FpU8uoZ3Lwx_9y2wMtRl0yKwB0sHkTgfxgIUeMXtSzftzmaO8MBfIsbw8LK1Dc9i5A-R12P8JLkCw'
        try {
            const resp = await fetch(C.COMPANIES+'/2' ,{
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+authData.token}
            });
            console.log(resp);
            if(!resp.ok) {
                throw new Error('Request failed');
            }
            const data = await resp.json();
            console.log(data);
        }
        catch(err) {
            console.error(err.message);
        }
    }

    const login = async() => {
        try {
            const resp = await fetch(C.LOGIN, {
                method: "POST",
                body: JSON.stringify({username: "annasmith",
                                      password: "password"}),
                headers: {'Accept': 'application/json',
                          'Content-Type': 'application/json'}
            })
            console.log("resp",resp);
            if(!resp.ok) {
                throw new Error('Login failed');
            }
            const data = await resp.json();
            dispatch(authActions.lgn(data));
            console.log("data",data);
            console.log("token", data.token);
            console.log("issuedAt", data.issuedAt);
            console.log("expiresAt", data.expiresAt);
            console.log("refreshToken", data.refreshToken);
            
        }
        catch(err) {
            console.error("err",err.message);
        }
    }

    const refresh = async () => {
        try {
            const resp = await fetch(C.REFRESH, {
                    method: "POST",
                    body: JSON.stringify({refreshToken: authData.refreshToken}),
                    headers: {'Accept': 'application/json',
                              'Content-Type': 'application/json'}
                });
            console.log("resp",resp);
            if(!resp.ok) {
                throw new Error('Refresh failed');
            }
            const data = await resp.json();
            dispatch(authActions.lgn(data));
            console.log("data",data);
        }
        catch(err) {
            console.error("err",err.message);
        }
    }

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>        
            <button onClick={fetchCompanies}>Get Companies</button>
            <button onClick={login}>Login</button>
            <button onClick={refresh}>Refresh</button>
        </div>
    )
}

export default T1
