import { FunctionComponent } from "react";
import { PoolWinnersAttr, WinningTicketAttrs } from "../../../api/models/round.model";

interface PoolTablesProps {
    winnersInPools: PoolWinnersAttr;
}

const PoolTables: FunctionComponent<PoolTablesProps> = ({ winnersInPools }) => {
    return (
        <div className="bg-light px-3 py-2 rounded mt-5">
            <h6 className="fw-bold">Match 1 winners: {renderToggleLink(1)}</h6>
            {renderTable(winnersInPools.match1, 1)}
            <hr className="mt-5" />
            <h6 className="fw-bold">Match 2 winners:</h6>
            {renderTable(winnersInPools.match2, 2)}
            <hr className="mt-5" />
            <h6 className="fw-bold">Match 3 winners:</h6>
            {renderTable(winnersInPools.match3, 3)}
            <hr className="mt-5" />
            <h6 className="fw-bold">Match 4 winners:</h6>
            {renderTable(winnersInPools.match4, 4)}
            <hr className="mt-5" />
            <h6 className="fw-bold">Match 5 winners:</h6>
            {renderTable(winnersInPools.match5, 5)}
            <hr className="mt-5" />
            <h6 className="fw-bold">Match 6 winners:</h6>
            {renderTable(winnersInPools.match6, 6)}
        </div>
    );
};

export default PoolTables;

// ..........................................................................................
const renderTable = (match: WinningTicketAttrs[], num: number) =>
    match.length === 0 ? (
        <span>no winner</span>
    ) : (
        <div className="collapse show" id={`collapseExample${num}`}>
            <table className="table border">
                <thead className="table-dark">
                    <tr>
                        <th>#id</th>
                        <th>owner</th>
                        <th>number</th>
                        <th>is claimed</th>
                    </tr>
                </thead>
                <tbody>
                    {match.map((t) => (
                        <tr
                            className={
                                t.prizeClaimed ? "bg-success text-white fw-bold" : ""
                            }
                        >
                            <td>{t.cid}</td>
                            <td>{t.owner}</td>
                            <td>{t.number}</td>
                            <td>{t.prizeClaimed ? "true" : "false"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

const renderToggleLink = (num: number) => (
    <a
        className="ms-2"
        data-bs-toggle="collapse"
        href={`#collapseExample${num}`}
        role="button"
        aria-expanded="true"
        aria-controls={`collapseExample${num}`}
    >
        toggle
    </a>
);
