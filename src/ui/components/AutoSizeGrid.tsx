import {
    FC,
    useEffect,
    useRef,
    useState
} from "react";
import {FixedSizeGrid, GridChildComponentProps} from "react-window";

type Props<T> = {
    columnBaseWidth: number
    rowHeight: number
    data: Array<T>
    children: FC<GridChildComponentProps>
    itemData?: object
}

export function AutoSizeGrid<T>({data, rowHeight, columnBaseWidth, children, itemData}: Props<T>) {
    const dataLengthRef = useRef<number>(0)
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const componentWidth = useRef<number>(0)
    const savedWidth = useRef<number>(0)
    const columnBaseWidthRef = useRef<number>(columnBaseWidth)
    const [columnCount, setColumnCount] = useState<number>(0)
    const [rowCount, setRowCount] = useState<number>(0)
    const [columnWidth, setColumnWidth] = useState<number>(300)
    const containerRef = useRef<HTMLDivElement>(null)
    const resizeObserverRef = useRef<ResizeObserver | null>(null)
    const callbackRef = useRef<(() => void) | null>(null)

    const calculateChanges = () => {
        let newWidth = componentWidth.current
        if (newWidth !== savedWidth.current) {
            savedWidth.current = newWidth
        }

        const columnWidth = columnBaseWidthRef.current
        const countCalculation = Math.round(newWidth / columnWidth)

        if (columnCount !== countCalculation) {
            if (countCalculation !== 0) {
                const cWidth = newWidth / countCalculation
                setColumnCount(countCalculation)
                setColumnWidth(cWidth)
            } else {
                setRowCount(0)
                setColumnCount(0)
                setColumnWidth(0)
            }
        }

        const rowCalc = Math.ceil(dataLengthRef.current / countCalculation)
        if (rowCalc !== rowCount) {
            setRowCount(rowCalc)
        }
    }

    useEffect(() => {
        if (!callbackRef.current) {
            callbackRef.current = () => {
                if (containerRef.current) {
                    const nWidth = containerRef.current.clientWidth
                    const nHeight = containerRef.current.clientHeight
                    if (width !== nWidth) {
                        setWidth(nWidth)
                    }
                    if (height !== nHeight) {
                        setHeight(nHeight)
                    }
                    componentWidth.current = nWidth
                    calculateChanges()
                }
            }
        }
        if (!resizeObserverRef.current) {
            resizeObserverRef.current = new ResizeObserver(() => {
                if (callbackRef.current) callbackRef.current()
            })
        }
        callbackRef.current()
        return () => {
            if (!!resizeObserverRef.current) resizeObserverRef.current!!.disconnect()
        }
    }, [])

    useEffect(() => {
        if (resizeObserverRef.current && containerRef.current) resizeObserverRef.current?.observe(containerRef.current)
    }, [containerRef])

    useEffect(() => {
        if (data.length !== dataLengthRef.current) {
            dataLengthRef.current = data.length
            calculateChanges()
        }
    }, [data])


    return <div className={"w-full h-full overflow-hidden"} ref={containerRef}>
        <FixedSizeGrid columnWidth={columnWidth} rowHeight={rowHeight} columnCount={columnCount}
                       height={height} rowCount={rowCount} width={width} itemData={{
            columnCount, indexLimit: data.length - 1, list: data, ...itemData
        }}>
            {children}
        </FixedSizeGrid>
    </div>;
}

export function AutoSizeGridItem<T = any>(props: GridChildComponentProps<T> & {
    children: FC<GridChildComponentProps & {
        index: number
        item: T
    }>
}) {
    const {data, rowIndex, columnIndex, children} = props
    const Children = children
    const {columnCount, indexLimit, list} = data as any
    const index = rowIndex * columnCount + columnIndex
    const l = list as Array<T>
    const item = index <= l.length - 1 ? l[index] : null
    if (index > indexLimit || !item) return null
    return <Children {...props} data={{...data, index}} index={index} item={item}/>
}