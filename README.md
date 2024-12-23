# Croak City V2

NFT Collection deployed on Quai Network.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your private key:
- Copy `.env.example` to `.env`
- Add your private key to `.env`

3. Deploy:
```bash
npm run deploy:cyprus1
```

## Contract Features

- Maximum supply: 420 NFTs
- Mintable with QUAI
- Owner can:
  - Set base URI
  - Set mint cost
  - Pause/unpause minting
  - Withdraw funds

## Networks

- Cyprus1 (Quai Testnet)
  - ChainID: 9000
  - RPC: https://rpc.cyprus1.colosseum.quaiscan.io

## Security

- Private keys are stored in `.env` (never commit this file)
- OpenZeppelin contracts for security
- Owner privileges for essential functions only
