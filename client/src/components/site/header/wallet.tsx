import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions } from "../../../reducer/reducer";
import { simplifyString } from "../../../utilities/string.numbers.util";
import { getWeb3 } from "../../../provider/web3";

interface WalletProps {
    address?: string;
    dispatch: Dispatch<ActionModel<LottoActions>>;
}

const Wallet: FunctionComponent<WalletProps> = ({ address, dispatch }) => {
    const getAccount = () => {
        if (!address) getWeb3(dispatch);
    };
    return (
        <button
            className={
                address ? "btn my-2 my-sm-0 btn-primary" : "btn my-2 my-sm-0 btn-warning"
            }
            type="button"
            onClick={() => getAccount()}
            title={address ? address : ""}
        >
            {address && <i className="fa-duotone fa-wallet fa-lg me-2"></i>}
            {address ? simplifyString(address) : "Connect to wallet"}
        </button>
    );
};

export default Wallet;
