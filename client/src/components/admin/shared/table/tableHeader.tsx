import React from "react";
import ColumnCell from "../../../models/column.cell";
import SortColumn from "../../../models/sort.column";

interface TableHeaderProps {
    sortColumn: SortColumn;
    onSort: Function;
    columns: ColumnCell[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, onSort, sortColumn }) => {
    const raiseSort = (property?: string) => {
        if (!property) return;
        const sc = { ...sortColumn };
        if (sc.property === property) sc.order = sc.order === "asc" ? "desc" : "asc";
        else {
            sc.property = property;
            sc.order = "asc";
        }
        onSort(sc);
    };

    const renderSortIcon = (column: ColumnCell) => {
        if (column.property !== sortColumn.property) return null;
        if (sortColumn.order === "asc") return <i className="fas fa-sort-up" />;
        return <i className="fas fa-sort-down" />;
    };

    return (
        <thead className="text-light bg-primary">
            <tr>
                {columns.map((column) => (
                    <th
                        className="clickable"
                        key={column.property || column.key}
                        onClick={() => raiseSort(column.property)}
                    >
                        {column.label} {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
