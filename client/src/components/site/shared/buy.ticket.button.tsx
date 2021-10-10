import { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { maxTicketsEachBuy, targetNetworkId } from "../../../config/config";
import { ChainMethods } from "../../../provider/chain.methods";
import { LottoState } from "../../../reducer/reducer";

interface BuyTicketButtonProps {
    changeIsApproved: (val: boolean) => void;
    isApproved: boolean;
    state: LottoState;
}

const BuyTicketButton: FunctionComponent<BuyTicketButtonProps> = ({
    changeIsApproved,
    isApproved,
    state,
}) => {
    const { address, web3, ticketPrice, networkId } = state;
    const disabled = networkId !== targetNetworkId;
    if (!address || !web3) return <></>;

    return (
        <>
            <button
                type="button"
                className="btn btn-lg btn-success mx-3"
                onClick={() => {
                    if (disabled) {
                        toast.info("Change your network to binance smart chain");
                    } else if (!isApproved) {
                        ChainMethods.approveSpendBnbOnLottoContract(
                            address,
                            ticketPrice * maxTicketsEachBuy,
                            web3
                        );
                        changeIsApproved(true);
                    }
                }}
            >
                <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                {!isApproved ? "Approve" : "Buy Ticket"}
            </button>
        </>
    );
};

export default BuyTicketButton;
