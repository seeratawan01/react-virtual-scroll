import Table from "../components/Table";
import React from "react";
import Button from 'react-bootstrap/Button';
import {tableDataGenerator} from "../utils/generator";

const TableDemo = () => {
    const [tableData, setTableData] = React.useState(tableDataGenerator(100000));

    const addNewItems = () => {
        setTableData(tableData.concat(tableDataGenerator(50)));
    }

    return (
       <div className='p-4'>
           <div className="d-flex justify-content-between align-items-center mx-auto mb-4" style={{maxWidth: '800px'}}>
               <div>
                   Total Rows: {tableData.length}
               </div>
               <Button variant="primary" onClick={addNewItems}>Add more items (+50)</Button>
           </div>
           <div className='d-flex justify-content-center align-items-center'>
               <Table
                   className={'shadow'}
                   itemSize={60}
                   fields={[
                       {key: 'name', name: 'Name'},
                       {key: 'age', name: 'Age'},
                       {key: 'company', name: 'Company'}
                   ]}
                   items={tableData}
                   height={450}
                   width={800}
                   buffer={3}
                   renderItem={(item) => {
                       return <div>{item}</div>
                   }}
               />
           </div>
       </div>
    )
}

export default TableDemo
