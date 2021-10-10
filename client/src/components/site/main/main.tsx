import { FunctionComponent } from "react";
import { LottoState } from "../../../reducer/reducer";
import { currencyFormat } from "../../../utilities/string.numbers.util";
import BuyTicketButton from "../shared/buy.ticket.button";

interface MainProps {
    changeIsApproved: (val: boolean) => void;
    currentPrizeAmount?: number;
    isApproved: boolean;
    state: LottoState;
}

const Main: FunctionComponent<MainProps> = ({
    changeIsApproved,
    currentPrizeAmount,
    isApproved,
    state,
}) => {
    return (
        <>
            <div
                className={`p-4 pb-5 bg4 d-flex position-relative flex-wrap justify-content-around align-items-center`}
            >
                <div className="main-side-pic divider1"></div>
                <div className="max-content">
                    <h1 className="d-flex justify-content-center align-items-center mt-3 megering">
                        <b className="me-3 logo-main">LOTTO</b>
                        <i className="fa-solid fa-360-degrees fa-xl"></i>
                    </h1>
                    <div
                        className="my-3 max-content px-3 py-1 d-flex flex-column
                    justify-content-center align-items-center mx-auto rounded text-black"
                    >
                        <div>
                            <span className="fs-2 fw-bold">Prize:</span>
                            <span className="ms-2 fs-2 fw-bold">
                                {calcPrize(currentPrizeAmount)}
                            </span>
                        </div>
                        <div className="pb-2 d-flex justify-content-center align-items-center mt-3">
                            <span className="fs-3 fw-bold">
                                {calcPrizeinUsd(currentPrizeAmount, state.bnbPrice)}
                            </span>
                        </div>
                    </div>
                    <div
                        className="max-content px-3 py-1 d-flex mb-5
                    justify-content-center align-items-center mx-auto rounded text-black"
                    >
                        <i className="fa-duotone fa-chevrons-right fa-xl fa-flash text-success"></i>
                        <BuyTicketButton
                            changeIsApproved={changeIsApproved}
                            isApproved={isApproved}
                            state={state}
                        />
                        <i className="fa-duotone fa-chevrons-left fa-xl fa-flash text-success"></i>
                    </div>
                </div>
                <div className="main-side-pic divider2"></div>

                <div className="divider-blue"></div>
            </div>
        </>
    );
};

export default Main;

// ........................................................................................
const calcPrizeinUsd = (
    currentPrizeAmount: number | undefined,
    bnbPriceInUSD: number | undefined
) => {
    return currentPrizeAmount && bnbPriceInUSD
        ? currencyFormat(currentPrizeAmount * bnbPriceInUSD, "$")
        : "$ 0";
};

// ........................................................................................
const calcPrize = (currentPrizeAmount: number | undefined) => {
    return currentPrizeAmount ? currencyFormat(currentPrizeAmount, "BNB") : "0 BNB";
};
