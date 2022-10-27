import { React, useState } from "react";
import * as C from "../C";
import EpForm from "./EpForm";


function PayRequest() {
    const [MIN, setMin] = useState('D460900632');
    const [INVOICE, setInv] = useState('');
    const [AMOUNT, setAmount] = useState('');
    const [DESCR, setDescr] = useState('');
    const [sec, setSec] = useState(3600);
    const [data, setData] = useState({PAGE: '', ENCODED: '', CHECKSUM: ''})

    const handleMinChange = (event) => {
        setMin(event.target.value);
    }
    const handleInvChange = (event) => {
        setInv(event.target.value);
    }
    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }
    const handleDescrChange = (event) => {
        setDescr(event.target.value);
    }
    const handleSecChange = (event) => {
        setSec(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(MIN,INVOICE,AMOUNT,DESCR,sec)
        const token = ''
        const stxt = JSON.stringify({MIN,INVOICE,AMOUNT,DESCR,sec})
        console.log("stxt",stxt)
        try {
            const resp = await fetch(C.PAY_REQUEST, {
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
            console.log("dt",dt)
            setData(dt)
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="minText">Идентификационен номер на търговец</label><br/>
                <input type="text" id="minText" value={MIN} onChange={handleMinChange}/><br/>
                <label htmlFor="invText">Номер на фактура</label><br/>
                <input type="text" id="invText" value={INVOICE} onChange={handleInvChange}/><br/>
                <label htmlFor="amountText">Сума</label><br/>
                <input type="text" id="amountText" style={{textAlign: 'right'}} value={AMOUNT} onChange={handleAmountChange}/><br/>
                <label htmlFor="descrText">Описание</label><br/>
                <textarea id="descrText" onChange={handleDescrChange} cols="30" rows="3" value={DESCR} /><br/>
                <label htmlFor="secText">Срок [s]</label><br/>
                <input type="text" id="secText" style={{textAlign: 'right'}} value={sec} onChange={handleSecChange}/><br/>
                <button type="submit">OK</button>
            </form>
            <EpForm 
                PAGE = {data.PAGE} 
                ENCODED = {data.ENCODED} 
                CHECKSUM = {data.CHECKSUM} 
            />
        </>
    );
}

export default PayRequest;
