import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../store/AuthSlice';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import * as C from '../C';
import * as U from '../utils/utils';



function Login() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const history = useHistory();

    const userNameRef = useRef();
    const passwordRef = useRef();
    const [isValid, setIsValid] = useState(false);
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
                throw new Error('Login failed');
            }
            const data = await resp.json();
            U.upgradeAuthData(data,dispatch,authActions);
            history.push("/");
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
        </form>
    )
}

export default Login
