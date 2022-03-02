import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import T1 from "./test/T1/T1";
import Menu from "./components/Menu";
import Layout from './components/UI/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import AccTable from './components/UI/AccTable';
import './App.css';
import EnhancedTable from './mui-test/EnhancedTable';

function App() {
    return (
        <Layout >
            <Router>
                <Menu />
                {/* <ButtonAppBar /> */}
                <Routes>
                    <Route exact path="/" element={<Main />}/>
                    <Route path="/t1" element={<T1 />} /> 
                    <Route path="/login" element={<Login />}/>
                    <Route path="/acctable" element={<AccTable />} />
                    <Route path="/enhancedtable" element={<EnhancedTable />}/>
                </Routes>
            </Router >
        </Layout >
    );
}

export default App;
