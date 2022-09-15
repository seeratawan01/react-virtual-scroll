import React from 'react';
import './App.css';
import List from "./components/List";
import Table, {fieldProps} from "./components/Table";
import {tableDataGenerator, userNameListGenerator} from "./generator";
import { Link } from "react-router-dom";

function App() {

    const [tableData, setTableData] = React.useState(tableDataGenerator(100000));
    const [listData, setListData] = React.useState(userNameListGenerator(100000));

    const addNewItems = () => {
        setTableData(tableData.concat(tableDataGenerator(100000)));
    }
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

            <div className="container">
                <button onClick={addNewItems}>Add new items</button>
            </div>
            <Table
                itemSize={60}
                fields={[
                    {key: 'name', name: 'Name'},
                    {key: 'age', name: 'Age'},
                    {key: 'company', name: 'Company'}
                ]}
                items={tableData}
                height={500}
                width={800}
                buffer={3}
                renderItem={(item) => {
                    return <div>{item}</div>
                }}
            />

            {/*<List*/}
            {/*    itemSize={40}*/}
            {/*    items={listData}*/}
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
