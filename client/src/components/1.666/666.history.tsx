import moment from "moment";
import { FunctionComponent, useState } from "react";
import { Pagination, Table } from "rsuite";
import Web3 from "web3";
import { Spin } from "../../interfaces/spin";

interface BeastHistoryProps {
    data: Spin[];
    setModalSpin: Function;
}

const BeastHistory: FunctionComponent<BeastHistoryProps> = ({ data, setModalSpin }) => {
    const [page, setPage] = useState(1);

    let rolls = data.map((r) => {
        return {
            id: r.id,
            amount: Web3.utils.fromWei(r.amount, "ether"),
            spinTime: moment(parseInt(r.spinTime) * 1000).fromNow(),

            result: r.result.substring(1),
            detail: (
                <span className="text-primary pointer" onClick={() => setModalSpin(r)}>
                    detail
                </span>
            ),
        };
    });

    const limit = 10;
    rolls = rolls.filter((_v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const { Column, HeaderCell, Cell } = Table;

    return (
        <div>
            <Table
                autoHeight={true}
                bordered
                height={500}
                data={rolls}
                sortColumn={"id"}
                sortType={"asc"}
            >
                <Column resizable>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column resizable>
                    <HeaderCell>Amount</HeaderCell>
                    <Cell dataKey="amount" />
                </Column>
                <Column resizable>
                    <HeaderCell>Spin Time</HeaderCell>
                    <Cell dataKey="spinTime" />
                </Column>

                <Column resizable>
                    <HeaderCell>Result</HeaderCell>
                    <Cell dataKey="result" />
                </Column>

                <Column resizable>
                    <HeaderCell>Detail</HeaderCell>
                    <Cell dataKey="detail" />
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
                    size={"sm"}
                    layout={["total", "-", "pager", "skip"]}
                    total={data.length}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                />
            </div>
        </div>
    );
};

export default BeastHistory;
