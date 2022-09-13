import React from 'react';
import './App.css';

import List, {itemProps} from "./components/List";

let data: itemProps[] = [
    {index: 0, content: "Hello"},
    {index: 1, content: "World"},
    {index: 2, content: "This"},
    {index: 3, content: "Is"},
    {index: 4, content: "A"},
    {index: 5, content: "List"},
    {index: 6, content: "Of"},
    {index: 7, content: "Items"},
    {index: 8, content: "That"},
    {index: 9, content: "Are"},
    {index: 10, content: "Rendered"},
]


function App() {
    return (
        <div className="App">
            <List
                rowHeight={40}
                items={data}
                renderItem={(item) => (
                    <div key={item.index}>
                        {item.content}
                    </div>
                )}
            />
        </div>
    );
}

export default App;
