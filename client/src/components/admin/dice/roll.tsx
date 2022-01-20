import { FunctionComponent } from "react";
import Web3 from "web3";

interface RollProps {
    address: string;
    web3: Web3;
}

const Roll: FunctionComponent<RollProps> = ({ address, web3 }) => {
    return <div></div>;
};

export default Roll;
