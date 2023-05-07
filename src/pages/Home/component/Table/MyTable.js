import { Input } from '@mui/joy';
import { Box, Grid, TableFooter, TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useState } from 'react';
import Action from './Action';

export default function MyTable({ myData, meta, getData, funcDelete, filter}) {
    const [page, setPage] = React.useState(meta.currentPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, page) => {
        setPage(page);
        getData({ page });
    };

    const handleDelete = (id) => {
        funcDelete(id);
    };

    const handleChangeRowsPerPage = (event) => {
        const page = 0;
        const limit = parseInt(event.target.value, 10);
        setRowsPerPage(limit);
        setPage(page);
        getData({ page, limit });
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell align='left'>
                                    Phone Nummber
                                </TableCell>
                                <TableCell align='left'>Email Adress</TableCell>
                                <TableCell align='left'>Address</TableCell>
                                <TableCell align='left'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                                <TableCell
                                    align='left'
                                    component='th'
                                    scope='row'
                                >
                                    <Input placeholder='Search Name' onChange={(value) => filter('name', value.target.value)}/>
                                </TableCell>
                                <TableCell align='left'>
                                    <Input placeholder='Filter' onChange={(value) => filter('phone', value.target.value)}/>
                                </TableCell>
                                <TableCell align='left'></TableCell>
                                <TableCell align='left'></TableCell>
                                <TableCell align='left'></TableCell>
                            </TableRow>
                            {myData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component='th' scope='row'>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.phone}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.email}
                                    </TableCell>
                                    <TableCell align='left'>
                                        {row.address}
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Action
                                            edit={`/update/${row.id}`}
                                            funcDelete={() =>
                                                handleDelete(row.id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    count={meta.totalItems}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
