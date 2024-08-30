import { fireEvent, render, screen } from "@testing-library/react";
import Table from "./Table";
import { ITableColumn } from "./Table.types";

interface TableData {
    id: string;
    name: string;
    action?: string
}

describe('UNIT | Table component', () => {
    const testId = 'actor-table';
    const tableColumns: ITableColumn<TableData>[] = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'action',
            label: 'Action',
            render: () => <div data-testid="action-column"></div>
        }
    ];
    const tableRows  = [
        {
            id: 'user1',
            name: 'user 1'
        }
    ];

    it('should not create table component if columns are missing', () => {
        render(<Table columns={[]} rows={tableRows} testId={testId}/>);

        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
    
    it('should not create table component if rows are missing', () => {
        render(<Table columns={tableColumns} rows={[]} testId={testId}/>);

        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });
    
    it('should not create table component if both rows & columns are missing', () => {
        render(<Table columns={[]} rows={[]} testId={testId}/>);

        expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
    });

    it('should create table component with data', () => {
        render(<Table columns={tableColumns} rows={tableRows} testId={testId}/>);
        const rows = screen.queryAllByTestId(`${testId}-row`);
        const headers = screen.queryAllByTestId(`${testId}-header`);
        const columns = screen.queryAllByTestId(`${testId}-column`);

        expect(screen.queryByTestId(testId)).toBeInTheDocument();
        expect(rows.length).toBe(1);
        expect(headers.length).toBe(2);
        expect(columns.length).toBe(2);
        expect(screen.queryByTestId('action-column')).toBeInTheDocument();
    });

    it('should use default test id if not passed', () => {
        render(<Table columns={tableColumns} rows={tableRows} />);
        
        const rows = screen.queryAllByTestId(`table-row`);

        expect(screen.queryByTestId('table')).toBeInTheDocument();
        expect(rows.length).toBe(1);
    });

    it('should show caption if passed', () => {
        render(<Table columns={tableColumns} rows={tableRows} caption="Sample table" testId={testId}/>);
        const rows = screen.queryAllByTestId(`${testId}-row`);
        const headers = screen.queryAllByTestId(`${testId}-header`);

        expect(rows.length).toBe(1);
        expect(headers.length).toBe(2);
        expect(screen.queryByTestId(`${testId}-caption`)).toBeInTheDocument()
    });

    it('should trigger click event on row cick', () => {
        const clickHandler = jest.fn();

        render(<Table columns={tableColumns} rows={tableRows} onRowClick={clickHandler} testId={testId}/>);
        
        const rows = screen.queryAllByTestId(`${testId}-row`);
        expect(rows.length).toBe(1);

        fireEvent.click(rows[0]);

        expect(clickHandler).toHaveBeenCalledWith(tableRows[0]);
    });
});