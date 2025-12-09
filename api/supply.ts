import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getCirculatingSupply,
  getCurrentMonth,
  MAX_SUPPLY,
  TGE_DATE,
} from "../lib/vesting";

/**
 * SXT Circulating Supply API
 *
 * Returns real-time circulating supply with linear interpolation
 * between monthly vesting milestones.
 *
 * CoinGecko Integration:
 * - Publicly accessible (no auth required)
 * - JSON response with decimals
 * - Supports 30-minute polling
 */
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const now = new Date();
  const circulatingSupply = getCirculatingSupply(now);
  const currentMonth = getCurrentMonth(now);

  // Response payload
  const response = {
    circulating_supply: circulatingSupply,
    total_supply: MAX_SUPPLY,
    max_supply: MAX_SUPPLY,
    current_vesting_month: currentMonth,
    tge_date: TGE_DATE.toISOString(),
    last_updated: now.toISOString(),
  };

  // Set cache headers for CDN (30 minutes)
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=60");
  res.setHeader("Content-Type", "application/json");

  return res.status(200).json(response);
}
