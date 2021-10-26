import { FunctionComponent } from "react";

interface TicketAmountInputProps {
    maxTicketsEachBuy: number;
    ticketCount: string;
    handleTicketCountInput: (value: string) => void;
}

const TicketAmountInput: FunctionComponent<TicketAmountInputProps> = ({
    maxTicketsEachBuy,
    handleTicketCountInput,
    ticketCount,
}) => {
    return (
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
                        handleTicketCountInput(`${parseInt(value)}`);
                    else handleTicketCountInput("");
                }}
            />
        </div>
    );
};

export default TicketAmountInput;

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
