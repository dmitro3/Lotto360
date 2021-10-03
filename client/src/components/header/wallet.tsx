import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions } from "../../reducer/reducer";
import { stringUtils } from "../../utilities/stringUtil";
import { getWeb3 } from "../../utilities/web3";

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
            {address ? stringUtils.simplifyString(address) : "Connect to wallet"}
        </button>
    );
};

export default Wallet;
