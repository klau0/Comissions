# CommissionsProject

This project is a dApp for digital art commissions. It was made with Angular 18 and Hardhat 2.

## Steps to access the website
As this project is not hosted, you need angular and hardhat to be able to run it on localhost.

1. Open a terminal in the hardhat folder and run `npx hardhat node`. Then wait for it to finish spinning up a local node. The node needs to be running the whole time, so don't close this.
2. Open a new terminal in the hardhat folder and run `npx hardhat ignition deploy ./ignition/modules/CommissionModule.js --network localhost` to execute the deployment
3. In the root of the project run `ng serve`
4. Navigate to `http://localhost:4200`
