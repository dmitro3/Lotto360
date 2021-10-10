import { FunctionComponent } from "react";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import TimeAndTotalAmount from "../shared/time.total.amount";
import BuyTicketButton from "../shared/buy.ticket.button";
import PrizePerMatch from "../shared/prize.per.match";
import UserTickets from "../shared/user.tickets";
import RoundNumber from "./round.number";
import PrizeBoxHeader from "./header";
import { LottoState } from "../../../reducer/reducer";

interface PrizePotProps {
    changeIsApproved: (val: boolean) => void;
    isApproved: boolean;
    state: LottoState;
}

const PrizePot: FunctionComponent<PrizePotProps> = ({
    changeIsApproved,
    isApproved,
    state,
}) => {
    if (!state.currentRound) return <></>;

    const { bnbPrice, currentRound } = state;
    const {
        cid,
        endTime,
        bnbAddedFromLastRound,
        bonusBnbAmount,
        totalBnbAmount,
        pools,
        tickets,
    } = currentRound;
    const totalPrice = bnbAddedFromLastRound + bonusBnbAmount + totalBnbAmount;

    let userTickets: string[] = [];
    if (tickets) userTickets = tickets.map((num) => ticketNumToStr(num.number));

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
                    <i className="fa-duotone fa-chevrons-down fa-xl fa-flash text-success mb-4"></i>
                    <BuyTicketButton
                        changeIsApproved={changeIsApproved}
                        isApproved={isApproved}
                        state={state}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrizePot;
