import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ error: "Server configuration missing TELEGRAM_BOT_TOKEN" }, { status: 503 });
  }

  let body: { initData?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.initData !== "string" || body.initData.length === 0 || body.initData.length > 16_384) {
    return NextResponse.json({ error: "Missing or oversized Telegram initData" }, { status: 400 });
  }

  const params = new URLSearchParams(body.initData);
  const receivedHash = params.get("hash");
  if (!receivedHash || !/^[a-f0-9]{64}$/i.test(receivedHash)) {
    return NextResponse.json({ error: "Invalid Telegram signature" }, { status: 401 });
  }

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = createHmac("sha256", secretKey).update(dataCheckString).digest();
  const suppliedHash = Buffer.from(receivedHash, "hex");

  if (suppliedHash.length !== calculatedHash.length || !timingSafeEqual(calculatedHash, suppliedHash)) {
    return NextResponse.json({ error: "Telegram signature verification failed" }, { status: 401 });
  }

  const authDate = Number(params.get("auth_date"));
  if (!Number.isFinite(authDate) || Math.abs(Date.now() / 1000 - authDate) > 3600) {
    return NextResponse.json({ error: "Telegram session expired" }, { status: 401 });
  }

  try {
    const rawUser = params.get("user");
    if (!rawUser) throw new Error("Missing user");
    const user = JSON.parse(rawUser) as { id?: number; first_name?: string; username?: string };
    if (!Number.isSafeInteger(user.id) || typeof user.first_name !== "string") throw new Error("Invalid user");
    return NextResponse.json({
      ok: true,
      user: { id: user.id, first_name: user.first_name, username: user.username }
    });
  } catch {
    return NextResponse.json({ error: "Invalid Telegram user payload" }, { status: 401 });
  }
}
