import { FunctionComponent, useState } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { flexItemsCenter } from "../constants/classes";

interface RoundNumberSelectorProps {
    number: number;
}

const getWinningNumberClass = (number: number) =>
    `fa-solid fa-square-${number} text-success fa-2xl me-1`;

const RoundNumberSelector: FunctionComponent<RoundNumberSelectorProps> = ({ number }) => {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);
    const handleViewRound = () => {
        // todo implement
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-1 px-5 history-divide pb-3 mb-3">
                <i className="fa-solid fa-angles-left me-2 pointer p-1 px-2 hover-icon rounded"></i>
                <i className="fa-solid fa-angle-left me-2 pointer p-1 px-2 hover-icon rounded"></i>
                <div
                    className={`${flexItemsCenter} badge bg-secondary me-2 pointer`}
                    onClick={handleModalShow}
                >
                    <i className="fa-solid fa-hashtag me-2 fa-lg"></i>
                    <span className="fs-5">{number}</span>
                </div>
                <i className="fa-solid fa-angle-right me-2 pointer p-1 px-2 hover-icon rounded"></i>
                <i className="fa-solid fa-angles-right pointer p-1 px-2 hover-icon rounded"></i>
            </div>

            <div className={flexItemsCenter}>
                <span className="fs-5 fw-bold me-2">Winning numbers:</span>
                <i className={getWinningNumberClass(4)}></i>
                <i className={getWinningNumberClass(6)}></i>
                <i className={getWinningNumberClass(8)}></i>
                <i className={getWinningNumberClass(3)}></i>
                <i className={getWinningNumberClass(2)}></i>
                <i className={getWinningNumberClass(0)}></i>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter round number</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text id="basic-addon1">
                            <i className="fa-solid fa-hashtag fa-lg"></i>
                        </InputGroup.Text>
                        <FormControl
                            type="number"
                            min="1"
                            placeholder="Enter round number"
                            aria-label="Enter round number"
                            aria-describedby="Enter round number"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleViewRound}>
                        View round
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RoundNumberSelector;
