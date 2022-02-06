import { Dispatch, FunctionComponent } from "react";
import ButtonWaiting from "../4.lotto360/shared/btn.waiting";

interface FruitPurchaseProps {
    alreadyPurchased: boolean;
    balance: number;
    betAmount: number;
    btnSmallInfo: JSX.Element;
    buttonLoading: boolean;
    maxBet: number;
    minBet: number;
    multiplier: number;
    purchaseSpin: () => void;
    setBetAmount: Dispatch<React.SetStateAction<number>>;
}

const FruitPurchase: FunctionComponent<FruitPurchaseProps> = ({
    alreadyPurchased,
    balance,
    betAmount,
    btnSmallInfo,
    buttonLoading,
    maxBet,
    minBet,
    multiplier,
    purchaseSpin,
    setBetAmount,
}) => {
    const getButtonText = () => {
        if (buttonLoading) return <ButtonWaiting />;
        else if (alreadyPurchased) return "already purchased spin";
        else return "purchase spin";
    };

    return (
        <div
            className={`purchase-box rounded bg-white shadow p-4 d-flex flex-column justify-content-between`}
        >
            <h4 className="fw-bold mb-4">
                <i className="fa-regular fa-circle-1 me-2"></i>
                Purchase spin
            </h4>
            <div className="d-flex justify-content-between mb-3">
                <span>Your balance</span>
                <span className="fw-bold">{balance} BNB</span>
            </div>
            <div className="input-group mb-3">
                <input
                    className="form-control"
                    disabled={alreadyPurchased || buttonLoading}
                    type="number"
                    placeholder="enter bet amount"
                    value={betAmount}
                    onChange={(e) => {
                        if (!e.target.value) setBetAmount(0);
                        else {
                            const val = parseFloat(e.target.value);
                            setBetAmount(val);
                        }
                    }}
                />
            </div>
            <p className="mb-0">
                {btnSmallInfo}
                Bet range:
                <span className="fw-bold ms-2">
                    {minBet} to {maxBet} BNB
                </span>
            </p>
            <p>
                {btnSmallInfo}
                Win amount x{multiplier}:
                <span className="fw-bold ms-2">{betAmount * multiplier || 0} BNB</span>
            </p>
            <button
                type="button"
                className="btn btn-lg btn-success w-100 mt-3"
                disabled={
                    !(betAmount >= minBet && betAmount <= maxBet) ||
                    alreadyPurchased ||
                    buttonLoading
                }
                onClick={() => purchaseSpin()}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default FruitPurchase;
