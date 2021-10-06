require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
const { pkey, testpkey } = require("./secret.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "mainnet",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {},
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/57cc21bce96a4adfb729e911f779ec7c",
            accounts: [`0x${pkey}`],
        },
        mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            gasPrice: 20000000000,
            accounts: [`0x${pkey}`],
        },
    },
    solidity: {
        version: "0.8.7",
        settings: {
            optimizer: {
                enabled: true,
            },
        },
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts",
    },
    mocha: {
        timeout: 20000,
    },
};
