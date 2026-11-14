"use client";

import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

export default function Home() {
  const address = useTonAddress();
  return (
    <main className="page">
      <header className="brand"><div className="logo">N</div><div><small>GLOBAL COMMON GOOD ECONOMY</small><strong>NECO.WORLD</strong></div></header>
      <span className="pill">TON TESTNET · MVP 0.1</span>
      <h1>Economy for humanity.</h1>
      <p className="lead">A simple starting point for a more cooperative global economy. Join the community, connect your own testnet wallet and help shape NECO.</p>
      <section className="panel">
        <small>YOUR WALLET</small><h2>Connect TON wallet</h2>
        <TonConnectButton />
        <p className="status">{address ? `Connected: ${address}` : "Connect a wallet configured for TON testnet. This app never asks for your seed phrase."}</p>
      </section>
      <section className="grid">
        <article className="feature"><b>🌍 NECO Community</b><p>Discover the global common-good mission.</p></article>
        <article className="feature"><b>🤝 AYA UNION</b><p>Explore community projects and governance.</p></article>
        <article className="feature"><b>💠 NECO Economy</b><p>Testnet integration first. No live token has been issued by this starter.</p></article>
      </section>
      <footer>Experimental prototype only. No real NECO token, guaranteed income, investment offer or payment service is provided. Testnet assets have no intended monetary value.</footer>
    </main>
  );
}
