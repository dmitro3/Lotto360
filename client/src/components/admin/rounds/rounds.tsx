import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import { RoundApiService } from "../../../api/round.api.service";
import { initialRound } from "./reducer/round.list.reducer";
import AddRoundButton from "./button.add.round";
import CurrentRound from "./current.round";
import RoundModal from "./round.modal";

interface RoundsProps {}

const Rounds: FunctionComponent<RoundsProps> = () => {
    const [showUpdateRoundModal, setShowUpdateRoundModal] = useState(false);
    const [submitButtonWaiting, setSubmitButtonWaiting] = useState(false);
    const [roundFormValues, setRoundFormValues] = useState(initialRound);
    const [showAddRoundModal, setShowAddRoundModal] = useState(false);
    const [currentRound, setCurrentRound] = useState(initialRound);
    const [showRoundDetail, setShowRoundDetail] = useState(false);

    useEffect(() => {
        RoundApiService.getCurrentRound().then((res) => {
            if (res.data.result) setCurrentRound(res.data.result);
        });
    }, []);

    const closeFormModal = () => {
        setShowAddRoundModal(false);
        setShowUpdateRoundModal(false);
    };

    const addRound = async (state: GetRoundApiModel) => {
        setSubmitButtonWaiting(true);
        const result = await RoundApiService.addRound(state);
        if (result) {
            closeFormModal();
            toast.success(
                CustomToastWithLink(result.data.messages![0].message, "round added")
            );
        }
        setSubmitButtonWaiting(false);
    };

    const updateRound = (state: GetRoundApiModel) => console.info;

    const changeRoundValues = (roundValues: GetRoundApiModel) => {
        setRoundFormValues(roundValues);
    };

    const showDetail = () => {
        setShowRoundDetail(true);
    };

    const closeDetailModal = () => setShowRoundDetail(false);

    return (
        <>
            <AddRoundButton setShowModalAddRound={setShowAddRoundModal} />

            {/* add round */}
            <RoundModal
                title={"Add round"}
                changeRoundValues={changeRoundValues}
                handleModalClose={closeFormModal}
                handleModalSubmit={addRound}
                formValues={roundFormValues}
                isWaiting={submitButtonWaiting}
                showModal={showAddRoundModal}
            />

            {/* update round */}
            {currentRound && (
                <RoundModal
                    title={"Update round"}
                    changeRoundValues={changeRoundValues}
                    handleModalClose={closeFormModal}
                    handleModalSubmit={updateRound}
                    formValues={currentRound}
                    isWaiting={submitButtonWaiting}
                    showModal={showUpdateRoundModal}
                />
            )}

            {/* <RoundDetailModal
                roundInfo={roundDetail}
                showModal={showDetail}
                handleClose={handleCloseDetailModal}
            /> */}

            <CurrentRound
                handleUpdateButton={setShowUpdateRoundModal}
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
                                    showDetail();
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
                                    showDetail();
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
                                    showDetail();
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
