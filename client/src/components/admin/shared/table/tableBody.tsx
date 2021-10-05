import React from "react";

import ColumnCell from "../../../models/column.cell";

interface TableBodyProps {
    data: any[];
    columns: ColumnCell[];
}

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item["id"]}>
                    {columns.map((column, i) => (
                        <td key={i}>{renderCell(item, column)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

const renderCell = (item: any, column: ColumnCell) => {
    if (column.content) return column.content(item);
    if (column.property && item[`${column.property}`])
        return item[`${column.property}`].toString();
};

export default TableBody;
