import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions, authDataSel } from "../store/AuthSlice";

import classes from "./Menu.module.css";

function Menu() {
    const dispatch = useDispatch();
    const authData = useSelector(authDataSel);
    const tkn = authData.token;

    return (
        <header className={classes.header}>
            <div className={classes.logo}>ACCR</div>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <NavLink to="/" >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Pay"
                        >
                            Pay
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/enhancedtable"
                        >
                            EnhancedTable
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/acctable"
                            
                        >
                            AccTable
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/t1" >
                            t1
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/t2" >
                            epay
                        </NavLink>
                    </li>
                    {tkn && (
                        <li>
                            <NavLink
                                to="/"
                                
                                onClick={() => dispatch(authActions.lgt())}
                            >
                                Logout
                            </NavLink>
                        </li>
                    )}
                    {!tkn && (
                        <li>
                            <NavLink
                                to="/login"
                                
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                    {!tkn && (
                        <li>
                            <NavLink
                                to="/signup"
                                
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Menu;
