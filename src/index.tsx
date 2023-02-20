import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HideAppBar from "./components/appBar/HideAppBar";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <HideAppBar title="Voting App">
                <App/>
            </HideAppBar>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);

