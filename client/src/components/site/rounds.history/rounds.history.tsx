import { FunctionComponent } from "react";
import { flexItemsCenter } from "../constants/classes";
import PrizePerMatch from "../shared/prize.per.match";
import TimeAndTotalAmount from "../shared/time.total.amount";
import UserTickets from "../shared/user.tickets";
import HistoryHeader from "./history.header";
import RoundNumberSelector from "./round.number.selector";
import UserHistory from "./user.history";

interface RoundsHistoryProps {
    bnbPrice: number;
    historyAmount: number;
}

const fakeNumberArray = ["456787", "889356", "342267", "009988", "567894"];

const RoundsHistory: FunctionComponent<RoundsHistoryProps> = ({
    bnbPrice,
    historyAmount,
}) => {
    return (
        <div className="bg-dark p-5 position-relative">
            <HistoryHeader lastRound={1087} />
            <UserHistory />

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                <div className="text-center">
                    <span className="badge rounded-pill bg-success mb-2 fs-6">
                        latest round
                    </span>
                </div>

                <RoundNumberSelector number={900} />
                <TimeAndTotalAmount
                    totalAmount={800}
                    bnbPrice={bnbPrice}
                    time={566666666}
                />
                <PrizePerMatch
                    amount={historyAmount}
                    bnbPrice={bnbPrice}
                    percentages={[]}
                />

                <div className={`${flexItemsCenter} mt-3`}>
                    <i className="fa-duotone fa-users me-2 fa-lg"></i>
                    <span className="fs-5 fw-bold me-2">Total players:</span>
                    <span className="fs-5 text-dark">4567</span>
                </div>

                <div className="dashed my-5"></div>

                <UserTickets ticketNumbers={fakeNumberArray} />
            </div>
            <div className="mb-5 border-transparent"></div>
            <div className="divider-history"></div>
        </div>
    );
};

export default RoundsHistory;
