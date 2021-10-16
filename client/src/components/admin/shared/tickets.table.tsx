import { FunctionComponent, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Pagination, Table } from "rsuite";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import "rsuite/dist/rsuite.min.css";
import { TicketAttrs } from "../../../api/models/round.model";

interface TicketsTableProps {
    tickets?: TicketAttrs[];
}

interface TicketTable {
    cid: number;
    number: string;
    owner: string;
    prizeClaimed?: string;
    ticketStatus?: string;
}

type ColumnNames = "cid" | "number" | "owner" | "prizeClaimed" | "ticketStatus";

const TicketsTable: FunctionComponent<TicketsTableProps> = ({ tickets }) => {
    const [sortColumn, setSortColumn] = useState<ColumnNames>("cid");
    const [sortType, setSortType] = useState();
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    if (!tickets) return <></>;

    let data: TicketTable[] = tickets.map(({ cid, number, owner }) => ({
        cid,
        number: ticketNumToStr(number),
        owner,
    }));
    const total = data.length;

    const handleChangeLimit = (dataKey: any) => {
        setPage(1);
        setLimit(dataKey);
    };

    if (search) {
        data = filteringData(data, search);
    }

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
            <Form.Group as={Row} className="mb-3" controlId="searchtickets">
                <Form.Label column sm="1">
                    Search
                </Form.Label>
                <Col sm="5">
                    <Form.Control
                        value={search}
                        type="text"
                        placeholder="search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Col>
            </Form.Group>

            <Table
                bordered
                height={500}
                data={getData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
                loading={loading}
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

                {/* <Column width={200} sortable resizable>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="ticketStatus" />
                </Column>

                <Column width={200} sortable resizable>
                    <HeaderCell>Claimed?</HeaderCell>
                    <Cell dataKey="prizeClaimed" />
                </Column> */}
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
                    limitOptions={[5, 10, 20, 50, 100, 200, 500, 1000]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </div>
    );
};

export default TicketsTable;

// ..........................................................................................
const filteringData = (data: TicketTable[], search: string) => {
    search = search.toLowerCase();
    return data.filter(
        (t) =>
            `${t.cid}`.toLowerCase().includes(search) ||
            `${t.number}`.toLowerCase().includes(search) ||
            t.owner.toLowerCase().includes(search) ||
            t.prizeClaimed?.toLowerCase().includes(search) ||
            t.ticketStatus?.toLowerCase().includes(search)
    );
};
