/**
 * SXT Token Vesting Schedule
 *
 * TGE Date: May 8, 2025
 * Max Supply: 5,000,000,000 SXT
 * Vesting Period: 48 months
 *
 * Allocation:
 * - Investors: 1,295,350,000 (25.9%)
 * - Team: 1,122,104,725 (22.4%)
 * - Community Rewards: 1,400,000,000 (28.0%) - released at TGE
 * - Ecosystem Development: 1,182,545,275 (23.7%)
 */

// TGE Date: May 8, 2025 00:00:00 UTC
export const TGE_DATE = new Date("2025-05-08T00:00:00Z");

// Maximum supply
export const MAX_SUPPLY = 5_000_000_000;

// Cumulative supply at the end of each month (0-60)
// Source: Token Release Schedule CSV
export const CUMULATIVE_SUPPLY: number[] = [
  1_400_000_000.0, // Month 0 - TGE (Community Rewards)
  1_424_636_359.9, // Month 1
  1_449_272_719.79, // Month 2
  1_473_909_079.69, // Month 3
  1_498_545_439.58, // Month 4
  1_523_181_799.48, // Month 5
  1_547_818_159.38, // Month 6
  1_572_454_519.27, // Month 7
  1_597_090_879.17, // Month 8
  1_621_727_239.06, // Month 9
  1_646_363_598.96, // Month 10
  1_670_999_958.85, // Month 11
  2_058_254_527.5, // Month 12 - Cliff unlock (Investors + Team)
  2_139_969_679.51, // Month 13
  2_221_684_831.53, // Month 14
  2_303_399_983.54, // Month 15
  2_385_115_135.56, // Month 16
  2_466_830_287.57, // Month 17
  2_548_545_439.58, // Month 18
  2_630_260_591.6, // Month 19
  2_711_975_743.61, // Month 20
  2_793_690_895.63, // Month 21
  2_875_406_047.64, // Month 22
  2_957_121_199.65, // Month 23
  3_038_836_351.67, // Month 24
  3_120_551_503.68, // Month 25
  3_202_266_655.69, // Month 26
  3_283_981_807.71, // Month 27
  3_365_696_959.72, // Month 28
  3_447_412_111.74, // Month 29
  3_529_127_263.75, // Month 30
  3_610_842_415.76, // Month 31
  3_692_557_567.78, // Month 32
  3_774_272_719.79, // Month 33
  3_855_987_871.81, // Month 34
  3_937_703_023.82, // Month 35
  4_019_418_175.83, // Month 36
  4_101_133_327.85, // Month 37
  4_182_848_479.86, // Month 38
  4_264_563_631.88, // Month 39
  4_346_278_783.89, // Month 40
  4_427_993_935.9, // Month 41
  4_509_709_087.92, // Month 42
  4_591_424_239.93, // Month 43
  4_673_139_391.94, // Month 44
  4_754_854_543.96, // Month 45
  4_836_569_695.97, // Month 46
  4_918_284_847.99, // Month 47
  5_000_000_000.0, // Month 48 - Fully vested
  5_000_000_000.0, // Month 49
  5_000_000_000.0, // Month 50
  5_000_000_000.0, // Month 51
  5_000_000_000.0, // Month 52
  5_000_000_000.0, // Month 53
  5_000_000_000.0, // Month 54
  5_000_000_000.0, // Month 55
  5_000_000_000.0, // Month 56
  5_000_000_000.0, // Month 57
  5_000_000_000.0, // Month 58
  5_000_000_000.0, // Month 59
  5_000_000_000.0, // Month 60
];

/**
 * Calculate exact months elapsed since TGE (with fractional part)
 */
export function getExactMonthsSinceTGE(now: Date = new Date()): number {
  const tgeTime = TGE_DATE.getTime();
  const nowTime = now.getTime();

  if (nowTime < tgeTime) {
    return 0; // Before TGE
  }

  // Calculate difference in milliseconds
  const diffMs = nowTime - tgeTime;

  // Convert to months (using average month length of 30.4375 days)
  const msPerMonth = 30.4375 * 24 * 60 * 60 * 1000;
  return diffMs / msPerMonth;
}

/**
 * Get circulating supply with real-time interpolation
 *
 * Uses linear interpolation between monthly values to provide
 * continuous, real-time supply updates.
 */
export function getCirculatingSupply(now: Date = new Date()): number {
  const exactMonths = getExactMonthsSinceTGE(now);

  // Before TGE
  if (exactMonths <= 0) {
    return 0;
  }

  // After full vesting (month 48+)
  if (exactMonths >= 48) {
    return MAX_SUPPLY;
  }

  // Get floor and ceiling months
  const monthFloor = Math.floor(exactMonths);
  const monthCeil = monthFloor + 1;

  // Get supply at each boundary
  const supplyFloor = CUMULATIVE_SUPPLY[monthFloor];
  const supplyCeil = CUMULATIVE_SUPPLY[Math.min(monthCeil, 60)];

  // Linear interpolation for real-time value
  const fraction = exactMonths - monthFloor;
  const interpolated = supplyFloor + (supplyCeil - supplyFloor) * fraction;

  // Round to 2 decimal places for precision
  return Math.round(interpolated * 100) / 100;
}

/**
 * Get the current vesting month (0-60)
 */
export function getCurrentMonth(now: Date = new Date()): number {
  const exactMonths = getExactMonthsSinceTGE(now);
  return Math.max(0, Math.min(60, Math.floor(exactMonths)));
}
