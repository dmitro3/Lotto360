import { FunctionComponent } from "react";
import { MDBDataTable } from "mdbreact";

import { TicketAttrs } from "../../../api/models/round.model";

interface TicketsTableProps {
    tickets?: TicketAttrs[];
}

const TicketsTable: FunctionComponent<TicketsTableProps> = ({ tickets }) => {
    if (!tickets) return <></>;

    const data = {
        columns: [
            {
                label: "Id",
                field: "cid",
                sort: "asc",
                width: 150,
            },
            {
                label: "Number",
                field: "number",
                sort: "asc",
                width: 270,
            },
            {
                label: "Owner",
                field: "owner",
                sort: "asc",
                width: 200,
            },
            {
                label: "Status",
                field: "ticketStatus",
                sort: "asc",
                width: 100,
            },
            {
                label: "Prize claimed",
                field: "prizeClaimed",
                sort: "asc",
                width: 150,
            },
        ],
        rows: [...tickets],
    };

    return <MDBDataTable striped bordered hover data={data} />;
};

export default TicketsTable;
