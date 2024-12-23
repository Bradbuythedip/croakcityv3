# Croak City V3

NFT Collection deployed on Quai Network.

## Features

- Maximum supply: 420 NFTs
- Configurable mint cost
- Pausable minting
- Owner controls:
  - Base URI updates
  - Mint cost adjustments
  - Contract pause/unpause
  - Fund withdrawal

## Setup

1. Clone the repository:
```bash
git clone git@github.com:Bradbuythedip/croakcityv3.git
cd croakcityv3
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your private key and IPFS URI
```

4. Deploy:
```bash
npm run deploy:cyprus1
```

## Contract Details

- Network: Quai Cyprus1 (Testnet)
- Contract: `CroakCity.sol`
- Standard: ERC721 Enumerable
- Dependencies: OpenZeppelin contracts

## Development

- Test: `npm test`
- Compile: `npm run compile`
- Deploy: `npm run deploy:cyprus1`

## Security

- Private keys stored in `.env` (never commit)
- OpenZeppelin contracts for security
- Owner-only privileged functions
- Comprehensive test suite

## Networks

### Cyprus1 (Quai Testnet)
- ChainID: 9000
- RPC: https://rpc.cyprus1.colosseum.quaiscan.io

## License

MIT
