import React from 'react';
import './App.css';

import List, {itemProps} from "./components/List";



let data: itemProps[]  = new Array(100000).fill(0).map((_, i)=> ({index: i, content: `Item ${i}`}));

function App() {
    return (
        <div className="App">
            <List
                itemSize={40}
                items={data}
                renderItem={(item) => (
                    <div key={item.index}>
                        {item.content}
                    </div>
                )}
                orientation={'vertical'}
                height={500}
            />
        </div>
    );
}

export default App;
