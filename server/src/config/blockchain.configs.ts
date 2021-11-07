if (!process.env.OWNER_PRIVATE_KEY) {
    throw new Error("owner private key not set");
}
if (!process.env.OWNER_ACCOUNT_ADDRESS) {
    throw new Error("owner account address not set");
}
if (!process.env.CONTRACT_ADDRESS) {
    throw new Error("contract address not set");
}
if (!process.env.TOKEN_ADDRESS) {
    throw new Error("token address not set");
}
if (!process.env.WITHDRAW_PHRASE) {
    throw new Error("withdraw phrase not set");
}

export const ACCOUNT_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
export const ACCOUNT_ADDRESS = process.env.OWNER_ACCOUNT_ADDRESS;

export const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;
export const WITHDRAW_PHRASE = process.env.WITHDRAW_PHRASE;
