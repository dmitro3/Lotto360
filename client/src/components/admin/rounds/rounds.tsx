import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import { RoundApiService } from "../../../api/round.api.service";
import { initialRound } from "./reducer/round.list.reducer";
import AddRoundButton from "./button.add.round";
import CurrentRound from "./current.round";
import RoundModal from "./round.modal";

interface RoundsProps {
    bnbPrice: number;
}

const Rounds: FunctionComponent<RoundsProps> = ({ bnbPrice }) => {
    const [roundUpdateFormValues, setRoundUpdateFormValues] = useState(initialRound);
    const [roundFormValues, setRoundFormValues] = useState(initialRound);
    const [currentRound, setCurrentRound] = useState<GetRoundApiModel>();
    const [showUpdateRoundModal, setShowUpdateRoundModal] = useState(false);
    const [submitButtonWaiting, setSubmitButtonWaiting] = useState(false);
    const [showAddRoundModal, setShowAddRoundModal] = useState(false);
    const [showRoundDetail, setShowRoundDetail] = useState(false);

    useEffect(() => {
        RoundApiService.getCurrentRound().then((res) => {
            if (res && res.data && res.data.result) {
                setCurrentRound(res.data.result);
                setRoundUpdateFormValues(cloneDeep(res.data.result));
            }
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
            const res = await RoundApiService.getCurrentRound();
            if (res.data.result) setCurrentRound(cloneDeep(res.data.result));

            closeFormModal();
            toast.success(
                CustomToastWithLink(result.data.messages![0].message, "round added")
            );
        }
        setSubmitButtonWaiting(false);
        closeFormModal();
    };

    const updateRound = async (state: GetRoundApiModel) => {
        setSubmitButtonWaiting(true);
        const result = await RoundApiService.updateRound(state);
        if (result) {
            const res = await RoundApiService.getCurrentRound();
            if (res.data.result) setCurrentRound(cloneDeep(res.data.result));

            closeFormModal();
            toast.success(
                CustomToastWithLink(result.data.messages![0].message, "round updated")
            );
        }
        setSubmitButtonWaiting(false);
        closeFormModal();
    };

    const changeRoundFormValues = (roundValues: GetRoundApiModel) => {
        setRoundFormValues(roundValues);
    };
    const changeRoundUpdateFormValues = (roundValues: GetRoundApiModel) => {
        setRoundUpdateFormValues(roundValues);
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
                changeRoundValues={changeRoundFormValues}
                handleModalClose={closeFormModal}
                handleModalSubmit={addRound}
                formValues={roundFormValues}
                isWaiting={submitButtonWaiting}
                showModal={showAddRoundModal}
            />

            {/* update round */}
            {currentRound && currentRound.cid > 0 && (
                <RoundModal
                    isUpdate={true}
                    title={"Edit round"}
                    changeRoundValues={changeRoundUpdateFormValues}
                    handleModalClose={closeFormModal}
                    handleModalSubmit={updateRound}
                    formValues={roundUpdateFormValues}
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
                bnbPrice={bnbPrice}
                currentRound={currentRound}
                handleUpdateButton={setShowUpdateRoundModal}
            />

            <h4 className="mt-5 fw-bold">Rounds</h4>
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
