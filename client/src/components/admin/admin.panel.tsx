import { FunctionComponent } from "react";
import MyHeader from "./main/header";
import MainContainer from "./main/mainContainer";
import "react-datetime/css/react-datetime.css";

interface AdminPanelProps {
    bnbPrice: number;
}

const AdminPanel: FunctionComponent<AdminPanelProps> = ({ bnbPrice }) => {
    return (
        <div>
            <MyHeader />
            <MainContainer bnbPrice={bnbPrice} />
        </div>
    );
};

export default AdminPanel;
