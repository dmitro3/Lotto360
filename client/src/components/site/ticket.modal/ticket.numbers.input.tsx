import { FunctionComponent } from "react";
import { maxTicketsEachBuy } from "../../../config/config";
import { TicketState } from "../../../interfaces/ticket.state";

interface TicketNumbersInputProps {
    inputOnChange: (state: TicketState) => void;
    ticketState: TicketState;
}

const TicketNumbersInput: FunctionComponent<TicketNumbersInputProps> = ({
    inputOnChange,
    ticketState,
}) => {
    return ticketState.ticketNumbers.length > 0 ? (
        <div className="my-3 px-3 py-2 border border-primary border-1 rounded ticket-numbers">
            {ticketState.ticketNumbers.map((num, i) => (
                <div key={i} className="input-group my-2">
                    <span className="input-group-text" id="basic-addon1">
                        # {i + 1}
                    </span>
                    <input
                        type="text"
                        className="form-control letter-space"
                        placeholder="000000"
                        aria-label="enter number"
                        min="1"
                        max={maxTicketsEachBuy}
                        value={num}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (ticketNumberIsValid(value)) {
                                inputOnChange({
                                    ...changeInputNumber(value, i, ticketState),
                                });
                            }
                        }}
                    />
                </div>
            ))}
        </div>
    ) : (
        <div className="my-3"></div>
    );
};

export default TicketNumbersInput;

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
