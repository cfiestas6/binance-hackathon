// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

error Reward__ContractPaused();
error Reward__NotWinner();
error Reward__MaxSupplyReached();
error Reward__AlreadyWhitelisted();
error Reward__LimitReached();

contract Reward is ERC721Enumerable, Ownable {
    using Strings for uint256; 
    string s_baseTokenUri;
    bool public s_paused;
    uint256 public immutable i_maxWinners;
    uint256 public s_tokenIds;
    uint8 public s_numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    constructor (string memory baseURI, uint256 maxWinners) ERC721("Free T-shirt", "HT") {
        s_baseTokenUri = baseURI;
        i_maxWinners = maxWinners;
    }

    function mint(address winner) external payable onlyOwner {
        if (s_paused) {
            revert Reward__ContractPaused();
        }
        if (s_tokenIds >= i_maxWinners) {
            revert Reward__MaxSupplyReached();
        }
        s_tokenIds += 1;
        // Owner mints the NFT 
        _safeMint(msg.sender, s_tokenIds);
        // Owner sends it to the winner
        safeTransferFrom(msg.sender, winner, s_tokenIds);
    } 
    function setPaused(bool val) public onlyOwner {
        s_paused = val;
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseTokenUri;
    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexisten token");
        string memory baseURI = _baseURI(); 
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI)) : "";
    }
    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}
    fallback() external payable {}
}

/*contract MintingMetaTx {

    using ECDSA for bytes32;

    // New mapping
    mapping(bytes32 => bool) executed;

    // Add the nonce parameter here
    function mint(address sender, uint tokenId, address tokenContract, uint nonce, bytes memory signature) public {
        // Pass ahead the nonce
        bytes32 messageHash = getHash(sender, tokenId, tokenContract, nonce);
        bytes32 signedMessageHash = messageHash.toEthSignedMessageHash();

        // Require that this signature hasn't already been executed
        require(!executed[signedMessageHash], "Already executed!");

        address signer = signedMessageHash.recover(signature);

        require(signer == sender, "Signature does not come from sender");

        // Mark this signature as having been executed now
        executed[signedMessageHash] = true;
        RewardInterface(tokenContract).mint(sender);
    }

    // Add the nonce parameter here
    function getHash(address sender, uint tokenId, address tokenContract, uint nonce) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(sender, tokenId, tokenContract, nonce));
    }
}*/