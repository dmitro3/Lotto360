import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import logo from "../contents/images/main-logo.svg";

interface GameSelectProps {}

const GameSelect: FunctionComponent<GameSelectProps> = () => {
    const linkClass =
        "rounded bg-select-game shadow p-3 my-2 mx-4 text-decoration-none text-black";

    return (
        <div className="min-height bg5">
            <div className="container pt-5 d-flex justify-content-center align-items-center flex-column">
                <img src={logo} alt="lotto360" className="main-logo" />
                <h3 className="fw-bold my-4">Choose a game to play</h3>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <NavLink to="/dice" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Dice 🎲</h6>
                            <span>X8 profit</span>
                        </div>
                    </NavLink>
                    <NavLink to="/666" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Number of the Beast 😈</h6>
                            <span>X25 profit</span>
                        </div>
                    </NavLink>
                    <NavLink to="/fruit" className={linkClass}>
                        <div>
                            <h6 className="fw-bold">Fruitland 🍑</h6>
                            <span>X100 profit</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default GameSelect;
