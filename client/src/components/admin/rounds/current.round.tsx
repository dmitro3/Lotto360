import { FunctionComponent } from "react";
import { getPlayersCount, getTicketCount } from "../../../utilities/stringUtil";
import TimeAndTotalAmount from "../../site/shared/time.total.amount";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { flexItemsCenter } from "../../site/constants/classes";
import PrizePerMatch from "../../site/shared/prize.per.match";
import moment from "moment";

interface CurrentRoundProps {
    currentRound?: GetRoundApiModel;
    handleUpdateButton: Function;
}

const CurrentRound: FunctionComponent<CurrentRoundProps> = ({
    currentRound,
    handleUpdateButton,
}) => {
    if (!currentRound || !currentRound.cid) return <div></div>;
    const {
        endTime,
        startTime,
        totalBnbAmount,
        bonusBnbAmount,
        bnbAddedFromLastRound,
        pools,
        tickets,
    } = currentRound;

    const totalBnb = totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;

    return (
        <div>
            <div className="d-flex mb-4 align-items-center">
                <h4 className="mt-5 me-3 fw-bold">Current round</h4>
                <button
                    className="btn btn-warning mt-5 ms-3"
                    onClick={() => handleUpdateButton(true)}
                >
                    edit round
                </button>
            </div>
            <div>
                <div className="container rounded border border-2 bg-white py-3">
                    <div className={`${flexItemsCenter} mb-3`}>
                        <span className="fs-5 fw-bold me-3">Start at: </span>
                        <div className="fs-5">
                            {moment(startTime * 1000).format("MMMM Do YYYY, h:mm a")}
                        </div>
                    </div>
                    <TimeAndTotalAmount time={endTime} totalAmount={totalBnb} />
                    <PrizePerMatch amount={totalBnb} percentages={pools} />
                    <div className={`${flexItemsCenter}`}>
                        <div className={`${flexItemsCenter} mt-3 me-5`}>
                            <i className="fa-duotone fa-users me-2 fa-lg"></i>
                            <span className="fs-5 fw-bold me-2">Total players:</span>
                            <span className="fs-5 text-dark">
                                {getPlayersCount(tickets)}
                            </span>
                        </div>
                        <div className={`${flexItemsCenter} mt-3`}>
                            <i className="fa-duotone fa-ticket me-2 fa-lg"></i>
                            <span className="fs-5 fw-bold me-2">Total tickets:</span>
                            <span className="fs-5 text-dark">
                                {getTicketCount(tickets)}
                            </span>
                        </div>
                    </div>
                    <div className={`${flexItemsCenter}`}>
                        <button className="btn btn-primary mt-5">Load tickets</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentRound;
