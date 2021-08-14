import jwt from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux';
import { authActions, authDataSel } from '../store/AuthSlice';

function Utils() {

    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);

    const checkToken = async() => {
        console.log("*** checkToken ***");
        const currTime = new Date().getTime();
        const timeLeft = authData.tokenExpiresAt - currTime;
        console.log("checkToken", "timeLeft", timeLeft);
        if(timeLeft < 1000) {
            // const token = await refresh();
            // return token;
        }
        return authData.token;
    }

}

export default Utils;
