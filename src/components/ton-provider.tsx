"use client";

import { useEffect, type PropsWithChildren } from "react";
import { TonConnectUIProvider, useTonConnectUI } from "@tonconnect/ui-react";
import { CHAIN } from "@tonconnect/ui";

const manifestUrl =
  process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL ??
  "https://neco-world-hansi-heaven-s-projects.vercel.app/tonconnect-manifest.json";

function TestnetOnly({ children }: PropsWithChildren) {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    // Enforce testnet before the user opens the wallet selector.
    tonConnectUI.setConnectionNetwork(CHAIN.TESTNET);
  }, [tonConnectUI]);

  return <>{children}</>;
}

export function TonProvider({ children }: PropsWithChildren) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <TestnetOnly>{children}</TestnetOnly>
    </TonConnectUIProvider>
  );
}
