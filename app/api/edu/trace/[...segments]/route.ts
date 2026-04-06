import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ segments?: string[] }>;
};

function getRequestId(request: NextRequest): string {
  return request.headers.get("x-request-id") || logger.createRequestId();
}

function sanitizeHeaders(request: NextRequest): Record<string, string> {
  const allow = new Set(["user-agent", "content-type", "x-forwarded-for", "x-real-ip"]);
  const out: Record<string, string> = {};

  for (const [key, value] of request.headers.entries()) {
    if (allow.has(key.toLowerCase())) {
      out[key] = value;
    }
  }

  return out;
}

async function handleTrace(request: NextRequest, context: RouteContext) {
  const requestId = getRequestId(request);
  const { segments = [] } = await context.params;
  const start = Date.now();

  logger.info("edu_trace_received", {
    event: "edu_trace_received",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    segment_count: segments.length,
    component: "api-edu-trace",
  });

  const response = {
    ok: true,
    requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    routeParams: {
      segments,
      first: segments[0] || null,
      last: segments.length ? segments[segments.length - 1] : null,
    },
    normalizedInput: {
      query: Object.fromEntries(request.nextUrl.searchParams.entries()),
      headers: sanitizeHeaders(request),
    },
    flow: {
      receivedAt: new Date(start).toISOString(),
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - start,
    },
  };

  logger.info("edu_trace_completed", {
    event: "edu_trace_completed",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    segment_count: segments.length,
    latency_ms: Date.now() - start,
    component: "api-edu-trace",
  });

  return NextResponse.json(response, { status: 200 });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handleTrace(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handleTrace(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return handleTrace(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return handleTrace(request, context);
}
