import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Switch,
  Stack,
  InputAdornment,
  Input,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AttendanceTracker = () => {
  const initialData = Array.from({ length: 10 }, (_, index) => ({
    userId: index + 1,
    userName: `User ${index + 1}`,
    isSwipedOut: false,
    startTime: null,
    endTime: null,
  }));

  const [attendanceRecords, setAttendanceRecords] = useState(initialData);

  const handleSwitchChange = (index) => {
    const updatedRecords = [...attendanceRecords];
    const currentDate = new Date();

    if (updatedRecords[index].isSwipedOut) {
      updatedRecords[index].endTime = currentDate.toLocaleString();
    } else {
      updatedRecords[index].startTime = currentDate.toLocaleString();
    }

    updatedRecords[index].isSwipedOut = !updatedRecords[index].isSwipedOut;
    setAttendanceRecords(updatedRecords);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={5}>
      <Typography variant="h3" marginBottom="50px">
        Attendance Tracker
      </Typography>

      <Box width="70%" marginBottom="100px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h5">Attendance Details</Typography>

          <Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" color="#555" marginRight="10px"></Typography>
              <Input
                placeholder="Search..."
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  User Id
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  User Name
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Start Time
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  End Time
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceRecords.map((record, index) => (
                <TableRow key={record.userId}>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.userId}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.userName}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.startTime}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.endTime}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography>Off</Typography>
                      <Switch
                        checked={record.isSwipedOut || false}
                        onChange={() => handleSwitchChange(index)}
                        inputProps={{ 'aria-label': 'ant design' }}
                      />
                      <Typography>On</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AttendanceTracker;
