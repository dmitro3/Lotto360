import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import { RoundApiService } from "../../../api/round.api.service";
import { flexItemsCenter } from "../../site/constants/classes";
import { initialRound } from "./reducer/round.list.reducer";
import AddRoundButton from "./button.add.round";
import CurrentRound from "./current.round";
import RoundModal from "./round.modal";
import History from "./history";

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
    const [loadingCurrentRound, setLoadingCurrentRound] = useState(false);

    useEffect(() => {
        setLoadingCurrentRound(true);
        RoundApiService.getCurrentRound()
            .then((res) => {
                if (res && res.data && res.data.result) {
                    setCurrentRound(res.data.result);
                    setRoundUpdateFormValues(cloneDeep(res.data.result));
                }
            })
            .finally(() => setLoadingCurrentRound(false));
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
            if (res.data.result) setCurrentRound(res.data.result);

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
            if (res.data.result) setCurrentRound(res.data.result);
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
            <hr />

            {/* <RoundDetailModal
                roundInfo={roundDetail}
                showModal={showDetail}
                handleClose={handleCloseDetailModal}
            /> */}

            {loadingCurrentRound && (
                <div className={flexItemsCenter}>
                    <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>
                    Loading current round
                </div>
            )}

            {currentRound && (
                <CurrentRound
                    bnbPrice={bnbPrice}
                    currentRound={currentRound}
                    handleUpdateButton={(value) => setShowUpdateRoundModal(value)}
                />
            )}

            <h4 className="mt-5 fw-bold">Rounds</h4>

            <History />

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
        </>
    );
};

export default Rounds;
