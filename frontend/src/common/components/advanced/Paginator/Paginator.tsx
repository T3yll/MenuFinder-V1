import { Paginator as PaginatorR } from 'primereact/paginator';
import { useState } from 'react';

interface Props {
    first?: number,
    page?: number,
    rows?: number,
    rowsPerPageOptions?: number[],
    totalRecords: number,
    fetchData: (page: number, offset: number, searchQuery?: string) => Promise<void>;
}

const Paginator = ({ first: _first = 0, first: _page = 1, rows: _rows = 9, rowsPerPageOptions: _rowsPerPageOptions = [9, 18, 27], totalRecords, fetchData }: Props) => {
    const [first, setFirst] = useState(_first);
    const [rows, setRows] = useState(_rows);

    const rowsPerPageOptions = _rowsPerPageOptions;

    const onPageChange = (e: { first: number; page: number, rows: number }) => {
        const newPage = e.page + 1;
        const newRows = e.rows;
        const newFirst = e.first;

        setRows(newRows);
        setFirst(newFirst);

        fetchData(newPage, newRows);
    };

    return (
        <PaginatorR
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            rowsPerPageOptions={rowsPerPageOptions}
            className='bg-transparent'
        />
    );

}

export default Paginator;