import React, {ReactNode, UIEvent, useEffect, useMemo} from "react";

export interface TableProps {

    /**
     * The height of table container
     */
    height?: number,

    /**
     * The width of table container
     */
    width?: number,

    /**
     * The height of each item in the table
     */
    itemSize?: number,

    /**
     * The fields to render in the table
     */
    fields: fieldProps[],

    /**
     * The items to render in the list
     */
    items: any[],


    /**
     * The item's buffer to render in the list
     */
    buffer?: number
}

export interface fieldProps {
    /**
     * The unique key of the field
     */
    key: string,

    /**
     * The field's content to render
     */
    name: string | ReactNode
}


const Table = (
    {
        height = 300,
        width = 300,
        itemSize = 35,
        fields = [],
        items = [],
        buffer = 2,
    }: TableProps
) => {

    const [scroll, setScroll] = React.useState(0);
    const [visibleItems, setVisibleItems] = React.useState<any[]>([]);

    /**
     * Calculate the number of rows that can fit in the list container
     * number of rows = height of container / height of each row
     */
    const numberOfVisibleRow = useMemo(() => {
        return Math.ceil(height / itemSize);
    }, [height, itemSize]);

    /**
     * Calculate the height of the list container
     * height = length of items * height of each item
     */
    const scrollHeight = useMemo(() => {
        return items.length * itemSize;
    }, [items, itemSize]);

    /**
     * Getting the visible items in the table
     */
    useEffect(() => {
        let start  = Math.floor(scroll / itemSize);
        const end = (start + numberOfVisibleRow) + buffer;

        const itemsToRender = items.slice(start, end)
        itemsToRender.forEach((item, index) => {
            item.index = start + index;
        })
        setVisibleItems(itemsToRender);

    }, [scroll, items, itemSize, buffer, height, numberOfVisibleRow]);

    /**
     * Method to handle scroll events
     * @param event
     */
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        setScroll(event.currentTarget.scrollTop);
    }

    /**
     * Method to calculate the offset of each item in the list
     */
    const getItemOffset= (index: number) => {
        return index * itemSize
    }

    return (
        <div className='virtual-list'  style={{height: height, width: width}}  onScroll={handleScroll}>
            <div className='virtual-list-item-wrapper'
                 style={{height: scrollHeight, width: width}}
            >
                <div className='virtual-list-column'>
                    {fields.map((field, index) => (
                        <div key={index} className='virtual-list-column-item' style={{height: itemSize}}>
                            {field.name}
                        </div>
                    ))}
                </div>

                {visibleItems.map((item, index) => {
                   return (
                          <div key={index} className='virtual-list-row' style={{
                              height: itemSize,
                              transform: 'translateY(' + getItemOffset(item.index) + 'px)',
                          }}>
                                {fields.map((field, key) => (
                                    <div key={key} className='virtual-list-row-item'>
                                        {item[field.key]}
                                    </div>
                                ))}
                            </div>
                        )
                })}

            </div>
        </div>
    )
}

export default Table
