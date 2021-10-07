import { FunctionComponent, useState } from "react";
import { Table } from "react-bootstrap";
import {
    defaultPools,
    GetRoundApiModel,
    RoundStatus,
    TicketStatus,
} from "../../../api/models/round.model";
import { RoundApiService } from "../../../api/round.api.service";
import RoundDetailModal from "./round.detail.modal";
import RoundModal from "./round.modal";

interface RoundsProps {}

let round: GetRoundApiModel = {
    cid: 1,
    bnbAddedFromLastRound: 0,
    bonusBnbAmount: 0,
    endTime: 1633537501,
    finalNumber: 1000009,
    firstTicketId: 1,
    firstTicketIdNextRound: 2,
    startTime: 1633457518,
    status: RoundStatus.Open,
    ticketPrice: 0.02,
    totalBnbAmount: 40,
    pools: defaultPools,
    tickets: [
        {
            cid: 1,
            number: 1345678,
            owner: "0x4trg4t34r",
            prizeClaimed: false,
            ticketStatus: TicketStatus.Unknown,
        },
    ],
};

const Rounds: FunctionComponent<RoundsProps> = () => {
    const [showModalAddRound, setShowModalAddround] = useState(false);
    const [showModalUpdateRound, setShowModalUpdateRound] = useState(false);
    const [roundFormInfo, setRoundFormInfo] = useState(round);
    const [roundDetail, setRoundDetail] = useState(round);
    const [showDetail, setShowDetail] = useState(false);
    const [showTransactionWaiting, setShowTransactionWaiting] = useState(false);

    const handleModalClose = () => {
        setShowModalAddround(false);
        setShowModalUpdateRound(false);
    };
    const handleAddRound = async (state: GetRoundApiModel) => {
        setShowTransactionWaiting(true);
        const result = await RoundApiService.addRound(state);
        if (result) handleModalClose();
        setShowTransactionWaiting(false);
    };

    const handleUpdateRound = (state: GetRoundApiModel) => console.info;
    const changeRoundValues = (roundValues: GetRoundApiModel) => {
        setRoundFormInfo(roundValues);
    };

    const handleShowDetail = () => {
        setShowDetail(true);
    };

    const handleCloseDetailModal = () => setShowDetail(false);

    return (
        <>
            <div className="d-flex">
                <button
                    className="btn btn-primary ms-auto"
                    onClick={() => setShowModalAddround(true)}
                >
                    create round
                </button>
            </div>

            <RoundModal
                changeRoundValues={changeRoundValues}
                formValues={roundFormInfo}
                handleModalClose={handleModalClose}
                handleModalSubmit={handleAddRound}
                isWaiting={showTransactionWaiting}
                showModal={showModalAddRound}
            />

            <RoundModal
                changeRoundValues={changeRoundValues}
                formValues={roundFormInfo}
                handleModalClose={handleModalClose}
                handleModalSubmit={handleUpdateRound}
                isWaiting={showTransactionWaiting}
                showModal={showModalUpdateRound}
            />

            <RoundDetailModal
                roundInfo={roundDetail}
                showModal={showDetail}
                handleClose={handleCloseDetailModal}
            />

            <h4 className="mt-5">Rounds</h4>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>
                            <button
                                className="btn btn-sm btn-info"
                                type="button"
                                onClick={() => {
                                    handleShowDetail();
                                }}
                            >
                                detail
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>
                            <button
                                className="btn btn-sm btn-info"
                                type="button"
                                onClick={() => {
                                    handleShowDetail();
                                }}
                            >
                                detail
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>3</td>
                        <td>Thornton</td>
                        <td>@twitter</td>
                        <td>
                            <button
                                className="btn btn-sm btn-info"
                                type="button"
                                onClick={() => {
                                    handleShowDetail();
                                }}
                            >
                                detail
                            </button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

export default Rounds;
