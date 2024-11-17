import { Injectable } from '@angular/core';
import { Web3 } from "web3";

@Injectable({
  providedIn: 'root'
})
export class Web3jsService {
  contract: any;
  defaultAccount = '';

  // (npx hardhat clean)
  // (delete deployments folder)
  // (npx hardhat compile)
  // 1. npx hardhat node
  // 2. npx hardhat ignition deploy ./ignition/modules/CommissionModule.js --network localhost

  constructor() {
    const web3 = new Web3("http://127.0.0.1:8545/");

    /*web3.eth
    .getChainId()
    .then((result) => {
      console.log("Chain ID: " + result);
    })
    .catch((error) => {
      console.error(error);
    });*/

    const json = require('../../../../hardhat/artifacts/contracts/Commission.sol/Commission.json');
    this.contract = new web3.eth.Contract(json.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    web3.eth.getAccounts().then((result) => {
      this.defaultAccount = result[0];
    });
  }

  async addUser(name: string, email: string, password: string, profile: string) {
    await this.contract.methods.addUser(name, email, password, profile).send({ from: this.defaultAccount });
  }

  async addArtist(name: string, email: string, password: string, about: string, profile: string, portfolio: string[]) {
    await this.contract.methods.addArtist(name, email, password, about, profile, portfolio).send({ from: this.defaultAccount });
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const result = await this.contract.methods.isEmailTaken(email).call();
    return result;
  }

  /**
   * @returns 0: id (or -1 on failure), 1: isArtist
   */
  async login(email: string, password: string) {
    const result = await this.contract.methods.login(email, password).call();
    return result;
  }

  /**
   * @returns 0: name, 1: email, 2: profile
   */
  async getUserAccountInfo(id: number) {
    const result = await this.contract.methods.getUserAccountInfo(id).call();
    return result;
  }

  async getArtistsLenght(): Promise<number> {
    const result = await this.contract.methods.getArtistsLenght().call();
    // The contract methods return numbers as BigInt
    return Number(result);
  }

  /**
   * @returns 0: name, 1: email, 2: about, 3: profile
   */
  async getArtistAccountInfo(id: number) {
    const result = await this.contract.methods.getArtistAccountInfo(id).call();
    return result;
  }

  async getPortfolioLenght(id: number): Promise<number> {
    const result = await this.contract.methods.getPortfolioLenght(id).call();
    return Number(result);
  }

  /**
   * @returns 0: image1 CID, 1: image2 CID ..., where the key is the image id
   */
  async getPortfolio(id: number) {
    const result = await this.contract.methods.getPortfolio(id).call();
    return result;
  }

  async getPackagesLenght(id: number): Promise<number> {
    const result = await this.contract.methods.getPackagesLenght(id).call();
    return Number(result);
  }

  async isPackageDeleted(artistId: number, packageId: number): Promise<boolean> {
    const result = await this.contract.methods.isPackageDeleted(artistId, packageId).call();
    return result;
  }

  async isPackageMarkedAsDeleted(artistId: number, packageId: number): Promise<boolean> {
    const result = await this.contract.methods.isPackageMarkedAsDeleted(artistId, packageId).call();
    return result;
  }

  /**
   * @returns 0: title, 1: price, 2: description, 3: isMarkedDeleted
   */
  async getPackageInfo(artistId: number, packageId: number) {
    const result = await this.contract.methods.getPackageInfo(artistId, packageId).call();
    return result;
  }

  /**
   * @returns how many requests are currently on the package
   */
  async getPackageRequestedNumber(artistId: number, packageId: number): Promise<number> {
    const result = await this.contract.methods.getPackageRequestedNumber(artistId, packageId).call();
    return Number(result);
  }

  /**
   * @returns 0: names, 1: descriptions, 2: requestIds, 3: titles, 4: prices
   */
  async getRequestedPackageInfo(artistId: number, packageId: number, amountOfRequests: number) {
    const result = await this.contract.methods.getRequestedPackageInfo(artistId, packageId, amountOfRequests).call();
    return result;
  }

  async getRequestsLenght(id: number, isArtist: boolean): Promise<number> {
    const result = await this.contract.methods.getRequestsLenght(id, isArtist).call();
    return Number(result);
  }

  /**
   * @returns 0: artistName, 1: packageTitle, 2: packagePrice, 3: description, 4: isDone
   */
  async getRequestInfo(userId: number, requestId: number, isArtist: boolean) {
    const result = await this.contract.methods.getRequestInfo(userId, requestId, isArtist).call();
    return result;
  }

  /**
   * @returns 0: image1 CID, 1: image2 CID ...
   */
  async getRequestedImages(userId: number, requestId: number, isArtist: boolean) {
    const result = await this.contract.methods.getRequestedImages(userId, requestId, isArtist).call();
    return result;
  }

  async updateAboutDescription(id: number, about: string) {
    await this.contract.methods.updateAboutDescription(id, about).send({ from: this.defaultAccount });
  }

  async deletePortfolioImage(artistId: number, portfolioImageId: number) {
    await this.contract.methods.deletePortfolioImage(artistId, portfolioImageId).send({ from: this.defaultAccount });
  }

  async resetPortfolio(artistId: number) {
    await this.contract.methods.resetPortfolio(artistId).send({ from: this.defaultAccount });
  }

  async addToPortfolio(artistId: number, image: string) {
    await this.contract.methods.addToPortfolio(artistId, image).send({ from: this.defaultAccount });
  }

  async deletePackage(artistId: number, packageId: number) {
    await this.contract.methods.deletePackage(artistId, packageId).send({ from: this.defaultAccount });
  }

  async markPackageAsDeleted(artistId: number, packageId: number) {
    await this.contract.methods.markPackageAsDeleted(artistId, packageId).send({ from: this.defaultAccount });
  }

  async resetPackageNumber(artistId: number) {
    await this.contract.methods.resetPackageNumber(artistId).send({ from: this.defaultAccount });
  }

  async updatePackage(artistId: number, packageId: number, newTitle: string, newPrice: number, newDescription: string) {
    await this.contract.methods.updatePackage(artistId, packageId, newTitle, newPrice, newDescription).send({ from: this.defaultAccount });
  }

  async addPackage(artistId: number, title: string, price: number, description: string) {
    await this.contract.methods.addPackage(artistId, title, price, description).send({ from: this.defaultAccount });
  }

  async completeRequest(artistId: number, packageId: number, requestId: number, images: string[]) {
    await this.contract.methods.completeRequest(artistId, packageId, requestId, images).send({ from: this.defaultAccount });
  }

  async resetPackageRequestNumber(artistId: number, packageId: number) {
    await this.contract.methods.resetPackageRequestNumber(artistId, packageId).send({ from: this.defaultAccount });
  }

  async changeProfilePicture(id: number, newImg: string, isArtist: boolean) {
    await this.contract.methods.changeProfilePicture(id, newImg, isArtist).send({ from: this.defaultAccount });
  }

  async requestPackage(userId: number, artistId: number, packageId: number, description: string, isRequesterArtist: boolean) {
    await this.contract.methods.requestPackage(userId, artistId, packageId, description, isRequesterArtist).send({ from: this.defaultAccount });
  }
}
