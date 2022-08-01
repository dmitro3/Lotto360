/* eslint-disable eqeqeq */
import { Dispatch, FunctionComponent } from "react";

import { RoundStatus } from "../../../api/models/round.model";
import logo from "../../../contents/images/main-logo.png";
import { ActionModel, LottoActions, LottoState } from "../../../reducer/reducer";
import { currencyFormat } from "../../../utilities/string.numbers.util";
import BuyTicketButton from "../shared/buy.ticket.button";

interface MainProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    currentPrizeAmount?: number;
    state: LottoState;
}

const Main: FunctionComponent<MainProps> = ({ dispatch, currentPrizeAmount, state }) => {
    return (
        <>
            <div
                className={`main-box p-4 pb-5 bg6 d-flex position-relative flex-wrap justify-content-around align-items-center`}
            >
                <div className="main-side-pic divider1"></div>
                <div className="max-content">
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <img src={logo} alt="logo" className="logo-circle" />
                    </div>
                    {state.currentRound.status == RoundStatus.Open ? (
                        <div
                            className="my-3 mt-4 max-content px-3 py-1 d-flex flex-column
                    justify-content-center align-items-center mx-auto rounded text-black"
                        >
                            <div>
                                <span className="fs-2 fw-bold">Prize:</span>
                                <span className="ms-2 fs-2 fw-bold">{calcPrize(currentPrizeAmount)}</span>
                            </div>
                            <div className="pb-2 d-flex justify-content-center align-items-center">
                                <span className="fs-3 fw-bold">
                                    {calcPrizeinUsd(currentPrizeAmount, state.bnbPrice)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="my-3 max-content px-3 py-1 d-flex flex-column
                justify-content-center align-items-center mx-auto rounded text-black"
                        >
                            <span className="fs-5 fw-bold text-dark">
                                No active round. Wait for the new round to begin.
                            </span>
                        </div>
                    )}
                    {state.currentRound.cid > 0 && state.currentRound.status == RoundStatus.Open && (
                        <div
                            className="max-content px-3 py-1 d-flex mb-5
                    justify-content-center align-items-center mx-auto rounded text-black"
                        >
                            <BuyTicketButton dispatch={dispatch} state={state} />
                        </div>
                    )}
                </div>
                <div className="main-side-pic divider2"></div>

                {state.currentRound.status == RoundStatus.Open && <div className="divider-blue"></div>}
            </div>
        </>
    );
};

export default Main;

// ........................................................................................
const calcPrizeinUsd = (currentPrizeAmount: number | undefined, bnbPriceInUSD: number | undefined) => {
    return currentPrizeAmount && bnbPriceInUSD ? currencyFormat(currentPrizeAmount * bnbPriceInUSD, "$") : "$ 0";
};

// ........................................................................................
const calcPrize = (currentPrizeAmount: number | undefined) => {
    return currentPrizeAmount
        ? currentPrizeAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " BNB"
        : "0 BNB";
};
