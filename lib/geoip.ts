type GeoData = {
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
};

type CacheEntry = {
  data: GeoData;
  expiresAt: number;
};

const GEO_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

function normalizeIp(ip?: string): string | undefined {
  if (!ip) return undefined;
  const firstIp = ip.split(",")[0]?.trim();
  if (!firstIp) return undefined;
  if (firstIp.startsWith("::ffff:")) return firstIp.replace("::ffff:", "");
  return firstIp;
}

function isPrivateOrLocalIp(ip?: string): boolean {
  if (!ip) return true;
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;
  if (ip.startsWith("10.")) return true;
  if (ip.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return true;
  return false;
}

export async function getGeoDataForIp(rawIp?: string): Promise<GeoData | undefined> {
  const ip = normalizeIp(rawIp);
  if (!ip || isPrivateOrLocalIp(ip)) {
    return undefined;
  }

  const cached = GEO_CACHE.get(ip);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);

    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) return undefined;

    const payload = (await response.json()) as {
      city?: string;
      country_name?: string;
      latitude?: number;
      longitude?: number;
      timezone?: string;
    };

    const data: GeoData = {
      country: payload.country_name,
      city: payload.city,
      latitude: payload.latitude,
      longitude: payload.longitude,
      timezone: payload.timezone,
    };

    GEO_CACHE.set(ip, { data, expiresAt: Date.now() + CACHE_TTL_MS });
    return data;
  } catch {
    return undefined;
  }
}
