import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import { Outlet } from "react-router-dom";
import TableDemo from "./pages/TableDemo";
import ListDemo from "./pages/ListDemo";
function App() {


    return (
        <div className="App">

            <div>
                <h1>Virtual Scroll Demo</h1>
                <nav
                    style={{
                        borderBottom: "solid 1px",
                        paddingBottom: "1rem",
                    }}
                >
                    <Link to="/">Virtual Table</Link> |{" "}
                    <Link to="/list">Virtual List</Link>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<TableDemo />} />
                <Route path="list" element={<ListDemo />}/>
            </Routes>

        </div>
    );
}

export default App;
