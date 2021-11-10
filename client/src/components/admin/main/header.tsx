import React, { ReactElement, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthenticationApiService } from "../../../api/auth.service";

interface MyHeaderProps {}

const MyHeader: React.FC<MyHeaderProps> = (): ReactElement => {
    const [redirect, setRedirect] = useState(false);

    const handleLogout = () => {
        AuthenticationApiService.signout()
            .then((res) => {})
            .finally(() => {
                localStorage.clear();
                setRedirect(true);
            });
    };

    if (redirect) return <Redirect to={{ pathname: "/" }} />;

    return (
        <header
            className="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 
        shadow justify-content-start"
        >
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fw-bold fs-4" href="/">
                LOTTO 360
            </a>
            <ul className="navbar-nav px-3 ms-auto">
                <li className="nav-item text-nowrap position-relative dropdown">
                    <span
                        id="bd-versions"
                        className="nav-link dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                        data-bs-display="static"
                    >
                        {localStorage.getItem("username")}
                    </span>
                    <div
                        className="user-submenu bg-white shadow text-start dropdown-menu 
                        dropdown-menu-end scale-in-ver-top position-absolute"
                        aria-labelledby="bd-versions"
                        data-bs-popper="static"
                    >
                        <span className="d-block px-3 py-2 pe-5 pointer">Profile</span>
                        <span
                            className="d-block px-3 py-2 pe-5 pointer"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </span>
                    </div>
                </li>
            </ul>
            <button
                className="navbar-toggler d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="true"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
        </header>
    );
};

export default MyHeader;
