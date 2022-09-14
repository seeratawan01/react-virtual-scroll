import React, {UIEvent, useEffect, useMemo} from "react";

export interface ListProps {

    /**
     * The height of list container
     */
    height?: number,

    /**
     * The height of each row in the list
     */
    rowHeight: number,

    /**
     * The items to render in the list
     */
    items: itemProps[],

    /**
     * The Render function for each item in the list
     */
    renderItem: (item: itemProps) => JSX.Element | null
}

export interface itemProps {
    /**
     * The index of the item in the list
     */
    index: number,

    /**
     * The item's content to render
     */
    content: string | number | JSX.Element | null,
}

/**
 * A virtualized list component
 * @param height
 * @param rowHeight
 * @param items
 * @param renderItem
 * @constructor
 */
const List = (
    {
        height = 300,
        rowHeight = 20,
        items = [],
        renderItem = () => null
    }: ListProps
) => {

    const [scrollTop, setScrollTop] = React.useState(0);
    const [visibleItems, setVisibleItems] = React.useState<itemProps[]>([]);

    /**
     * Calculate the number of rows that can fit in the list container
     * number of rows = height of container / height of each row
     */
    const numberOfVisibleRow = useMemo(() => {
        return Math.ceil(height / rowHeight);
    }, [height, rowHeight]);

    /**
     * Calculate the height of the list container
     * height = length of items * height of each item
     */
    const scrollHeight = useMemo(() => {
        return items.length * rowHeight;
    }, [items, rowHeight]);

    /**
     * Method to handle scroll events
     * @param event
     */
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
    }

    /**
     * Getting the visible item in the list
     */
    useEffect(() => {
        const start = Math.floor(scrollTop / rowHeight);
        const end = start + numberOfVisibleRow;
        setVisibleItems(items.slice(start, end));

    }, [scrollTop, items, numberOfVisibleRow, rowHeight]);



    /**
     * Method to calculate the offset of each item in the list
     */
    const getItemOffset = (index: number) => {
        return index * rowHeight;
    }

    return (
        <div className='virtual-list'
             style={{
                 height: height,
                 maxHeight: height,
             }}
             onScroll={handleScroll}
        >
            <div className='virtual-list-item-wrapper' style={{minHeight: scrollHeight}}>
                {
                    visibleItems.map((item, index) => (
                        <div
                            className={'virtual-list-item'}
                            key={index}
                            style={{
                                height: rowHeight,
                                overflow: 'hidden',
                                transform: `translateY(${getItemOffset(item.index)}px)`
                            }}
                        >
                            {renderItem(item)}
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default List
