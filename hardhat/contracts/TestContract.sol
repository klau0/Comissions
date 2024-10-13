// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TestContract {
    string public message;

    constructor() {
        message = "Hello, Ethereum!";
    }

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}