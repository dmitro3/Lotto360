import { Dispatch, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../contents/images/horizontal-logo.png";
import { ActionModel, LottoActions } from "../../../reducer/reducer";
import Menu from "./menu";
import Wallet from "./wallet";

interface HeaderProps {
    address?: string;
    dispatch: Dispatch<ActionModel<LottoActions>>;
}

const Header: FunctionComponent<HeaderProps> = ({ address, dispatch }) => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-white border-0 shadow">
            <div className="container-fluid">
                <NavLink className="navbar-brand megering d-flex justify-content-between align-items-center" to="/">
                    <img src={logo} alt="logo" className="logo-hor" />
                </NavLink>
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
