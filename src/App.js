import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Components/Signup';
import MainPage from './Components/MainPage';
import Signin from './Components/Signin';
import Password from './Components/Password';
import Profile from './Components/Profile';

function App() {

    const [phone, setPhone] = useState({});

    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<MainPage phone={phone} setPhone={setPhone}/>}/>
                <Route path="/" element={<Signup phone={phone} setPhone={setPhone}/>}/>
                <Route path="/signin" element={<Signin phone={phone} setPhone={setPhone}/>}/>
                <Route path="/changePassword" element={<Password phone={phone}/>}/>
                <Route path="/profile" element={<Profile phone={phone}/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
