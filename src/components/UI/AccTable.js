import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useSelector, useDispatch } from "react-redux";
import { accActions, accDataSel } from "./../../store/AccSlice";

function AccTable() {
    const [data, setData] = useState([]);
    const rows = useSelector(accDataSel);
    useEffect(() => {
        // https://stackoverflow.com/questions/59648434/material-table-typeerror-cannot-add-property-tabledata-object-is-not-extensibl
        const editable = rows.map((o) => ({ ...o }));
        setData(editable);
    }, [rows]);
    const columns = [
        { title: "Номер", field: "name", defaultSort: "asc" },
        { title: "Активи", field: "assets", align: "right" },
        { title: "Пасиви", field: "liabilities", align: "right" },
        { title: "Салдо", field: "balance", align: "right" },
        {
            title: "Вид",
            field: "at",
            align: "left",
            lookup: { A: "А", L: "П", AL: "АП", C: "К" },
        },
        {
            title: "Описание",
            field: "description",
            align: "left",
            cellStyle: { minWidth: "500px", maxWidth: "500px" },
            headerStyle: { minWidth: "500px", maxWidth: "500px" },
            // render: (rowData) => {
            //     let s = rowData.description;
            //     if (s.length > 45) {
            //         s = s.substr(0, 45) + "...";
            //     }
            //     return s;
            // },
        },
    ];
    // const columns = [
    //     { title: "ID", field: "id", sorting: false, filtering: false },
    //     { title: "Name", field: "name", emptyValue: () => "Null" },
    //     { title: "Email", field: "email" },
    //     {
    //         title: "Status",
    //         field: "status",
    //         lookup: { 0: "Active", 1: "On Leave" },
    //     },
    //     {
    //         title: "Role",
    //         field: "role",
    //         align: "right",
    //         defaultSort: "asc",
    //         searchable: false,
    //         export: false,
    //         render: (rowData) => (
    //             <div
    //                 style={{
    //                     background: rowData.role >= 2 ? "#008000aa" : "#f90000aa",
    //                     borderRadius: "4px",
    //                     paddingLeft: 5,
    //                 }}
    //             >
    //                 {rowData.age >= 2 ? "2+" : "2-"}
    //             </div>
    //         ),
    //     },
    // ];

    return (
        <>
            <MaterialTable
                title="Сметкоплан"
                data={data}
                columns={columns}
                // actions={[
                //     {
                //         icon: () => <GetAppIcon />,
                //         tooltip: "Click me",
                //         onClick: (e, data) => console.log(data),
                //         // isFreeAction:true
                //     },
                // ]}
                options={{
                    sorting: true,
                    search: true,
                    // searchText: "",
                    // searchFieldAlignment: "right",
                    searchAutoFocus: true,
                    // filtering: true,
                    paging: true,
                    pageSizeOptions: [2, 5, 10, 20, 50, 100],
                    pageSize: 5,
                    paginationType: "normal",
                    exportButton: true,
                    exportAllData: true,
                    // exportFileName: "TableData",
                    // actionsColumnIndex: -1,
                    // addRowPosition: "first",
                    // selection: true,
                    // showSelectAllCheckbox: true,
                    // selectionProps: (rowData) => ({
                    //     disabled: rowData.name == null || rowData.name === "",
                    //     color: "primary",
                    // }),
                    // grouping: true,
                    // columnsButton: true,
                    rowStyle: (data, index) =>
                        index % 3 === 0 ? { background: "#f5f5f5" } : null,
                }}
                // onSelectionChange={(selectedRows) => console.log(selectedRows)}
            />
        </>
    );
}

export default AccTable;
