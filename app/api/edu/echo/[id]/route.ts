import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function getRequestId(request: NextRequest): string {
  return request.headers.get("x-request-id") || logger.createRequestId();
}

function getQueryObject(url: URL): Record<string, string | string[]> {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of url.searchParams.entries()) {
    if (key in out) {
      const prev = out[key];
      out[key] = Array.isArray(prev) ? [...prev, value] : [prev, value];
    } else {
      out[key] = value;
    }
  }
  return out;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const requestId = getRequestId(request);
  const { id } = await context.params;

  logger.info("edu_echo_get_received", {
    event: "edu_echo_get_received",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    component: "api-edu-echo",
  });

  const responseBody = {
    ok: true,
    flow: [
      "request accepted by route handler",
      "dynamic route parameter parsed",
      "query parameters normalized",
      "response emitted from server",
    ],
    request: {
      requestId,
      method: request.method,
      path: request.nextUrl.pathname,
      routeParams: { id },
      query: getQueryObject(request.nextUrl),
      userAgent: request.headers.get("user-agent") || null,
    },
    note: "Educational route: demonstrates server-side processing of dynamic route + query input.",
  };

  logger.info("edu_echo_get_completed", {
    event: "edu_echo_get_completed",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    route_param_id: id,
    component: "api-edu-echo",
  });

  return NextResponse.json(responseBody, { status: 200 });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const requestId = getRequestId(request);
  const { id } = await context.params;

  logger.info("edu_echo_post_received", {
    event: "edu_echo_post_received",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    component: "api-edu-echo",
  });

  try {
    const contentType = (request.headers.get("content-type") || "").toLowerCase();
    let payload: unknown;

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await request.formData();
      payload = Object.fromEntries(form.entries());
    } else {
      payload = await request.text();
    }

    logger.info("edu_echo_post_completed", {
      event: "edu_echo_post_completed",
      request_id: requestId,
      method: request.method,
      path: request.nextUrl.pathname,
      route_param_id: id,
      parsed_payload_type: typeof payload,
      component: "api-edu-echo",
    });

    return NextResponse.json(
      {
        ok: true,
        flow: [
          "request accepted by route handler",
          "dynamic route parameter parsed",
          "request body parsed based on content-type",
          "response emitted from server",
        ],
        request: {
          requestId,
          method: request.method,
          path: request.nextUrl.pathname,
          routeParams: { id },
          contentType,
          payload,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("edu_echo_post_failed", {
      event: "edu_echo_post_failed",
      request_id: requestId,
      method: request.method,
      path: request.nextUrl.pathname,
      route_param_id: id,
      error_type: (error as Error).name,
      error_message: (error as Error).message,
      component: "api-edu-echo",
    });

    return NextResponse.json(
      {
        ok: false,
        error: "Request payload could not be processed",
        requestId,
      },
      { status: 400 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  const requestId = getRequestId(request);

  logger.info("edu_echo_options", {
    event: "edu_echo_options",
    request_id: requestId,
    method: request.method,
    path: request.nextUrl.pathname,
    component: "api-edu-echo",
  });

  return new NextResponse(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type, x-request-id, x-trace-id",
    },
  });
}
