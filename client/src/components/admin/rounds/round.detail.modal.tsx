import { FunctionComponent, useEffect, useState } from "react";
import moment from "moment";

import TimeAndTotalAmount from "../../site/shared/time.total.amount";
import { GetRoundApiModel, RoundStatus } from "../../../api/models/round.model";
import { flexItemsCenter } from "../../site/constants/classes";
import PrizePerMatch from "../../site/shared/prize.per.match";
import { RoundApiService } from "../../../api/round.api.service";
import {
    getPlayersCount,
    getTicketCount,
    ticketNumToStr,
} from "../../../utilities/string.numbers.util";
import TicketsTable from "../shared/tickets.table";
import { initialRound } from "./reducer/round.list.reducer";
import { toast } from "react-toastify";
import PoolTables from "./pool.tables";
import AddedBnb from "./added.bnb";
import { HashLoader } from "react-spinners";

interface RoundDetailModalProps {
    bnbPrice: number;
    roundId: number;
    showModal: boolean;
    setShowModal: (val: boolean) => void;
}

const RoundDetailModal: FunctionComponent<RoundDetailModalProps> = ({
    bnbPrice,
    roundId,
    showModal,
    setShowModal,
}) => {
    const [roundInfo, setRoundInfo] = useState<GetRoundApiModel>(initialRound);
    const [showTicketTable, setshowTicketTable] = useState(false);

    useEffect(() => {
        console.info("here is me");
        if (!roundId) return;
        RoundApiService.getRoundByIdAdminFromDb(roundId)
            .then((result) => {
                if (result && result.data && result.data.result)
                    setRoundInfo(result.data.result);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error getting round detail");
                setRoundInfo(initialRound);
                setShowModal(false);
                setshowTicketTable(false);
            });
    }, [roundId, setShowModal]);

    const {
        bnbAddedFromLastRound,
        bonusBnbAmount,
        cid,
        endTime,
        finalNumber,
        pools,
        startTime,
        status,
        tickets,
        totalBnbAmount,
        winnersInPools,
    } = roundInfo;

    const totalAmount = totalBnbAmount + bnbAddedFromLastRound + bonusBnbAmount;

    return showModal && roundId ? (
        <div className="detail-modal bg-light p-3">
            <div className={`d-flex ${flexItemsCenter} mb-3`}>
                <i className="fa-solid fa-hashtag fa-xl me-2"></i>
                <span className="fs-2 fw-bold">{cid}</span>

                <i
                    className="fa-light fa-xmark ms-auto fa-3x pointer"
                    onClick={() => {
                        setRoundInfo(initialRound);
                        setshowTicketTable(false);
                        setShowModal(false);
                    }}
                ></i>
            </div>

            <div className="container rounded shadow bg-white py-3">
                {cid ? (
                    <div>
                        <div className="container bg-white py-3">
                            <div className={`${flexItemsCenter} mb-3`}>
                                <span className="fs-5 fw-bold me-3">Start at: </span>
                                <div className="fs-5 me-2">
                                    {moment(startTime * 1000).format(
                                        "MMMM Do YYYY, h:mm a"
                                    )}
                                </div>
                                {status === RoundStatus.Open ? (
                                    <span className="badge rounded-pill bg-primary fs-6">
                                        Open
                                    </span>
                                ) : (
                                    <span className="badge rounded-pill bg-secondary">
                                        closed
                                    </span>
                                )}
                            </div>

                            <TimeAndTotalAmount
                                time={endTime}
                                bnbPrice={bnbPrice}
                                totalAmount={totalAmount}
                            />

                            {finalNumber && (
                                <div className={`${flexItemsCenter} mt-5`}>
                                    {ticketNumToStr(finalNumber)
                                        .split("")
                                        .map((str, i) => (
                                            <i
                                                key={i}
                                                className={`fa-solid fa-circle-${str} fa-2x mx-1 text-success`}
                                            ></i>
                                        ))}
                                </div>
                            )}

                            <PrizePerMatch
                                amount={totalAmount}
                                bnbPrice={bnbPrice}
                                percentages={pools}
                                poolWinners={winnersInPools}
                            />
                            <div className={`${flexItemsCenter}`}>
                                <div className={`${flexItemsCenter} mt-3 me-5`}>
                                    <i className="fa-duotone fa-users me-2 fa-lg"></i>
                                    <span className="fs-5 fw-bold me-2">
                                        Total players:
                                    </span>
                                    <span className="fs-5 text-dark">
                                        {getPlayersCount(tickets)}
                                    </span>
                                </div>
                                <div className={`${flexItemsCenter} mt-3`}>
                                    <i className="fa-duotone fa-ticket me-2 fa-lg"></i>
                                    <span className="fs-5 fw-bold me-2">
                                        Total tickets:
                                    </span>
                                    <span className="fs-5 text-dark">
                                        {getTicketCount(tickets)}
                                    </span>
                                </div>
                            </div>

                            <AddedBnb
                                bnbAddedFromLastRound={bnbAddedFromLastRound}
                                bonusBnbAmount={bonusBnbAmount}
                            />

                            {winnersInPools && (
                                <PoolTables winnersInPools={winnersInPools} />
                            )}

                            <div className={`${flexItemsCenter} mb-5`}>
                                {!showTicketTable && (
                                    <button
                                        className="btn btn-primary mt-5"
                                        onClick={() => setshowTicketTable(true)}
                                    >
                                        Load all tickets
                                    </button>
                                )}
                            </div>

                            {showTicketTable && <TicketsTable tickets={tickets} />}
                        </div>
                    </div>
                ) : (
                    <div className={flexItemsCenter}>
                        <HashLoader />
                    </div>
                )}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default RoundDetailModal;
