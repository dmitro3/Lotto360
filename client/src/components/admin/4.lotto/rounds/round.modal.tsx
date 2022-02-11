import moment from "moment";
import { FunctionComponent } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Datetime from "react-datetime";
import { HelperApiService } from "../../../../api/helper.api.service";
import { GetRoundApiModel, PoolAttrs } from "../../../../api/models/round.model";
import ButtonWaiting from "../../../4.lotto/shared/btn.waiting";

interface RoundModalProps {
    changeRoundValues: Function;
    formValues: GetRoundApiModel;
    handleModalClose: Function;
    handleModalSubmit: Function;
    isUpdate?: boolean;
    isWaiting: boolean;
    showModal: boolean;
    title: string;
}

const RoundModal: FunctionComponent<RoundModalProps> = ({
    changeRoundValues,
    formValues,
    handleModalClose,
    handleModalSubmit,
    isUpdate = false,
    isWaiting,
    showModal,
    title,
}) => {
    const { endTime, bonusBnbAmount, bnbAddedFromLastRound, ticketPrice, pools } =
        formValues;
    if (!pools || pools.length === 0) return <></>;
    return (
        <Modal
            size="lg"
            scrollable
            // backdrop="static"
            show={showModal}
            onHide={handleModalClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
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
                            // utc={true}
                            onChange={(value) => {
                                if (typeof value === "string") return;
                                changeRoundValues({
                                    ...formValues,
                                    endTime: value.unix(),
                                });
                            }}
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
                            disabled={isUpdate}
                            type="number"
                            min={0}
                            placeholder="Ticket price in bnb"
                            value={ticketPrice}
                            onChange={(e) => {
                                changeRoundValues({
                                    ...formValues,
                                    ticketPrice: e.target.value,
                                });
                            }}
                        />
                    </Col>
                </Form.Group>
                {/* bnb from last round */}
                <Form.Group as={Row} className="mb-3" controlId="LastRoundBnb">
                    <Form.Label column sm="2">
                        Last round bnb
                    </Form.Label>
                    {isUpdate ? (
                        <Col sm="10">
                            <Form.Control
                                disabled
                                value={bnbAddedFromLastRound}
                                type="number"
                            />
                        </Col>
                    ) : (
                        <>
                            <Col sm="8">
                                <Form.Control
                                    value={bnbAddedFromLastRound}
                                    type="number"
                                    min={0}
                                    placeholder="Bnb add from last round"
                                    onChange={(e) => {
                                        changeRoundValues({
                                            ...formValues,
                                            bnbAddedFromLastRound: e.target.value,
                                        });
                                    }}
                                />
                            </Col>
                            <Col sm="2">
                                <Button
                                    variant="warning"
                                    type="button"
                                    onClick={() => {
                                        HelperApiService.getRemainingBnb()
                                            .then((res) => {
                                                if (res && res.data && res.data.result) {
                                                    changeRoundValues({
                                                        ...formValues,
                                                        bnbAddedFromLastRound:
                                                            res.data.result,
                                                    });
                                                }
                                            })
                                            .then((err) => console.log(err));
                                    }}
                                >
                                    Calculate
                                </Button>
                            </Col>
                        </>
                    )}
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="BonusBnbAmount">
                    <Form.Label column sm="2">
                        Bonus bnb added
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            value={bonusBnbAmount}
                            type="number"
                            min={0}
                            placeholder="Bonus bnb to add"
                            onChange={(e) => {
                                changeRoundValues({
                                    ...formValues,
                                    bonusBnbAmount: e.target.value,
                                });
                            }}
                        />
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
                            value={pools[0].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 0)
                                );
                            }}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 2
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[1].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 1)
                                );
                            }}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 3
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[2].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 2)
                                );
                            }}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="pool2">
                    <Form.Label column sm="2">
                        Match 4
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[3].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 3)
                                );
                            }}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 5
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[4].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 4)
                                );
                            }}
                        />
                    </Col>
                    <Form.Label column sm="2">
                        Match 6
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[5].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 5)
                                );
                            }}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="treasury">
                    <Form.Label column sm="2">
                        Treasury
                    </Form.Label>
                    <Col sm="2">
                        <Form.Control
                            value={pools[6].percentage}
                            type="number"
                            min={0}
                            placeholder="%"
                            onChange={(e) => {
                                changeRoundValues(
                                    generatePool(formValues, e.target.value, 6)
                                );
                            }}
                        />
                    </Col>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleModalClose()}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    disabled={isWaiting}
                    onClick={() => handleModalSubmit(formValues)}
                >
                    {isWaiting ? <ButtonWaiting /> : "submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RoundModal;

function generatePool(formValues: GetRoundApiModel, value: string, index: number) {
    let pl: PoolAttrs[] = [];
    if (formValues.pools) pl = formValues.pools;
    if (value) pl[index].percentage = parseFloat(value);
    else pl[index].percentage = 0;
    return { ...formValues, pools: pl };
}
