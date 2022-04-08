import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface MenuProps {}

const Menu: FunctionComponent<MenuProps> = () => {
    return (
        <ul className="navbar-nav me-auto text-uppercase">
            <li className="nav-item">
                <a className="nav-link text-dark text-decoration-none" href="/#buy-ticket">
                    Buy ticket
                    <span className="visually-hidden">(current)</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark text-decoration-none" href="/#check-win">
                    Check for win
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark text-decoration-none" href="/#history">
                    History
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link text-dark text-decoration-none" href="/#how-to">
                    How to play
                </a>
            </li>
            <li className="nav-item dropdown">
                <span
                    className="nav-link text-decoration-none dropdown-toggle bg-other-games rounded text-black"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    other games
                </span>
                <ul
                    className="dropdown-menu rounded overflow-hidden border-dark bg-other-games"
                    aria-labelledby="navbarDropdownMenuLink"
                >
                    <li>
                        <NavLink className="dropdown-item fw-bold text-black navig" to={"/dice"}>
                            <i className="fa-regular fa-dice-six me-2"></i>
                            Dice
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item fw-bold text-black navig" to={"/666"}>
                            <i className="fa-regular fa-hand-horns me-2"></i>
                            number of the beast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item fw-bold text-black navig" to={"/fruit"}>
                            <i className="fa-regular fa-banana me-2"></i>
                            fruitland
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="dropdown-item fw-bold text-black navig" to={"/colors"}>
                            <i className="fa-regular fa-palette me-2"></i>
                            colors
                        </NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default Menu;
