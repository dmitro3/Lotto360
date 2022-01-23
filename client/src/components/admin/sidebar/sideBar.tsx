import React, { useState } from "react";

import SideBarItems from "./sideBarItems";

interface SideBarProps {}

interface SideBarState {
    selectedItem: string;
}

export class SideBarItem {
    name: string;
    icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}

const dashboardItems: SideBarItem[] = [
    new SideBarItem("Dashboard", "home"),
    new SideBarItem("Rounds", "pool-8-ball"),
    new SideBarItem("Settings", "gear"),
    new SideBarItem("Withdraws", "money-from-bracket"),
    new SideBarItem("Payments", "money-from-bracket"),
    new SideBarItem("Rolls", "dice-four"),
    new SideBarItem("RollSettings", "dice-five"),
    new SideBarItem("Spins", "6"),
    new SideBarItem("SpinSettings", "6"),
];

const SideBar: React.FC<SideBarProps> = () => {
    const [state, setState] = useState<SideBarState>({ selectedItem: "" });

    const url = window.location.href;
    const arr = url.split("/");
    const lastPart = arr[arr.length - 1];
    dashboardItems.forEach((item) => {
        if (item.name === lastPart) setState({ selectedItem: item.name });
    });

    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
            <div className="position-sticky pt-3">
                <SideBarItems
                    items={dashboardItems}
                    selectedItem={state.selectedItem}
                    onItemSelect={(itemName: string) =>
                        setState({ selectedItem: itemName })
                    }
                />
            </div>
        </nav>
    );
};

export default SideBar;
