import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup'; // Adjust the path as needed
import MainPage from './Components/MainPage';
import Signin from './Components/Signin'; 

import Sidebar from './Components/Sidebar';
import Topbar from './Components/Topbar';
import Selectbar from './Components/Selectbar';
import Table from './Components/Table';
import  Password from './Components/Password';
import Profile from './Components/Profile';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/topbar" element={<Topbar/>} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/selectbar" element={<Selectbar/>} />
        <Route path="/Table" element={<Table/>} />
        <Route path="/password" element={<Password/>} />
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;