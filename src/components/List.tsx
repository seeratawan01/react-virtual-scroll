import React, {UIEvent, useEffect, useMemo, useRef} from "react";
import {classNames} from "../utils";
import Button from "react-bootstrap/Button";

export interface ListProps {

    /**
     * The class name of the table
     */
    className?: string,

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
    items: any[],

    /**
     * The Render function for each item in the list
     */
    renderItem: (item: any) => JSX.Element | null

    /**
     * The item's buffer to render in the list
     */
    buffer?: number

    /**
     * Optional control to show back to top button
     * Note: This will only work if the list is vertical
     */
    backToTop?: boolean

    /**
     * The orientation of the list
     */
    orientation?: "vertical" | "horizontal"
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
        className = '',
        height = 300,
        width = 300,
        itemSize = 35,
        items = [],
        renderItem = () => null,
        buffer = 2,
        orientation = "vertical",
        backToTop = true
    }: ListProps
) => {

    const [scrollTop, setScrollTop] = React.useState(0);
    const [scrollLeft, setScrollLeft] = React.useState(0);
    const [visibleItems, setVisibleItems] = React.useState<any[]>([]);

    const scrollableView = useRef<any>(null);

    /**
     * Validate conditions to show back to top button
     */
    const showBackToTop = useMemo(() => {
        return backToTop && orientation === "vertical" && scrollTop > itemSize * 2;
    }, [backToTop, orientation, scrollTop, itemSize]);

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
        if (orientation === "horizontal") {
            setScrollLeft(event.currentTarget.scrollLeft);
        } else {
            setScrollTop(event.currentTarget.scrollTop);
        }
    }

    /**
     * Getting the visible items in the list
     */
    useEffect(() => {
        if (orientation === "horizontal") {
            const startIndex = Math.floor(scrollLeft / itemSize);
            const endIndex = startIndex + numberOfVisibleColumn + buffer;
            const itemsToRender = items.slice(startIndex, endIndex)
            itemsToRender.forEach((item, index) => {
                item.index = startIndex + index;
            })
            setVisibleItems(itemsToRender);
        } else {
            const startIndex = Math.floor(scrollTop / itemSize);
            const endIndex = (startIndex + numberOfVisibleRow) + buffer;
            const itemsToRender = items.slice(startIndex, endIndex)
            itemsToRender.forEach((item, index) => {
                item.index = startIndex + index;
            })
            setVisibleItems(items.slice(startIndex, endIndex));
        }

    }, [scrollTop, scrollLeft, items, itemSize, buffer, orientation, numberOfVisibleRow, numberOfVisibleColumn]);


    /**
     * Method to calculate the offset of each item in the list
     */
    const getItemOffsetStyle = (index: number) => {
        if (orientation === "horizontal") {
            return `translateX(${index * itemSize}px)`;
        }

        return `translateY(${index * itemSize}px)`;
    }

    /**
     * Method to smooth scroll back to the top of scrollable div
     */
    const scrollToTop = () => {
        if (scrollableView.current) {
            scrollableView.current.scrollTo(0, 0);
        }
    }

    return (
        <div className='position-relative'>
            {
                showBackToTop && (
                    <Button className='position-absolute bottom-0' style={{right: '-7%'}} variant='secondary'
                            onClick={scrollToTop} title={'Back to top'}>↑</Button>
                )
            }
            <div
                className={classNames('virtual-list', orientation === 'horizontal' ? 'virtual-list-horizontal' : 'virtual-list-vertical', className)}
                style={{height: height, width: width}}
                ref={scrollableView}
                onScroll={handleScroll}
            >
                <div className='virtual-list-item-wrapper'
                     data-testid="list-item-wrapper"
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
                                    transform: getItemOffsetStyle(item.index)
                                }}
                            >
                                {renderItem(item)}
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default List
