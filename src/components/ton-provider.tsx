"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { PropsWithChildren } from "react";

export function TonProvider({ children }: PropsWithChildren) {
  const manifestUrl = process.env.NEXT_PUBLIC_TONCONNECT_MANIFEST_URL
    ?? "https://YOUR-VERCEL-DOMAIN/tonconnect-manifest.json";
  return <TonConnectUIProvider manifestUrl={manifestUrl}>{children}</TonConnectUIProvider>;
}
