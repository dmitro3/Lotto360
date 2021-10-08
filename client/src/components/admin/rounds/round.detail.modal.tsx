import { FunctionComponent } from "react";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { flexItemsCenter } from "../../site/constants/classes";
import PrizePerMatch from "../../site/shared/prize.per.match";
import TimeAndTotalAmount from "../../site/shared/time.total.amount";

interface RoundDetailModalProps {
    bnbPrice: number;
    handleClose: Function;
    roundInfo: GetRoundApiModel;
    showModal: boolean;
}

const RoundDetailModal: FunctionComponent<RoundDetailModalProps> = ({
    bnbPrice,
    handleClose,
    roundInfo,
    showModal,
}) => {
    return showModal ? (
        <div className="detail-modal bg-light p-3">
            <div className={`d-flex ${flexItemsCenter} mb-3`}>
                <i className="fa-solid fa-hashtag fa-xl me-2"></i>
                <span className="fs-2 fw-bold">{roundInfo.cid}</span>

                <i
                    className="fa-light fa-xmark ms-auto fa-3x pointer"
                    onClick={() => handleClose()}
                ></i>
            </div>

            <div className="container rounded shadow bg-white py-3">
                <TimeAndTotalAmount
                    bnbPrice={bnbPrice}
                    time={roundInfo.endTime}
                    totalAmount={roundInfo.totalBnbAmount}
                />
                <PrizePerMatch
                    amount={roundInfo.totalBnbAmount}
                    bnbPrice={bnbPrice}
                    percentages={roundInfo.pools}
                />

                <div className={`${flexItemsCenter}`}>
                    <div className={`${flexItemsCenter} mt-3 me-5`}>
                        <i className="fa-duotone fa-users me-2 fa-lg"></i>
                        <span className="fs-5 fw-bold me-2">Total players:</span>
                        <span className="fs-5 text-dark">4567</span>
                    </div>
                    <div className={`${flexItemsCenter} mt-3`}>
                        <i className="fa-duotone fa-ticket me-2 fa-lg"></i>
                        <span className="fs-5 fw-bold me-2">Total tickets:</span>
                        <span className="fs-5 text-dark">456700</span>
                    </div>
                </div>

                <div className={`${flexItemsCenter}`}>
                    <button className="btn btn-primary mt-5">Load tickets</button>
                </div>
            </div>
        </div>
    ) : null;
};

export default RoundDetailModal;
