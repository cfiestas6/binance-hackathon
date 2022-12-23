const { getNamedAccounts, deployments, network, run, ethers } = require("hardhat");
const { verify } = require("../utils/verify.js");

module.exports = async function() {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const callbackGasLimit = 500000;
    const gasLane = "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc";
    const vrfCoordinatorV2 = "0x6a2aad07396b36fe02a22b33cf443582f682c82f";
    const subscriptionId = 2270;
    const numWinners = 1;
    const baseURI = "ipfs://QmTiZCnyUmxSxsF93ps41ULSc14MzMyGQV77LV9fTtAmKM";

    const raffleArgs = [vrfCoordinatorV2, gasLane, subscriptionId, callbackGasLimit, numWinners];
    const rewardArgs = [baseURI, numWinners];

    const raffleContract = await ethers.getContractFactory("HereticsRaffle");
    const raffle = await raffleContract.deploy(vrfCoordinatorV2, gasLane, subscriptionId, callbackGasLimit, numWinners);
    await raffle.deployed();
    console.log("Raffle contract deployed at: ", raffle.address);
    console.log("Verifying...");
    await verify(raffle.address, raffleArgs);
    console.log("------------------------------")

    const rewardContract = await ethers.getContractFactory("Reward");
    const reward = await rewardContract.deploy(baseURI, numWinners);
    await reward.deployed();
    console.log("Verifying...");
    await verify(reward.address, rewardArgs);
    console.log("------------------------------")
}