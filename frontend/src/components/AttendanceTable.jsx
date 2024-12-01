// src/components/Attendance/AttendanceTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';

const role = Cookies.get('employeeRole');


const AttendanceTable = ({ data,data2 }) => (
  
  <TableContainer component={Paper} style={{ marginTop: '20px' }}>
   {
    role=='admin' &&
    <>
     <Table>
      <TableHead>
        <TableRow>
          <TableCell>IDs</TableCell>
          <TableCell align="center">Percentage</TableCell> 
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((row) => (
          <Tooltip
            key={row.date}
            placement="top"
          >
            <TableRow hover>
              <TableCell>{row.id}</TableCell>
              <TableCell align="center">{row.attendancePercentage}%</TableCell>
            </TableRow>
          </Tooltip>
        ))}
      </TableBody>
    </Table>
    </>
   }

   {
    role!='admin' && 
    <>
     <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="center">Status</TableCell> 
        </TableRow>
      </TableHead>
      <TableBody>
        {data2?.map((row) => (
          <Tooltip
            key={row.date2}
            placement="top"
          >
            <TableRow hover>
              <TableCell>{row.date}</TableCell>
              <TableCell align="center">{row.type || row.status}</TableCell>
            </TableRow>
          </Tooltip>
        ))}
      </TableBody>
    </Table>
    </>
   }
  </TableContainer>
);

export default AttendanceTable;
