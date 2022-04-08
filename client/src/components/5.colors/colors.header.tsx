import { FunctionComponent } from "react";
import colorslandLogo from "../../contents/images/title-colors.svg";

interface ColorsHeaderProps {
    multiplier: number;
}

const ColorsHeader: FunctionComponent<ColorsHeaderProps> = ({ multiplier }) => {
    return (
        <div>
            <img className="title-colors text-center mb-0 mx-auto d-block" src={colorslandLogo} alt="colorsland logo" />
            <p className="text-center fs-5 text-black fw-bold mb-3">
                <span>
                    <i className="fa-solid fa-circle-1 me-2"></i>Purchase spin
                </span>
                <span className="mx-3">
                    <i className="fa-solid fa-circle-2 me-2"></i>Choose your color
                </span>
                <span>
                    <i className="fa-solid fa-circle-3 me-2"></i>Get x{multiplier} prize
                </span>
            </p>
        </div>
    );
};

export default ColorsHeader;
