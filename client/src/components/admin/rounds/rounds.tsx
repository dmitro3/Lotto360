import { FunctionComponent, useState } from "react";
import { Table } from "react-bootstrap";
import {
    defaultPools,
    GetRoundApiModel,
    RoundStatus,
} from "../../../api/models/round.model";
import { RoundApiService } from "../../../api/round.api.service";
import RoundModal from "./round.modal";

interface RoundsProps {}

let round: GetRoundApiModel = {
    cid: 1,
    bnbAddedFromLastRound: 0,
    bonusBnbAmount: 0,
    endTime: 1633457517,
    finalNumber: 1000009,
    firstTicketId: 1,
    firstTicketIdNextRound: 2,
    startTime: 1633457518,
    status: RoundStatus.Open,
    ticketPrice: 0.02,
    totalBnbAmount: 40,
    pools: defaultPools,
};

const Rounds: FunctionComponent<RoundsProps> = () => {
    const [showModalAddRound, setShowModalAddround] = useState(false);
    const [showModalUpdateRound, setShowModalUpdateRound] = useState(false);
    const [roundInfo, setRoundInfo] = useState(round);

    const handleModalClose = () => {
        setShowModalAddround(false);
        setShowModalUpdateRound(false);
    };
    const handleAddRound = async (state: GetRoundApiModel) => {
        const result = await RoundApiService.addRound(state);
        handleModalClose();
    };

    const handleUpdateRound = (state: GetRoundApiModel) => console.info;
    const changeRoundValues = (roundValues: GetRoundApiModel) => {
        setRoundInfo(roundValues);
    };

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
                formValues={roundInfo}
                handleModalClose={handleModalClose}
                handleModalSubmit={handleAddRound}
                showModal={showModalAddRound}
            />

            <RoundModal
                changeRoundValues={changeRoundValues}
                formValues={roundInfo}
                handleModalClose={handleModalClose}
                handleModalSubmit={handleUpdateRound}
                showModal={showModalUpdateRound}
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
                                    alert(1);
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
                                    alert(2);
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
                                    alert(3);
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
