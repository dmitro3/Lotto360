import { FunctionComponent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PrizePerMatch from "../shared/prize.per.match";
import TimeAndTotalAmount from "../shared/time.total.amount";
import RoundNumberSelector from "./round.number.selector";

interface RoundsHistoryProps {
    historyAmount: number;
}

const fakeNumberArray = ["456787", "889356", "342267", "009988", "567894"];
const flexItemsCenter = "d-flex justify-content-center align-items-center";

const RoundsHistory: FunctionComponent<RoundsHistoryProps> = ({ historyAmount }) => {
    const [isHide, setIsHide] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    return (
        <div className="bg-dark p-5 position-relative">
            <h2 className="text-center fw-bold text-white text-shadow">
                Checkout previous rounds!
            </h2>
            <div className={`text-center text-white mt-3 ${flexItemsCenter}`}>
                <span className="me-3 fw-bold fs-3 text-shadow text-info">758</span>
                <span className="fs-5 fw-bold text-shadow">total rounds</span>
            </div>

            <div className={flexItemsCenter}>
                <button onClick={handleModalShow} className="btn btn-primary mt-3">
                    Your history
                </button>
            </div>
            <Modal size="lg" scrollable show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your history</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-hover table-bordered rounded table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Column heading</th>
                                <th scope="col">Column heading</th>
                                <th scope="col">Column heading</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-active">
                                <th scope="row">Active</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Default</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Primary</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Secondary</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Success</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Danger</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Warning</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Info</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Light</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                            <tr>
                                <th scope="row">Dark</th>
                                <td>Column content</td>
                                <td>Column content</td>
                                <td>Column content</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container bg-white rounded shadow p-4 mt-4 mb-5">
                <div className="text-center">
                    <span className="badge rounded-pill bg-success mb-2 fs-6">
                        latest round
                    </span>
                </div>

                <RoundNumberSelector number={900} />
                <TimeAndTotalAmount totalAmount={800} time={566666666} />
                <PrizePerMatch amount={historyAmount} percentages={[]} />

                <div className={`${flexItemsCenter} mt-3`}>
                    <i className="fa-duotone fa-users me-2 fa-lg"></i>
                    <span className="fs-5 fw-bold me-2">Total players:</span>
                    <span className="fs-5 text-dark">4567</span>
                </div>

                <div className="dashed my-5"></div>

                <div className={`${flexItemsCenter} mb-3 fs-4`}>
                    <i className="fa-duotone fa-ticket me-2 text-warning"></i>
                    <span className="fw-bold">Your tickets (5)</span>
                    <i
                        onClick={() => {
                            console.info("object");
                            setIsHide(!isHide);
                        }}
                        className={
                            isHide
                                ? "fa-duotone fa-eye-slash ms-2 text-muted pointer"
                                : "fa-duotone fa-eye ms-2 text-success pointer"
                        }
                        title="toggle view"
                    ></i>
                </div>

                <div className={`flex-wrap ${flexItemsCenter}`}>
                    {fakeNumberArray.map((number, i) => (
                        <div key={i} className={`ticket ${flexItemsCenter}`}>
                            <span
                                className={`fs-4 font-monospace fw-bold ${
                                    isHide && "text-blur"
                                }`}
                            >
                                {number}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5 border-transparent"></div>
            <div className="divider-history"></div>
        </div>
    );
};

export default RoundsHistory;
