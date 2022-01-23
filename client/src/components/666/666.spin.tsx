import { FunctionComponent, useState } from "react";
import ButtonWaiting from "../lotto360/shared/btn.waiting";
import Spinner from "./spinner";
import "@splidejs/splide/dist/css/splide.min.css";

interface BeastSpinProps {
    alreadyPurchased: boolean;
    btnSmallInfo: JSX.Element;
    buttonLoading: boolean;
    spinBeast: (n: number) => void;
}

const BeastSpin: FunctionComponent<BeastSpinProps> = ({
    alreadyPurchased,
    btnSmallInfo,
    buttonLoading,
    spinBeast,
}) => {
    // TODO remove it
    alreadyPurchased = true;

    const [firstSpinner, setFirstSpinner] = useState<number>();
    const [secondSpinner, setSecondSpinner] = useState<number>();
    const [thirdSpinner, setThirdSpinner] = useState<number>();
    const [autoPlay, setAutoPlay] = useState(false);

    const getButtonText = () => {
        if (buttonLoading) return <ButtonWaiting />;
        if (!alreadyPurchased) return "first purchase";
        else return "Spin";
    };

    const spin = () => {
        setAutoPlay(!autoPlay);
    };

    return (
        <div
            className={`drop-box rounded bg-white shadow p-4 ${
                !alreadyPurchased ? "opacity-50" : ""
            }`}
        >
            <h4 className="fw-bold mb-4">
                <i className="fa-regular fa-circle-2 me-2"></i>
                Spin
            </h4>
            <p>
                {btnSmallInfo}
                Hit Spin button
            </p>
            <div className="d-flex justify-content-between bg3 rounded shadow py-1">
                <Spinner autoPlay={autoPlay} stopNumber={firstSpinner} speed={60} />
                <Spinner autoPlay={autoPlay} stopNumber={secondSpinner} speed={60} />
                <Spinner autoPlay={autoPlay} stopNumber={thirdSpinner} speed={60} />
            </div>
            <div className="d-flex justify-content-around my-1"></div>
            <button
                disabled={!alreadyPurchased || buttonLoading}
                type="button"
                className="btn btn-success w-100 mt-3"
                onClick={() => spin()}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default BeastSpin;
