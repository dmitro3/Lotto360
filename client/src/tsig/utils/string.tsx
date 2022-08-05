import { ethers } from "ethers";
import Web3 from "web3";

export const simplifyWalletAddress = (text: string): string => {
    if (text.length < 15) return text;
    const firstPart = text.substring(0, 4);
    const secondPart = text.substring(text.length - 4);
    return `${firstPart}...${secondPart}`;
};

export const asciiToHex = (value: string) => Web3.utils.asciiToHex(value);
export const hexToAscii = (value: string) => ethers.utils.parseBytes32String(value);
export const isAddressValid = (address: string) => Web3.utils.isAddress(address);
