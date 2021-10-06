const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();

        expect(await greeter.greet()).to.equal("Hello, world!");

        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // wait until the transaction is mined
        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hola, mundo!");
    });

    it("Should return data", async function () {
        const Lotto360 = await ethers.getContractFactory("Lotto360");
        const lotto360 = await Lotto360.deploy();
        await lotto360.deployed();

        const result = await lotto360.getSettings();
        console.info(result);
    });
});
