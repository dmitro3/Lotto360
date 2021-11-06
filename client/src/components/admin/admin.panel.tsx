import { FunctionComponent } from "react";
import MyHeader from "./main/header";
import MainContainer from "./main/mainContainer";
import "react-datetime/css/react-datetime.css";

interface AdminPanelProps {
    bnbPrice: number;
    username: string;
}

const AdminPanel: FunctionComponent<AdminPanelProps> = ({ bnbPrice, username }) => {
    return (
        <div>
            <MyHeader username={username} />
            <MainContainer bnbPrice={bnbPrice} />
        </div>
    );
};

export default AdminPanel;
