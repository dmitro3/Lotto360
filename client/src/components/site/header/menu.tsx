/* eslint-disable jsx-a11y/anchor-is-valid */
import { FunctionComponent } from "react";

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <a className="nav-link">
                    Buy ticket
                    <span className="visually-hidden">(current)</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link">Check for win</a>
            </li>
            <li className="nav-item">
                <a className="nav-link">History</a>
            </li>
            <li className="nav-item">
                <a className="nav-link">How to play</a>
            </li>
        </ul>
    );
};

export default Menu;
