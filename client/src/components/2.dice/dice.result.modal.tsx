import moment from "moment";
import { Dispatch, FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import Web3 from "web3";
import { Roll } from "../../interfaces/roll";
import { simplifyString } from "../../utilities/string.numbers.util";

interface DiceResultModalProps {
    roll: Roll;
    showModal: boolean;
    setShowModal: Dispatch<any>;
}

const DiceResultModal: FunctionComponent<DiceResultModalProps> = ({ roll, showModal, setShowModal }) => {
    return (
        <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Roll information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="fw-bold"># {roll.id}</h4>
                <div className="d-flex justify-content-between">
                    <span>User: </span>
                    <span className="fw-bold">{simplifyString(roll.user)}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Amount: </span>
                    <span className="fw-bold">{Web3.utils.fromWei(roll.amount, "ether")}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Purchase time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(roll.purchaseTime) * 1000).format("DD/MM/YYYY - h:mm:ss a")}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Roll time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(roll.rollTime) * 1000).format("DD/MM/YYYY - h:mm:ss a")}
                    </span>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <span>Guessed number: </span>
                    <span className="fw-bold">
                        <i className={`text-dark fa-solid fa-2xl fa-dice-${numberToText(roll.guess)}`}></i>
                    </span>
                </div>
                <hr />
                <div
                    className={`text-center fs-4 fw-bold mt-2 d-flex justify-content-between align-items-center ${
                        roll.guess === roll.result ? "text-success" : "text-danger"
                    }`}
                >
                    Result: <i className={`fa-solid fa-xl ms-2 fa-dice-${numberToText(roll.result)}`}></i>
                    {roll.guess !== roll.result ? (
                        <i className="ms-3 fa-solid fa-heart-crack"></i>
                    ) : (
                        <i className="ms-3 fa-solid fa-gem"></i>
                    )}
                </div>

                {roll.guess === roll.result && (
                    <div className="text-center fs-6 fw-bold mt-2 text-dark">
                        {calculatePrize(roll).toFixed(6)} BNB sent to your wallet
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-success" onClick={() => setShowModal(undefined)}>
                    ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DiceResultModal;

const calculatePrize = (roll: Roll) => {
    const amount = parseFloat(Web3.utils.fromWei(roll.amount, "ether"));

    return (amount - (amount / 100) * parseInt(roll.ctFee)) * parseInt(roll.multiplier);
};

export const numberToText = (number: string) => {
    if (number === "1") return "one";
    if (number === "2") return "two";
    if (number === "3") return "three";
    if (number === "4") return "four";
    if (number === "5") return "five";
    if (number === "6") return "six";
};
