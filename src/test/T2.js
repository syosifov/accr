import React from "react";
import { useRef, useState } from "react";
import * as C from "../C";
import EpForm from "./EpForm";

const T2 = () => {
    const [data, setData] = useState({})
    const preparePayment = async () => {
        const txt = {};
        txt.assigned_tax_id = 2;

        const stxt = JSON.stringify(txt);
        const token = "";

        console.log("testAssign", stxt);
        try {
            const resp = await fetch(C.PAY_PREPARE, {
                method: "POST",
                body: stxt,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            console.log(resp);
            const dt = await resp.json();
            console.log(dt)
            setData(dt)
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <>
            <EpForm 
                PAGE = {data.PAGE} 
                ENCODED = {data.ENCODED} 
                CHECKSUM = {data.CHECKSUM} />
            <button onClick={preparePayment}>Prepare payment</button>
        </>
    );
};

export default T2;
