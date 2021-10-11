import { Dispatch, FunctionComponent, useState } from "react";
import { ActionModel, LottoActions, LottoState } from "../../../reducer/reducer";
import { TicketState } from "../../../interfaces/ticket.state";
import TicketNumbersInput from "./ticket.numbers.input";
import TicketAmountInput from "./ticket.amount.input";
import TicketAmountTitle from "./ticket.amount.title";
import RandomButton from "./random.button";
import ModalHeader from "./modal.header";
import TotalPay from "./total.pay";
import BuyTicketButton from "./buy.ticket.button";

interface BuyTicketModalProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const BuyTicketModal: FunctionComponent<BuyTicketModalProps> = ({ dispatch, state }) => {
    const [waiting, setWaiting] = useState(false);
    const [ticketState, setTicketState] = useState<TicketState>({
        ticketCount: "0",
        ticketNumbers: [],
    });
    const { ticketCount, ticketNumbers } = ticketState;
    const { ticketPrice, currentRound, address, web3 } = state;

    const changeState = (state: TicketState) => setTicketState(state);
    const handleTicketCountInput = (value: string) => {
        setTicketState({
            ...ticketState,
            ticketCount: value,
        });
    };
    if (!address || !web3) return <></>;

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

                    <RandomButton
                        disabled={waiting}
                        buttonClicked={changeState}
                        ticketState={ticketState}
                    />

                    <BuyTicketButton
                        address={address}
                        roundId={currentRound.cid}
                        setTicketState={changeState}
                        setWaiting={(value) => setWaiting(value)}
                        ticketNumbers={ticketState.ticketNumbers}
                        waiting={waiting}
                        web3={web3}
                    />
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
