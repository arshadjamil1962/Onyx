import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import AppHome from "./AppComponents/AppHome";
import AppError404 from "./AppComponents/AppError404";

function App() {
  
    return (
      //App to be wrapped in order to use Link from react-router-dom 
      <BrowserRouter>
        <div className="AppContainer">
          <Routes>
            <Route exact path='/' element={<AppHome />} ></Route>
            <Route exact path='*' element={<AppError404 />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  
  export default App;
  