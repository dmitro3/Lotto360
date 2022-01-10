if (!process.env.OWNER_PRIVATE_KEY) {
    throw new Error("owner private key not set");
}
if (!process.env.OWNER_ACCOUNT_ADDRESS) {
    throw new Error("owner account address not set");
}
if (!process.env.LOTTO360_CONTRACT_ADDRESS) {
    throw new Error("lotto 360 contract address not set");
}
if (!process.env.DICE360_CONTRACT_ADDRESS) {
    throw new Error("dice 360 contract address not set");
}
if (!process.env.WITHDRAW_PHRASE) {
    throw new Error("withdraw phrase not set");
}

export const ACCOUNT_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
export const ACCOUNT_ADDRESS = process.env.OWNER_ACCOUNT_ADDRESS;

export const LOTTO360_CONTRACT_ADDRESS = process.env.LOTTO360_CONTRACT_ADDRESS;
export const DICE360_CONTRACT_ADDRESS = process.env.DICE360_CONTRACT_ADDRESS;
export const WITHDRAW_PHRASE = process.env.WITHDRAW_PHRASE;
