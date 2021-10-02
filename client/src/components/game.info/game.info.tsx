import { FunctionComponent } from "react";
import Funds from "./Funds";
import HowtoPlay from "./how.to.play";
import Rules from "./rule";

interface GameInfoProps {}

const GameInfo: FunctionComponent<GameInfoProps> = () => {
    return (
        <div className="bg-game-info p-5">
            <h2 className="text-center fw-bold text-white text-shadow mb-5">
                Informations!
            </h2>
            <div className="container min-height bg-light rounded shadow px-5 pb-5">
                <HowtoPlay />
                <div className="history-divide my-5"></div>
                <Rules />
                <div className="history-divide my-5"></div>
                <Funds />
            </div>
        </div>
    );
};

export default GameInfo;
