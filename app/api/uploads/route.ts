import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

const ALLOWED_CATEGORIES = new Set([
  "datasets",
  "publications",
  "requests",
  "projects",
]);

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(request: NextRequest) {
  const requestId = request.headers.get("x-request-id") || logger.createRequestId();
  const pathName = request.nextUrl.pathname;

  logger.info("upload_request_received", {
    event: "upload_request_received",
    request_id: requestId,
    method: request.method,
    path: pathName,
    component: "api-uploads",
  });

  try {
    const formData = await request.formData();
    const category = String(formData.get("category") || "").toLowerCase();
    const file = formData.get("file");

    if (!ALLOWED_CATEGORIES.has(category)) {
      logger.warn("upload_invalid_category", {
        event: "upload_invalid_category",
        request_id: requestId,
        method: request.method,
        path: pathName,
        category,
        component: "api-uploads",
      });

      return NextResponse.json({ ok: false, message: "Invalid upload category." }, { status: 400 });
    }

    if (!file || typeof file === "string") {
      logger.warn("upload_missing_file", {
        event: "upload_missing_file",
        request_id: requestId,
        method: request.method,
        path: pathName,
        category,
        component: "api-uploads",
      });

      return NextResponse.json({ ok: false, message: "No file received." }, { status: 400 });
    }

    const safeName = sanitizeFileName(file.name || "document.bin");
    const fileName = `${Date.now()}_${safeName}`;
    const uploadDir = path.join(process.cwd(), "uploads", category);
    const filePath = path.join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, Buffer.from(arrayBuffer));

    logger.info("upload_saved", {
      event: "upload_saved",
      request_id: requestId,
      method: request.method,
      path: pathName,
      category,
      file: `uploads/${category}/${fileName}`,
      bytes: Buffer.from(arrayBuffer).byteLength,
      component: "api-uploads",
    });

    return NextResponse.json({
      ok: true,
      file: `uploads/${category}/${fileName}`,
      note: "This upload is for documentation purpose only. Real dataset/model uploads, requests and related production operations must be done on premises.",
    });
  } catch (error) {
    logger.error("upload_failed", {
      event: "upload_failed",
      request_id: requestId,
      method: request.method,
      path: pathName,
      error_type: (error as Error).name,
      error_message: (error as Error).message,
      component: "api-uploads",
    });

    return NextResponse.json(
      { ok: false, message: `Upload failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
