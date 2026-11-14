# NECO.WORLD — Telegram + TON Testnet

NECO is a hybrid common-good economy MVP, starting inside Telegram with user-controlled TON testnet wallets.

## Current scope
- Next.js Telegram Mini App shell
- Server-side Telegram WebApp initData signature verification
- TON Connect wallet connection (testnet configuration)
- No token issuance, custody, deposits, or real-money functionality yet

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment
See `.env.example`. Never expose bot tokens, private keys, seed phrases, or database credentials in client-side variables.

## Telegram setup
1. Create a bot with @BotFather.
2. Deploy this app to HTTPS.
3. Set the Mini App URL in BotFather.
4. Set `TELEGRAM_BOT_TOKEN` in the hosting provider.
5. Open the Mini App from Telegram; the backend verifies raw `initData`.

## TON
TON Connect is for connecting a wallet controlled by the user. This starter does not deploy a NECO Jetton. Keep all testing on TON testnet until tokenomics, contract design, security review, legal classification, and disclosures are complete.

## Deployment
Import this repository into Vercel and add the environment variables. Set the public TON Connect manifest URL to the deployed `/tonconnect-manifest.json`.

## Security
This is an experimental MVP scaffold, not a financial service or investment offer. Never request a recovery phrase or private key. Add rate limiting, monitoring, session management, and independent smart-contract audits before handling assets of value.
