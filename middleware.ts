import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function createRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isStaticAsset(pathname: string): boolean {
  return /\.(?:svg|png|jpe?g|gif|webp|ico|css|js|map|txt|xml)$/i.test(pathname);
}

function normalizeIp(ip?: string | null): string | undefined {
  if (!ip) return undefined;
  const firstIp = ip.split(",")[0]?.trim();
  if (!firstIp) return undefined;
  if (firstIp.startsWith("::ffff:")) return firstIp.replace("::ffff:", "");
  return firstIp;
}

function isLocalIp(ip?: string): boolean {
  if (!ip) return false;
  return ip === "127.0.0.1" || ip === "::1" || ip === "localhost";
}

function isInternalHealthcheck(request: NextRequest, clientIp?: string): boolean {
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  const host = (request.headers.get("host") || "").toLowerCase();
  const normalizedIp = normalizeIp(clientIp);

  const healthcheckAgent = userAgent.includes("wget") || userAgent.includes("healthcheck");
  const localHostTarget = host.includes("127.0.0.1") || host.includes("localhost");

  return (
    request.method === "GET" &&
    request.nextUrl.pathname === "/" &&
    healthcheckAgent &&
    (isLocalIp(normalizedIp) || localHostTarget)
  );
}

async function forwardToLogApi(request: NextRequest, payload: Record<string, unknown>) {
  try {
    await fetch(new URL("/api/logs", request.url), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-id": String(payload.request_id || ""),
        "x-trace-id": String(payload.trace_id || ""),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    // Keep request flow healthy even if logging API is unavailable.
  }
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/logs" || isStaticAsset(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const requestId = request.headers.get("x-request-id") || createRequestId();
  const traceId = request.headers.get("x-trace-id") || undefined;
  const startTime = Date.now();

  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined;

  if (isInternalHealthcheck(request, clientIp)) {
    return NextResponse.next();
  }

  const receivedPayload = {
    level: "INFO",
    event: "request_received",
    message: "request_received",
    request_id: requestId,
    trace_id: traceId,
    method: request.method,
    path: request.nextUrl.pathname,
    ip: clientIp,
    user_agent: request.headers.get("user-agent") || undefined,
    component: "next-middleware",
  };

  console.log(JSON.stringify(receivedPayload));
  void forwardToLogApi(request, receivedPayload);

  const response = NextResponse.next();
  response.headers.set("x-request-id", requestId);
  if (traceId) {
    response.headers.set("x-trace-id", traceId);
  }

  const latencyMs = Date.now() - startTime;
  const completedPayload = {
    level: "INFO",
    event: "request_completed",
    message: "request_completed",
    request_id: requestId,
    trace_id: traceId,
    method: request.method,
    path: request.nextUrl.pathname,
    status_code: response.status,
    latency_ms: latencyMs,
    component: "next-middleware",
  };

  console.log(JSON.stringify(completedPayload));
  void forwardToLogApi(request, completedPayload);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/logs).*)"],
};