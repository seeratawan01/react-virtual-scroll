import React from 'react';
import './App.css';
import List from "./components/List";
import Table, {fieldProps} from "./components/Table";
import {tableDataGenerator, userNameListGenerator} from "./generator";
import { Link } from "react-router-dom";

let list: any[]  = userNameListGenerator(100000);

let fields:fieldProps[] = [
    {key: 'name', name: 'Name'},
    {key: 'age', name: 'Age'},
    {key: 'company', name: 'Company'}
]

let data: any[]  = tableDataGenerator(100000);

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
                    <Link to="/table">Virtual Table</Link> |{" "}
                    <Link to="/list">Virtual List</Link>
                </nav>
            </div>

            <Table
                itemSize={60}
                fields={fields}
                items={data}
                height={500}
                width={800}
                buffer={3}
                renderItem={(item) => {
                    return <div>{item}</div>
                }}
            />

            {/*<List*/}
            {/*    itemSize={40}*/}
            {/*    items={list}*/}
            {/*    renderItem={(item) => (*/}
            {/*        <div>*/}
            {/*            {item.content}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*    orientation={'vertical'}*/}
            {/*    height={400}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
