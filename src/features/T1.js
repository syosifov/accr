import React from 'react'

function T1() {

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
        const resp = await fetch("https://localhost:8443/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify({username: "annasmith",
                                 password: "password"}),
            headers: {'Accept': 'application/json',
                      'Content-Type': 'application/json'}
        });
        console.log(resp);
        const data = await resp.json();
        console.log(data);
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
