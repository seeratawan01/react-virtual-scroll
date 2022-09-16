import React, {ReactNode, UIEvent, useEffect, useMemo, useRef} from "react";
import {classNames} from "../utils";
import Button from "react-bootstrap/Button";

export interface TableProps {

    /**
     * The class name of the table
     */
    className?: string,

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
     * The Render function for each cell in the row
     */
    renderItem: (item: any, fieldName: string) => JSX.Element | null

    /**
     * Optional control to show back to top button
     * Note: This will only work if the list is vertical
     */
    backToTop?: boolean

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
        className = '',
        height = 300,
        width = 300,
        itemSize = 35,
        fields = [],
        items = [],
        buffer = 2,
        renderItem = () => null,
        backToTop = true
    }: TableProps
) => {

    const [scroll, setScroll] = React.useState(0);
    const [visibleItems, setVisibleItems] = React.useState<any[]>([]);

    const scrollableView = useRef<any>(null);

    /**
     * Validate conditions to show back to top button
     */
    const showBackToTop = useMemo(() => {
        return backToTop && scroll > itemSize * 2;
    }, [scroll, backToTop]);


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
            <div className={classNames('virtual-list', className)}
                 ref={scrollableView}
                 style={{height: height, width: width}}
                 onScroll={handleScroll}>
                <div className='virtual-list-item-wrapper'
                     data-testid="table-item-wrapper"
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
                                        {renderItem(item[field.key], field.key)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Table
