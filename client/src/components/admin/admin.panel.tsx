import { FunctionComponent } from "react";
import MyHeader from "./main/header";
import MainContainer from "./main/mainContainer";

interface AdminPanelProps {}

const AdminPanel: FunctionComponent<AdminPanelProps> = () => {
    return (
        <div>
            <MyHeader />
            <MainContainer />
        </div>
    );
};

export default AdminPanel;
