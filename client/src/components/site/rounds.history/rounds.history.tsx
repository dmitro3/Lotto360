/* eslint-disable eqeqeq */
import { FunctionComponent, useEffect, useState } from "react";
import { GetRoundApiModel, RoundStatus } from "../../../api/models/round.model";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { RoundApiService } from "../../../api/round.api.service";
import TimeAndTotalAmount from "../shared/time.total.amount";
import RoundNumberSelector from "./round.number.selector";
import { flexItemsCenter } from "../constants/classes";
import PrizePerMatch from "../shared/prize.per.match";
import UserTickets from "../shared/user.tickets";
import HistoryHeader from "./history.header";
import UserHistory from "./user.history";
import { toast } from "react-toastify";

interface RoundsHistoryProps {
    address: string;
    bnbPrice: number;
    currentRound: GetRoundApiModel;
}

const RoundsHistory: FunctionComponent<RoundsHistoryProps> = ({
    address,
    bnbPrice,
    currentRound,
}) => {
    const [round, setRound] = useState<GetRoundApiModel>();
    const [loading, setLoading] = useState(false);

    // set latest round
    let isLatest = false;
    let lastRoundId = 0;
    {
        const { status, cid } = currentRound;
        if (status == RoundStatus.Close) {
            isLatest = true;
            lastRoundId = cid;
        } else if (status == RoundStatus.Open) {
            isLatest = round?.cid == cid - 1;
            lastRoundId = cid - 1;
        } else {
            isLatest = false;
            lastRoundId = 0;
        }
    }

    // use effect
    useEffect(() => {
        if (lastRoundId < 1) return;
        RoundApiService.getRoundById(lastRoundId, address)
            .then((res) => {
                if (res && res.data && res.data.result) {
                    setRound(res.data.result);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("error happened try please again");
            });
    }, [address, lastRoundId]);

    // get new round
    const fetchNewRound = (id: number) => {
        if (round?.cid === id) return;
        setLoading(true);
        RoundApiService.getRoundById(id, address)
            .then((res) => {
                if (res && res.data && res.data.result) {
                    setRound(res.data.result);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("error happened try please again");
            })
            .finally(() => setLoading(false));
    };

    if (!round) return <></>;
    const {
        bnbAddedFromLastRound,
        bonusBnbAmount,
        cid,
        endTime,
        pools,
        tickets,
        totalBnbAmount,
        winnersInPools,
        finalNumber,
    } = round;
    const totalAmount = bnbAddedFromLastRound + bonusBnbAmount + totalBnbAmount;

    let userTickets: string[] = [];
    if (tickets) userTickets = tickets.map((num) => ticketNumToStr(num.number));

    return (
        <div className="bg-dark p-5 position-relative">
            <HistoryHeader lastRound={lastRoundId} />
            <UserHistory getnewRound={fetchNewRound} userAddress={address} />

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5 position-relative">
                {isLatest && (
                    <div className="text-center position-absolute left-0">
                        <span className="badge rounded-pill bg-success mb-2 fs-6">
                            latest round
                        </span>
                    </div>
                )}

                {loading ? (
                    <div className={`${flexItemsCenter} my-3`}>
                        <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>
                        <span className="fw-bold">Loading</span>
                    </div>
                ) : (
                    <RoundNumberSelector
                        fetchAnotherRound={fetchNewRound}
                        latestRound={
                            currentRound.status == RoundStatus.Open
                                ? currentRound.cid - 1
                                : currentRound.cid
                        }
                        number={cid}
                        winningNumber={finalNumber}
                    />
                )}
                <TimeAndTotalAmount
                    totalAmount={totalAmount}
                    bnbPrice={bnbPrice}
                    time={endTime}
                />
                <PrizePerMatch
                    amount={totalAmount}
                    bnbPrice={bnbPrice}
                    percentages={pools}
                    poolWinners={winnersInPools}
                />

                <div className={`${flexItemsCenter} mt-3`}>
                    <i className="fa-duotone fa-ticket me-2 fa-lg"></i>
                    <span className="fs-5 fw-bold me-2">Total tickets:</span>
                    <span className="fs-5 text-dark">{round.totalTickets}</span>
                </div>

                <div className={`${flexItemsCenter} mt-3`}>
                    <i className="fa-duotone fa-users me-2 fa-lg"></i>
                    <span className="fs-5 fw-bold me-2">Total players:</span>
                    <span className="fs-5 text-dark">{round.totalPlayers}</span>
                </div>

                <div className="dashed my-5"></div>

                <UserTickets ticketNumbers={userTickets} winningTicket={finalNumber} />
            </div>
            <div className="mb-5 border-transparent"></div>
            <div className="divider-history"></div>
        </div>
    );
};

export default RoundsHistory;
