import moment from "moment";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Web3 from "web3";
import prize from "../../../content/img/prize2.svg";
import { chainMethods } from "../../../provider/chain.methods";

interface FeelLuckyProps {
    address: string;
    currentPrize: string;
    web3: Web3;
}

const FeelLucky: FunctionComponent<FeelLuckyProps> = ({
    address,
    currentPrize,
    web3,
}) => {
    const [lastParticipation, setLastParticipation] = useState(0);
    const [loading, setLoading] = useState(false);
    const [unixNow, setUnixNow] = useState(moment().unix());

    useEffect(() => {
        initialStart(address, setLastParticipation, web3);
        const interval1 = setInterval(
            () => initialStart(address, setLastParticipation, web3),
            10000
        );
        const interval2 = setInterval(() => setUnixNow(moment().unix()), 100);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [address, web3]);

    const feelLucky = () => {
        setLoading(true);
        chainMethods
            .iFeelLucky(address, web3)
            .then((res: any) => {
                if (res["events"]["Win"]["returnValues"]["0"])
                    toast.success("You won 🥳 \ncheck your wallet");
                else toast.info("No luck for today 😄\ntry tomorrow");
            })
            .catch((_err) => toast.error("transaction failed"))
            .finally(() => setLoading(false));
    };

    return (
        <div className="container margin_90_90">
            <div className="row justify-content-md-center">
                <div className="main_title version_2 col-lg-5">
                    <span>
                        <em></em>
                    </span>
                    <h2>Feeling lucky?</h2>
                    <div data-cue="slideInUp" className="mt-3">
                        <p>
                            <span className="num_color">#</span> Click the "Feel lucky"
                            for winning {currentPrize} BNB. <br />
                            <span className="num_color">#</span> You can try your luck
                            once a day.
                            <br />
                            <span className="num_color">#</span> We only have one winner a
                            day.
                        </p>

                        <button
                            className="btn btn-sm btn_access btn_access_color"
                            disabled={
                                loading || unixNow - lastParticipation < 24 * 60 * 60
                            }
                            onClick={() => feelLucky()}
                        >
                            {getButtonText(unixNow, lastParticipation, loading)}
                        </button>
                    </div>
                </div>
                <div className="col-lg-5 d-flex justify-content-center align-items-center">
                    <div style={{ width: "90%" }}>
                        <img
                            src={prize}
                            className="w-100"
                            alt="prize"
                            data-cue="slideInUp"
                            height="250"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeelLucky;

const initialStart = (
    address: string,
    setLastParticipation: Dispatch<SetStateAction<number>>,
    web3: Web3
) => {
    chainMethods
        .getUserLastLuckParticipation(address, web3)
        .then((res) => setLastParticipation(Number(res)))
        .catch((err) => console.error("Error get prize", err));
};

const getButtonText = (unixNow: number, lastParticipation: number, loading: boolean) => {
    if (unixNow - lastParticipation < 24 * 60 * 60)
        return `Wait ${moment()
            .add(24 * 60 * 60 - (unixNow - lastParticipation), "seconds")
            .fromNow(true)}`;
    else if (loading) return <BounceLoader color="#fff" size={30} />;
    else return "Feel lucky";
};
