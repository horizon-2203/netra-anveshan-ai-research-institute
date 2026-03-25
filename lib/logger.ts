import { v4 as uuidv4 } from "uuid";

export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  environment: string;
  host: string;
  event: string;
  message: string;
  request_id?: string;
  trace_id?: string;
  span_id?: string;
  user_id?: string;
  session_id?: string;
  ip?: string;
  method?: string;
  path?: string;
  status_code?: number;
  latency_ms?: number;
  error_code?: string;
  error_type?: string;
  error_message?: string;
  component?: string;
  country?: string | null;
  city?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
  geo?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  [key: string]: unknown;
}

class Logger {
  private service = "netra-anveshan-portal";
  private environment = process.env.NODE_ENV || "development";
  private host = process.env.HOSTNAME || "localhost";

  private readonly sensitiveKeys = [
    "password",
    "token",
    "secret",
    "api_key",
    "authorization",
    "cookie",
    "set-cookie",
    "access_token",
    "refresh_token",
  ];

  private readonly sensitivePatterns = [
    /bearer\s+[a-z0-9._\-+/]+=*/i,
    /eyJ[a-zA-Z0-9_\-]{10,}\.[a-zA-Z0-9_\-]{10,}\.[a-zA-Z0-9_\-]{10,}/,
  ];

  private maskString(value: string): string {
    let output = value;
    for (const pattern of this.sensitivePatterns) {
      output = output.replace(pattern, "[REDACTED]");
    }
    return output;
  }

  private isSensitiveKey(key: string): boolean {
    const lower = key.toLowerCase();
    return this.sensitiveKeys.some((sensitive) => lower.includes(sensitive));
  }

  private maskSensitiveData(data: unknown): unknown {
    if (data === null || data === undefined) {
      return data;
    }

    if (typeof data === "string") {
      return this.maskString(data);
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.maskSensitiveData(item));
    }

    if (typeof data === "object") {
      const masked: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
        if (this.isSensitiveKey(key)) {
          masked[key] = "[REDACTED]";
        } else {
          masked[key] = this.maskSensitiveData(value);
        }
      }
      return masked;
    }

    return data;
  }

  private isNodeRuntime(): boolean {
    const hasWindow = typeof window !== "undefined";
    const hasEdgeRuntime = typeof (globalThis as { EdgeRuntime?: string }).EdgeRuntime !== "undefined";
    const hasProcess = typeof process !== "undefined";
    const hasNodeVersion = Boolean(process?.versions?.node);
    return !hasWindow && !hasEdgeRuntime && hasProcess && hasNodeVersion;
  }

  private getRouteSpecificFile(pathValue?: string): string | null {
    if (!pathValue) {
      return null;
    }

    if (pathValue === "/") return "website/page.json";
    if (pathValue.startsWith("/about")) return "website/about.json";
    if (pathValue.startsWith("/research")) return "website/research.json";
    if (pathValue.startsWith("/facilities")) return "website/facilities.json";
    if (pathValue.startsWith("/contact")) return "website/contact.json";
    if (pathValue.startsWith("/portal")) return "website/portal.json";

    if (pathValue.startsWith("/admin/datasets")) return "admin/admindatasets.json";
    if (pathValue.startsWith("/admin/publications")) return "admin/adminpublications.json";
    if (pathValue.startsWith("/admin/requests")) return "admin/adminrequests.json";
    if (pathValue.startsWith("/admin/projects")) return "admin/adminprojects.json";
    if (pathValue.startsWith("/admin/profile")) return "admin/adminprofile.json";
    if (pathValue === "/admin") return "admin/admin.json";

    return null;
  }

  private async writeToFilesWithPython(logEntry: LogEntry): Promise<void> {
    if (!this.isNodeRuntime()) {
      return;
    }

    try {
      const [pathModule, childProcessModule] = await Promise.all([
        import("node:path"),
        import("node:child_process"),
      ]);

      const routeFile = this.getRouteSpecificFile(logEntry.path);
      const targets = routeFile ? ["app.log", routeFile] : ["app.log"];

      const payload = JSON.stringify({
        baseDir: process.cwd(),
        entry: logEntry,
        targets,
      });

      const scriptPath = pathModule.join(process.cwd(), "scripts", "write_log.py");
      const result = childProcessModule.spawnSync("python3", [scriptPath], {
        input: payload,
        encoding: "utf8",
      });

      if (result.status !== 0) {
        console.error("[LOGGER_PYTHON_WRITE_FAILED]", result.stderr || result.stdout);
      }
    } catch (error) {
      console.error("[LOGGER_FILE_WRITE_FAILED]", error);
    }
  }

  createRequestId(): string {
    return uuidv4();
  }

  log(entry: Partial<LogEntry>): void {
    const requestId = entry.request_id || this.createRequestId();
    const traceId = entry.trace_id || requestId;

    const geoCountry = entry.country ?? entry.geo?.country ?? null;
    const geoCity = entry.city ?? entry.geo?.city ?? null;
    const geoLatitude = entry.latitude ?? entry.geo?.latitude ?? null;
    const geoLongitude = entry.longitude ?? entry.geo?.longitude ?? null;
    const geoTimezone = entry.timezone ?? entry.geo?.timezone ?? null;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      service: this.service,
      environment: this.environment,
      host: this.host,
      level: entry.level || "INFO",
      event: entry.event || "app_event",
      message: entry.message || "",
      request_id: requestId,
      trace_id: traceId,
      country: geoCountry,
      city: geoCity,
      latitude: geoLatitude,
      longitude: geoLongitude,
      timezone: geoTimezone,
      ...entry,
    };

    const sanitized = this.maskSensitiveData(logEntry);
    console.log(JSON.stringify(sanitized));

    void this.writeToFilesWithPython(sanitized as LogEntry);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.log({ level: "DEBUG", message, ...meta });
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.log({ level: "INFO", message, ...meta });
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.log({ level: "WARN", message, ...meta });
  }

  error(message: string, meta?: Record<string, unknown>): void {
    this.log({ level: "ERROR", message, ...meta });
  }

  fatal(message: string, meta?: Record<string, unknown>): void {
    this.log({ level: "FATAL", message, ...meta });
  }
}

export const logger = new Logger();