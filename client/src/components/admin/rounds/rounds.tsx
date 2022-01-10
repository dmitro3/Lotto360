import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";

import { GetRoundApiModel } from "../../../api/models/round.model";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import { RoundApiService } from "../../../api/round.api.service";
import { flexItemsCenter } from "../../constants/classes";
import { initialRound } from "./reducer/round.list.reducer";
import RoundDetailModal from "./round.detail.modal";
import AddRoundButton from "./button.add.round";
import CurrentRound from "./current.round";
import RoundModal from "./round.modal";
import History from "./history";
import { HashLoader } from "react-spinners";

interface RoundsProps {
    bnbPrice: number;
}

const Rounds: FunctionComponent<RoundsProps> = ({ bnbPrice }) => {
    const [updateFormValues, setUpdateFormValues] = useState(initialRound);
    const [currentRound, setCurrentRound] = useState<GetRoundApiModel>();
    const [addFormValues, setAddFormValues] = useState(initialRound);
    const [loadingCurrentRound, setLoadingCurrentRound] = useState(false);
    const [submitButtonWaiting, setSubmitButtonWaiting] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [roundId, setRoundId] = useState(0);

    useEffect(() => {
        setLoadingCurrentRound(true);
        RoundApiService.getCurrentRound()
            .then((res) => {
                if (res && res.data && res.data.result) {
                    setCurrentRound(res.data.result);
                    setUpdateFormValues(cloneDeep(res.data.result));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoadingCurrentRound(false));
    }, []);

    const closeFormModal = () => {
        setShowAddModal(false);
        setShowUpdateModal(false);
    };

    const addRound = async (state: GetRoundApiModel) => {
        setSubmitButtonWaiting(true);
        RoundApiService.addRound(state)
            .then((result) => {
                if (result) {
                    RoundApiService.getCurrentRound()
                        .then((res) => {
                            if (res.data.result) setCurrentRound(res.data.result);
                            closeFormModal();
                            toast.success(
                                CustomToastWithLink(
                                    result.data.messages![0].message,
                                    "round added"
                                )
                            );
                        })
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setSubmitButtonWaiting(false);
                closeFormModal();
            });
    };

    const updateRound = async (state: GetRoundApiModel) => {
        setSubmitButtonWaiting(true);
        RoundApiService.updateRound(state)
            .then((result) => {
                if (result) {
                    RoundApiService.getCurrentRound()
                        .then((res) => {
                            if (res.data.result) setCurrentRound(res.data.result);
                            toast.success(
                                CustomToastWithLink(
                                    result.data.messages![0].message,
                                    "round updated"
                                )
                            );
                        })
                        .catch((err) => console.error(err));
                }
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setSubmitButtonWaiting(false);
                closeFormModal();
            });
    };

    return (
        <>
            <AddRoundButton setShowModalAddRound={setShowAddModal} />
            <hr />

            {showDetail && (
                <RoundDetailModal
                    roundId={roundId}
                    bnbPrice={bnbPrice}
                    showModal={showDetail}
                    setShowModal={setShowDetail}
                />
            )}

            {loadingCurrentRound && (
                <div className={flexItemsCenter}>
                    <HashLoader />
                </div>
            )}

            {currentRound && (
                <CurrentRound
                    bnbPrice={bnbPrice}
                    currentRound={currentRound}
                    handleUpdateButton={setShowUpdateModal}
                />
            )}

            <h4 className="mt-5 fw-bold">Rounds</h4>

            <History setRoundId={setRoundId} setShowModal={setShowDetail} />

            {/* add round */}
            <RoundModal
                title={"Add round"}
                changeRoundValues={setAddFormValues}
                handleModalClose={closeFormModal}
                handleModalSubmit={addRound}
                formValues={addFormValues}
                isWaiting={submitButtonWaiting}
                showModal={showAddModal}
            />

            {/* update round */}
            {currentRound && currentRound.cid > 0 && (
                <RoundModal
                    isUpdate={true}
                    title={"Edit round"}
                    changeRoundValues={setUpdateFormValues}
                    handleModalClose={closeFormModal}
                    handleModalSubmit={updateRound}
                    formValues={updateFormValues}
                    isWaiting={submitButtonWaiting}
                    showModal={showUpdateModal}
                />
            )}
        </>
    );
};

export default Rounds;
