import React, { useEffect, useState } from 'react';
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
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import moment from "moment";
import backgroundimage from '../assets/backgroundimage.avif';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Avatar from "@mui/material/Avatar";

const AttendanceTracker = () => {
  const recordsPerPage = 10;
  const initialData = Array.from({ length: 30 }, (_, index) => ({
    userId: index + 1,
    userName: `User ${index + 1}`,
    isSwipedOut: false,
    startTime: null,
    endTime: null,
  }));

  const [attendanceRecords, setAttendanceRecords] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(attendanceRecords.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = Math.min(startIndex + recordsPerPage, attendanceRecords.length);

  const [counter, setCounter] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleLeft = () => {
    setCounter((prevCounter) => prevCounter + 1);
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const handleRight = () => {
    setCounter((prevCounter) => prevCounter - 1);
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleSwitchChange = (index) => {
    const updatedRecords = [...attendanceRecords];
    const currentDate = new Date();

    if (updatedRecords[index].isSwipedOut) {
        toast.info("Attendance Marked Successfully")
        updatedRecords[index].endTime = currentDate.toLocaleString();
    } else {
        toast.info("Attendance Capture Started!")
        updatedRecords[index].startTime = currentDate.toLocaleString();
    }
    updatedRecords[index].isSwipedOut = !updatedRecords[index].isSwipedOut;
    setAttendanceRecords(updatedRecords);

    const selectedDateByUser = moment(selectedDate).format('YYYY-MM-DD');
    const attendanceRecordsInStorage = JSON.parse(localStorage.getItem(selectedDateByUser)) || [];

    if(attendanceRecordsInStorage.length > 0) {
      localStorage.setItem(selectedDateByUser, JSON.stringify(updatedRecords));
    } else {
      localStorage.setItem(selectedDateByUser, JSON.stringify(initialData));
      setAttendanceRecords(initialData);
    }
  };

  useEffect(() => {
    const selectedDateByUser = moment(selectedDate).format('YYYY-MM-DD');
    const attendanceRecords = JSON.parse(localStorage.getItem(selectedDateByUser)) || [];

    if(attendanceRecords.length > 0) {
      console.log("record present")
      setAttendanceRecords(attendanceRecords);
    } else {
      localStorage.setItem(selectedDateByUser, JSON.stringify(initialData));
      console.log("record not present")
      setAttendanceRecords(initialData);
    }
  }, [selectedDate]);


  return (
    <Box display="flex" flexDirection="column" alignItems="center" marginTop={5}  style={{
      backgroundimage: `url(${backgroundimage})`, // Set the background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
        <ToastContainer/>
      <Typography variant="h3" marginBottom="50px">
        Attendance Tracker
      </Typography>
      <Box width="70%" marginBottom="50px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={2}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Attendance Details
          </Typography>
          <Box display="flex" alignItems="center">
            <KeyboardDoubleArrowLeftSharpIcon
              style={{ marginRight: '20px', cursor: 'pointer' }}
              onClick={handleRight}
            />
            <TextField
              required
              fullWidth
              id="attendanceDate"
              label="Attendance Date"
              name="attendanceDate"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              style={{ marginLeft: '20px' }}
            value={selectedDate.toISOString().split('T')[0]}
            />
            <KeyboardDoubleArrowRightSharpIcon
              style={{ marginLeft: '30px', cursor: 'pointer' }}
              onClick={handleLeft}
            />
          </Box>
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
                  Student Id
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  Student Name
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
                      Duration (in minutes)
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
              {attendanceRecords.slice(startIndex, endIndex).map((record, index) => (
                <TableRow key={record.userId}>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.userId}
                  </TableCell>
                  <TableCell style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                      {record.userName.charAt(0).toUpperCase()+index}
                    </Avatar>
                    {record.userName}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.startTime || "Yet to start"}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {record.endTime || "Yet to end"}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                    {/*  End time format : 18/12/2023, 00:39:29*/}
                    {record && record.endTime ? moment(record.endTime, "DD/MM/YYYY, HH:mm:ss").diff(moment(record.startTime, "DD/MM/YYYY, HH:mm:ss"), 'minute') : "N/A"}
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
          <Box display="flex" alignItems="center" justifyContent="center" mt="30px" mb="30px">
            <Typography variant="h6" color="primary" onClick={handleLeft}>
              Previous
            </Typography>
            <Stack spacing={2} sx={{ marginLeft: '10px', marginRight: '10px' }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={(event, value) => setCurrentPage(value)}
              />
            </Stack>
            <Typography variant="h6" color="primary" onClick={handleRight}>
              Next
            </Typography>
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AttendanceTracker;
