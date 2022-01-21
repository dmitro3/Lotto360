import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import { dice360AdminChainMethods } from "../../../provider/chain.methods/dice360";
import InputSetting from "./set.inputs";

interface RollSettingsProps {
    address: string;
    web3: Web3;
}

const RollSettings: FunctionComponent<RollSettingsProps> = ({ address, web3 }) => {
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
    const [currentRollId, setCurrentRollId] = useState(0);

    useEffect(() => {
        dice360AdminChainMethods
            .getSettingForAdmin(address, web3)
            .then((res) => {
                setMultiplier(res[0]);
                setMin(parseFloat(Web3.utils.fromWei(res[1], "ether")));
                setMax(parseFloat(Web3.utils.fromWei(res[2], "ether")));
                setFee(res[3]);
                setCurrentRollId(res[4]);
                setNewOwner(res[5]);
            })
            .catch((err) => console.error(err));
    }, [address, web3]);

    const sendFund = () => {
        setFundLoading(true);
        dice360AdminChainMethods
            .injectFund(address, fund, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${fund} BNB added to contract`);
            })
            .catch((_err) => toast.error("fail to inject fund"))
            .finally(() => setFundLoading(false));
    };

    const setFeeContract = () => {
        setFeeLoading(true);
        dice360AdminChainMethods
            .setContractFee(address, fee, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${fee}% fee set to contract`);
            })
            .catch((_err) => toast.error("fail to set fee"))
            .finally(() => setFeeLoading(false));
    };

    const setContractMultiplier = () => {
        setMultiplierLoading(true);
        dice360AdminChainMethods
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
        dice360AdminChainMethods
            .setMinRollAmount(address, min, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${min} BNB min set to contract`);
            })
            .catch((_err) => toast.error("fail to set min"))
            .finally(() => setMinLoading(false));
    };

    const setContractMax = () => {
        setMaxLoading(true);
        dice360AdminChainMethods
            .setMaxRollAmount(address, max, web3)
            .then((res) => {
                if (res && res.status) toast.success(`${max} BNB max set to contract`);
            })
            .catch((_err) => toast.error("fail to set max"))
            .finally(() => setMaxLoading(false));
    };

    const setContractNewOwner = () => {
        setNewOwnerLoading(true);
        dice360AdminChainMethods
            .transferOwnership(address, newOwner, web3)
            .then((res) => {
                if (res && res.status)
                    toast.success(`${newOwner} new owner set to contract`);
            })
            .catch((_err) => toast.error("fail to set new owner"))
            .finally(() => setNewOwnerLoading(false));
    };

    return (
        <>
            <h3 className="fw-bold mb-5 text-primary">Current Roll: {currentRollId}</h3>

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
            </div>
        </>
    );
};

export default RollSettings;
