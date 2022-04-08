import { FunctionComponent } from "react";
import "../../contents/styles/colorspin.css";

interface SpinnerColorsProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    handleSpin: Function;
    stopNumber?: number;
}

const SpinnerColors: FunctionComponent<SpinnerColorsProps> = ({
    alreadyPurchased,
    autoPlay,
    handleSpin,
    stopNumber,
}) => {
    return (
        <div className="color-spin-box rounded mt-4">
            <div className="mainbox d-flex align-items-center justify-content-center overflow-hidden">
                <div className={`box border-dark ${autoPlay ? "active" : ""}`}>
                    <div className="box1">
                        <span className="c1"></span>
                        <span className="c2"></span>
                        <span className="c3"></span>
                        <span className="c4"></span>
                    </div>
                    <div className="box2">
                        <span className="c5"></span>
                        <span className="c6"></span>
                        <span className="c7"></span>
                        <span className="c8"></span>
                    </div>
                </div>

                <button
                    className="spin btn btn-warning"
                    disabled={autoPlay || !alreadyPurchased}
                    onClick={() => handleSpin()}
                >
                    SPIN
                </button>
            </div>

            <i className="fa-solid fa-arrow-left fa-2xl text-dark"></i>
        </div>
    );
};

export default SpinnerColors;
