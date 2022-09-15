import React from 'react';
import './App.css';

// import List, {itemProps} from "./components/List";
import Table, {fieldProps} from "./components/Table";


// let data: itemProps[]  = new Array(100000).fill(0).map((_, i)=> ({index: i, content: `Item ${i}`}));

let fields:fieldProps[] = [
    {key: 'name', name: 'Name'},
    {key: 'age', name: 'Age'},
    {key: 'description', name: 'Description'},
]

let data: any[]  = [
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
    {name: 'Seerat Awan', age: 25, description: 'Software engineer'},
    {name: 'Brian Vaughn', age: 25, description: 'Software engineer'},
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
