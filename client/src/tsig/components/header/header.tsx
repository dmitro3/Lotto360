import { Dispatch, FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../content/img/logococo.png";
import logo2 from "../../content/img/logohead.png";
import { ActionModel, ReducerActions } from "../../reducer/reducer";
import Wallet from "./wallet";

interface HeaderProps {
    address?: string;
    dispatch: Dispatch<ActionModel<ReducerActions>>;
    isAdmin: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ address, dispatch, isAdmin }) => {
    return (
        <header className="header clearfix element_to_stick">
            <div className="layer"></div>
            <div className="container">
                <div className="logo">
                    <NavLink
                        to="/"
                        className="d-flex h-100 justify-content-center align-items-center"
                    >
                        <img src={logo} alt="logo" height="45" className="dark" />
                        <span className="ms-2 text-white fw-bold">Trade signal</span>
                    </NavLink>
                </div>

                <a href="#0" className="open_close">
                    <i className="bi bi-list"></i>
                    <span>Menu</span>
                </a>
                <nav className="main-menu">
                    <div id="header_menu">
                        <a href="#0" className="open_close">
                            <i className="bi bi-x"></i>
                        </a>
                        <a href="/" className="logo_menu">
                            <img
                                src={logo2}
                                data-src="img/logo.svg"
                                alt=""
                                height="120"
                                className="dark lazy"
                            />
                        </a>
                        <div className="border-bottom border-dark pb-4"></div>
                    </div>
                    <ul>
                        {isAdmin && (
                            <li>
                                <NavLink to="/admin">
                                    <button className="btn btn-sm btn_access">
                                        Dashboard
                                    </button>
                                </NavLink>
                            </li>
                        )}
                        <Wallet address={address} dispatch={dispatch} />
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
