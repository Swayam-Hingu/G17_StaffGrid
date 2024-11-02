// src/components/Attendance/AttendanceTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';

const AttendanceTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="center">Login</TableCell>
          <TableCell align="center">Logout</TableCell>
          <TableCell align="center">Work Hours</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <Tooltip
            key={row.date}
            title={`Login: ${row.login}, Logout: ${row.logout}, Hours: ${row.workHours}`}
            placement="top"
          >
            <TableRow hover>
              <TableCell>{row.date}</TableCell>
              <TableCell align="center">{row.login}</TableCell>
              <TableCell align="center">{row.logout}</TableCell>
              <TableCell align="center">{row.workHours}</TableCell>
            </TableRow>
          </Tooltip>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AttendanceTable;
