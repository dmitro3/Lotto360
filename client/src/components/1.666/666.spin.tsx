import "@splidejs/splide/dist/css/splide.min.css";
import { FunctionComponent } from "react";
import ButtonWaiting from "../4.lotto/shared/btn.waiting";
import Spinner from "./spinner";

interface BeastSpinProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    btnSmallInfo: JSX.Element;
    spinResult: string;
    spinSlot: () => void;
}

const BeastSpin: FunctionComponent<BeastSpinProps> = ({
    alreadyPurchased,
    autoPlay,
    btnSmallInfo,
    spinResult,
    spinSlot,
}) => {
    const getButtonText = () => {
        if (autoPlay) return <ButtonWaiting />;
        if (!alreadyPurchased) return "purchase first";
        else return "Spin";
    };

    return (
        <div className="drop-box rounded bg-white shadow p-4">
            <h4 className="fw-bold mb-4">
                <i className="fa-regular fa-circle-2 me-2"></i>
                Spin
            </h4>
            <p>
                {btnSmallInfo}
                Hit Spin button
            </p>
            <div className="d-flex justify-content-around bg-666-spiner rounded py-1">
                <Spinner
                    autoPlay={autoPlay}
                    stopNumber={spinResult ? Number(spinResult[1]) : undefined}
                    speed={100}
                />
                <Spinner
                    autoPlay={autoPlay}
                    stopNumber={spinResult ? Number(spinResult[2]) : undefined}
                    speed={100}
                />
                <Spinner
                    autoPlay={autoPlay}
                    stopNumber={spinResult ? Number(spinResult[3]) : undefined}
                    speed={100}
                />
            </div>
            <div className="d-flex justify-content-around my-1"></div>
            <button
                disabled={!alreadyPurchased || autoPlay}
                type="button"
                className="btn btn-lg btn-success w-100 mt-3"
                onClick={() => spinSlot()}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default BeastSpin;
