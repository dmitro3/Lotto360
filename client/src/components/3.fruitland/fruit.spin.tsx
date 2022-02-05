import "@splidejs/splide/dist/css/splide.min.css";
import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import ButtonWaiting from "../4.lotto360/shared/btn.waiting";
import Spinner, { fruitList } from "./spinner";

interface FruitSpinProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    btnSmallInfo: JSX.Element;
    spinResult: string;
    spinSlot: () => void;
}

const FruitSpin: FunctionComponent<FruitSpinProps> = ({
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
        <>
            <div
                className={`drop-box rounded bg-white shadow p-4 ${
                    !alreadyPurchased ? "opacity-75" : ""
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
                <div className="d-flex justify-content-around bg-fruit-spiner rounded py-1">
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[1]) : undefined}
                    />
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[2]) : undefined}
                    />
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[3]) : undefined}
                    />
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[4]) : undefined}
                    />
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[5]) : undefined}
                    />
                    <Spinner
                        autoPlay={autoPlay}
                        stopNumber={spinResult ? Number(spinResult[6]) : undefined}
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

            <Modal show={true} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                        Choose Fruit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between flex-wrap">
                        {fruitList.map((f, i) => (
                            <span key={i} className="rounded p-3 display-4 pointer">
                                {f}
                            </span>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FruitSpin;
