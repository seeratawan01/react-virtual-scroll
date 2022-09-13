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
        height=300,
        rowHeight = 20,
        items = [],
        renderItem = () => null
    }: ListProps
) => {
    return (
        // Virtualized list inner virtual height = length of items * height of each item
        <div className='virtual-list' style={{height:height, maxHeight:height, ['--virtual-list-padding-bottom' as string]: (items.length * rowHeight) + 'px'}}>
            {/*{*/}
            {/*    items.map((item, index) => (*/}
            {/*        <div*/}
            {/*            className={'virtual-list-item'}*/}
            {/*            key={index}*/}
            {/*            style={{*/}
            {/*                height: rowHeight,*/}
            {/*                overflow: 'hidden'*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            {renderItem(item)}*/}
            {/*        </div>*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    )
}

export default List
