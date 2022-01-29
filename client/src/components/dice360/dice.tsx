import { FunctionComponent } from "react";
import "../../contents/styles/dice.css";

interface DiceProps {
    diceNumber?: string;
}

const Dice: FunctionComponent<DiceProps> = ({ diceNumber }) => {
    return (
        <div className="container-dice mb-3">
            <div id="cube" className={getRotateBaseOnNumber(diceNumber)}>
                <div className="front">
                    <span className="dot dot1"></span>
                </div>
                <div className="back">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                </div>
                <div className="right">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                </div>
                <div className="left">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                </div>
                <div className="top">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                    <span className="dot dot5"></span>
                </div>
                <div className="bottom">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                    <span className="dot dot5"></span>
                    <span className="dot dot6"></span>
                </div>
            </div>
        </div>
    );
};

export default Dice;

const getRotateBaseOnNumber = (num?: string) => {
    if (num === "1") return "dice1";
    else if (num === "2") return "dice2";
    else if (num === "3") return "dice3";
    else if (num === "4") return "dice4";
    else if (num === "5") return "dice5";
    else if (num === "6") return "dice6";
    else if (num === "0") return "roll";
    else return "";
};
