import moment, { Moment } from "moment";
import { FunctionComponent, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import { GetRoundApiModel } from "../../../api/models/round.model";

interface RoundModalProps {
    formValues: GetRoundApiModel;
    handleModalClose: Function;
    handleModalSubmit: Function;
    showModal: boolean;
}

const RoundModal: FunctionComponent<RoundModalProps> = ({
    formValues,
    handleModalClose,
    handleModalSubmit,
    showModal,
}) => {
    const [state, setstate] = useState(formValues);

    const { endTime, bnbAddedFromLastRound, ticketPrice, pools } = formValues;

    const setTime = (value: string | Moment) => {
        if (typeof value === "string") return;
        console.info(value.unix());
    };

    return (
        <Modal
            size="lg"
            scrollable
            backdrop="static"
            show={showModal}
            onHide={handleModalClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create Round</Modal.Title>
            </Modal.Header>
            <Modal.Body className="vh-50">
                {/* end time */}
                <Form.Group as={Row} className="mb-3" controlId="EndTime">
                    <Form.Label column sm="2">
                        End time
                    </Form.Label>
                    <Col sm="10">
                        <Datetime
                            dateFormat="dddd, MMM Do, YYYY"
                            value={moment.unix(endTime)}
                            utc={true}
                            onChange={(value) => setTime(value)}
                        />
                    </Col>
                </Form.Group>
                {/* ticket price */}
                <Form.Group as={Row} className="mb-3" controlId="TicketPrice">
                    <Form.Label column sm="2">
                        Ticket price
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="number"
                            min={0}
                            placeholder="Ticket price in bnb"
                            value={ticketPrice}
                        />
                    </Col>
                </Form.Group>
                {/* bnb from last round */}
                <Form.Group as={Row} className="mb-3" controlId="LastRoundBnb">
                    <Form.Label column sm="2">
                        Last round bnb
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            value={bnbAddedFromLastRound}
                            type="number"
                            min={0}
                            placeholder="Bnb add from last round"
                        />
                    </Col>
                    <Col sm="2">
                        <Button variant="warning" type="button">
                            Calculate
                        </Button>
                    </Col>
                </Form.Group>
                {/* pools - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */}
                <hr />
                <h6 className="fw-bold">Pools</h6>
                {/* 1match */}
                <Form.Group as={Row} className="mb-3" controlId="pool1">
                    <Form.Label column sm="2">
                        Match 1
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![0].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 2
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![1].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 3
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![2].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="pool2">
                    <Form.Label column sm="2">
                        Match 4
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![3].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 5
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![4].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 6
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![5].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="treasury">
                    <Form.Label column sm="2">
                        Treasury
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools![6].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => console.info(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModalClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleModalSubmit()}>
                    submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoundModal;
