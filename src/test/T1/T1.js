import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions }  from '../../store/AuthSlice';

function T1() {

    const dispatch = useDispatch();

    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        console.log(resp);
        const data = await resp.json();
        console.log(data);
    }

    const fetchCompanies = async () => {
        const resp = await fetch("https://localhost:8443/api/companies");
        console.log(resp);
        const data = await resp.json();
        console.log(data);
    }

    const login = async() => {
        try {
            const resp = await fetch("https://localhost:8443/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({username: "annasmith",
                                    password: "password"}),
                headers: {'Accept': 'application/json',
                        'Content-Type': 'application/json'}
            })
            console.log("resp",resp);
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

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>        
            <button onClick={fetchCompanies}>Get Companies</button>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default T1
