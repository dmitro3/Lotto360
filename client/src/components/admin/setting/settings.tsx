import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { RoundApiService } from "../../../api/round.api.service";
import { web3 } from "../../../provider/web3";
import { CustomToastWithLink } from "../../../utilities/toastLink";

interface SettingProps {}

const Settings: FunctionComponent<SettingProps> = () => {
    const [settings, setSettings] = useState<any[]>();
    const [loading, setLoading] = useState(false);
    const [ownerAddress, setOwnerAddress] = useState("");
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        RoundApiService.getSettings()
            .then((res) => {
                if (res && res.data && res.data.result) setSettings(res.data.result);
            })
            .catch((err) => console.error(err));
    }, []);
    if (!settings) return <></>;

    const setNewTicketPerBuy = (amount: number): void => {
        setLoading(true);
        RoundApiService.setNewTicketPerBuy(amount)
            .then((res) => {
                if (res && res.data && res.data.success && res.data.messages) {
                    toast.success(
                        CustomToastWithLink(
                            res.data.messages[0].message,
                            "Max number changed"
                        )
                    );
                    let newSetting = [...settings];
                    newSetting[3].hex = web3.utils.numberToHex(amount);
                    setSettings(newSetting);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    const setNewOwner = (address: string): void => {
        setLoading(true);
        RoundApiService.setNewOwner(address)
            .then((res) => {
                if (res && res.data && res.data.success && res.data.messages) {
                    toast.success(
                        CustomToastWithLink(
                            res.data.messages[0].message,
                            "Max number changed"
                        )
                    );
                    let newSetting = [...settings];
                    newSetting[0] = address;
                    setSettings(newSetting);
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <div className="card border-secondary mb-3" style={{ maxWidth: "35rem" }}>
                <div className="card-header">Settings</div>
                <div className="card-body">
                    <div className="d-flex align-items-center p-2">
                        <span className="me-2 fw-bold">Owner:</span>
                        <span className="rounded bg-primary text-white fw-bold px-3 py-1">
                            {settings[0]}
                        </span>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <span className="me-2 fw-bold">Max ticket to buy:</span>
                        <span className="rounded bg-primary text-white fw-bold px-3 py-1">
                            {web3.utils.hexToNumber(settings[3].hex)}
                        </span>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <span className="me-2 fw-bold">Current ticket:</span>
                        <span className="rounded bg-primary text-white fw-bold px-3 py-1">
                            {web3.utils.hexToNumber(settings[2].hex)}
                        </span>
                    </div>
                    <div className="d-flex align-items-center p-2">
                        <span className="me-2 fw-bold">Current round:</span>
                        <span className="rounded bg-primary text-white fw-bold px-3 py-1">
                            {web3.utils.hexToNumber(settings[1].hex)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="col col-6">
                <h6 className="mt-5 fw-bold">Set max ticket buy</h6>
                <div className="input-group mb-3">
                    <input
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Enter max ticket to buy"
                        aria-label="Enter max ticket to buy"
                        aria-describedby="button-addon2"
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                    <button
                        className="btn btn-primary"
                        disabled={loading}
                        type="button"
                        id="button-addon2"
                        onClick={() => setNewTicketPerBuy(amount)}
                    >
                        {loading && (
                            <>
                                <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>{" "}
                                waiting
                            </>
                        )}
                        {!loading && "set"}
                    </button>
                </div>

                <h6 className="mt-5 fw-bold">Transfer owner</h6>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        aria-label="Enter address"
                        aria-describedby="button-addon2"
                        value={ownerAddress}
                        onChange={(e) => setOwnerAddress(e.target.value)}
                    />
                    <button
                        className="btn btn-primary"
                        disabled={loading}
                        type="button"
                        id="button-addon2"
                        onClick={() => setNewOwner(ownerAddress)}
                    >
                        {loading && (
                            <>
                                <i className="fa-solid fa-1x me-2 fa-spinner-third fa-spin"></i>{" "}
                                waiting
                            </>
                        )}
                        {!loading && "set"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
