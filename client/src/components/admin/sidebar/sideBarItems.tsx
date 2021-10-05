import React from "react";
import { NavLink } from "react-router-dom";
import { SideBarItem } from "./sideBar";

interface SideBarItemsProps {
    items: SideBarItem[];
    selectedItem: string;
    onItemSelect: Function;
}

const SideBarItems: React.FC<SideBarItemsProps> = ({
    items,
    selectedItem,
    onItemSelect,
}) => {
    return (
        <ul className="nav flex-column h-100">
            {items.map((item) => (
                <li
                    onClick={() => onItemSelect(item.name)}
                    className="nav-item"
                    key={item.name}
                >
                    <NavLink
                        className={
                            item.name === selectedItem
                                ? "admin nav-link active"
                                : "admin nav-link"
                        }
                        to={`/admin/${item.name.replaceAll(" ", "").toLowerCase()}`}
                    >
                        <i className={`fas fa-${item.icon} me-2`}></i>
                        {item.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default SideBarItems;
