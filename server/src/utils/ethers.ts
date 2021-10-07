import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";

export const bnToNumber = (bn: BigNumber) => {
    try {
        return parseFloat(ethers.utils.formatEther(bn));
    } catch {
        return 0;
    }
};
