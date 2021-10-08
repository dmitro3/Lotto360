import { FunctionComponent } from "react";
import { currencyFormat } from "../../../utilities/stringUtil";

interface MainProps {
    currentPrizeAmount?: number;
    bnbPriceInUSD?: number;
}

const Main: FunctionComponent<MainProps> = ({ currentPrizeAmount, bnbPriceInUSD }) => {
    return (
        <>
            <div
                className={`p-4 pb-5 bg4 position-relative d-flex flex-wrap justify-content-around align-items-center`}
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
                                {currentPrizeAmount
                                    ? currencyFormat(currentPrizeAmount, "BNB")
                                    : "0 BNB"}
                            </span>
                        </div>
                        <div className="pb-2 d-flex justify-content-center align-items-center mt-3">
                            <span className="fs-3 fw-bold">
                                {currentPrizeAmount && bnbPriceInUSD
                                    ? currencyFormat(
                                          currentPrizeAmount * bnbPriceInUSD,
                                          "$"
                                      )
                                    : "$ 0"}
                            </span>
                        </div>
                    </div>
                    <div
                        className="max-content px-3 py-1 d-flex mb-5
                    justify-content-center align-items-center mx-auto rounded text-black"
                    >
                        <i className="fa-duotone fa-chevrons-right fa-xl fa-flash text-success"></i>
                        <button type="button" className="btn btn-lg btn-success mx-3">
                            <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                            Buy Ticket
                        </button>
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
