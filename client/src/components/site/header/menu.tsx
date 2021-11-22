import { FunctionComponent } from "react";

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
    return (
        <ul className="navbar-nav me-auto text-uppercase">
            <li className="nav-item">
                <a className="nav-link" href="#buy-ticket">
                    Buy ticket
                    <span className="visually-hidden">(current)</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#check-win">
                    Check for win
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#history">
                    History
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#how-to">
                    How to play
                </a>
            </li>
        </ul>
    );
};

export default Menu;
