import type { Metadata } from "next";
import "./globals.css";
import { TonProvider } from "@/components/ton-provider";

export const metadata: Metadata = {
  title: "NECO.WORLD — Economy for Humanity",
  description: "A global common-good economy, starting with Telegram and TON testnet."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><TonProvider>{children}</TonProvider></body></html>;
}
