import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "neco-world",
    stage: "mvp",
    network: process.env.TON_NETWORK ?? "testnet",
    tokenDeployed: false
  });
}
