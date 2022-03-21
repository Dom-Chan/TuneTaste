import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PropProvider } from "./Context/PropContex";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(<BrowserRouter><PropProvider><App /></PropProvider></BrowserRouter>, document.getElementById('root')
);
