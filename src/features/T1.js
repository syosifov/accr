import React from 'react'

function T1() {

    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        console.log(resp);
        const data = await resp.json();
        console.log(data);
    }

    const getData = function() {
        fetchData();
    }

    return (
        <div>
            <button onClick={fetchData}>Get Posts</button>        
        </div>
    )
}

export default T1
