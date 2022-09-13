export interface ListProps {
    /**
     * The height of each row in the list
     */
    rowHeight: string | number,

    /**
     * The items to render in the list
     */
    items: any[],

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


const List = (
    {
        rowHeight = 20,
        items = [],
        renderItem = () => null
    }: ListProps
) => {
    return (
        <div className='virtual-list'>
            {
                items.map((item, index) => (
                    <div
                        className={'virtual-list-item'}
                        key={index}
                        style={{
                            height: rowHeight,
                            overflow: 'hidden'
                        }}
                    >
                        {renderItem(item)}
                    </div>
                ))
            }
        </div>
    )
}

export default List
