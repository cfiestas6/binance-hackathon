// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/* Errors */
error HereticsRaffle__NotWallet(address contract);
error HereticsRaffle__NotOpen();

/**
 * @title Heretics Raffle for Binance X Heretics Hackathon
 * @author Beep Bop Beep Team
 * @notice // TO DO
 * @dev // TO DO
 */

contract HereticsRaffle is Ownable{
    using Address for address;

    mapping (address => bool) isPlayer;

    /* State Variables */
    address payable[] private s_players;
    bool s_isOpen;

    event EnterRaffle(address player);
    event RaffleOpen();

    constructor(/* TO DO */) {
        s_isOpen = false;
    }

    /**
     * @notice This function is used by the owner to add the players to the raffle.
     * @param player is the wallet address of the player.
     */

    function openRaffle() external onlyOwner {
        s_isOpen = true;
        emit RaffleOpen();
    }

    function enterToRaffle(address player) 
        external 
        onlyOwner 
    {
        if (player.isContract()) {              // Check if the address entered is a contract
            revert HereticsRaffle__NotWallet(player);
        }
        if (!s_isOpen) {                        // Check that the lottery is open
            revert HereticsRaffle__NotOpen();
        }
        if (isPlayer[player]) {                 // Check that the address isn't already a player
            revert HereticsRaffle__AlreadyIn();
        }
        s_players.push(payable(player));
        emit EnterRaffle(player);               // Emit event when a player is added to the s_players array
    }
}