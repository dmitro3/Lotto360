import { FunctionComponent } from "react";
import { TicketState } from "../../../interfaces/ticket.state";
import { get6DigitsRandomString } from "../../../utilities/string.numbers.util";

interface RandomButtonProps {
    disabled: boolean;
    ticketState: TicketState;
    buttonClicked: (state: TicketState) => void;
}

const RandomButton: FunctionComponent<RandomButtonProps> = ({
    disabled,
    buttonClicked,
    ticketState,
}) => {
    return (
        <button
            disabled={disabled}
            type="button"
            className="btn btn-info width-available mb-3"
            onClick={() => buttonClicked(generateRandomForInputs(ticketState))}
        >
            generate random numbers
        </button>
    );
};

export default RandomButton;

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
