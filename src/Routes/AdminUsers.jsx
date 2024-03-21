import React from 'react'
import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useTable, useSortBy } from 'react-table';
import axios from '../api/axios';

const columns = [
    {
        Header: "ID",
        accessor: "userId"
    },
    {
        Header: "Name",
        accessor: "userFullName"
    },
    {
        Header: "Email",
        accessor: "userEmail"
    }
]

const AdminUsers = () => {

    const { auth, logoutHandler } = useAuth();
    const [adminData, setAdminData] = useState([]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: adminData
    },
        useSortBy
    );
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`apis/users/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`,
                    },
                    withCredentials: true

                });
                console.log(response.data);
                setAdminData(response.data);
                console.log(adminData);
            } catch (err) {
                console.log(err)
            }
        }

        fetchdata();
    }, []);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {column.isSorted && (<span>{column.isSortedDesc ? " ⬇️ " : " ⬆️ "}</span>)}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </>

    )
}

export default AdminUsers