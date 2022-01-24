import moment from "moment";
import Web3 from "web3";
import { Button, Modal } from "react-bootstrap";
import { Dispatch, FunctionComponent } from "react";
import { Spin } from "../../interfaces/spin";

interface BeastResultModalProps {
    spin: Spin;
    showModal: boolean;
    setShowModal: Dispatch<any>;
}

const BeastResultModal: FunctionComponent<BeastResultModalProps> = ({
    spin,
    showModal,
    setShowModal,
}) => {
    const result = spin.result.substring(1);

    return (
        <Modal show={showModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Spin information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className="fw-bold"># {spin.id}</h4>
                <div className="d-flex justify-content-between">
                    <span>User: </span>
                    <span className="fw-bold">{spin.user}</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Amount: </span>
                    <span className="fw-bold">
                        {Web3.utils.fromWei(spin.amount, "ether")}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Purchase time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(spin.purchaseTime) * 1000).format(
                            "Do MMMM YYYY, h:mm:ss a"
                        )}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Spin time: </span>
                    <span className="fw-bold">
                        {moment(parseInt(spin.spinTime) * 1000).format(
                            "Do MMMM YYYY, h:mm:ss a"
                        )}
                    </span>
                </div>
                <hr />
                <div
                    className={`text-center fs-4 fw-bold mt-2 ${
                        "666" === result ? "text-success" : "text-danger"
                    }`}
                >
                    Result: {result}
                    {"666" !== result ? (
                        <i className="ms-3 fa-solid fa-heart-crack"></i>
                    ) : (
                        <i className="ms-3 fa-solid fa-gem"></i>
                    )}
                </div>

                {"666" === result && (
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

export default BeastResultModal;

const calculatePrize = (spin: Spin) => {
    const amount = parseFloat(Web3.utils.fromWei(spin.amount, "ether"));

    return (amount - (amount / 100) * parseInt(spin.ctFee)) * parseInt(spin.multiplier);
};
