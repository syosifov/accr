import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

const empList = [
    { id: 1, name: "Neeraj", email: "neeraj@gmail.com", status: 0, role: 1 },
    { id: 2, name: "Raj", email: "raj@gmail.com", status: 1, role: 0 },
    { id: 3, name: "David", email: "david342@gmail.com", status: 1, role: 3 },
    { id: 4, name: "Vikas", email: "vikas75@gmail.com", status: 0, role: 2 },
    { id: 5, name: "Neeraj1", email: "neeraj1@gmail.com", status: 0, role: 1 },
    { id: 6, name: "Raj1", email: "raj@gmail1.com", status: 1, role: 0 },
    { id: 7, name: "David1", email: "david3421@gmail.com", status: 1, role: 3 },
    { id: 8, name: "Vikas1", email: "vikas751@gmail.com", status: 0, role: 2 },
];

function AccTable() {
    const [data, setData] = useState(empList);
    const columns = [
        { title: "ID", field: "id" },
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Status", field: "status" },
        { title: "Role", field: "role" },
    ];
    return (
        <>
            <MaterialTable
                title="Employee Data"
                data={data}
                columns={columns}
            />
        </>
    );
}

export default AccTable;
