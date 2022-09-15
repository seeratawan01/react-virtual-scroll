import React from 'react';
import './App.css';

// import List, {itemProps} from "./components/List";
import Table, {fieldProps} from "./components/Table";


// let data: itemProps[]  = new Array(100000).fill(0).map((_, i)=> ({index: i, content: `Item ${i}`}));

let fields:fieldProps[] = [
    {key: 'name', name: 'Name'},
    {key: 'age', name: 'Age'},
    {key: 'description', name: 'Description'}
]

let data: any[]  = [
    {name: '1', age: 25, description: 'Software engineer'},
    {name: '2', age: 25, description: 'Software engineer'},
    {name: '3', age: 25, description: 'Software engineer'},
    {name: '4', age: 25, description: 'Software engineer'},
    {name: '5', age: 25, description: 'Software engineer'},
    {name: '6', age: 25, description: 'Software engineer'},
    {name: '7', age: 25, description: 'Software engineer'},
    {name: '8', age: 25, description: 'Software engineer'},
    {name: '9', age: 25, description: 'Software engineer'},
    {name: '10', age: 25, description: 'Software engineer'},
    {name: '11', age: 25, description: 'Software engineer'},
    {name: '12', age: 25, description: 'Software engineer'},
    {name: '13', age: 25, description: 'Software engineer'},
    {name: '14', age: 25, description: 'Software engineer'},
    {name: '15', age: 25, description: 'Software engineer'},
    {name: '16', age: 25, description: 'Software engineer'},
];

function App() {
    return (
        <div className="App">
            <Table
                itemSize={60}
                fields={fields}
                items={data}
                height={500}
                width={800}
            />
        </div>
    );
}

export default App;
