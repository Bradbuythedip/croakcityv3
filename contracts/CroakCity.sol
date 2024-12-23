// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CroakCity is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseTokenURI;
    uint256 public maxSupply = 420;
    uint256 public cost = 0.001 ether;
    bool public paused = false;

    constructor(string memory _baseURI) ERC721("Croak City", "CROAK") Ownable(msg.sender) {
        baseTokenURI = _baseURI;
    }

    function mint(uint256 _quantity) external payable {
        require(!paused, "Contract is paused");
        require(_quantity > 0, "Quantity must be greater than 0");
        require(totalSupply() + _quantity <= maxSupply, "Would exceed max supply");
        require(msg.value >= cost * _quantity, "Insufficient payment");

        for (uint256 i = 0; i < _quantity; i++) {
            _safeMint(msg.sender, totalSupply() + 1);
        }
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseTokenURI, tokenId.toString(), ".json"));
    }

    function setBaseURI(string memory _newBaseURI) external onlyOwner {
        baseTokenURI = _newBaseURI;
    }

    function setCost(uint256 _newCost) external onlyOwner {
        cost = _newCost;
    }

    function setPaused(bool _state) external onlyOwner {
        paused = _state;
    }

    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
