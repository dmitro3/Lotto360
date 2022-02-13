import { FunctionComponent } from "react";
import fruitlandLogo from "../../contents/images/title-fruit.svg";

interface FruitHeaderProps {
    multiplier: number;
}

const FruitHeader: FunctionComponent<FruitHeaderProps> = ({ multiplier }) => {
    return (
        <div>
            <img
                className="title-fruit text-center mb-0 mx-auto d-block"
                src={fruitlandLogo}
                alt="fruitland logo"
            />
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
