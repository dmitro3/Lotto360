import { FunctionComponent } from "react";

interface FruitHeaderProps {
    multiplier: number;
}

const FruitHeader: FunctionComponent<FruitHeaderProps> = ({ multiplier }) => {
    return (
        <div>
            <h1 className="text-center text-black big-title letter-space mb-0">
                Fruitland
            </h1>
            <p className="text-center fs-5 text-black fw-bold mb-3">
                <span>
                    <i className="fa-solid fa-circle-1 me-2"></i>Purchase spin
                </span>
                <span className="mx-3">
                    <i className="fa-solid fa-circle-2 me-2"></i>Choose your fruits
                </span>
                <span>
                    <i className="fa-solid fa-circle-3 me-2"></i>Get x{multiplier} prize
                </span>
            </p>
        </div>
    );
};

export default FruitHeader;
