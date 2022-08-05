import moment from "moment";
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { toast } from "react-toastify";
import Web3 from "web3";
import logo from "../contents/images/main-logo.png";
import { tradeContract } from "../provider/contracts";

interface GameSelectProps {
    address: string;
    currentPrize: number;
    web3: Web3;
}

const GameSelect: FunctionComponent<GameSelectProps> = ({ address, currentPrize, web3 }) => {
    const linkClass = "rounded bg-select-game shadow p-3 my-2 mx-4 text-decoration-none text-black";
    const [loading, setLoading] = useState(false);
    const [unixNow, setUnixNow] = useState(moment().unix());
    const [lastParticipation, setLastParticipation] = useState(0);

    useEffect(() => {
        initialStart(address, setLastParticipation, web3);
        const interval1 = setInterval(() => initialStart(address, setLastParticipation, web3), 10000);
        const interval2 = setInterval(() => setUnixNow(moment().unix()), 100);

        return () => {
            clearInterval(interval1);
            clearInterval(interval2);
        };
    }, [address, web3]);

    const feelLucky = () => {
        setLoading(true);
        iFeelLucky(address, web3)
            .then((res: any) => {
                if (res["events"]["Win"]["returnValues"]["0"]) toast.success("You won 🥳 \ncheck your wallet");
                else toast.info("No luck for today 😄\ntry tomorrow");
            })
            .catch((_err) => toast.error("transaction failed"))
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-height bg5">
            <div className="container pt-5 d-flex justify-content-center align-items-center flex-column">
                <img src={logo} alt="lotto360" className="main-logo" />
                <h3 className="fw-bold my-4">Choose a game to play</h3>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <NavLink to="/dice" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Dice 🎲</h6>
                            <span>X8 profit</span>
                        </div>
                    </NavLink>
                    <NavLink to="/666" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Number of the Beast 😈</h6>
                            <span>X25 profit</span>
                        </div>
                    </NavLink>
                    <NavLink to="/fruit" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Fruitland 🍑</h6>
                            <span>X100 profit</span>
                        </div>
                    </NavLink>
                </div>

                <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
                    <h4 className="text-black">Try your luck free to win {currentPrize}$</h4>
                    <button
                        className="btn btn-lg btn-primary mt-3"
                        disabled={loading || unixNow - lastParticipation < 24 * 60 * 60}
                        onClick={() => feelLucky()}
                    >
                        {getButtonText(unixNow, lastParticipation, loading)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameSelect;

const getButtonText = (unixNow: number, lastParticipation: number, loading: boolean) => {
    if (unixNow - lastParticipation < 24 * 60 * 60)
        return `Wait ${moment()
            .add(24 * 60 * 60 - (unixNow - lastParticipation), "seconds")
            .fromNow(true)}`;
    else if (loading) return <BounceLoader color="#fff" size={30} />;
    else return "Feel lucky";
};

const iFeelLucky = async (address: string, web3: Web3) => {
    try {
        return tradeContract(web3).methods.IFeelLucky().send({ from: address });
    } catch (err) {
        console.error("Error last participation:", err);
        return false;
    }
};

const getUserLastLuckParticipation = async (address: string, web3: Web3) => {
    try {
        return tradeContract(web3).methods.UserLuckLastParticipate().call({ from: address });
    } catch (err) {
        console.error("Error last participation:", err);
        return 0;
    }
};

const initialStart = (address: string, setLastParticipation: Dispatch<SetStateAction<number>>, web3: Web3) => {
    getUserLastLuckParticipation(address, web3)
        .then((res) => setLastParticipation(Number(res)))
        .catch((err) => console.error("Error get prize", err));
};
