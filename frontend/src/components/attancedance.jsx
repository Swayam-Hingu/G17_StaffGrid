// src/components/Attendance/Attendance.js
import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AttendanceTable from './Attendance/AttendanceTable';
import AttendanceStats from './Attendance/AttendanceStats';
import AttendanceSearch from './Attendance/AttendanceSearch';
import Calendar from './calender';

const Attendance = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Calendar />
      </div>
      
      <Typography variant="h4" gutterBottom>
        Attendance Dashboard
      </Typography>
      <AttendanceSearch />
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <AttendanceStats />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <AttendanceTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Attendance;
