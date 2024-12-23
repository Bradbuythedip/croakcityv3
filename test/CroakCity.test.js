const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CroakCity", function () {
    let CroakCity;
    let croakCity;
    let owner;
    let addr1;
    let addr2;
    
    beforeEach(async function () {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();
        
        // Deploy contract
        CroakCity = await ethers.getContractFactory("CroakCity");
        croakCity = await CroakCity.deploy("ipfs://test/");
        await croakCity.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await croakCity.owner()).to.equal(owner.address);
        });

        it("Should set the initial base URI", async function () {
            expect(await croakCity.baseTokenURI()).to.equal("ipfs://test/");
        });
    });

    describe("Minting", function () {
        it("Should allow minting with correct payment", async function () {
            const mintCost = await croakCity.cost();
            await croakCity.connect(addr1).mint(1, { value: mintCost });
            expect(await croakCity.balanceOf(addr1.address)).to.equal(1);
        });

        it("Should fail when minting with insufficient payment", async function () {
            const mintCost = await croakCity.cost();
            await expect(
                croakCity.connect(addr1).mint(1, { value: mintCost.sub(1) })
            ).to.be.revertedWith("Insufficient payment");
        });
    });

    describe("Owner functions", function () {
        it("Should allow owner to set base URI", async function () {
            await croakCity.connect(owner).setBaseURI("ipfs://new/");
            expect(await croakCity.baseTokenURI()).to.equal("ipfs://new/");
        });

        it("Should allow owner to set cost", async function () {
            const newCost = ethers.utils.parseEther("0.002");
            await croakCity.connect(owner).setCost(newCost);
            expect(await croakCity.cost()).to.equal(newCost);
        });

        it("Should allow owner to pause/unpause", async function () {
            await croakCity.connect(owner).setPaused(true);
            expect(await croakCity.paused()).to.be.true;
        });
    });
});
