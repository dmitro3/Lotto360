import React from "react";
import { Link } from "react-router-dom";
import { GetRoundApiModel } from "../../../api/models/round.model";
import ColumnCell from "../../models/column.cell";
import SortColumn from "../../models/sort.column";
import Table from "../shared/table/table";

interface RoundsTableProps {
    rounds: GetRoundApiModel[];
    sortColumn: SortColumn;
    onDelete: Function;
    onSort: Function;
    itemsCount: number;
}

const RoundsTable: React.FC<RoundsTableProps> = ({
    onDelete,
    onSort,
    sortColumn,
    rounds,
    itemsCount,
}) => {
    const columns: ColumnCell[] = [
        new ColumnCell("id", "Id"),
        new ColumnCell("firstName", "Name"),
        new ColumnCell("lastName", "Last Name"),
        new ColumnCell("isEnabled", "Enable"),
        new ColumnCell("email", "Email"),
        new ColumnCell("mobileNumber", "Mobile"),
    ];

    const deleteBtn = {
        key: "delete",
        content: (round: GetRoundApiModel) => (
            <button
                onClick={() => onDelete(round)}
                className="btn btn-outline-danger btn-sm"
            >
                Delete
            </button>
        ),
    };

    const editBtn = {
        key: "edit",
        content: (round: GetRoundApiModel) => (
            <Link to={`/rounds/${round.cid}`}>
                <button className="btn btn-primary btn-sm">Edit</button>
            </Link>
        ),
    };

    columns.push(editBtn);

    return (
        <Table
            columns={columns}
            data={rounds}
            totalCount={itemsCount}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
};

export default RoundsTable;
