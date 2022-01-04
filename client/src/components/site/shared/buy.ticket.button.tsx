import { Dispatch, FunctionComponent } from "react";
import { toast } from "react-toastify";

import { ActionModel, LottoActions, LottoState } from "../../../reducer/reducer";
import { targetNetworkId } from "../../../config/config";

interface BuyTicketButtonProps {
    dispatch: Dispatch<ActionModel<LottoActions>>;
    state: LottoState;
}

const BuyTicketButton: FunctionComponent<BuyTicketButtonProps> = ({
    dispatch,
    state,
}) => {
    const { address, web3, networkId } = state;
    const disabled = networkId !== targetNetworkId;
    if (!address || !web3) return <></>;

    return (
        <>
            <button
                type="button"
                className="btn btn-lg btn-success mx-3 shadow"
                onClick={async () => {
                    if (disabled)
                        toast.info("Change your network to binance smart chain");
                    else dispatch({ type: LottoActions.SET_SHOW_MODAL, payload: true });
                }}
            >
                <i className="fa-duotone fa-ticket fa-xl me-2"></i>
                Buy Ticket
            </button>
        </>
    );
};

export default BuyTicketButton;
