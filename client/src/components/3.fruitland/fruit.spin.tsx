import "@splidejs/splide/dist/css/splide.min.css";
import { Dispatch, FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonWaiting from "../4.lotto/shared/btn.waiting";
import Spinner, { fruitList, getFruit } from "./spinner";

interface FruitSpinProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    btnSmallInfo: JSX.Element;
    choosedFruits: string;
    setChoosedFruits: Dispatch<React.SetStateAction<string>>;
    spinResult: string;
    spinSlot: () => void;
}

const FruitSpin: FunctionComponent<FruitSpinProps> = ({
    alreadyPurchased,
    autoPlay,
    btnSmallInfo,
    choosedFruits,
    setChoosedFruits,
    spinResult,
    spinSlot,
}) => {
    const [targetFruit, setTargetFruit] = useState(0);
    const [showFruitModal, setShowFruitModal] = useState(false);

    const getButtonText = () => {
        if (autoPlay) return <ButtonWaiting />;
        if (!alreadyPurchased) return "purchase first";
        else return "Spin";
    };

    return (
        <>
            <div className="drop-box rounded bg-white shadow p-4">
                <h4 className="fw-bold mb-4">
                    <i className="fa-regular fa-circle-2 me-2"></i>
                    Spin
                </h4>
                <p>
                    {btnSmallInfo}
                    Choose your fruits then hit Spin button
                    <i
                        className="fa-solid fa-shuffle ms-3 pointer text-dark"
                        onClick={() => setChoosedFruits(randomFruits())}
                    ></i>
                </p>
                <div className="d-flex justify-content-between">
                    {[...Array(6)].map((_v, i) => (
                        <div
                            key={i}
                            className="p-1 rounded display-6 border border-3 border-dark pointer"
                            onClick={() => {
                                setShowFruitModal(true);
                                setTargetFruit(i);
                            }}
                        >
                            {getFruit(Number(choosedFruits[i]))}
                        </div>
                    ))}
                </div>
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

            <Modal
                show={showFruitModal}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                        Choose Fruit
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between flex-wrap">
                        {fruitList.map((f, i) => (
                            <span
                                key={i}
                                className="rounded p-3 display-4 pointer"
                                onClick={() => {
                                    const str = choosedFruits.replaceAt(
                                        targetFruit,
                                        i.toString()
                                    );
                                    setChoosedFruits(str);
                                    setShowFruitModal(false);
                                }}
                            >
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

const randomFruits = () => {
    const chars = "0123456789";
    let result = "";
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
