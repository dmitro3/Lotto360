import { FunctionComponent } from "react";
import diceLogo from "../../contents/images/title-dice.svg";

interface DiceHeaderProps {
    multiplier: number;
}

const DiceHeader: FunctionComponent<DiceHeaderProps> = ({ multiplier }) => {
    return (
        <>
            <img
                className="title-fruit text-center mb-2 mx-auto d-block"
                src={diceLogo}
                alt="dice logo"
            />
            <p className="text-center fs-5 text-light fw-bold mb-3">
                <span>
                    <i className="fa-solid fa-circle-1 me-2"></i>Purchase roll
                </span>
                <span className="mx-3">
                    <i className="fa-solid fa-circle-2 me-2"></i>Drop dice
                </span>
                <span>
                    <i className="fa-solid fa-circle-3 me-2"></i>Get x{multiplier} prize
                </span>
            </p>
        </>
    );
};

export default DiceHeader;
