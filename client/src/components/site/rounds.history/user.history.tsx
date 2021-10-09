import moment from "moment";
import { FunctionComponent, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { flexItemsCenter } from "../constants/classes";

interface UserHistoryProps {}

const UserHistory: FunctionComponent<UserHistoryProps> = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);
    return (
        <>
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
                                <th scope="col"># Round</th>
                                <th scope="col">Draw Time</th>
                                <th scope="col">Your Tickets</th>
                                <th scope="col">Winning Tickets</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(100)].map((_num, i) => (
                                <tr key={i} className="table-active">
                                    <th scope="row">{`# ${i + 1}`}</th>
                                    <td>
                                        {moment(1633242758504).format(
                                            "MMMM Do, YYYY, h:mm a"
                                        )}
                                    </td>
                                    <td>{i * 3}</td>
                                    <td>{0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserHistory;
