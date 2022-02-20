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
                        <NavLink to="/" exact activeClassName={classes.active}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/acctable"
                            activeClassName={classes.active}
                        >
                            AccTable
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/t1" activeClassName={classes.active}>
                            t1
                        </NavLink>
                    </li>
                    {tkn && (
                        <li>
                            <NavLink
                                to="/"
                                activeClassName={classes.active}
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
                                activeClassName={classes.active}
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Menu;
