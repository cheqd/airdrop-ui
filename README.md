# Cosmos SDK Airdrop Frontend

## ℹ️ Overview

As part of [cheqd](https://www.cheqd.io)'s marketing initiatives in 2022, we ran [a community rewards programme / airdrop to Cosmonauts](https://blog.cheqd.io/cosmos-community-airdrop-32fdb1c0cfd0) in the Cosmos SDK ecosystem. This campaign rewarded individuals for their participation in staking CHEQ/ATOM/OSMO/JUNO tokens and contributing to [Osmosis DEX Liquidity Pools](https://docs.osmosis.zone/overview/).

We had 6 tiers that wallet addresses could be eligible to be rewarded in CHEQ tokens for. We wanted to design a self-serve microsite that would allow individuals to check their eligibility for the airdrop and claim tokens if eligible. We took inspiration from similar airdrop frontend sites such as the [Likecoin airdrop claims site](https://github.com/likecoin/app-like-co).  

We recommend looking at the [documentation](https://v3.nuxtjs.org) for further information if you're interested in leveraging this repo.

## ☑ Features

- Install chain configuration for target chain (if not present)
- Extract a read-only wallet address from required Cosmos SDK chains
- Check backend APIs for airdrop eligibility tiers and display breakdown
- Allow claiming airdrops and checking status of distribution (only unclaimed, pending, or claimed states)

## 🧑‍💻🛠 Developer Guide

This frontend site was developed to work with [Cloudflare Workers](https://workers.cloudflare.com/), a serverless and highly-scalable platform so that the airdrop reward site could handle spikes in demand.

This repo only contains code for the airdrop frontend UI. The backend for distribution was handled using separate Cloudflare Workers.

### Setup

Install dependencies using Yarn

```bash
yarn install
```

### Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

### Build

Build the application for production

```bash
yarn build
```

### Deploy

Use [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/) to modify the required variables in `wrangler.toml` for [publishing to Cloudflare Workers](https://developers.cloudflare.com/workers/wrangler/commands/).

```bash
wrangler publish
```
