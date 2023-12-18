import React from 'react';
import Table from './Table';
import Topbar from "./Topbar";
import Footer from './Footer';

const MainPage = ({phone}) => {
    return (
        <div>
            <Topbar phone={phone}/>
            <Table/>
            <Footer/>
        </div>
    );
};

export default MainPage;
