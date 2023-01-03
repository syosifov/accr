import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import T1 from "./test/T1/T1";
import T2 from "./test/T2"
import PayRequest from './test/PayRequest';
import Menu from "./components/Menu";
import MenuTest from "./components/MenuTest";
import Layout from './components/UI/Layout';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
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
                    <Route path="/" element={<Main />}/>
                    <Route path="/m" element={<MenuTest />} />
                    <Route path="/t1" element={<T1 />} /> 
                    <Route path="/t2" element={<T2 />} /> 
                    <Route path="/pay" element={<PayRequest />} /> 
                    <Route path="/login" element={<Login />}/>
                    <Route path="/acctable" element={<AccTable />} />
                    <Route path="/enhancedtable" element={<EnhancedTable />}/>
                    <Route path="/signup" element={<SignUp />}/>
                </Routes>
            </Router >
        </Layout >
    );
}

export default App;
