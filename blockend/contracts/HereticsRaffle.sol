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
 * @title  Heretics Raffle for Binance X Heretics Hackathon
 * @author Beep Bop Beep Team
 * @notice This is a raffle contract
 * @dev    This contract uses Chainlink VRF for getting a random winner
 */

contract HereticsRaffle is Ownable, VRFConsumerBaseV2 {
    using Address for address;

    mapping (address => bool) isPlayer;

    /* State Variables */
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    address[] public s_players;
    address public s_winner; 
    bool s_isOpen;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_numWords;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;

    /* Events */
    event EnterRaffle(address player);
    event RaffleOpen();
    event GetWinner(uint256 indexed requestId);
    event WinnersSelected(address winner); // Could be change to return an array of winners

    /* Modifiers */
    modifier onlyOpen {
        if (!s_isOpen) {  
            revert HereticsRaffle__NotOpen();
        }
        _;
    }
    /* Constructor */
    constructor (
        address vrfCoordinatorV2,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        uint32 numWords
        ) VRFConsumerBaseV2(vrfCoordinatorV2){

        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
        i_numWords = numWords;
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
        if (player.isContract()) {               // Check if the address entered is a contract
            revert HereticsRaffle__NotWallet(player);
        }
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
        i_numWords
       );
       emit GetWinner(requestId);
    }
    /**
     * @notice This function overrides chainlink's function.
     *         This function gets the winners using chainlink's random numbers.
     *         Finally it emits an event with the array of winners.
     */
    function fulfillRandomWords(
        uint256, // requestId
        uint256[] memory randomWords
    ) internal override {

        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address newWinner = s_players[indexOfWinner];
        s_winner = newWinner;
        s_players = new address[](0);
        /* Emit event from contract to whitelist the address from backend */
        emit WinnersSelected(s_winner);
    }
    function getWinner() public view returns (address winner) {
        return (s_winner); // Could be changed to return an array of winners
    }
}