import "@splidejs/splide/dist/css/splide.min.css";
import { Dispatch, FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonWaiting from "../4.lotto/shared/btn.waiting";
import Spinner, { colorsList, getColors } from "./spinner";

interface ColorsSpinProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    btnSmallInfo: JSX.Element;
    choosedColors: string;
    setChoosedColorss: Dispatch<React.SetStateAction<string>>;
    spinResult: string;
    spinSlot: () => void;
}

const ColorsSpin: FunctionComponent<ColorsSpinProps> = ({
    alreadyPurchased,
    autoPlay,
    btnSmallInfo,
    choosedColors,
    setChoosedColorss,
    spinResult,
    spinSlot,
}) => {
    const [targetColors, setTargetColors] = useState(0);
    const [showColorsModal, setShowColorsModal] = useState(false);

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
                    Choose your colorss then hit Spin button
                    <i
                        className="fa-solid fa-shuffle ms-3 pointer text-dark"
                        onClick={() => setChoosedColorss(randomColorss())}
                    ></i>
                </p>
                <div className="d-flex justify-content-between">
                    {[...Array(6)].map((_v, i) => (
                        <div
                            key={i}
                            className="p-1 rounded display-6 border border-3 border-dark pointer"
                            onClick={() => {
                                setShowColorsModal(true);
                                setTargetColors(i);
                            }}
                        >
                            {getColors(Number(choosedColors[i]))}
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-around bg-colors-spiner rounded py-1">
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[1]) : undefined} />
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[2]) : undefined} />
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[3]) : undefined} />
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[4]) : undefined} />
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[5]) : undefined} />
                    <Spinner autoPlay={autoPlay} stopNumber={spinResult ? Number(spinResult[6]) : undefined} />
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

            <Modal show={showColorsModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                        Choose Colors
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between flex-wrap">
                        {colorsList.map((f, i) => (
                            <span
                                key={i}
                                className="rounded p-3 display-4 pointer"
                                onClick={() => {
                                    const str = choosedColors.replaceAt(targetColors, i.toString());
                                    setChoosedColorss(str);
                                    setShowColorsModal(false);
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

export default ColorsSpin;

const randomColorss = () => {
    const chars = "0123456789";
    let result = "";
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};
