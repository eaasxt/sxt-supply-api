# SXT Supply Submission - PM Action Items

## Status Summary

| Item | Status | Owner |
|------|--------|-------|
| CoinGecko API | **COMPLETE** | - |
| CoinGecko Submission | **COMPLETE** | - |
| CMC API Endpoints | **COMPLETE** | - |
| CMC Team Wallets | **COMPLETE** (100 addresses) | - |
| CMC Investor Wallets | **BLOCKED** - awaiting final custody | Ops/Treasury |
| CMC Ecosystem Wallets | **BLOCKED** - awaiting Coinbase onboarding | Ops/Treasury |
| CMC Annex C Sheet | **PENDING** - needs wallet data | PM |
| CMC Submission | **PENDING** - needs complete package | PM |

---

## Completed Assets

### API Endpoints (Live)
```
Circulating: https://sxt-supply-api.vercel.app/api/supply/circulating
Total:       https://sxt-supply-api.vercel.app/api/supply/total
Full JSON:   https://sxt-supply-api.vercel.app/api/supply
```

### GitHub Repository
```
https://github.com/eaasxt/sxt-supply-api
```

### Documentation Created
- `CMC_Supply_Submission.md` - Full submission package (needs investor/ecosystem wallets)
- `Context/` folder - Reference materials from CoinGecko and CMC

---

## Information Needed From Team

### 1. Token Contract Address

**Ask**: "What is the SXT token contract address on Ethereum mainnet?"

**Format needed**:
```
0x... (42-character Ethereum address)
```

**Who to ask**: Engineering / Token deployment team

---

### 2. Investor Wallet Addresses

**Ask**: "Once investor tokens reach their final destination wallets, I need a list of ALL investor wallet addresses in the following format:"

**Format needed** (CSV or table):
```
Investor Name, Wallet Address, SXT Amount
Example Fund A, 0x1234...abcd, 50,000,000
Example Fund B, 0x5678...efgh, 25,000,000
```

**Total should equal**: 1,295,350,000 SXT

**Who to ask**: Treasury / Ops team managing Anchorage transfers

**Blocking dependency**:
- Toku transfer (300mm) needs to complete
- Coinbase custody pass-through needs to complete

**Follow-up questions**:
- Are investor tokens held in individual wallets or a pooled wallet?
- Are any investor tokens still in Anchorage custody vs. self-custodied?
- Is there a vesting contract address that holds investor tokens?

---

### 3. Treasury / Ecosystem Wallet Addresses

**Ask**: "Once ecosystem/treasury tokens reach their final destination, I need a list of ALL treasury and ecosystem wallet addresses:"

**Format needed** (CSV or table):
```
Wallet Purpose, Wallet Address, SXT Amount
Treasury Main, 0xaaaa...bbbb, 500,000,000
Ecosystem Grants, 0xcccc...dddd, 200,000,000
Marketing, 0xeeee...ffff, 100,000,000
```

**Total should equal**: 1,182,545,275 SXT

**Who to ask**: Treasury / Ops team

**Blocking dependency**: Coinbase onboarding + custody pass-through

**Follow-up questions**:
- How many separate ecosystem wallets will there be?
- Are any funds allocated to a DAO or multisig?
- Which wallets will have active outflows (grants, marketing spend)?

---

### 4. Community Rewards Distribution Details

**Ask**: "How were the 1.4B community rewards tokens distributed at TGE?"

**Questions**:
- Were they airdropped to individual wallets?
- Is there a claims contract address?
- Are any community reward tokens still unclaimed/locked?
- Can you provide a distribution breakdown?

**Who to ask**: Token/Community team

**Why CMC needs this**: They want to verify that "Community Rewards" tokens are actually circulating and not sitting in a project-controlled wallet.

---

### 5. Vesting Contract Addresses (if applicable)

**Ask**: "Are any tokens locked in on-chain vesting contracts?"

**If yes, provide**:
```
Contract Purpose, Contract Address, Total Locked, Unlock Schedule
Team Vesting, 0x..., 1,122,104,725, 12-month cliff + 36-month linear
Investor Vesting, 0x..., 1,295,350,000, 12-month cliff + 36-month linear
```

