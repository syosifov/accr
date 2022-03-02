import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

import * as C from '../C';
import * as U from '../utils/utils';



function Login() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const navigate = useNavigate();

    const userNameRef = useRef();
    const passwordRef = useRef();
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");
    console.log("isValid", isValid);

    const submitFormHandler = (e) => {
        e.preventDefault();
        const email = userNameRef.current.value;
        const passw = passwordRef.current.value;
        console.log(email,passw);
        if(email.trim() && passw.trim()) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
            return;
        }
        login(email,passw);
    }

    const login = async (uName, password) => {
        console.log("*** login ***");
        setMessage("");
        try {
            const resp = await fetch(C.LOGIN, {
                method: "POST",
                body: JSON.stringify({
                    username: uName,
                    password: password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            console.log("resp", resp);
            if (!resp.ok) {
                setMessage("Login failed");
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


    return (
        <form onSubmit={submitFormHandler} >
            <div>
                <label htmlFor="userName">Username</label>
                <input type="text" id="userName" required ref={userNameRef}/>
            </div>
            <div>
                <label htmlFor="password" >Password</label>
                <input type="password" id="password" required ref={passwordRef}/>
            </div>
            <div>
                <button type="reset">Clear</button>
                <button type="submit">OK</button>
            </div>
            <div>{message}</div>
        </form>
    )
}

export default Login
