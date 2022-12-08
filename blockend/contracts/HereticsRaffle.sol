// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

/* Errors */
error HereticsRaffle__NotWallet(address);
error HereticsRaffle__NotOpen();

/**
 * @title Heretics Raffle for Binance X Heretics Hackathon
 * @author Beep Bop Beep Team
 * @notice // TO DO
 * @dev // TO DO
 */

contract HereticsRaffle is Ownable, VRFConsumerBaseV2 {
    using Address for address;

    mapping (address => bool) isPlayer;

    /* State Variables */
    address payable[] private s_players;
    bool s_isOpen;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private constant NUM_WORDS = 1;
    address payable s_recentWinner; // Only used to print the recent winner on the frontend (OPTIONAL)

    /* Events */
    event EnterRaffle(address player);
    event RaffleOpen();
    event GetWinner(uint256 indexed requestId);

    /* Modifiers */
    modifier onlyOpen {
        if (!s_isOpen) {                        // Check that the lottery is open
            revert HereticsRaffle__NotOpen();
        }
        _;
    }
    /* Constructor */
    constructor (
        address vrfCoordinatorV2,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit
        ) VRFConsumerBaseV2(vrfCoordinatorV2){

        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    function openRaffle() external onlyOwner {
        s_isOpen = true;
        emit RaffleOpen();
    }

    /**
     * @notice This function is used by the owner to add the players to the raffle.
     * @param player is the wallet address of the player.
     */
    function enterToRaffle(address player) 
        external 
        onlyOwner 
        onlyOpen
    {
        if (player.isContract()) {              // Check if the address entered is a contract
            revert HereticsRaffle__NotWallet(player);
        }
        /*if (isPlayer[player]) {                 // Check that the address isn't already a player
            revert HereticsRaffle__AlreadyIn();
        }*/
        s_players.push(payable(player));
        emit EnterRaffle(player);               // Emit event when a player is added to the s_players array
    }
    function endRaffle() 
        external 
        onlyOwner 
        onlyOpen
    {
       s_isOpen = false; 
       uint256 requestId = i_vrfCoordinator.requestRandomWords(
        i_gasLane,
        i_subscriptionId,
        REQUEST_CONFIRMATIONS,
        i_callbackGasLimit,
        NUM_WORDS
       );
       emit GetWinner(requestId);
    }

    function fulfillRandomWords(
        uint256, // requestId
        uint256[] memory randomWords
    ) internal override {
        uint256 indexOfWinner = randomWords[0] % s_players.length; // 
        address payable winner = s_players[indexOfWinner]; 
        s_recentWinner = winner; // Only to display the winner
        /* Give access to the reward NFT */
    }
}