**Who to ask**: Engineering / Smart contract team

**Note**: If vesting is enforced off-chain (via Anchorage custody agreements), note that instead.

---

### 6. Coinbase Custody Timeline

**Ask**: "What's the ETA for completing the Coinbase custody pass-through?"

**Specific questions**:
- When will team onboarding to Coinbase be complete?
- How long will tokens need to remain in Coinbase for custody agreement?
- When will tokens flow out to final destination wallets?
- Can you notify me the moment transfers are complete?

**Who to ask**: Ops / Treasury lead

---

## CMC Annex C Google Sheet

Once you have the wallet data, fill out the CMC Annex C template:

**Template link**: https://docs.google.com/spreadsheets/d/1ON2o9fZtdj6aa_uaT7ALtGx1VxFnIDUi8-uS-fWji0o/copy

### What to fill in:

| Sheet Section | Data Source |
|---------------|-------------|
| Total Supply | 5,000,000,000 |
| Max Supply | 5,000,000,000 |
| Circulating Supply API | https://sxt-supply-api.vercel.app/api/supply/circulating |
| Burn Addresses | N/A (no burns) |
| Locked/Vested Wallets | Team (100) + Investor + Ecosystem addresses |
| Initial Token Allocation | See breakdown in CMC_Supply_Submission.md |

---

## Submission Checklist

### Before Submitting to CMC

- [ ] Token contract address confirmed
- [ ] All 100 team wallet addresses verified on Etherscan
- [ ] Investor wallet addresses collected (once finalized)
- [ ] Ecosystem/Treasury wallet addresses collected (once finalized)
- [ ] Annex C Google Sheet completed
- [ ] API endpoints tested and returning correct values
- [ ] Website displays matching supply figures
- [ ] All wallet balances verified on Etherscan

### CMC Form Fields

| Field | Value |
|-------|-------|
| Email | andres@spaceandtime.io |
| Subject | `Space and Time - SXT - Update Supply` |
| CMC URL | https://coinmarketcap.com/currencies/space-and-time/ |
| Annex C | [Your completed Google Sheet URL] |
| Proof | Link to website, Etherscan, and API endpoints |

---

## Timeline Estimate

| Milestone | Dependency | Est. Date |
|-----------|------------|-----------|
| Coinbase onboarding complete | Team action | TBD |
| Tokens pass through Coinbase | Onboarding | TBD + 1 day |
| Tokens reach final wallets | Pass-through | TBD + 2 days |
| Collect all wallet addresses | Final wallets | TBD + 3 days |
| Complete Annex C | Wallet data | TBD + 4 days |
| Submit to CMC | Annex C complete | TBD + 5 days |
| CMC Review | Submission | 1-4 weeks |

---

## Quick Reference: Who Owns What

| Data Point | Owner | Contact |
|------------|-------|---------|
| Token contract address | Engineering | |
| Team wallet addresses | **DONE** | - |
| Investor wallet addresses | Treasury/Ops | |
| Ecosystem wallet addresses | Treasury/Ops | |
| Vesting contract details | Engineering | |
| Coinbase timeline | Ops | |
| Community distribution | Token/Community | |

---

## Notes

- **DO NOT** submit to CMC until all wallets are finalized - they verify on-chain
- CMC typically takes 1-4 weeks to review supply updates
- Keep the API endpoints running - CMC will use them for real-time updates
- If token transfers happen, balances in the API will auto-update (based on vesting schedule, not wallet balances)

---

## Files in This Package

```
/home/ubuntu/SXT_supply_endpoints/
├── api/                          # Vercel serverless functions
│   ├── supply.ts                 # Full JSON endpoint
│   ├── circulating.ts            # Plain text circulating
│   └── total.ts                  # Plain text total
├── lib/
│   └── vesting.ts                # Vesting schedule + calculations
├── Context/                      # Reference materials
│   ├── CoinGecko TRS csv...      # Token release schedule
│   └── [CMC/CG documentation]
├── CMC_Supply_Submission.md      # Full CMC submission doc
├── PM_Action_Items.md            # THIS FILE
├── package.json
├── vercel.json
└── tsconfig.json
```
