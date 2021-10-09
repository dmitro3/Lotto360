import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { targetNetworkId } from "../../../config/config";

interface BuyTicketButtonProps {
    networkId: number;
}

const BuyTicketButton: FunctionComponent<BuyTicketButtonProps> = ({ networkId }) => {
    const disabled = networkId !== targetNetworkId;
    return (
        <>
            <button
                type="button"
                className="btn btn-lg btn-success mx-3"
                onClick={() => {
                    if (disabled)
                        toast.info("Change your network to binance smart chain");
                }}
            >
                <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                Buy Ticket
            </button>
        </>
    );
};

export default BuyTicketButton;
