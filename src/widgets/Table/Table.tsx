import styles from './Table.module.scss';

import { ITableId, TableProps } from "./Table.types";

const Table = <T extends ITableId>({ columns, rows, caption, testId="table", onRowClick }: TableProps<T>) => {    

    const tableCaption = caption && <caption data-testid={`${testId}-caption`}></caption>;
    const tableHeaders = columns.map(column => {
        return <th data-testid={`${testId}-header`} className={styles.tableContainerHeader} key={column.key as string}>{column.label}</th>
    });

    const hasTableContent = columns.length && rows.length;

    return <>
        {hasTableContent && <table className={styles.tableContainer} data-testid={testId}>
            {tableCaption}
            <thead className={styles.tableContainerThead}>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {
                    rows.map(row => {
                        return <tr 
                            data-testid={`${testId}-row`}
                            className={styles.tableContainerRow} 
                            key={String(row.id)} 
                            onClick={() => onRowClick && onRowClick(row)}>
                                {columns.map(column => {
                                    return <td 
                                        data-testid={`${testId}-column`}
                                        className={styles.tableContainerRowColumn} 
                                        key={`column-${String(column.key)}`}>
                                            {column.render ? column.render(row) : row[column.key] as React.ReactNode}
                                        </td>
                                })}
                        </tr>
                    })
                }
            </tbody>
        </table>}
    </>
}

export default Table;