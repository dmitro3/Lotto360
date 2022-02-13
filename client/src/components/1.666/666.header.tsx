import { FunctionComponent } from "react";
import beastLogo from "../../contents/images/title-beast.svg";

interface BeastHeaderProps {
    multiplier: number;
}

const BeastHeader: FunctionComponent<BeastHeaderProps> = ({ multiplier }) => {
    return (
        <div>
            <img
                className="title-beast text-center mb-2 mx-auto d-block"
                src={beastLogo}
                alt="beast logo"
            />
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
