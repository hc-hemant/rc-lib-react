export interface ITableId {
    id: string;
}

export interface ITableColumn<T> {
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode
}

export interface TableProps<T extends ITableId> {
    columns: ITableColumn<T>[];
    rows: T[];
    caption?: string;
    testId?: string;
    onRowClick?: (row: T) => void 
}