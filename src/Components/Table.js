import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';

const AttendanceTracker = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [swipeInTime, setSwipeInTime] = useState(null);

  const handleSwipeIn = () => {
    const currentDate = new Date();
    setSwipeInTime(currentDate);
  };

  const handleSwipeOut = () => {
    if (swipeInTime) {
      const currentDate = new Date();
      const newUserId = attendanceRecords.length + 1; // Incremental userId
      const newUserName = `User ${newUserId}`; // Unique user name based on userId
      const attendanceRecord = {
        userId: newUserId,
        userName: newUserName,
        swipeInTime,
        swipeOutTime: currentDate,
        duration: calculateDuration(swipeInTime, currentDate),
      };

      setAttendanceRecords([...attendanceRecords, attendanceRecord]);
      setSwipeInTime(null);
    }
  };

  const calculateDuration = (start, end) => {
    const diffInMilliseconds = end - start;
    const hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}h ${minutes}m`;
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={5}>
      <Typography variant="h4">Attendance Tracker</Typography>
      <Box marginY={2}>
        {swipeInTime ? (
          <>
            <Typography variant="h6">Swipe In Time: {swipeInTime.toLocaleString()}</Typography>
            <Button variant="contained" onClick={handleSwipeOut}>
              Swipe Out
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleSwipeIn}>
            Swipe In
          </Button>
        )}
      </Box>

      {attendanceRecords.length > 0 && (
        <Box width="70%">
          <Typography variant="h5">Attendance Details</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Swipe In Time</TableCell>
                  <TableCell>Swipe Out Time</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.userId}</TableCell>
                    <TableCell>{record.userName}</TableCell>
                    <TableCell>{record.swipeInTime.toLocaleString()}</TableCell>
                    <TableCell>{record.swipeOutTime.toLocaleString()}</TableCell>
                    <TableCell>{record.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default AttendanceTracker;
