import { BigNumber, ethers } from "ethers";

export const BN = (value: string | number) => ethers.BigNumber.from(value);
export const weiToEther = (value: BigNumber) => ethers.utils.formatUnits(value, "ether");
