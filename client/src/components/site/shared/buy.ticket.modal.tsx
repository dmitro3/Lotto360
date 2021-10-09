import { FunctionComponent, useState } from "react";
import { maxTicketsEachBuy } from "../../../config/config";
import { get6DigitsRandomString } from "../../../utilities/string.numbers.util";

interface BuyTicketModalProps {
    ticketPrice: number;
}

interface TicketState {
    ticketCount: string;
    ticketNumbers: string[];
}

const initState: TicketState = {
    ticketCount: "0",
    ticketNumbers: [],
};

const BuyTicketModal: FunctionComponent<BuyTicketModalProps> = ({ ticketPrice }) => {
    const [ticketState, setTicketState] = useState(initState);
    const { ticketCount, ticketNumbers } = ticketState;

    if (ticketCount && parseInt(ticketCount) !== ticketNumbers.length) {
        setTicketState(generateEmptyInputs(ticketState));
    }

    return (
        <div className="modal-bg d-flex justify-content-center">
            <div className="inner-modal mt-4 bg-light rounded overflow-hidden">
                <div className="header text-light d-flex align-items-center justify-content-between px-4 py-3 bg-dark">
                    <h5 className="fw-bold fs-5 mb-0">Buy ticket</h5>
                    <i className="fa-solid fa-multiply fa-xl p-2 pointer"></i>
                </div>
                <div className="p-3">
                    <div className="d-flex align-items-center mt-2">
                        <i className="fa-duotone fa-ticket fa-xl p-2 pointer"></i>
                        <h5 className="fw-bold fs-6 mb-0">
                            Enter ticket amount{" "}
                            <span className="text-dark">(max 50)</span>
                        </h5>
                    </div>
                    <div className="input-group mt-3 mb-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="0"
                            aria-label="enter number"
                            min="1"
                            max={maxTicketsEachBuy}
                            value={ticketCount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (ticketCountIsValid(value))
                                    setTicketState({
                                        ...ticketState,
                                        ticketCount: `${parseInt(value)}`,
                                    });
                                else
                                    setTicketState({
                                        ...ticketState,
                                        ticketCount: "",
                                    });
                            }}
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <span className="text-dark fs-6">Ticket: {ticketPrice}</span>
                        <span className="text-dark fs-6">Your balance: 0.025 BNB</span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold fs-6 mb-0">Total pay</h5>
                        <h5 className="fw-bold text-dark fs-6 mb-0">
                            {ticketCount ? ticketPrice * parseInt(ticketCount) : "0"} BNB
                        </h5>
                    </div>

                    {ticketNumbers.length > 0 ? (
                        <div className="my-3 px-3 py-2 border border-primary border-1 rounded ticket-numbers">
                            {ticketNumbers.map((num, i) => (
                                <div key={i} className="input-group my-2">
                                    <span className="input-group-text" id="basic-addon1">
                                        # {i + 1}
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control letter-space"
                                        placeholder="0"
                                        aria-label="enter number"
                                        min="1"
                                        max={maxTicketsEachBuy}
                                        value={num}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (ticketNumberIsValid(value)) {
                                                setTicketState({
                                                    ...changeInputNumber(
                                                        value,
                                                        i,
                                                        ticketState
                                                    ),
                                                });
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="my-3"></div>
                    )}

                    <button
                        type="button"
                        className="btn btn-info width-available mb-3"
                        onClick={() =>
                            setTicketState(generateRandomForInputs(ticketState))
                        }
                    >
                        generate random numbers
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary width-available"
                        onClick={() => console.info(ticketState.ticketNumbers)}
                    >
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyTicketModal;

// ..........................................................................................
const ticketCountIsValid = (value: string) => {
    try {
        const number = parseInt(value);
        if (number > 0 && number < 51) return true;
        return false;
    } catch {
        return false;
    }
};

// ..........................................................................................
const ticketNumberIsValid = (value: string) => {
    try {
        if (value === "") return true;
        if (value.length > 6) return false;
        const number = parseInt(value);
        if (number >= 0 && number < 1000000) return true;
        return false;
    } catch {
        return false;
    }
};

// ..........................................................................................
const generateRandomForInputs = ({ ticketCount, ticketNumbers }: TicketState) => {
    const count = parseInt(ticketCount);
    if (count) {
        const strArr: string[] = [];
        for (let i = 0; i < count; i++) strArr.push(get6DigitsRandomString());
        ticketNumbers = strArr;
        return { ticketCount, ticketNumbers };
    } else return { ticketCount, ticketNumbers };
};

// ..........................................................................................
const generateEmptyInputs = ({ ticketCount, ticketNumbers }: TicketState) => {
    const count = parseInt(ticketCount);
    if (count) {
        const strArr: string[] = [];
        for (let i = 0; i < count; i++) strArr.push("");
        ticketNumbers = strArr;
        return { ticketCount, ticketNumbers };
    } else return { ticketCount, ticketNumbers };
};

// ..........................................................................................
const changeInputNumber = (value: string, i: number, ticketState: TicketState) => {
    const val = parseInt(value);
    if (val || val === 0) {
        ticketState.ticketNumbers[i] = value;
        return ticketState;
    } else {
        ticketState.ticketNumbers[i] = "";
        return ticketState;
    }
};
