import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

const empList = [
    { id: 1, name: "Neeraj", email: "neeraj@gmail.com", status: 0, role: 1 },
    { id: 2, name: "Raj", email: "raj@gmail.com", status: 1, role: 0 },
    { id: 3, name: "David", email: "david342@gmail.com", status: 1, role: 3 },
    { id: 4, name: "Vikas", email: "vikas75@gmail.com", status: 0, role: 2 },
    { id: 5, name: "", email: "neeraj1@gmail.com", status: 0, role: 1 },
    { id: 6, name: "Raj1", email: "raj@gmail1.com", status: 1, role: 0 },
    { id: 7, name: "David1", email: "david3421@gmail.com", status: 1, role: 3 },
    { id: 8, name: "Vikas1", email: "vikas751@gmail.com", status: 0, role: 2 },
];

function AccTable() {
    const [data, setData] = useState(empList);
    const columns = [
        { title: "ID", field: "id", sorting: false, filtering: false },
        { title: "Name", field: "name", emptyValue: () => "Null" },
        { title: "Email", field: "email" },
        {
            title: "Status",
            field: "status",
            lookup: { 0: "Active", 1: "On Leave" },
        },
        {
            title: "Role",
            field: "role",
            align: "right",
            defaultSort: "asc",
            searchable: false,
            export: false,
        },
    ];
    return (
        <>
            <MaterialTable
                title="Employee Data"
                data={data}
                columns={columns}
                options={{
                    sorting: true,
                    search: true,
                    searchText: "",
                    searchFieldAlignment: "right",
                    searchAutoFocus: true,
                    filtering: true,
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 20, 50, 100],
                    pageSize: 5,
                    paginationType: "normal",
                    exportButton: true,
                    exportAllData: true,
                    exportFileName: "TableData",
                    actionsColumnIndex: -1,
                    addRowPosition: "first",
                }}
                editable={{
                    onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                            const updatedRows = [
                                ...data,
                                {
                                    id: Math.floor(Math.random() * 100),
                                    ...newRow,
                                },
                            ];
                            setTimeout(() => {
                                setData(updatedRows);
                                resolve();
                            }, 2000);
                        }),
                    onRowUpdate: (updatedRow, oldRow) =>
                        new Promise((resolve, reject) => {
                            const index = oldRow.tableData.id;
                            const updatedRows = [...data];
                            updatedRows[index] = updatedRow;
                            setTimeout(() => {
                                setData(updatedRows);
                                resolve();
                            }, 2000);
                        }),
                    onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                            const index = selectedRow.tableData.id;
                            const updatedRows = [...data];
                            updatedRows.splice(index, 1);
                            setTimeout(() => {
                                setData(updatedRows);
                                resolve();
                            }, 2000);
                        }),
                }}
            />
        </>
    );
}

export default AccTable;
