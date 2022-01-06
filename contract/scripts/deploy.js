var fs = require("fs");
const path = require("path");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("📡 Deploying contracts with the account:", deployer.address);
    console.log("💰 Account balance:", (await deployer.getBalance()).toString());
    const Dezdesag = await ethers.getContractFactory("Lotto360");
    const contract = await Dezdesag.deploy();
    console.log("🛰  Contract deployed at:", contract.address);

    const obj = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "../artifacts/contracts/Lotto360.sol/Lotto360.json"),
            "utf8"
        )
    );

    fs.writeFileSync(
        path.join(__dirname, "../../client/src/provider/abi/lotto.360.contract.abi.json"),
        JSON.stringify(obj.abi, null, 2),
        "utf-8"
    );

    fs.writeFileSync(
        path.join(__dirname, "../../server/src/provider/abi/lotto.360.contract.abi.json"),
        JSON.stringify(obj.abi, null, 2),
        "utf-8"
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
