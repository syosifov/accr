import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    useHistory,
} from "react-router-dom";

import T1 from "./test/T1/T1";
import Menu from "./components/Menu";
import Layout from './components/UI/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import BasicTable from './mui-test/BasicTable';
import DataTable from './mui-test/DataTable';
import EnhancedTable from './mui-test/EnhancedTable';
import ButtonAppBar from './mui-test/ButtonAppBar';

import './App.css';

function App() {
    return (
        <Layout >
            <Router>
                <Menu />
                <ButtonAppBar />
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path="/t1">
                        <T1 />
                    </Route>
                    <Route path="/basictable">
                        <BasicTable />
                    </Route>
                    <Route path="/datatable">
                        <DataTable />
                    </Route>
                    <Route path="/enhancedtable">
                        <EnhancedTable />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>

            </Router >
        </Layout >
    );
}

export default App;
