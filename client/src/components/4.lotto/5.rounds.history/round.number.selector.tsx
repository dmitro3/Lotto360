import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";
import { ticketNumToStr } from "../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../../constants/classes";

interface RoundNumberSelectorProps {
    fetchAnotherRound: (num: number) => void;
    latestRound: number;
    number: number;
    winningNumber: number;
}

const getWinningNumberClass = (number: string) =>
    `fa-solid fa-circle-${number} text-success fa-3x me-1 shadow rounded-100`;

const RoundNumberSelector: FunctionComponent<RoundNumberSelectorProps> = ({
    fetchAnotherRound,
    latestRound,
    number,
    winningNumber,
}) => {
    const [showHiddenInput, setShowHiddenInput] = useState(false);
    const [roundNumber, setRoundNumber] = useState(0);

    const nextPage = number + 1 <= latestRound && number + 1;
    const previousPage = number - 1 > 0 && number - 1;

    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-1 px-5 pb-3">
                {previousPage && previousPage > 1 && (
                    <i
                        className="fa-solid fa-angles-left me-2 pointer p-1 px-2 hover-icon rounded"
                        onClick={() => fetchAnotherRound(1)}
                    ></i>
                )}
                {previousPage && (
                    <i
                        className="fa-solid fa-angle-left me-2 pointer p-1 px-2 hover-icon rounded"
                        onClick={() => fetchAnotherRound(previousPage)}
                    ></i>
                )}
                <div
                    className={`${flexItemsCenter} badge bg-secondary me-2 pointer`}
                    onClick={() => setShowHiddenInput(!showHiddenInput)}
                >
                    <i className="fa-solid fa-hashtag me-2 fa-lg"></i>
                    <span className="fs-5">{number}</span>
                </div>
                {nextPage && (
                    <i
                        className="fa-solid fa-angle-right me-2 pointer p-1 px-2 hover-icon rounded"
                        onClick={() => fetchAnotherRound(nextPage)}
                    ></i>
                )}
                {nextPage && nextPage < latestRound && (
                    <i
                        className="fa-solid fa-angles-right pointer p-1 px-2 hover-icon rounded"
                        onClick={() => fetchAnotherRound(latestRound)}
                    ></i>
                )}
            </div>

            {showHiddenInput && (
                <div className={flexItemsCenter}>
                    <div className="input-group mb-3 min-width">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="number"
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value) setRoundNumber(value);
                            }}
                        />
                        <button
                            className="btn btn-primary ms-1"
                            type="button"
                            id="button-addon2"
                            onClick={() => {
                                if (roundNumber > 0 && roundNumber <= latestRound)
                                    fetchAnotherRound(roundNumber);
                                else toast.error("invalid number");
                            }}
                        >
                            go
                        </button>
                    </div>
                </div>
            )}

            <div className="history-divide mb-3"></div>

            <div className={flexItemsCenter}>
                {/* <span className="fs-5 fw-bold me-2">Winning numbers:</span> */}
                {ticketNumToStr(winningNumber)
                    .split("")
                    .map((str, i) => (
                        <i key={i} className={getWinningNumberClass(str)}></i>
                    ))}
            </div>
        </>
    );
};

export default RoundNumberSelector;
