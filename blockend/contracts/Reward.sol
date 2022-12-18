// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

error Reward__ContractPaused();
error Reward__NotWinner();
error Reward__MaxSupplyReached();
error Reward__AlreadyWhitelisted();
error Reward__LimitReached();

contract Reward is ERC721Enumerable, Ownable {
    using Strings for uint256; 
    string s_baseTokenUri;
    bool public s_paused;
    uint256 public immutable s_maxWinners;
    uint256 public s_tokenIds;
    uint8 public s_numAddressesWhitelisted;

    mapping(address => bool) public whitelistedAddresses;

    constructor (string memory baseURI, uint256 maxWinners) ERC721("Free T-shirt", "HT") {
        s_baseTokenUri = baseURI;
        s_maxWinners = maxWinners;
    }

    function addAddressToWhitelist() public onlyOwner {
        if (whitelistedAddresses[msg.sender]) {
            revert Reward__AlreadyWhitelisted();
        }
        if (s_numAddressesWhitelisted > s_maxWinners) {
            revert Reward__LimitReached();
        }
        s_numAddressesWhitelisted += 1;
        whitelistedAddresses[msg.sender] = true;
    }
    function mint() public payable {
        if (s_paused) {
            revert Reward__ContractPaused();
        }
        if (!whitelistedAddresses[msg.sender]){
            revert Reward__NotWinner();
        }
        if (s_tokenIds >= s_maxWinners) {
            revert Reward__MaxSupplyReached();
        }
        s_tokenIds += 1;
        _safeMint(msg.sender, s_tokenIds);
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
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json")) : "";
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