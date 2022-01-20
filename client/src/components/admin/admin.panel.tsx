import { FunctionComponent } from "react";
import MyHeader from "./main/header";
import MainContainer from "./main/mainContainer";
import "react-datetime/css/react-datetime.css";
import Web3 from "web3";

interface AdminPanelProps {
    bnbPrice: number;
    address: string;
    web3: Web3;
}

const AdminPanel: FunctionComponent<AdminPanelProps> = ({ address, bnbPrice, web3 }) => {
    return (
        <div>
            <MyHeader />
            <MainContainer address={address} bnbPrice={bnbPrice} web3={web3} />
        </div>
    );
};

export default AdminPanel;
