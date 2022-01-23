import moment from "moment";
import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Web3 from "web3";
import { Roll as IRoll } from "../../../interfaces/roll";
import { dice360AdminChainMethods } from "../../../provider/chain.methods/dice360";
import DiceResultModal from "../../dice360/dice.result.modal";
import ButtonWaiting from "../../lotto360/shared/btn.waiting";

interface RollProps {
    address: string;
    web3: Web3;
}

const Roll: FunctionComponent<RollProps> = ({ address, web3 }) => {
    const [userAddress, setUserAddress] = useState("");
    const [searchButtonLoading, setSearchButtonLoading] = useState(false);
    const [selectedRoll, setSelectedRoll] = useState<IRoll>();
    const [rolls, setRolls] = useState<IRoll[]>();

    useEffect(() => {
        dice360AdminChainMethods
            .getRolls(address, web3)
            .then((res) => res && setRolls(res))
            .catch((err) => console.error(err));
    }, [address, web3]);

    const getRollsByUserAddress = () => {
        setSearchButtonLoading(true);
        if (Number(userAddress)) {
            dice360AdminChainMethods
                .getRollById(address, userAddress, web3)
                .then((res) => res && setRolls(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        } else if (userAddress) {
            dice360AdminChainMethods
                .getUserRolls(address, userAddress, web3)
                .then((res) => res && setRolls(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        } else {
            dice360AdminChainMethods
                .getRolls(address, web3)
                .then((res) => res && setRolls(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        }
    };

    return (
        <>
            <h4 className="fw-bold mb-3 d-flex">Rolls:</h4>
            <div className="d-flex col col-4 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="input-group mb-3">
                    <input
                        disabled={searchButtonLoading}
                        type="text"
                        className="form-control"
                        placeholder="Enter address"
                        aria-label="Enter address"
                        aria-describedby="button-addon2"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                    />
                    <button
                        disabled={searchButtonLoading}
                        className="btn btn-primary"
                        type="button"
                        id="button-addon2"
                        onClick={() => getRollsByUserAddress()}
                    >
                        {searchButtonLoading ? <ButtonWaiting /> : "search"}
                    </button>
                </div>
            </div>

            {rolls ? (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Purchase time</th>
                            <th>Guess</th>
                            <th>Result</th>
                            <th>info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rolls.map((r, i) => (
                            <tr key={i}>
                                <td>{r.id}</td>
                                <td>{r.user}</td>
                                <td>{Web3.utils.fromWei(r.amount, "ether")}</td>
                                <td>
                                    {moment(parseInt(r.purchaseTime) * 1000).format(
                                        "DD/MM/YYYY - hh:mm:ss"
                                    )}
                                </td>
                                <td>{r.guess}</td>
                                <td>{r.result}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedRoll(r)}
                                    >
                                        info
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <span className="fw-bold text-info">No roll found</span>
            )}

            {selectedRoll && (
                <DiceResultModal
                    roll={selectedRoll}
                    showModal={!!selectedRoll}
                    setShowModal={setSelectedRoll}
                />
            )}
        </>
    );
};

export default Roll;
