import moment from "moment";
import { Dispatch, FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import Web3 from "web3";
import { FruitSpin } from "../../interfaces/spin";
import { getFruit } from "./spinner";

interface FruitResultModalProps {
    spin: FruitSpin;
    showModal: boolean;
    setShowModal: Dispatch<any>;
}

const FruitResultModal: FunctionComponent<FruitResultModalProps> = ({
    spin,
    showModal,
    setShowModal,
}) => {
    const { id, guess, result, purchaseTime, spinTime, amount, user } = spin;
    return (
        <Modal
            show={showModal || true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Spin information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="fw-bold"># {id}</h4>
                <div className="d-flex justify-content-between">
                    <span>User: </span>
                    <span className="fw-bold">{user}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Amount: </span>
                    <span className="fw-bold">{Web3.utils.fromWei(amount, "ether")}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Purchase time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(purchaseTime) * 1000).format(
                            "DD/MM/YYYY - h:mm a"
                        )}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Spin time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(spinTime) * 1000).format("DD/MM/YYYY - h:mm a")}
                    </span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <span>Guess: </span>
                    <div>
                        {[...Array(6)].map((_val, i) => (
                            <span
                                key={i}
                                style={{ fontSize: "1.5rem" }}
                                className={`m-1 p-1 border border-3 rounded${
                                    guess[i + 1] === result[i + 1]
                                        ? " border-success"
                                        : " border-danger"
                                }`}
                            >
                                {getFruit(Number(guess[i + 1]))}
                            </span>
                        ))}
                    </div>
                </div>
                <hr />
                <div
                    className={`text-center fs-4 fw-bold mt-2 d-flex justify-content-between align-items-center ${
                        guess === result ? "text-success" : "text-danger"
                    }`}
                >
                    Result:{" "}
                    <div>
                        {[...Array(6)].map((_val, i) => (
                            <span
                                key={i}
                                style={{ fontSize: "1.5rem" }}
                                className={`m-1 p-1 border border-3 border-dark rounded`}
                            >
                                {getFruit(Number(result[i + 1]))}
                            </span>
                        ))}
                    </div>
                    {guess !== result ? (
                        <i className="ms-3 fa-solid fa-heart-crack"></i>
                    ) : (
                        <i className="ms-3 fa-solid fa-gem"></i>
                    )}
                </div>

                {guess === result && (
                    <div className="text-center fs-6 fw-bold mt-2 text-dark">
                        {calculatePrize(spin).toFixed(6)} BNB sent to your wallet
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

export default FruitResultModal;

const calculatePrize = (spin: FruitSpin) => {
    const { amount, ctFee, multiplier } = spin;
    const prizeAmount = parseFloat(Web3.utils.fromWei(amount, "ether"));
    return (prizeAmount - (prizeAmount / 100) * parseInt(ctFee)) * parseInt(multiplier);
};
