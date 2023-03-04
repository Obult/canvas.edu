import { Request } from "express";

// extracting real Ip as forwarded in header by nginx config
export function extractRealIp(request: Request) : string {
  const realIp = request.headers['x-real-ip'];
  return typeof realIp === 'string' ? realIp : realIp[0];
}
