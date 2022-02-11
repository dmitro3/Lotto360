import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { beastContractAddress } from "../../../config/config";
import { beastAdminChainMethods } from "../../../provider/chain.methods/beast";
import ButtonWaiting from "../../4.lotto/shared/btn.waiting";
import InputSetting from "../shared/set.inputs";

interface SpinSettingsProps {
    address: string;
    web3: Web3;
}

const SpinSettings: FunctionComponent<SpinSettingsProps> = ({ address, web3 }) => {
    const [balance, setBalance] = useState("");

    const [fund, setFund] = useState(0.01);
    const [fundLoading, setFundLoading] = useState(false);

    const [fee, setFee] = useState(4);
    const [feeLoading, setFeeLoading] = useState(false);

    const [multiplier, setMultiplier] = useState(8);
    const [multiplierLoading, setMultiplierLoading] = useState(false);

    const [min, setMin] = useState(0.01);
    const [minLoading, setMinLoading] = useState(false);

    const [max, setMax] = useState(0.01);
    const [maxLoading, setMaxLoading] = useState(false);

    const [newOwner, setNewOwner] = useState("");
    const [newOwnerLoading, setNewOwnerLoading] = useState(false);
    const [currentSpinId, setCurrentSpinId] = useState(0);

    const [withdrawLoading, setWithdrawLoading] = useState(false);
    const [withdrawAddress, setWithdrawAddress] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");

    useEffect(() => {
        beastAdminChainMethods
            .getSettingForAdmin(address, web3)
            .then((res) => {
                setMultiplier(res[0]);
                setMin(parseFloat(Web3.utils.fromWei(res[1], "ether")));
                setMax(parseFloat(Web3.utils.fromWei(res[2], "ether")));
                setFee(res[3]);
                setCurrentSpinId(res[4]);
                setNewOwner(res[5]);
            })
            .catch((err) => console.error(err));

        web3.eth
            .getBalance(beastContractAddress)
            .then((res) => res && setBalance(Web3.utils.fromWei(res, "ether")))
            .catch((err) => console.error(err));
    }, [address, web3]);

    const sendFund = () => {
        setFundLoading(true);
        beastAdminChainMethods
            .injectFund(address, fund, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${fund} BNB added to contract`);
            })
            .catch((_err) => toast.error("fail to inject fund"))
            .finally(() => setFundLoading(false));
    };

    const setFeeContract = () => {
        setFeeLoading(true);
        beastAdminChainMethods
            .setContractFee(address, fee, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${fee}% fee set to contract`);
            })
            .catch((_err) => toast.error("fail to set fee"))
            .finally(() => setFeeLoading(false));
    };

    const setContractMultiplier = () => {
        setMultiplierLoading(true);
        beastAdminChainMethods
            .setPrizeMultiplier(address, multiplier, web3)
            .then((res) => {
                if (res && res.status)
                    toast.success(`${multiplier}x multiplier set to contract`);
            })
            .catch((_err) => toast.error("fail to set multiplier"))
            .finally(() => setMultiplierLoading(false));
    };

    const setContractMin = () => {
        setMinLoading(true);
        beastAdminChainMethods
            .setMinSpinAmount(address, min, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${min} BNB min set to contract`);
            })
            .catch((_err) => toast.error("fail to set min"))
            .finally(() => setMinLoading(false));
    };

    const setContractMax = () => {
        setMaxLoading(true);
        beastAdminChainMethods
            .setMaxSpinAmount(address, max, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${max} BNB max set to contract`);
            })
            .catch((_err) => toast.error("fail to set max"))
            .finally(() => setMaxLoading(false));
    };

    const setContractNewOwner = () => {
        setNewOwnerLoading(true);
        beastAdminChainMethods
            .transferOwnership(address, newOwner, web3)
            .then((res) => {
                if (res && res.status)
                    toast.success(`${newOwner} new owner set to contract`);
            })
            .catch((_err) => toast.error("fail to set new owner"))
            .finally(() => setNewOwnerLoading(false));
    };

    const handleWithdraw = () => {
        console.info(withdrawAddress);
        console.info(withdrawAmount);
        setWithdrawLoading(true);
        beastAdminChainMethods
            .withdrawToken(withdrawAmount, address, withdrawAddress, web3)
            .then((res) => {
                console.info(res);
                if (res && res.status) toast.success("successfull withdraw");
            })
            .catch((_err) => toast.error("fail to withdraw"))
            .finally(() => setWithdrawLoading(false));
    };

    return (
        <>
            <h3 className="fw-bold text-primary">Current Spin: {currentSpinId}</h3>
            <h4 className="fw-bold mb-5">
                <span className="badge bg3 text-black rounded-pill shadow">
                    Balance: {balance} BNB
                </span>
            </h4>
            <div className="col col-6 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <InputSetting
                    loading={fundLoading}
                    onChange={setFund}
                    onClick={sendFund}
                    title="Inject fund"
                    btnTitle="send fund"
                    value={fund}
                />

                <InputSetting
                    loading={feeLoading}
                    onChange={setFee}
                    onClick={setFeeContract}
                    title="Contract fee"
                    btnTitle="set fee"
                    value={fee}
                />

                <InputSetting
                    loading={multiplierLoading}
                    onChange={setMultiplier}
                    onClick={setContractMultiplier}
                    title="Multiplier"
                    btnTitle="set multiplier"
                    value={multiplier}
                />

                <InputSetting
                    loading={minLoading}
                    onChange={setMin}
                    onClick={setContractMin}
                    title="Min"
                    btnTitle="set min"
                    value={min}
                />

                <InputSetting
                    loading={maxLoading}
                    onChange={setMax}
                    onClick={setContractMax}
                    title="Max"
                    btnTitle="set max"
                    value={max}
                />

                <InputSetting
                    loading={newOwnerLoading}
                    onChange={setNewOwner}
                    onClick={setContractNewOwner}
                    title="New owner"
                    btnTitle="set new owner"
                    value={newOwner}
                />

                <div>
                    <h4 className="fw-bold">Withdraw</h4>
                    <div className="input-group mb-3">
                        <input
                            disabled={withdrawLoading}
                            type="text"
                            className="form-control"
                            placeholder="Enter address"
                            aria-label="Enter address"
                            aria-describedby="button-addon2"
                            value={withdrawAddress}
                            onChange={(e) => setWithdrawAddress(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            disabled={withdrawLoading}
                            type="text"
                            className="form-control"
                            placeholder="Enter amount"
                            aria-label="Enter amount"
                            aria-describedby="button-addon2"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                        <button
                            disabled={withdrawLoading}
                            className="btn btn-primary"
                            type="button"
                            id="button-addon2"
                            onClick={() => handleWithdraw()}
                        >
                            {withdrawLoading ? <ButtonWaiting /> : "Withdraw"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpinSettings;
