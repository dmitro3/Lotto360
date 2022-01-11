import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

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
            <li className="nav-item dropdown">
                <span
                    className="nav-link dropdown-toggle bg6 rounded text-black"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    othe games
                </span>
                <ul
                    className="dropdown-menu rounded overflow-hidden border-dark bg6"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <li>
                        <NavLink
                            className="dropdown-item fw-bold text-black navig"
                            to={"/dice"}
                        >
                            <i className="fa-solid fa-dice me-2"></i>
                            Dice
                        </NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default Menu;
