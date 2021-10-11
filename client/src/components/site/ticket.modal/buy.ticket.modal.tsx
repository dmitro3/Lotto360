import { Dispatch, FunctionComponent, useState } from "react";
import { TicketState } from "../../../interfaces/ticket.state";
import TicketAmountInput from "./ticket.amount.input";
import TicketAmountTitle from "./ticket.amount.title";
import ModalHeader from "./modal.header";
import RandomButton from "./random.button";
import TicketNumbersInput from "./ticket.numbers.input";
import TotalPay from "./total.pay";
import { ActionModel, LottoActions } from "../../../reducer/reducer";

interface BuyTicketModalProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    ticketPrice: number;
}

const BuyTicketModal: FunctionComponent<BuyTicketModalProps> = ({
    dispatch,
    ticketPrice,
}) => {
    const [ticketState, setTicketState] = useState<TicketState>({
        ticketCount: "0",
        ticketNumbers: [],
    });
    const { ticketCount, ticketNumbers } = ticketState;

    const handleTicketCountInput = (value: string) => {
        setTicketState({
            ...ticketState,
            ticketCount: value,
        });
    };
    const changeState = (state: TicketState) => setTicketState(state);

    if (ticketCount && parseInt(ticketCount) !== ticketNumbers.length) {
        setTicketState(generateEmptyInputs(ticketState));
    }

    return (
        <div className="modal-bg d-flex justify-content-center">
            <div className="inner-modal mt-4 bg-light rounded overflow-hidden">
                <ModalHeader dispatch={dispatch} />
                <div className="p-3">
                    <TicketAmountTitle />

                    <TicketAmountInput
                        handleTicketCountInput={handleTicketCountInput}
                        ticketCount={ticketCount}
                    />

                    <TotalPay ticketCount={ticketCount} ticketPrice={ticketPrice} />

                    <TicketNumbersInput
                        inputOnChange={changeState}
                        ticketState={ticketState}
                    />

                    <RandomButton buttonClicked={changeState} ticketState={ticketState} />

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
const generateEmptyInputs = ({ ticketCount, ticketNumbers }: TicketState) => {
    const count = parseInt(ticketCount);
    if (count) {
        const strArr: string[] = [];
        for (let i = 0; i < count; i++) strArr.push("");
        ticketNumbers = strArr;
        return { ticketCount, ticketNumbers };
    } else return { ticketCount, ticketNumbers };
};
