import type { VercelRequest, VercelResponse } from "@vercel/node";
import { MAX_SUPPLY } from "../lib/vesting";

/**
 * SXT Total Supply - Plain Text Endpoint
 *
 * Returns the total/max supply as plain text.
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method not allowed");
  }

  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=3600");
  res.setHeader("Content-Type", "text/plain");

  return res.status(200).end(MAX_SUPPLY.toString());
}
