import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    defaultPools,
    GetRoundApiModel,
    RoundStatus,
} from "../../../api/models/round.model";
import { RoundApiService } from "../../../api/round.api.service";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import CurrentRound from "./current.round";
import RoundModal from "./round.modal";

interface RoundsProps {}

let round: GetRoundApiModel = {
    cid: 0,
    bnbAddedFromLastRound: 0,
    bonusBnbAmount: 0,
    endTime: moment().unix(),
    finalNumber: 0,
    firstTicketId: 0,
    firstTicketIdNextRound: 0,
    startTime: 0,
    status: RoundStatus.Open,
    ticketPrice: 0.02,
    totalBnbAmount: 0,
    pools: defaultPools,
};

const Rounds: FunctionComponent<RoundsProps> = () => {
    const [showModalAddRound, setShowModalAddRound] = useState(false);
    const [showModalUpdateRound, setShowModalUpdateRound] = useState(false);
    const [roundFormInfo, setRoundFormInfo] = useState(round);
    const [currentRound, setCurrentRound] = useState<GetRoundApiModel | undefined>(
        undefined
    );
    const [showDetail, setShowDetail] = useState(false);
    const [showTransactionWaiting, setShowTransactionWaiting] = useState(false);

    useEffect(() => {
        RoundApiService.getCurrentRound().then((res) => setCurrentRound(res.data.result));
    }, []);

    const handleMainModalClose = () => {
        setShowModalAddRound(false);
        setShowModalUpdateRound(false);
    };

    const handleAddRound = async (state: GetRoundApiModel) => {
        setShowTransactionWaiting(true);
        const result = await RoundApiService.addRound(state);
        if (result) {
            handleMainModalClose();
            toast.success(
                CustomToastWithLink(result.data.messages![0].message, "round added")
            );
        }
        setShowTransactionWaiting(false);
    };

    const handleUpdateRoundButton = () => {
        setShowModalUpdateRound(true);
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
                    onClick={() => setShowModalAddRound(true)}
                >
                    create round
                </button>
            </div>

            <RoundModal
                changeRoundValues={changeRoundValues}
                formValues={roundFormInfo}
                handleModalClose={handleMainModalClose}
                handleModalSubmit={handleAddRound}
                isWaiting={showTransactionWaiting}
                showModal={showModalAddRound}
            />

            {currentRound && (
                <RoundModal
                    changeRoundValues={changeRoundValues}
                    formValues={currentRound}
                    handleModalClose={handleMainModalClose}
                    handleModalSubmit={handleUpdateRound}
                    isWaiting={showTransactionWaiting}
                    showModal={showModalUpdateRound}
                />
            )}

            {/* <RoundDetailModal
                roundInfo={roundDetail}
                showModal={showDetail}
                handleClose={handleCloseDetailModal}
            /> */}

            <CurrentRound
                handleUpdateButton={handleUpdateRoundButton}
                currentRound={currentRound}
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
