// // src/components/Attendance/AttendanceStats.js
// import React from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis,
// } from 'recharts';
// import { Typography } from '@mui/material';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const AttendanceStats = ({ attendanceData = [] }) => {
//   if (!attendanceData || attendanceData.length === 0) {
//     return <p>No attendance data available.</p>;
//   }

//   // Calculate statistics
//   const totalDaysWorked = attendanceData.length;
//   const totalHoursWorked = attendanceData.reduce(
//     (total, record) => total + parseFloat(record.workHours || 0),
//     0
//   );
//   const avgHoursPerDay = parseFloat((totalHoursWorked / totalDaysWorked).toFixed(2));

//   // Data for pie charts
//   const dataDays = [
//     { name: 'Days Worked', value: totalDaysWorked },
//     { name: 'Days Remaining', value: 30 - totalDaysWorked }, // Assuming 30 days in a month
//   ];

//   const dataHours = [
//     { name: 'Hours Worked', value: totalHoursWorked },
//     { name: 'Hours Remaining', value: (30 * 8) - totalHoursWorked }, // Assuming 8-hour days
//   ];

//   // Data for Radial Bar Chart (Average Hours Per Day)
//   const dataAvgHours = [
//     {
//       name: 'Average Hours',
//       value: avgHoursPerDay,
//       fill: avgHoursPerDay >= 8 ? '#00C49F' : '#FF8042', // Green if >= 8, Orange if < 8
//     },
//   ];

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//       <div>
//         <Typography variant="h6">Total Days Worked</Typography>
//         <ResponsiveContainer width={200} height={200}>
//           <PieChart>
//             <Pie
//               data={dataDays}
//               cx="50%"
//               cy="50%"
//               innerRadius={40}
//               outerRadius={60}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               {dataDays.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div>
//         <Typography variant="h6">Total Hours Worked</Typography>
//         <ResponsiveContainer width={200} height={200}>
//           <PieChart>
//             <Pie
//               data={dataHours}
//               cx="50%"
//               cy="50%"
//               innerRadius={40}
//               outerRadius={60}
//               fill="#82ca9d"
//               dataKey="value"
//               label
//             >
//               {dataHours.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       <div>
//         <Typography variant="h6">Average Hours Per Day</Typography>
//         <ResponsiveContainer width={200} height={200}>
//           <RadialBarChart
//             innerRadius="10%"
//             outerRadius="80%"
//             data={dataAvgHours}
//             startAngle={180}
//             endAngle={0}
//           >
//             <PolarAngleAxis
//               type="number"
//               domain={[0, 8]}
//               angleAxisId={0}
//               tick={false}
//             />
//             <RadialBar
//               minAngle={15}
//               background
//               clockWise
//               dataKey="value"
//               cornerRadius={10}
//             />
//             <Tooltip />
//           </RadialBarChart>
//         </ResponsiveContainer>
//         <Typography variant="subtitle1" align="center">
//           {avgHoursPerDay} hours (Target: 8 hrs)
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default AttendanceStats;
