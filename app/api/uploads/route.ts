import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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
  try {
    const formData = await request.formData();
    const category = String(formData.get("category") || "").toLowerCase();
    const file = formData.get("file");

    if (!ALLOWED_CATEGORIES.has(category)) {
      return NextResponse.json({ ok: false, message: "Invalid upload category." }, { status: 400 });
    }

    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, message: "No file received." }, { status: 400 });
    }

    const safeName = sanitizeFileName(file.name || "document.bin");
    const fileName = `${Date.now()}_${safeName}`;
    const uploadDir = path.join(process.cwd(), "uploads", category);
    const filePath = path.join(uploadDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, Buffer.from(arrayBuffer));

    return NextResponse.json({
      ok: true,
      file: `uploads/${category}/${fileName}`,
      note: "This upload is for documentation purpose only. Real dataset/model uploads, requests and related production operations must be done on premises.",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: `Upload failed: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
