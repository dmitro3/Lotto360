import { FunctionComponent } from "react";

interface BeastHeaderProps {
    multiplier: number;
}

const BeastHeader: FunctionComponent<BeastHeaderProps> = ({ multiplier }) => {
    return (
        <div>
            <h1 className="text-center text-light big-title letter-space">666</h1>
            <h2 className="pb-3 text-center text-light fw-bold">Number of the Beast</h2>
            <p className="text-center fs-5 text-light fw-bold mb-3">
                <span>
                    <i className="fa-solid fa-circle-1 me-2"></i>Purchase spin
                </span>
                <span className="mx-3">
                    <i className="fa-solid fa-circle-2 me-2"></i>Spin to get 666
                </span>
                <span>
                    <i className="fa-solid fa-circle-3 me-2"></i>Get x{multiplier} prize
                </span>
            </p>
        </div>
    );
};

export default BeastHeader;
