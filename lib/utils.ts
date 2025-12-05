export function getGeoByIP(ip: string) {
  // MVP logic: return fake GEO
  // Upgrade later with ip2location / maxmind
  return { country: "US" };
}

export function parseUserAgent(ua: string) {
  ua = ua.toLowerCase();

  if (ua.includes("iphone") || ua.includes("ios")) return "iOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("mac")) return "Mac";

  return "Other";
}
