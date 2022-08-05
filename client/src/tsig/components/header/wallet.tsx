import { Dispatch, FunctionComponent } from "react";
import { getWeb3 } from "../../provider/web3";
import { ActionModel, ReducerActions } from "../../reducer/reducer";
import { simplifyWalletAddress } from "../../utils/string";

interface WalletProps {
    address?: string;
    dispatch: Dispatch<ActionModel<ReducerActions>>;
}

const Wallet: FunctionComponent<WalletProps> = ({ address, dispatch }) => {
    return (
        <li>
            <button
                className="btn btn-sm btn_access"
                onClick={() => !address && getWeb3(dispatch)}
                title={address}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
            >
                {address ? simplifyWalletAddress(address) : "Connect Wallet"}
            </button>
        </li>
    );
};

export default Wallet;
