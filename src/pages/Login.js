// https://github.com/vikas62081/YT/blob/loginPage/src/components/login.js

import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

import * as C from '../C';
import * as U from '../utils/utils';
import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function Login() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const navigate = useNavigate();
    
    const [isValid, setIsValid] = useState(false);
    const [message, setMessage] = useState("");
    console.log("isValid", isValid);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const paperStyle = {padding: 20, height: '70vh', width:280, margin: '20px auto'};
    const avatarStyle = {backgroundColor: '#008080'};
    const btnStyle = {margin: '8px 0'};

    const submitFormHandler = (e) => {
        e.preventDefault();
        console.log("username", username);
        console.log("password", password);
        
        if(username.trim() && password.trim()) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
            return;
        }
        login(username,password);
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

    const preventDefault = () => {}

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }



    return (
        <form onSubmit={submitFormHandler}>
            {/* <div>
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
            <div>{message}</div> */}
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2> Sign in </h2>
                    </Grid>
                    <TextField
                        label="Username"
                        placeholder="Enrer username"
                        fullWidth
                        required
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        label="Password"
                        placeholder="Enrer password"
                        fullWidth
                        required
                        type="password"
                        onChange={handlePasswordChange}
                    />
                    <FormControlLabel
                        control={<Checkbox name="checkedB" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        style={btnStyle}
                    >
                        Sign in
                    </Button>
                    {/* <Typography>
                        <Link href="#" onClick={preventDefault}>
                            Forgot password?{" "}
                        </Link>
                    </Typography>
                    <Typography>
                        {" "}
                        Do you have an account?
                        <Link href="#" onClick={preventDefault}>
                            {" "}
                            Sign Up{" "}
                        </Link>
                    </Typography> */}
                </Paper>
            </Grid>
        </form>
    );
}

export default Login
 