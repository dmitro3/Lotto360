import { FunctionComponent, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Web3 from "web3";
import { Spin as ISpin } from "../../../interfaces/spin";
import { beastAdminChainMethods } from "../../../provider/chain.methods/beast";
import { formatedTime, relativeTime } from "../../../utilities/string.numbers.util";
import BeastResultModal from "../../1.666/666.result.modal";
import ButtonWaiting from "../../4.lotto/shared/btn.waiting";

interface SpinProps {
    address: string;
    web3: Web3;
}

const Spin: FunctionComponent<SpinProps> = ({ address, web3 }) => {
    const [userAddress, setUserAddress] = useState("");
    const [searchButtonLoading, setSearchButtonLoading] = useState(false);
    const [selectedSpin, setSelectedSpin] = useState<ISpin>();
    const [spins, setSpins] = useState<ISpin[]>();

    useEffect(() => {
        beastAdminChainMethods
            .getSpins(address, web3)
            .then((res) => res && setSpins(res))
            .catch((err) => console.error(err));
    }, [address, web3]);

    const getSpinsByUserAddress = () => {
        setSearchButtonLoading(true);
        if (Number(userAddress)) {
            beastAdminChainMethods
                .getSpinById(address, userAddress, web3)
                .then((res) => res && setSpins(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        } else if (userAddress) {
            beastAdminChainMethods
                .getUserSpins(address, userAddress, web3)
                .then((res) => res && setSpins(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        } else {
            beastAdminChainMethods
                .getSpins(address, web3)
                .then((res) => res && setSpins(res))
                .catch((err) => console.error(err))
                .finally(() => setSearchButtonLoading(false));
        }
    };

    return (
        <>
            <h4 className="fw-bold mb-3 d-flex">Spins:</h4>
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
                        onClick={() => getSpinsByUserAddress()}
                    >
                        {searchButtonLoading ? <ButtonWaiting /> : "search"}
                    </button>
                </div>
            </div>

            {spins ? (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Id</th>
                            <th>User</th>
                            <th>Amount</th>
                            <th>Purchase time</th>
                            <th>Result</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spins.map((r, i) => (
                            <tr key={i}>
                                <td>{r.id}</td>
                                <td>{r.user}</td>
                                <td>{Web3.utils.fromWei(r.amount, "ether")}</td>
                                <td title={formatedTime(r.purchaseTime)}>
                                    {relativeTime(r.purchaseTime)}
                                </td>
                                <td
                                    className={
                                        r.result.substring(1) === "666"
                                            ? "text-success"
                                            : "text-danger"
                                    }
                                >
                                    {r.result.substring(1)}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setSelectedSpin(r)}
                                    >
                                        info
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <span className="fw-bold text-info">No spin found</span>
            )}

            {selectedSpin && (
                <BeastResultModal
                    spin={selectedSpin}
                    showModal={!!selectedSpin}
                    setShowModal={setSelectedSpin}
                />
            )}
        </>
    );
};

export default Spin;
