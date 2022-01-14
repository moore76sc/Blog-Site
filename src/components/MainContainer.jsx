import React from 'react'
import { useState, useEffect } from "react";

import Dashboard from './dashboard.jsx';
import Navbar from './navbar.jsx';

const MainContainer = () => {

  return (
    <div className="container">
      <div className="navBarBox">
        <Navbar />
      </div>
      <div className="titleBox">
        Title box placeholder
      </div>
      <div className="aboutBox">
        About box placeholder
      </div>
      <div className="articleBox">
        <Dashboard />
      </div>
      <div className="footerBox">
        Footer placeholder
      </div>
    </div>
  )
}


export default MainContainer;