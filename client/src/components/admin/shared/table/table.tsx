import React from "react";

import ColumnCell from "../../../models/column.cell";
import SortColumn from "../../../models/sort.column";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

interface TableProps {
    onSort: Function;
    data: any[];
    columns: ColumnCell[];
    sortColumn: SortColumn;
    totalCount: number;
}

const Table: React.FC<TableProps> = ({
    columns,
    sortColumn,
    onSort,
    data,
    totalCount = 10,
}) => {
    return (
        <div className="table-responsive mt-5">
            <table className="table table-hover">
                {totalCount === 0 ? (
                    <thead>
                        <tr>
                            <th>No data found.</th>
                        </tr>
                    </thead>
                ) : (
                    <>
                        <caption>{`result: ${totalCount}`}</caption>
                        <TableHeader
                            columns={columns}
                            sortColumn={sortColumn}
                            onSort={onSort}
                        />
                        <TableBody columns={columns} data={data} />
                    </>
                )}
            </table>
        </div>
    );
};

export default Table;
