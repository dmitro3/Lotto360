import { FunctionComponent, useState } from "react";
import { BounceLoader } from "react-spinners";

interface TransferProps {
    loading: boolean;
    onClick: (address: string, amount: string) => void;
}

const Transfer: FunctionComponent<TransferProps> = ({ loading, onClick }) => {
    const [reciever, setReciever] = useState("0x");
    const [amount, setAmount] = useState("0");

    const handleClick = () => onClick(reciever, amount);

    return (
        <>
            <div className="row g-0 custom-search-input mx-auto">
                <div className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Reciever address"
                        value={reciever}
                        disabled={loading}
                        onChange={(e) => setReciever(e.currentTarget.value)}
                    />
                </div>
            </div>

            <div className="row g-0 custom-search-input mx-auto">
                <div className="col-md-9">
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Enter bnb amount"
                            value={amount}
                            disabled={loading}
                            onChange={(e) => setAmount(e.currentTarget.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <button
                        className="btn btn-purchase d-flex align-items-center justify-content-center"
                        disabled={loading}
                        onClick={() => handleClick()}
                    >
                        {loading ? <BounceLoader color="#fff" size={30} /> : "Transfer"}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Transfer;
