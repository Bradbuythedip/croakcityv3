require("dotenv").config();

async function main() {
    try {
        console.log("Starting deployment...");

        // Get deployer account
        const [deployer] = await ethers.getSigners();
        console.log("Deploying with account:", deployer.address);

        // Check balance
        const balance = await deployer.getBalance();
        console.log("Account balance:", ethers.utils.formatEther(balance), "QUAI");

        // Get network
        const network = await ethers.provider.getNetwork();
        console.log("Network:", network.name, "(chainId:", network.chainId, ")");

        // Get gas price
        const gasPrice = await ethers.provider.getGasPrice();
        console.log("Current gas price:", ethers.utils.formatUnits(gasPrice, "gwei"), "gwei");

        console.log("\nDeploying Croak City NFT contract...");
        const baseTokenURI = process.env.BASE_URI || "ipfs://your_ipfs_cid_here/";
        
        const CroakCity = await ethers.getContractFactory("CroakCity");
        const croakCity = await CroakCity.deploy(baseTokenURI, {
            gasLimit: 3000000
        });

        await croakCity.deployed();

        console.log("\nDeployment successful!");
        console.log("Contract address:", croakCity.address);
        console.log("Transaction hash:", croakCity.deployTransaction.hash);
        
        // Verify contract parameters
        console.log("\nVerifying contract parameters:");
        console.log("Base URI:", await croakCity.baseTokenURI());
        console.log("Max supply:", (await croakCity.maxSupply()).toString());
        console.log("Mint cost:", ethers.utils.formatEther(await croakCity.cost()), "QUAI");
        console.log("Owner:", await croakCity.owner());
        
    } catch (error) {
        console.error("\nDeployment failed!");
        console.error(error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
