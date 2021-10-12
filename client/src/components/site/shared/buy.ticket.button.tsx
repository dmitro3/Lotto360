import { Dispatch, FunctionComponent } from "react";
import { toast } from "react-toastify";
import { maxTicketsEachBuy, targetNetworkId } from "../../../config/config";
import { ChainMethods } from "../../../provider/chain.methods";
import { ActionModel, LottoActions, LottoState } from "../../../reducer/reducer";
import { CustomToastWithLink } from "../../../utilities/toastLink";

interface BuyTicketButtonProps {
    changeArrovedLoading: (val1: boolean, val2: boolean) => void;
    dispatch: Dispatch<ActionModel<LottoActions>>;
    isApproved: boolean;
    isLoading: boolean;
    state: LottoState;
}

const BuyTicketButton: FunctionComponent<BuyTicketButtonProps> = ({
    changeArrovedLoading,
    dispatch,
    isApproved,
    isLoading,
    state,
}) => {
    const { address, web3, ticketPrice, networkId } = state;
    const disabled = networkId !== targetNetworkId;
    if (!address || !web3) return <></>;

    return (
        <>
            <button
                disabled={isLoading}
                type="button"
                className="btn btn-lg btn-success mx-3"
                onClick={async () => {
                    changeArrovedLoading(false, true);
                    if (disabled) {
                        toast.info("Change your network to binance smart chain");
                    } else if (!isApproved) {
                        const result = await ChainMethods.approveSpendBnbOnLottoContract(
                            address,
                            ticketPrice * maxTicketsEachBuy,
                            web3
                        );
                        if (result && result.status && result.transactionHash) {
                            toast.success(
                                CustomToastWithLink(
                                    result.transactionHash,
                                    "New limit approved"
                                )
                            );
                            changeArrovedLoading(true, false);
                        }
                    } else {
                        dispatch({ type: LottoActions.SET_SHOW_MODAL, payload: true });
                    }
                    changeArrovedLoading(true, false);
                }}
            >
                {isLoading ? (
                    <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>
                ) : (
                    <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                )}
                {!isApproved ? "Approve" : "Buy Ticket"}
            </button>
        </>
    );
};

export default BuyTicketButton;
