var fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("📡 Deploying contracts with the account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.getBalance()).toString());

  const contracts = [
    // "Dice360",
    "NumberOfTheBeast",
  ];

  for (let contractName of contracts) {
    const factory = await ethers.getContractFactory(contractName);
    const contract = await factory.deploy();
    console.log(`\n🛰  ${contractName} deployed at:`, contract.address);

    const obj = JSON.parse(
      fs.readFileSync(
        path.join(
          __dirname,
          `../artifacts/contracts/${contractName}.sol/${contractName}.json`
        ),
        "utf8"
      )
    );

    fs.writeFileSync(
      path.join(
        __dirname,
        `../../client/src/provider/abi/${contractName}.abi.json`
      ),
      JSON.stringify(obj.abi, null, 2),
      "utf-8"
    );

    fs.writeFileSync(
      path.join(
        __dirname,
        `../../server/src/provider/abi/${contractName}.abi.json`
      ),
      JSON.stringify(obj.abi, null, 2),
      "utf-8"
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
