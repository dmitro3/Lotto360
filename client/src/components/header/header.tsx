import { Dispatch, FunctionComponent } from "react";
import { ActionModel, LottoActions } from "../../reducer/reducer";
import Menu from "./menu";
import Wallet from "./wallet";

interface HeaderProps {
    address?: string;
    dispatch: Dispatch<ActionModel<LottoActions>>;
}

const Header: FunctionComponent<HeaderProps> = ({ address, dispatch }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <a
                    className="navbar-brand megering d-flex justify-content-between align-items-center"
                    href="/"
                >
                    <b className="big-logo me-2">LOTTO</b>
                    <i className="fa-solid fa-360-degrees fa-xl"></i>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <Menu />
                    <div className="d-flex">
                        <Wallet address={address} dispatch={dispatch} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
