import jwt from 'jwt-decode';
import * as C from '../C'

   

export const refresh = async(authData, dispatch, authActions) => {
    console.log("*** refresh ***")
    try {
        const resp = await fetch(C.REFRESH, {
            method: "POST",
            body: JSON.stringify({ refreshToken: authData.refreshToken }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        console.log("resp", resp);
        if (!resp.ok) {
            throw new Error('Refresh failed');
        }
        const data = await resp.json();
        upgradeAuthData(data,dispatch,authActions);
        return data.token;
    }
    catch (err) {
        console.error("err", err.message);
        return null;
    }
}

export const checkToken = async(authData, dispatch, authActions) => {
    console.log("*** checkToken ***");
    const currTime = new Date().getTime();
    const timeLeft = authData.tokenExpiresAt - currTime;
    console.log("checkToken", "timeLeft", timeLeft);
    if(timeLeft < 1000) {
        const token = await refresh(authData,dispatch,authActions);
        return token;
    }
    return authData.token;
}

export const upgradeAuthData = (data, dispatch, authActions) => {
    const token = data.token;
    const decoded = jwt(token);
    data.tokenIssuedAt = decoded.iat * 1000;
    data.tokenExpiresAt = decoded.exp * 1000;

    let roles = [];
    try {
        roles = getRoles(token);
        data.roles = roles;
    }
    catch (err) {
        console.error(err);
    }
    
    const dat = new Date();
    dat.setTime(data.tokenIssuedAt);
    data.tokenIssuedAtDat = dat.toString();
    dat.setTime(data.tokenExpiresAt);
    data.tokenExpiresAtDat = dat.toString();

    const decodedRefreshToken = jwt(data.refreshToken);
    data.refreshTokenIssuedAt = decodedRefreshToken.iat * 1000;
    data.refreshTokenExpiresAt = decodedRefreshToken.exp * 1000;

    dat.setTime(data.refreshTokenIssuedAt);
    data.refreshTokenIssuedAtDat = dat.toString();
    dat.setTime(data.refreshTokenExpiresAt);
    data.refreshTokenExpiresAtDat = dat.toString();

    dispatch(authActions.lgn(data));
}

const getRoles = (token) => {
    const decoded = decode(token);
    let saRoles;
    try {
        let aRoles = decoded.authorities;
        saRoles = aRoles.map(x => x.authority);
    }
    catch (err) {
        return null;
    }
    return saRoles;
}

const decode = (tkn) => {
    console.log("*** decode ***")
    let decoded
    try {
        decoded = jwt(tkn);
    }
    catch (err) {
        return null;
    }
    return decoded;
}

    


