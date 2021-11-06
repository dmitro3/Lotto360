import { FunctionComponent, useState } from "react";
import { toast } from "react-toastify";

import { HelperApiService } from "../../../api/helper.api.service";
import { TransferTokenModel } from "../../../interfaces/dashboard";
import { CustomToastWithLink } from "../../../utilities/toastLink";
import ButtonWaiting from "../../site/shared/btn.waiting";

interface TokenTransferProps {}

const TokenTransfer: FunctionComponent<TokenTransferProps> = () => {
    const [tokenTransferModel, setTokenTransferModel] = useState<TransferTokenModel>({
        recipient: "",
        amount: "",
        passphrase: "",
    });

    const [loading, setLoading] = useState(false);

    const { recipient, amount, passphrase } = tokenTransferModel;

    const transferToken = () => {
        setLoading(true);
        HelperApiService.withdraw(tokenTransferModel)
            .then((res) => {
                if (res && res.data && res.data.result) {
                    toast.success(
                        CustomToastWithLink(
                            res.data.messages![0].message,
                            "token transfered"
                        )
                    );
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div className="bg-light rounded p-3 mt-5">
            <div className="col col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <h6 className="fw-bold">Transfer token</h6>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        aria-label="Enter address"
                        aria-describedby="button-addon2"
                        value={recipient}
                        onChange={(e) =>
                            setTokenTransferModel({
                                ...tokenTransferModel,
                                recipient: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter amount"
                        aria-label="Enter amount"
                        aria-describedby="button-addon2"
                        value={amount}
                        onChange={(e) =>
                            setTokenTransferModel({
                                ...tokenTransferModel,
                                amount: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter passphrase"
                        aria-label="Enter passphrase"
                        aria-describedby="button-addon2"
                        value={passphrase}
                        onChange={(e) =>
                            setTokenTransferModel({
                                ...tokenTransferModel,
                                passphrase: e.target.value,
                            })
                        }
                    />
                </div>
                <button
                    className="btn btn-primary"
                    disabled={loading}
                    type="button"
                    id="button-addon2"
                    onClick={() => transferToken()}
                >
                    {loading && <ButtonWaiting />}
                    {!loading && "transfer"}
                </button>
            </div>
        </div>
    );
};

export default TokenTransfer;
