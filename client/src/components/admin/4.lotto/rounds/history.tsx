import { cloneDeep } from "lodash";
import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CSVLink } from "react-csv";
import { HashLoader } from "react-spinners";
import { GetRoundApiModel, RoundStatus } from "../../../../api/models/round.model";
import { RoundApiService } from "../../../../api/round.api.service";
import { ticketNumToStr } from "../../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../../../constants/classes";

interface HistoryProps {
    setRoundId: (val: number) => void;
    setShowModal: (val: boolean) => void;
}

const History: FunctionComponent<HistoryProps> = ({ setRoundId, setShowModal }) => {
    const [roundsArray, setRoundsArray] = useState<GetRoundApiModel[]>();
    const [disable, setDisable] = useState(false);
    const [csvData, setCSVData] = useState<any>({});

    useEffect(() => {
        RoundApiService.getRounds()
            .then((res) => {
                if (res && res.data && res.data.success) setRoundsArray(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!roundsArray || !roundsArray.length) {
        return (
            <div className={flexItemsCenter}>
                <HashLoader />
            </div>
        );
    }

    const downloadTickets = (roundId: number) => {
        if (csvData[roundId]) return;
        RoundApiService.getRoundByIdAdminFromDb(roundId)
            .then((res) => {
                if (res && res.data && res.data.success) {
                    const tickets = res.data.result?.tickets;
                    if (tickets) {
                        const data = [
                            ["id", "owner", "number", "isClaimed"],
                            ...tickets.map((t) => [
                                t.cid,
                                t.owner,
                                `# ${ticketNumToStr(t.number)}`,
                                t.isClaimed,
                            ]),
                        ];
                        console.table(data);
                        setCSVData({ ...csvData, [roundId]: data });
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <Table striped bordered hover responsive>
            <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>End time</th>
                    <th>Status</th>
                    <th>Ticket price</th>
                    <th>Total BNB</th>
                    <th>Final number</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody>
                {roundsArray.map((r, i) => (
                    <tr key={i}>
                        <td>{r.cid}</td>
                        <td>
                            {moment(r.endTime * 1000).format("Do MMMM YYYY - h:mm a")}
                        </td>
                        <td>
                            {r.status === RoundStatus.Open && (
                                <span className="text-success fw-bold">Open</span>
                            )}
                            {r.status === RoundStatus.Claimable && (
                                <span className="text-primary fw-bold">Claimable</span>
                            )}
                            {r.status === RoundStatus.Close && (
                                <span className="text-primary fw-bold">Close</span>
                            )}
                        </td>
                        <td>{r.ticketPrice}</td>
                        <td>{r.totalBnbAmount}</td>
                        <td>{ticketNumToStr(r.finalNumber)}</td>
                        <td>
                            {r.status === RoundStatus.Claimable && (
                                <>
                                    <button
                                        className="btn btn-primary btn-sm mb-1 me-2"
                                        onClick={() => {
                                            setRoundId(r.cid);
                                            setShowModal(true);
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <i className="fa-solid fa-circle-info me-2"></i>
                                        detail
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => {
                                            downloadTickets(r.cid);
                                        }}
                                    >
                                        {csvData[r.cid] ? (
                                            <>
                                                <CSVLink
                                                    data={csvData[r.cid]}
                                                    className="text-decoration-none"
                                                >
                                                    download cvs
                                                </CSVLink>
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-arrow-down me-2"></i>
                                                load cvs
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                            {r.status === RoundStatus.Claimable && !r.isInDb && (
                                <button
                                    disabled={disable}
                                    className="btn btn-success btn-sm ms-3"
                                    onClick={() => {
                                        setDisable(true);
                                        RoundApiService.fetchRound(r.cid)
                                            .then((res) => {
                                                if (res && res.data && res.data.result) {
                                                    r.isInDb = true;
                                                    setRoundsArray(
                                                        cloneDeep(roundsArray)
                                                    );
                                                }
                                            })
                                            .catch((err) => console.info(err))
                                            .finally(() => setDisable(false));
                                    }}
                                >
                                    <i className="fa-solid fa-down me-2"></i>fetch
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default History;
