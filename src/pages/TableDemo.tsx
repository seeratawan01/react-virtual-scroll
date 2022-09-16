import Table from "../components/Table";
import React from "react";
import {tableDataGenerator} from "../generator";

const TableDemo = () => {
    const [tableData, setTableData] = React.useState(tableDataGenerator(100000));

    const addNewItems = () => {
        setTableData(tableData.concat(tableDataGenerator(100000)));
    }

    return (
       <>
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
       </>
    )
}

export default TableDemo
