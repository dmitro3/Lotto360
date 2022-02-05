import { FunctionComponent, useState } from "react";
import ButtonWaiting from "../4.lotto360/shared/btn.waiting";

interface DiceRollProps {
    alreadyPurchased: boolean;
    btnSmallInfo: JSX.Element;
    buttonLoading: boolean;
    rollDice: (n: number) => void;
}

const diceClass = "fa-solid pointer fs-1";

const DiceRoll: FunctionComponent<DiceRollProps> = ({
    alreadyPurchased,
    btnSmallInfo,
    buttonLoading,
    rollDice,
}) => {
    const [choosedDice, setChoosedDice] = useState<number | undefined>();

    const getButtonText = () => {
        if (buttonLoading) return <ButtonWaiting />;
        if (!alreadyPurchased) return "purchase first";
        else if (!choosedDice) return "choose number";
        else return "drop";
    };

    const handleDiceClick = (number: number) => {
        choosedDice === number ? setChoosedDice(undefined) : setChoosedDice(number);
    };

    return (
        <div
            className={`drop-box rounded bg-white shadow p-4 ${
                !alreadyPurchased ? "opacity-75" : ""
            } d-flex flex-column justify-content-between`}
        >
            <h4 className="fw-bold mb-4">
                <i className="fa-regular fa-circle-2 me-2"></i>
                Drop dice
            </h4>
            <p>
                {btnSmallInfo}
                Choose a number then hit Drop button
            </p>
            <div className="d-flex justify-content-around my-3 mt-4">
                {[1, 2, 3, 4, 5, 6].map((num, i) => (
                    <i
                        key={i}
                        onClick={() => handleDiceClick(num)}
                        className={`${diceClass} dice fa-dice-${numberToWord(
                            num
                        )} ${active(num, choosedDice)}`}
                    ></i>
                ))}
            </div>
            <button
                disabled={!choosedDice || !alreadyPurchased || buttonLoading}
                type="button"
                className="btn btn-success btn-lg w-100 mt-3"
                onClick={() => choosedDice && rollDice(choosedDice)}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default DiceRoll;

const active = (number: number, diceNumber?: number) =>
    diceNumber === number ? "active " : "";

export const numberToWord = (n: number) => {
    if (n === 1) return "one";
    else if (n === 2) return "two";
    else if (n === 3) return "three";
    else if (n === 4) return "four";
    else if (n === 5) return "five";
    else return "six";
};
