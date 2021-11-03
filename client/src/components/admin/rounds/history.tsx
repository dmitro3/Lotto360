import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { cloneDeep } from "lodash";
import moment from "moment";

import { GetRoundApiModel, RoundStatus } from "../../../api/models/round.model";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { RoundApiService } from "../../../api/round.api.service";
import { flexItemsCenter } from "../../site/constants/classes";

interface HistoryProps {
    setRoundId: (val: number) => void;
    setShowModal: (val: boolean) => void;
}

const History: FunctionComponent<HistoryProps> = ({ setRoundId, setShowModal }) => {
    const [roundsArray, setRoundsArray] = useState<GetRoundApiModel[]>();
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        RoundApiService.getRounds()
            .then((res) => {
                if (res && res.data && res.data.success) setRoundsArray(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!roundsArray || !roundsArray.length)
        return (
            <div className={flexItemsCenter}>
                <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>
                Loading previous rounds
            </div>
        );

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
                        <td>{moment(r.endTime * 1000).format("Do MMMM YYYY, h:mm a")}</td>
                        <td>
                            {r.status === RoundStatus.Open ? (
                                <span className="text-success fw-bold">Open</span>
                            ) : (
                                <span className="text-primary fw-bold">Close</span>
                            )}
                        </td>
                        <td>{r.ticketPrice}</td>
                        <td>{r.totalBnbAmount}</td>
                        <td>{ticketNumToStr(r.finalNumber)}</td>
                        <td>
                            {r.status === RoundStatus.Close && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        setRoundId(r.cid);
                                        setShowModal(true);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <i className="fa-solid fa-circle-info me-2"></i>detail
                                </button>
                            )}
                            {r.status === RoundStatus.Close && !r.isInDb && (
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
