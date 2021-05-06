import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useHistory,
} from "react-router-dom";

import CounterDemo from "./features/CounterDemo/CounterDemo";
import T1 from "./features/T1";
import './App.css';

function App() {
    return (

        <Router>
            <Switch>
                <Route exact path="/">
                    <CounterDemo />
                </Route>
                <Route path="/t1">
                    <T1 />
                </Route>
            </Switch>
            
        </Router >
    );
}

export default App;
