import AddedBnb from "./added.bnb";
import moment from "moment";
import PoolTables from "./pool.tables";
import PrizePerMatch from "../../lotto360/shared/prize.per.match";
import TicketsTable from "../shared/tickets.table";
import TimeAndTotalAmount from "../../lotto360/shared/time.total.amount";
import { flexItemsCenter } from "../../constants/classes";
import { FunctionComponent, useEffect, useState } from "react";
import { GetRoundApiModel, RoundStatus } from "../../../api/models/round.model";
import { HashLoader } from "react-spinners";
import { initialRound } from "./reducer/round.list.reducer";
import { RoundApiService } from "../../../api/round.api.service";
import { toast } from "react-toastify";
import {
    getPlayersCount,
    getTicketCount,
    ticketNumToStr,
} from "../../../utilities/string.numbers.util";

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
                {cid && (
                    <div>
                        <div className="container bg-white py-3">
                            {renderHeader(startTime, status)}

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
                )}
                {!cid && (
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

function renderHeader(startTime: number, status: RoundStatus) {
    return (
        <div className={`${flexItemsCenter} mb-3`}>
            <span className="fs-5 fw-bold me-3">Start at: </span>
            <div className="fs-5 me-2">
                {moment(startTime * 1000).format("MMMM Do YYYY, h:mm a")}
            </div>
            {status === RoundStatus.Open && (
                <span className="badge rounded-pill bg-primary fs-6">Open</span>
            )}
            {status === RoundStatus.Close && (
                <span className="badge rounded-pill bg-secondary">closed</span>
            )}
        </div>
    );
}
