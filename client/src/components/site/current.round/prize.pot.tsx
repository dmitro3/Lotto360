import { FunctionComponent } from "react";
import { GetRoundApiModel } from "../../../api/models/round.model";
import TimeAndTotalAmount from "../shared/time.total.amount";
import PrizePerMatch from "../shared/prize.per.match";
import UserTickets from "../shared/user.tickets";
import RoundNumber from "./round.number";
import PrizeBoxHeader from "./header";
import { ticketNumToStr } from "../../../utilities/stringUtil";

interface PrizePotProps {
    currentRound: GetRoundApiModel;
    bnbPrice: number;
}

const PrizePot: FunctionComponent<PrizePotProps> = ({ bnbPrice, currentRound }) => {
    const { cid, endTime, bnbAddedFromLastRound, bonusBnbAmount, totalBnbAmount, pools } =
        currentRound;
    const totalPrice = bnbAddedFromLastRound + bonusBnbAmount + totalBnbAmount;

    let userTickets: string[] = [];
    if (currentRound.tickets) {
        userTickets = currentRound.tickets.map((num) => ticketNumToStr(num.number));
    }

    return (
        <div className="prizepot p-5 position-relative">
            <PrizeBoxHeader endTime={endTime} />

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                <TimeAndTotalAmount
                    time={endTime}
                    bnbPrice={bnbPrice}
                    totalAmount={totalPrice}
                />
                <RoundNumber number={cid} />
                <PrizePerMatch
                    amount={totalPrice}
                    bnbPrice={bnbPrice}
                    percentages={pools}
                />

                <div className="dashed my-5"></div>
                <UserTickets ticketNumbers={userTickets} />

                <div
                    className="max-content px-3 py-1 d-flex flex-column mb-3 mt-5
                justify-content-center align-items-center mx-auto rounded text-black"
                >
                    <i className="fa-duotone fa-chevrons-down fa-xl fa-flash text-success"></i>
                    <button type="button" className="btn btn-lg btn-success mx-3 mt-4">
                        <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                        Buy Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrizePot;
