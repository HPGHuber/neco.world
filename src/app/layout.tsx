import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { TonProvider } from "@/components/ton-provider";

export const metadata: Metadata = {
  title: "NECO.WORLD — Economy for Humanity",
  description: "A global common-good economy, starting with Telegram and TON testnet."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <TonProvider>{children}</TonProvider>
      </body>
    </html>
  );
}
