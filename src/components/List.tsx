import React, {UIEvent, useEffect, useMemo} from "react";

export interface ListProps {

    /**
     * The height of list container
     */
    height?: number,

    /**
     * The width of list container
     */
    width?: number,

    /**
     * The height of each item in the list in case of vertical list or the width of each item in case of horizontal list
     */
    itemSize?: number,

    /**
     * The items to render in the list
     */
    items: itemProps[],

    /**
     * The Render function for each item in the list
     */
    renderItem: (item: itemProps) => JSX.Element | null

    /**
     * The item's buffer to render in the list
     */
    buffer?: number

    /**
     * The orientation of the list
     */
    orientation?: "vertical" | "horizontal"
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
 * @param width
 * @param itemSize
 * @param items
 * @param renderItem
 * @param buffer
 * @param orientation
 * @constructor
 */
const List = (
    {
        height = 300,
        width = 300,
        itemSize = 35,
        items = [],
        renderItem = () => null,
        buffer = 2,
        orientation = "vertical"
    }: ListProps
) => {

    const [scrollTop, setScrollTop] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const [visibleItems, setVisibleItems] = React.useState<itemProps[]>([]);

    /**
     * Calculate the number of rows that can fit in the list container
     * number of rows = height of container / height of each row
     */
    const numberOfVisibleRow = useMemo(() => {
        return Math.ceil(height / itemSize);
    }, [height, itemSize]);

    /**
     * Calculate the number of columns that can fit in the list container
     */
    const numberOfVisibleColumn = useMemo(() => {
        return Math.ceil(width / itemSize);
    }, [width, itemSize]);

    /**
     * Calculate the height of the list container
     * height = length of items * height of each item
     */
    const scrollHeight = useMemo(() => {
        return items.length * itemSize;
    }, [items, itemSize]);

    /**
     * Calculate the width of the list container
     */
    const scrollWidth = useMemo(() => {
        return items.length * itemSize;
    }, [items, itemSize]);

    /**
     * Method to handle scroll events
     * @param event
     */
    const handleScroll = (event: UIEvent<HTMLDivElement>) => {
        if (orientation === "vertical") {
            setScrollTop(event.currentTarget.scrollTop);
        } else {
            setScrollLeft(event.currentTarget.scrollLeft);
        }
    }

    /**
     * Getting the visible items in the list
     */
    useEffect(() => {
        if (orientation === "horizontal") {
            const startIndex = Math.floor(scrollLeft / itemSize);
            const endIndex = startIndex + numberOfVisibleColumn + buffer;
            setVisibleItems(items.slice(startIndex, endIndex));
        } else {
            const start = Math.floor(scrollTop / itemSize);
            const end = (start + numberOfVisibleRow) + buffer;
            setVisibleItems(items.slice(start, end));
        }

    }, [scrollTop, scrollLeft, items, itemSize, buffer, orientation, numberOfVisibleRow, numberOfVisibleColumn]);


    /**
     * Method to calculate the offset of each item in the list
     */
    const getItemOffset = (index: number) => {
        if (orientation === "horizontal") {
            return `translateX(${index * itemSize}px)`;
        }

        return `translateY(${index * itemSize}px)`;
    }

    return (
        <div
            className={`virtual-list ${orientation === 'horizontal' ? 'virtual-list-horizontal' : 'virtual-list-vertical'}`}
            style={{height: height, width: width}}
            onScroll={handleScroll}
        >
            <div className='virtual-list-item-wrapper'
                 style={
                     orientation === 'horizontal' ?
                         {minWidth: scrollWidth, height: '100%'} :
                         {minHeight: scrollHeight, width: '100%'}
                 }
            >
                {
                    visibleItems.map((item, index) => (
                        <div
                            className={'virtual-list-item'}
                            key={index}
                            style={{
                                width: itemSize,
                                height: itemSize,
                                overflow: 'hidden',
                                transform: getItemOffset(item.index)
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
