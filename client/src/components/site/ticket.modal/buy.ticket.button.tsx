import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { TicketState } from "../../../interfaces/ticket.state";
import { ChainMethods } from "../../../provider/chain.methods";
import { ticketNumberIsValid } from "../../../utilities/string.numbers.util";
import { flexItemsCenter } from "../constants/classes";

interface BuyTicketButtonProps {
    address: string;
    ticketNumbers: string[];
    roundId: number;
    setTicketState: (state: TicketState) => void;
    setWaiting: (bl: boolean) => void;
    waiting: boolean;
    web3: Web3;
}

const BuyTicketFromContract: FunctionComponent<BuyTicketButtonProps> = ({
    address,
    ticketNumbers,
    roundId,
    setTicketState,
    setWaiting,
    waiting,
    web3,
}) => {
    return (
        <button
            disabled={waiting}
            type="button"
            className="btn btn-primary width-available"
            onClick={async () => {
                if (ticketNumbers.length === 0) return;
                const invalids = isNumberArrayValid(ticketNumbers);
                if (invalids.length > 0) {
                    toast.error(`Invalid tickets (${invalids.join(", ")})`);
                    return;
                } else {
                    const numericArray = ticketNumbers.map(
                        (num) => 1000000 + parseInt(num)
                    );
                    setWaiting(true);
                    const result = await ChainMethods.buyTickets(
                        address,
                        roundId,
                        numericArray,
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
                    <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>{" "}
                    waiting
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
