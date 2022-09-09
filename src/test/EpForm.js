import {React, useState, useEffect} from "react";

function EpForm(props) {
    const [page, setPage] = useState(props.PAGE)
    const [ENCODED, setEncoded] = useState(props.ENCODED)
    const [CHECKSUM, setChecksum] = useState(props.CHECKSUM)

    useEffect(() => {
        setPage(props.PAGE);
        setEncoded(props.ENCODED)
        setChecksum(props.CHECKSUM)
    }, [props])

    const handlePageChange = (e) => {
        setPage(e.target.value)
    }
    const handleEncodedChange = (e) => {
        setEncoded(e.target.value)
    }
    const handleChecksumChange = (e) => {
        setChecksum(e.target.value)
    }

    return (
        <form action="https://demo.epay.bg" target="epay" method="POST">
            <input 
                type="hidden" 
                name="PAGE" 
                value={page} onChange={handlePageChange} />
            <input 
                type="hidden" 
                name="ENCODED" 
                value={ENCODED} 
                onChange={handleEncodedChange} />
            <input 
                type="hidden" 
                name="CHECKSUM" 
                value={CHECKSUM} 
                onChange={handleChecksumChange} />

            <input type="submit" />
        </form>
    );
}

export default EpForm;
