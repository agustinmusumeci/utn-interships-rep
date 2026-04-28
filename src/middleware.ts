import { clerkMiddleware } from "@clerk/astro/server";
import rateLimiter from "./lib/rateLimiter";
import { sequence } from "astro:middleware";

async function rateLimitMiddleware(context: any, next: any) {
  if (!context.url.pathname.startsWith("/api/cron")) {
    return next();
  }

  const ip = context.request.headers.get("x-forwarded-for") ?? context.clientAddress ?? "unknown";

  const { message, ok } = rateLimiter.checkIp(ip);

  if (!ok) {
    return new Response(JSON.stringify({ error: message }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  return next();
}

export const onRequest = sequence(rateLimitMiddleware, clerkMiddleware());
