import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { TicketState } from "../../../interfaces/ticket.state";
import { lotto360ChainMethods } from "../../../provider/chain.methods/lotto360";
import { ticketNumberIsValid } from "../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../../constants/classes";
import ButtonWaiting from "../shared/btn.waiting";

interface BuyTicketButtonProps {
    address: string;
    ticketNumbers: string[];
    roundId: number;
    setTicketState: (state: TicketState) => void;
    setWaiting: (bl: boolean) => void;
    ticketPrice: number;
    waiting: boolean;
    userBalance: number;
    web3: Web3;
}

const BuyTicketFromContract: FunctionComponent<BuyTicketButtonProps> = ({
    address,
    ticketNumbers,
    roundId,
    setTicketState,
    setWaiting,
    ticketPrice,
    waiting,
    userBalance,
    web3,
}) => {
    return (
        <button
            disabled={waiting}
            type="button"
            className="btn btn-success shadow mb-2 width-available"
            onClick={async () => {
                if (ticketNumbers.length === 0) return;
                const invalids = isNumberArrayValid(ticketNumbers);

                if (invalids.length > 0) {
                    toast.error(`Invalid tickets (${invalids.join(", ")})`);
                } else if (userBalance < ticketNumbers.length * ticketPrice) {
                    toast.error(`Insufficient balance`);
                } else {
                    const numericArray = ticketNumbers.map(
                        (num) => 1000000 + parseInt(num)
                    );
                    setWaiting(true);
                    const result = await lotto360ChainMethods.buyTickets(
                        address,
                        roundId,
                        numericArray,
                        ticketPrice,
                        web3
                    );
                    if (result) {
                        setTicketState({
                            ticketCount: "0",
                            ticketNumbers: [],
                        });
                    }
                    setWaiting(false);
                }
            }}
        >
            {waiting ? (
                <div className={flexItemsCenter}>
                    <ButtonWaiting />
                </div>
            ) : (
                "Buy"
            )}
        </button>
    );
};

export default BuyTicketFromContract;

// ..........................................................................................
const isNumberArrayValid = (ticketNumbers: string[]) => {
    return ticketNumbers
        .map((num, i) => (!ticketNumberIsValid(num) || num.length !== 6 ? i + 1 : null))
        .filter((num) => num);
};