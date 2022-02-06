import { FunctionComponent } from "react";

interface DiceHeaderProps {
    multiplier: number;
}

const DiceHeader: FunctionComponent<DiceHeaderProps> = ({ multiplier }) => {
    return (
        <>
            <h1 className="pt-0 text-center text-black big-title">Dice</h1>
            <p className="text-center fs-5 text-black fw-bold mb-3">
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
