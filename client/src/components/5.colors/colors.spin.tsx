import { Dispatch, FunctionComponent, useState } from "react";
import { Modal } from "react-bootstrap";
import SpinnerColors from "./spinner";

interface ColorsSpinProps {
    alreadyPurchased: boolean;
    autoPlay: boolean;
    btnSmallInfo: JSX.Element;
    choosedColor: string;
    setChoosedcolor: Dispatch<React.SetStateAction<string>>;
    spinResult: string;
    handleSpin: () => void;
}

const colorsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const ColorsSpin: FunctionComponent<ColorsSpinProps> = ({
    alreadyPurchased,
    autoPlay,
    btnSmallInfo,
    choosedColor,
    setChoosedcolor,
    spinResult,
    handleSpin,
}) => {
    const [targetColor, setTargetColor] = useState(0);
    const [showColorsModal, setShowColorsModal] = useState(false);

    return (
        <>
            <div className="drop-box rounded bg-white shadow p-4">
                <h4 className="fw-bold mb-4">
                    <i className="fa-regular fa-circle-2 me-2"></i>
                    Spin
                </h4>
                <p>
                    {btnSmallInfo}
                    Choose your color then hit Spin button
                    <i
                        className="fa-solid fa-shuffle ms-3 pointer text-dark"
                        onClick={() => {
                            setChoosedcolor(randomcolor().toString());
                            setTargetColor(randomcolor());
                        }}
                    ></i>
                </p>

                <div className="color-box d-flex justify-content-between">
                    {colorsArray.map((num) => (
                        <span
                            key={num}
                            className={`rounded pointer cl${num} ${targetColor === num ? "active" : ""}`}
                            onClick={() => {
                                setChoosedcolor(num.toString());
                                setTargetColor(num);
                            }}
                        ></span>
                    ))}
                </div>

                <div className="d-flex justify-content-around bg-colors-spiner rounded py-1">
                    <SpinnerColors
                        alreadyPurchased={alreadyPurchased}
                        autoPlay={autoPlay}
                        handleSpin={handleSpin}
                        stopNumber={0}
                    ></SpinnerColors>
                </div>
                <div className="d-flex justify-content-around my-1"></div>
            </div>

            <Modal show={showColorsModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className="fw-bold">
                        Choose Colors
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-between flex-wrap"></div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ColorsSpin;

const randomcolor = () => {
    const chars = "12345678";
    let result = chars[Math.floor(Math.random() * chars.length)];
    return Number(result);
};
