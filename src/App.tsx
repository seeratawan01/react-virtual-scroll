import React from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import TableDemo from "./pages/TableDemo";
import ListDemo from "./pages/ListDemo";

import Container from 'react-bootstrap/Container';

function App() {


    return (
        <Container className="App">
            <div className={'text-center py-5 bg-light bg-gradient'}>
                <h1 className='mb-3 fw-semibold'>Virtual Scroll Demo</h1>
                <nav
                >
                    <Link to="/" className='icon-link fw-semibold justify-content-center'>Virtual Table</Link>
                    <span className='px-4'>|</span>
                    <Link to="/list" className='icon-link fw-semibold justify-content-center'>Virtual List</Link>
                </nav>
            </div>

            <main className='bg-light bg-gradient mt-3'>
                <Routes>
                    <Route path="/" element={<TableDemo />} />
                    <Route path="list" element={<ListDemo />}/>
                </Routes>
            </main>

        </Container>
    );
}

export default App;
