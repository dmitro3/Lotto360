import moment from "moment";
import { FunctionComponent, useState } from "react";
import { Pagination, Table } from "rsuite";
import Web3 from "web3";
import { Roll } from "../../interfaces/roll";
import { getDiceClass } from "./dice";
import { numberToText } from "./dice.result.modal";

interface DiceHistoryProps {
    data: Roll[];
    setModalRoll: Function;
}

const DiceHistory: FunctionComponent<DiceHistoryProps> = ({ data, setModalRoll }) => {
    const [page, setPage] = useState(1);

    let rolls = data.map((r) => {
        return {
            id: r.id,
            amount: Web3.utils.fromWei(r.amount, "ether"),
            rollTime: moment(parseInt(r.rollTime) * 1000).format("DD/MM/YYYY - h:mm a"),
            guess: (
                <i
                    className={`${getDiceClass(r)} fa-solid fa-2xl fa-dice-${numberToText(
                        r.guess
                    )}`}
                ></i>
            ),
            result: (
                <i
                    className={`fa-solid text-secondary fa-2xl fa-dice-${numberToText(
                        r.result
                    )}`}
                ></i>
            ),
            detail: (
                <span className="text-primary pointer" onClick={() => setModalRoll(r)}>
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
                bordered
                autoHeight={true}
                data={rolls}
                sortColumn={"id"}
                sortType={"asc"}
            >
                <Column fixed resizable>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column fixed resizable>
                    <HeaderCell>Amount</HeaderCell>
                    <Cell dataKey="amount" />
                </Column>
                <Column fixed resizable>
                    <HeaderCell>Roll Time</HeaderCell>
                    <Cell dataKey="rollTime" />
                </Column>

                <Column resizable>
                    <HeaderCell>Guess</HeaderCell>
                    <Cell dataKey="guess" />
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

export default DiceHistory;
