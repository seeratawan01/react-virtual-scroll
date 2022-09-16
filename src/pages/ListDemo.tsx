import List from '../components/List'
import React from "react";
import {userNameListGenerator} from "../generator";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

const ListDemo = () => {
    const [listData, setListData] = React.useState(userNameListGenerator(100000));
    const [direction, setDirection] = React.useState<"vertical" | "horizontal">('vertical');

    const addNewItems = () => {
        setListData(listData.concat(userNameListGenerator(50)));
    }


    return (

        <div className='p-4'>
            <div className="d-flex justify-content-between align-items-center mx-auto mb-4" style={{maxWidth: '800px'}}>
                <div>
                    Total Rows: {listData.length}
                </div>
                <div className='d-flex align-items-center'>
                    <Form.Check
                        id='direction-switch'
                        className='me-4'
                        type="switch"
                        onChange={(e) => {
                            setDirection(e.target.checked ? 'horizontal' : 'vertical')}
                        }
                        label={direction === 'vertical' ? 'Vertical List' : 'Horizontal List'}
                    />
                    <Button variant="primary" onClick={addNewItems}>Add more items (+50)</Button>
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <List
                    itemSize={direction === 'vertical' ? 40 : 80}
                    items={listData}
                    renderItem={(item) => (
                        <div>
                            {item.content}
                        </div>
                    )}
                    orientation={direction}
                    height={direction === 'vertical' ? 450 : 100}
                    width={800}
                />
            </div>
        </div>

    )
}

export default ListDemo
