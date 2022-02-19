import moment from "moment";
import { FunctionComponent, useState } from "react";
import { Pagination, Table } from "rsuite";
import Web3 from "web3";
import { FruitSpin } from "../../interfaces/spin";
import { getFruit } from "./spinner";

interface FruitHistoryProps {
    data: FruitSpin[];
    setModalSpin: Function;
}

const FruitHistory: FunctionComponent<FruitHistoryProps> = ({ data, setModalSpin }) => {
    const [page, setPage] = useState(1);

    let spins = data.map((r) => {
        return {
            id: r.id,
            amount: Web3.utils.fromWei(r.amount, "ether"),
            spinTime: moment(parseInt(r.spinTime) * 1000).fromNow(),
            guess: [...Array(6)].map((_v, index) => (
                <span key={index} className="p-2 table-fruit">
                    {getFruit(Number(r.guess[index + 1]))}
                </span>
            )),
            result: [...Array(6)].map((_v, index) => (
                <span key={index} className="p-2 table-fruit">
                    {getFruit(Number(r.result[index + 1]))}
                </span>
            )),
            detail: (
                <span className="text-primary pointer" onClick={() => setModalSpin(r)}>
                    detail
                </span>
            ),
        };
    });

    const limit = 10;
    spins = spins.filter((_v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const { Column, HeaderCell, Cell } = Table;

    return (
        <div>
            <Table
                bordered
                autoHeight={true}
                data={spins}
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

                <Column width={300} resizable>
                    <HeaderCell>Guess</HeaderCell>
                    <Cell dataKey="guess" />
                </Column>

                <Column width={300} resizable>
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

export default FruitHistory;
