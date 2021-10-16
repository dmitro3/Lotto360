import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import {
    getPlayersCount,
    getTicketCount,
    ticketNumToStr,
} from "../../../utilities/string.numbers.util";
import { GetRoundApiModel, RoundStatus } from "../../../api/models/round.model";
import TimeAndTotalAmount from "../../site/shared/time.total.amount";
import { RoundApiService } from "../../../api/round.api.service";
import { flexItemsCenter } from "../../site/constants/classes";
import PrizePerMatch from "../../site/shared/prize.per.match";
import TicketsTable from "../shared/tickets.table";

interface CurrentRoundProps {
    bnbPrice: number;
    currentRound: GetRoundApiModel;
    handleUpdateButton: (bl: boolean) => void;
}

const CurrentRound: FunctionComponent<CurrentRoundProps> = ({
    bnbPrice,
    currentRound,
    handleUpdateButton,
}) => {
    const [showTicketTable, setshowTicketTable] = useState(false);
    const [drawWaiting, setDrawWaiting] = useState(false);

    if (!currentRound.cid) return <div></div>;
    const {
        bonusBnbAmount,
        bnbAddedFromLastRound,
        endTime,
        finalNumber,
        pools,
        startTime,
        status,
        tickets,
        totalBnbAmount,
        winnersInPools,
    } = currentRound;

    const totalBnb = totalBnbAmount + bonusBnbAmount + bnbAddedFromLastRound;

    const drawCurrentRound = () => {
        setDrawWaiting(true);
        RoundApiService.finishRound()
            .then((res) => {
                if (res && res.data && res.data.success) {
                    toast.success("round ended successfully");
                    setTimeout(() => {
                        window.location.reload();
                    }, 10000);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => setDrawWaiting(false));
    };

    return (
        <div>
            <div className="d-flex mb-4 mt-5 align-items-center">
                <h4 className="me-3 fw-bold">Current round</h4>
                {status === RoundStatus.Open && (
                    <>
                        <button
                            disabled={drawWaiting}
                            className="btn btn-warning ms-3"
                            onClick={() => handleUpdateButton(true)}
                        >
                            <i className="fa-duotone fa-pen-to-square fa-xl me-2"></i>
                            edit round
                        </button>
                        <button
                            disabled={drawWaiting}
                            className="btn btn-primary ms-auto"
                            onClick={() => drawCurrentRound()}
                        >
                            {drawWaiting ? (
                                <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>
                            ) : (
                                <i className="fa-duotone fa-award fa-xl me-2"></i>
                            )}
                            Draw round
                        </button>
                    </>
                )}
            </div>
            <div>
                <div className="container rounded border border-2 bg-white py-3">
                    <div className={`${flexItemsCenter} mb-3`}>
                        <span className="fs-5 fw-bold me-3">Start at: </span>
                        <div className="fs-5 me-2">
                            {moment(startTime * 1000).format("MMMM Do YYYY, h:mm a")}
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
                        totalAmount={totalBnb}
                    />

                    {finalNumber && (
                        <div className={`${flexItemsCenter} mt-5`}>
                            {ticketNumToStr(finalNumber)
                                .split("")
                                .map((str, i) => (
                                    <i
                                        key={i}
                                        className={`fa-solid fa-square-${str} fa-2x mx-1 text-success`}
                                    ></i>
                                ))}
                        </div>
                    )}

                    <PrizePerMatch
                        amount={totalBnb}
                        bnbPrice={bnbPrice}
                        percentages={pools}
                        poolWinners={winnersInPools}
                    />
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
                    <div className={`${flexItemsCenter} mb-5`}>
                        {!showTicketTable && (
                            <button
                                className="btn btn-primary mt-5"
                                onClick={() => setshowTicketTable(true)}
                            >
                                Load tickets
                            </button>
                        )}
                    </div>

                    {showTicketTable && <TicketsTable tickets={tickets} />}
                </div>
            </div>
        </div>
    );
};

export default CurrentRound;
