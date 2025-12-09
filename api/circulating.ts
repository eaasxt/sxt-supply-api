import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getCirculatingSupply } from "../lib/vesting";

/**
 * SXT Circulating Supply - Plain Text Endpoint
 *
 * Returns just the circulating supply number as plain text.
 * Some integrations prefer this simpler format.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method not allowed");
  }

  const circulatingSupply = getCirculatingSupply();

  // Set cache headers for CDN (30 minutes)
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
  res.setHeader("Content-Type", "text/plain");

  return res.status(200).end(circulatingSupply.toString());
}
