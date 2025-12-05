import { NextRequest } from "next/server";
import parser from "ua-parser-js";

export function getDevice(req: NextRequest) {
  const ua = parser(req.headers.get("user-agent") || "");
  const deviceType = ua.device.type || "desktop";
  return deviceType;
}

export function getIP(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0"
  );
}
