import { FunctionComponent } from "react";
import { getPlayersCount, getTicketCount } from "../../../utilities/stringUtil";
import TimeAndTotalAmount from "../../site/shared/time.total.amount";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { flexItemsCenter } from "../../site/constants/classes";
import PrizePerMatch from "../../site/shared/prize.per.match";

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
        totalBnbAmount,
        bonusBnbAmount,
        bnbAddedFromLastRound,
        pools,
        tickets,
    } = currentRound;

    const totalBnb = totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;

    return (
        <div>
            <h4 className="mt-5">Current round</h4>
            <div>
                <div className="container rounded border border-2 bg-white py-3">
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
                        <button
                            className="btn btn-warning mt-5 ms-3"
                            onClick={() => handleUpdateButton()}
                        >
                            edit round
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentRound;
