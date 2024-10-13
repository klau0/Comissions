const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TestModule", (moduleBuilder) => {
    const testContract = moduleBuilder.contract("TestContract", []);

    return { testContract };
});