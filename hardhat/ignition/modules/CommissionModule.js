const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CommissionModule", (moduleBuilder) => {
    const commission = moduleBuilder.contract("Commission", []);

    return { commission };
});