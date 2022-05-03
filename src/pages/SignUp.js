import React from "react";
import { useRef, useState } from "react";
import { connect } from "react-redux";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
    Avatar,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@material-ui/core";
const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
};


export const SignUp = (props) => {
    const avatarStyle = { backgroundColor: "#008080" };
    const btnStyle = {margin: '8px 0'};

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [info, setInfo] = useState("");
    const [err, setErr] = useState("");

    const submithandler = (event) => {
        event.preventDefault();
        if(!equalPass(password, password1)){
            return;
        }
    };

    const equalPass = (p1,p2) => {
        if(p1 !== p2) {
            setErr("Passwords mismatch");
            return false;
        }
        setErr("");
        return true;
    }

    return (
        <Grid container>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center" item >
                    <Avatar style={avatarStyle}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <h2> Sign up </h2>
                </Grid>
                <form onSubmit={submithandler}>
                    <TextField
                        label="Username"
                        placeholder="Enrer username"
                        fullWidth
                        required
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        placeholder="Enrer password"
                        fullWidth
                        required
                        value={password}
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <TextField
                        placeholder="Repeat password"
                        fullWidth
                        required
                        value={password1}
                        type="password"
                        onChange={(event) => {
                            setPassword1(event.target.value);
                        }}
                    />
                    <TextField
                        label="Email"
                        placeholder="Enrer email"
                        fullWidth
                        required
                        value={email}
                        type="input"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        label="Phone"
                        placeholder="Enrer phone"
                        fullWidth
                        required
                        value={phone}
                        type="input"
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                    />
                    <TextField
                        label="More Info"
                        placeholder="More info"
                        fullWidth
                        value={info}
                        type="input"
                        onChange={(event) => {
                            setInfo(event.target.value);
                        }}
                    />
                    <Typography color="error">{err}</Typography>
                    <Button
                        type="submit"
                        color="primary"
                        fullWidth
                        variant="contained"
                        style={btnStyle}
                    >
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
