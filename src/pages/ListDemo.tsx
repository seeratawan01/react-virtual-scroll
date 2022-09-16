import List from '../components/List'
import React from "react";
import {userNameListGenerator} from "../generator";

const ListDemo = () => {
    const [listData, setListData] = React.useState(userNameListGenerator(100000));

    const addNewItems = () => {
        setListData(listData.concat(userNameListGenerator(100000)));
    }


    return (
      <>
          <div className="container">
              <button onClick={addNewItems}>Add new items</button>
          </div>
          <List
              itemSize={40}
              items={listData}
              renderItem={(item) => (
                  <div>
                      {item.content}
                  </div>
              )}
              orientation={'vertical'}
              height={400}
          />
      </>
    )
}

export default ListDemo
