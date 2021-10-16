/* eslint-disable eqeqeq */
import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions, LottoState } from "../../../reducer/reducer";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { RoundStatus } from "../../../api/models/round.model";
import TimeAndTotalAmount from "../shared/time.total.amount";
import BuyTicketButton from "../shared/buy.ticket.button";
import PrizePerMatch from "../shared/prize.per.match";
import UserTickets from "../shared/user.tickets";
import RoundNumber from "./round.number";
import PrizeBoxHeader from "./header";

interface PrizePotProps {
    changeArrovedLoading: (val1: boolean, val2: boolean) => void;
    dispatch: Dispatch<ActionModel<LottoActions>>;
    isApproved: boolean;
    isLoading: boolean;
    state: LottoState;
}

const PrizePot: FunctionComponent<PrizePotProps> = ({
    changeArrovedLoading,
    dispatch,
    isApproved,
    isLoading,
    state,
}) => {
    if (!state.currentRound || state.currentRound.status != RoundStatus.Open)
        return <></>;

    const { bnbPrice, currentRound } = state;
    const {
        cid,
        endTime,
        bnbAddedFromLastRound,
        bonusBnbAmount,
        totalBnbAmount,
        pools,
        tickets,
        winnersInPools,
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
                    poolWinners={winnersInPools}
                />

                <div className="dashed my-5"></div>
                <UserTickets ticketNumbers={userTickets} />

                <div
                    className="max-content px-3 py-1 d-flex flex-column mb-3 mt-5
                justify-content-center align-items-center mx-auto rounded text-black"
                >
                    <i className="fa-duotone fa-chevrons-down fa-xl fa-flash text-success mb-4"></i>
                    <BuyTicketButton
                        changeArrovedLoading={changeArrovedLoading}
                        dispatch={dispatch}
                        isApproved={isApproved}
                        isLoading={isLoading}
                        state={state}
                    />
                </div>
            </div>
        </div>
    );
};

export default PrizePot;
