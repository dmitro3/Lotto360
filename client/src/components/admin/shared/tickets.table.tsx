import { FunctionComponent, useState } from "react";
// import { Table } from "react-bootstrap";
import { Pagination, Table } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import { TicketAttrs, TicketStatus } from "../../../api/models/round.model";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";

interface TicketsTableProps {
    tickets?: TicketAttrs[];
}

const TicketsTable: FunctionComponent<TicketsTableProps> = ({ tickets }) => {
    const [sortColumn, setSortColumn] = useState<
        "cid" | "number" | "owner" | "prizeClaimed" | "ticketStatus"
    >("cid");
    const [sortType, setSortType] = useState();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    if (!tickets) return <></>;

    let data = tickets.map(({ cid, number, owner, prizeClaimed, ticketStatus }) => ({
        cid,
        number: ticketNumToStr(number),
        owner,
        prizeClaimed: prizeClaimed ? "Yes" : "No",
        ticketStatus:
            ticketStatus === TicketStatus.Lose
                ? "Lose"
                : ticketStatus === TicketStatus.Unknown
                ? "Unknown"
                : "Win",
    }));
    const total = data.length;

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === "string") {
                    // @ts-ignore
                    x = x.charCodeAt();
                }
                if (typeof y === "string") {
                    // @ts-ignore
                    y = y.charCodeAt();
                }
                if (sortType === "asc") {
                    // @ts-ignore
                    return x - y;
                } else {
                    // @ts-ignore
                    return y - x;
                }
            });
        }
        return data;
    };

    data = data.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const handleSortColumn = (sortColumn: any, sortType: any) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const { Column, HeaderCell, Cell } = Table;

    return (
        <div>
            <Table
                bordered
                height={500}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
                // onRowClick={(data) => {
                //     console.log(data);
                // }}
            >
                <Column width={70} align="center" fixed sortable resizable>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="cid" />
                </Column>

                <Column width={450} fixed sortable resizable>
                    <HeaderCell>Owner</HeaderCell>
                    <Cell dataKey="owner" />
                </Column>

                <Column width={130} sortable resizable>
                    <HeaderCell>Number</HeaderCell>
                    <Cell dataKey="number" />
                </Column>

                <Column width={200} sortable resizable>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="ticketStatus" />
                </Column>

                <Column width={200} sortable resizable>
                    <HeaderCell>Claimed?</HeaderCell>
                    <Cell dataKey="prizeClaimed" />
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={["total", "-", "limit", "|", "pager", "skip"]}
                    total={total}
                    limitOptions={[5, 10, 20]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );

    // return (
    //     <Table striped bordered hover responsive>
    //         <thead className="table-dark">
    //             <tr>
    //                 <th>#</th>
    //                 <th>number</th>
    //                 <th>Owner</th>
    //                 <th>Status</th>
    //                 <th>Claimed?</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {tickets.map(({ cid, number, owner, prizeClaimed, ticketStatus }, i) => (
    //                 <tr key={i}>
    //                     <td>{cid}</td>
    //                     <td>{ticketNumToStr(number)}</td>
    //                     <td>{owner}</td>
    //                     <td>
    //                         {ticketStatus === TicketStatus.Lose
    //                             ? "Lose"
    //                             : ticketStatus === TicketStatus.Unknown
    //                             ? "Unknown"
    //                             : "Win"}
    //                     </td>
    //                     <td>
    //                         {prizeClaimed ? (
    //                             <span className="text-success">Yes</span>
    //                         ) : (
    //                             <span className="text-danger">No</span>
    //                         )}
    //                     </td>
    //                 </tr>
    //             ))}
    //         </tbody>
    //     </Table>
    // );
};

export default TicketsTable;
