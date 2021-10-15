import { FunctionComponent, useEffect, useState } from "react";
import { getPlayersCount, ticketNumToStr } from "../../../utilities/string.numbers.util";
import { GetRoundApiModel } from "../../../api/models/round.model";
import { ChainMethods } from "../../../provider/chain.methods";
import TimeAndTotalAmount from "../shared/time.total.amount";
import RoundNumberSelector from "./round.number.selector";
import { flexItemsCenter } from "../constants/classes";
import { LottoState } from "../../../reducer/reducer";
import PrizePerMatch from "../shared/prize.per.match";
import UserTickets from "../shared/user.tickets";
import HistoryHeader from "./history.header";
import UserHistory from "./user.history";

interface RoundsHistoryProps {
    state: LottoState;
}

const RoundsHistory: FunctionComponent<RoundsHistoryProps> = ({ state }) => {
    const [passedRound, setHistoryRound] = useState<GetRoundApiModel>();

    const currentRoundId = state.currentRound.cid;
    useEffect(() => {
        if (!state.address || !state.web3 || currentRoundId == 0) return;
        if (currentRoundId == 1) return;
        else {
            // todo take it from backend
            ChainMethods.getRoundByIdForUser(
                state.address,
                currentRoundId - 1,
                state.web3
            ).then((res) => {
                if (res) setHistoryRound(res);
            });
        }
    }, [currentRoundId, state.address, state.currentRound, state.web3]);

    if (!passedRound) return <></>;

    const {
        bnbAddedFromLastRound,
        bonusBnbAmount,
        cid,
        endTime,
        finalNumber,
        pools,
        tickets,
        totalBnbAmount,
        status,
    } = passedRound;
    const totalAmount = bnbAddedFromLastRound + bonusBnbAmount + totalBnbAmount;

    let userTickets: string[] = [];
    if (tickets) userTickets = tickets.map((num) => ticketNumToStr(num.number));

    return (
        <div className="bg-dark p-5 position-relative">
            <HistoryHeader lastRound={cid} />
            <UserHistory />

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                {currentRoundId > cid && (
                    <div className="text-center">
                        <span className="badge rounded-pill bg-success mb-2 fs-6">
                            latest round
                        </span>
                    </div>
                )}

                <RoundNumberSelector number={cid} />
                <TimeAndTotalAmount
                    totalAmount={totalAmount}
                    bnbPrice={state.bnbPrice}
                    time={endTime}
                />
                <PrizePerMatch
                    amount={totalAmount}
                    bnbPrice={state.bnbPrice}
                    percentages={pools}
                    finalNumber={finalNumber}
                    tickets={tickets}
                    status={status}
                />

                <div className={`${flexItemsCenter} mt-3`}>
                    <i className="fa-duotone fa-ticket me-2 fa-lg"></i>
                    <span className="fs-5 fw-bold me-2">Total tickets:</span>
                    <span className="fs-5 text-dark">
                        {passedRound.firstTicketIdNextRound - passedRound.firstTicketId}
                    </span>
                </div>

                <div className="dashed my-5"></div>

                <UserTickets ticketNumbers={userTickets} />
            </div>
            <div className="mb-5 border-transparent"></div>
            <div className="divider-history"></div>
        </div>
    );
};

export default RoundsHistory;
