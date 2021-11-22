import { FunctionComponent } from "react";
import { TicketState } from "../../../interfaces/ticket.state";
import { ticketNumberIsValid } from "../../../utilities/string.numbers.util";

interface TicketNumbersInputProps {
    inputOnChange: (state: TicketState) => void;
    ticketState: TicketState;
}

const TicketNumbersInput: FunctionComponent<TicketNumbersInputProps> = ({
    inputOnChange,
    ticketState,
}) => {
    return ticketState.ticketNumbers.length > 0 ? (
        <div className="my-3 px-3 py-2 shadow bg-white rounded ticket-numbers">
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
                        maxLength={6}
                        name={`num-${i + 1}`}
                        value={num}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            if (ticketNumberIsValid(value)) {
                                inputOnChange({
                                    ...changeInputNumber(value, i, ticketState),
                                });
                            }
                            if (value.length === 6) {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const [_, index] = e.target.name.split("-");
                                const el: HTMLElement | null = document.querySelector(
                                    `input[name=num-${parseInt(index) + 1}]`
                                );
                                console.info(el);
                                if (el) el.focus();
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
