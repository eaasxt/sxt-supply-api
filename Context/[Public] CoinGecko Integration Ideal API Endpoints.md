**CoinGecko Integration API Standards**

## Introduction

This document outlines the API endpoint details necessary for integrating cryptocurrency exchanges, total/circulating supply, and the NFT Marketplace on CoinGecko.

All platform/project team members are **required to support the necessary endpoints to ensure uptime and data availability.** Additionally, team members should have an **information page allowing verification of the API data** provided to ensure data accuracy.

For more information, please refer to the following sections:

Section A: Spot Exchanges API (CEX and DEX**[^1]**)  
Section B: Derivatives Exchanges API (CEX and DEX)  
Section C: Reading Circulating/Total Supply via API  
Section D: NFT Marketplace (Floor Price)

For applications, please ensure that you are submitting your applications to the [CoinGecko Application Form](https://coingecko.com/request).

## CoinGecko General API requirements

You’ll find some of the general requirements by CoinGecko to ensure smooth integration and data availability. The integration process may be affected if an exchange is unable to fulfill the requirements.  
 

1. Publicly accessible, no-authentication API endpoints are required  
2. Reasonable rate limits to ensure tickers/pairs list, market data, orderbook data can be queried on a minutely basis.  
3. Data available in JSON format.  
4. To whitelist CoinGecko’s IP address where necessary.

In order for us to verify the data returned in your provided API endpoints, it is **mandatory** to display important information (e.g. last price, 24h volume (in USD), open interest, funding rate, etc.) on your trading page/web interface. Your request will be rejected if the data in your API endpoints does not match with what is shown on your website. 

## Version History

| Version No | Version Date | Changes to Previous |
| :---- | :---- | :---- |
| v1.0.0 | Jan 30, 2020 | Initial documented version on our website |
| v2.0.0 | Oct 20, 2020 | Add D. CoinGecko Yield Farming \- Pools |
| v3.0.0 | Feb 15, 2021 | Add E. Decentralized Exchanges |
| v4.0.0 | Mar 20, 2022 | Add F. Circulating/Total Supply |
| v5.0.0 | Jun 07, 2022 | Remove E. Decentralized Exchanges, Move F. Circulating/Total Supply to E |
| v6.0.0 | Aug 05, 2022 | Remove C. Earn Platforms and D. Yield Farms Current Doc sections **A. for Spot/DEX Exchanges API**,  **B. for Derivatives Exchanges API**,  **C. Circulating/Total Supply \- Reading via API.** |
| v7.0.0 | Apr 25, 2023 | Add D. NFT Collection (Floor Price) |
| v8 | Jun 07, 2024 | Consolidate Cex and DexCurrent Doc sections **Spot Exchanges API (CEX and DEX) Derivatives Exchanges API (CEX and DEX) Reading Circulating/Total Supply via API NFT Marketplace (Floor Price)** |

## 

## A. Spot Exchanges

### Spot Exchanges \- Endpoints Overview

For CoinGecko Integration, 3 separate endpoints must be available:

| No. | Endpoint | Description |
| ----- | ----- | ----- |
| 1\. | /tickers | Market related statistics for all markets for the last 24 hours. |
| 2\. | /orderbook | Order book depth of any given trading pair, split into two different arrays for bid and ask orders. |
| 3\. | /historical | Historical trade data for any given trading pair.  |

 

### Endpoint 1 \- /tickers (Market Info)

The /tickers endpoint provides 24-hour pricing and volume information on each market pair available on an exchange.

| CEX | DEX |
| ----- | ----- |
| "ticker\_id": "BTC\_ETH", "base\_currency": "BTC", "target\_currency": "ETH", "last\_price":"50.0", "base\_volume":"10", "target\_volume":"500",  "bid":"49.9", "ask":"50.1", "high":”51.3”,“low”:”49.2”, | "ticker\_id": "0x55d398326f99059ff775485246999027b3197955\_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "base\_currency": "0x55d398326f99059ff775485246999027b3197955", "target\_currency": "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", “pool\_id”: “0x36696169c63e42cd08ce11f5deebbcebae652050”, "last\_price":"50.0", "base\_volume":"10", "target\_volume":"500", “liquidity\_in\_usd”:“100”, "bid":"49.9", "ask":"50.1", "high":”51.3”,“Low”:”49.2” **ps: in order for CoinGecko to show \+2/-2% depth, AMM DEX has to provide the formula for \+2/-2% depth while orderbook DEX has to provide the /orderbook endpoint..** |

/tickers endpoint response description:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string | Mandatory | Identifier of a ticker with delimiter to separate base/target, eg. BTC\_ETH (Contract address for DEX) |
| base\_currency | string | Mandatory | Symbol/Currency code/Contract Address of a the base cryptoasset, eg. BTC (Contract address for DEX) |
| target\_currency | string | Mandatory | Symbol/Currency code/Contract Address of the target cryptoasset, eg. ETH (Contract address for DEX) |
| last\_price | decimal | Mandatory | Last transacted price of base currency based on given target currency eg. X \= ? 1 base \= X target |
| base\_volume | decimal | Mandatory | 24-hour single-sided trading volume for the pair (unit in base) |
| target\_volume | decimal | Mandatory | 24-hour single-sided trading volume for the pair (unit in target) |
| pool\_id | string | Mandatory (DEX) | pool/pair address or unique ID (Mandatory for DEX) |
| liquidity\_in\_usd | decimal | Mandatory (DEX) | Pool liquidity in USD (Not applicable to orderbook DEXes) |
| bid | decimal | Recommended | Current highest bid price |
| ask | decimal | Recommended | Current lowest ask price |
| high | decimal | Recommended | Rolling 24-hours highest transaction price |
| low | decimal | Recommended | Rolling 24-hours lowest transaction price |

   
For reference, a good example would be  
CEX: 

* https://capi.bitget.com/api/spot/v1/market/coingecko/tickers  
* [https://stats.exchange.klever.io/v1/cgk/tickers](https://stats.exchange.klever.io/v1/cgk/tickers)

DEX:

* [https://api.hyperliquid.xyz/aggregator/v1/spot/tickers](https://api.hyperliquid.xyz/aggregator/v1/spot/tickers)   
* [https://api.cellana.finance/api/v1/tool/tickers](https://api.cellana.finance/api/v1/tool/tickers) 


### Endpoint 2 \- /orderbook (Order book depth details)

The /orderbook/ticker\_id endpoint is to provide order book information with at least depth \= 100 (50 each side) returned for a given market pair/ticker. 

**Note: If you are an AMM DEX, /orderbook endpoint is not mandatory. However, please include liquidity\_in\_usd in /tickers endpoint and indicate the formula to derive depth data. If the formula is not provided, we will apply Uniswap V2 formula to derive depth.**

Endpoint parameters:

| Name | Type | Status |   Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string | Mandatory | A ticker such as "BTC\_ETH", with delimiter between different cryptoassets |
| depth | integer | Recommended | Orders depth quantity: \[0, 100, 200, 500...\]. 0 returns full depth. Depth \= 100 means 50 for each bid/ask side. Note that for more liquid or closely priced pairs, the lack of order depth may result in miscalculation of depth/spread. |

   
Example query:   
.../api/orderbook?ticker\_id=BTC\_ETH\&depth=200

{    
   "ticker\_id": "BTC\_ETH",  
   "timestamp":"1700050000",  
   "bids":\[    
      \[    
         "49.8",  
         "0.50000000"  
      \],  
      \[    
         "49.9",  
         "6.40000000"  
      \]  
   \],  
   "asks":\[    
      \[    
         "50.1",  
         "9.20000000"  
      \],  
      \[    
         "50.2",  
         "7.9000000"  
      \]  
   \]  
}  
   
Order book response descriptions:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string |   Mandatory | A pair such as "BTC\_ETH", with delimiter between different cryptoassets |
| timestamp |   timestamp |   Recommended | Unix timestamp in milliseconds for when the last updated time occurred. |
| bids |   decimal |   Mandatory | An array containing 2 elements. The offer price and quantity for each bid order |
| asks |   decimal |   Mandatory | An array containing 2 elements. The ask price and quantity for each ask order |

For reference, a good example would be  
1.[https://api.binance.com/api/v1/depth?symbol=BTCUSDC\&limit=5000](https://api.binance.com/api/v1/depth?symbol=BTCUSDC&limit=5000)

### 

### \[Optional\] Endpoint 3 \- /historical\_trades (Historical Data)

The /historical\_trades/ticker\_id is used to return data on historical completed trades for a given market pair.

Endpoint parameters:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string | Mandatory | A pair such as "BTC\_ETH", with delimiter between different cryptoassets |
| type | string | Mandatory | To indicate nature of trade \- buy/sell |
| limit | integer | Recommended | Number of historical trades to retrieve from time of query. \[0, 200, 500...\]. 0 returns full history. |
| start\_time | date | Recommended | Start time from which to query historical trades from |
| end\_time | date | Recommended | End time for historical trades query |

   
Example query:   
.../api/historical\_trades?ticker\_id=BTC\_ETH\&limit=10  
“buy”: \[    
   {          
      "trade\_id":1234567,  
      "price":"50.1",  
      "base\_volume":"0.1",  
      "target\_volume":"1",  
      "trade\_timestamp":"1700050000",  
      "type":"buy"  
   }  
\],  
“sell”: \[  
   {          
      "trade\_id":1234567,  
      "price":"50.1",  
      "base\_volume":"0.1",  
      "target\_volume":"1",  
      "trade\_timestamp":"1700050000",  
      "type":"sell"  
   }  
\]

/historical\_trades response descriptions:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| trade\_id |   integer | Mandatory | A unique ID associated with the trade for the currency pair transaction Note: Unix timestamp does not qualify as trade\_id. |
| price |   decimal | Mandatory | Transaction price of base asset in target currency. |
| base\_volume |   decimal | Mandatory | Transaction amount in base pair single-sided volume. |
| target\_volume |   decimal | Mandatory | Transaction amount in target pair single-sided volume. |
| trade\_timestamp |   timestamp | Mandatory | Unix timestamp in milliseconds for when the transaction occurred. |
| type |   string | Mandatory | Used to determine the type of the transaction that was completed. Buy – Identifies an ask that was removed from the order book. Sell – Identifies a bid that was removed from the order book. |

For reference:  
https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md\#recent-trades-list

## 

## B. Derivative Exchanges

### Derivative Exchanges \- Endpoints Overview

For CoinGecko Integration, 3 separate endpoints must be available:

| No. | Endpoint | Description |
| ----- | ----- | ----- |
| 1\. | /contracts | Summary of contracts traded on the exchange, helps to differentiate between different products available. |
| 2\. | /contract\_specs | Describes the specification of the contracts, mainly the pricing of the contract and its type (vanilla, inverse, or quanto). Note: Endpoint 2 (/contract\_specs) may also be combined  with Endpoint 1 (/contracts) for ease of reference. |
| 3\. | /orderbook | Order book depth of any given trading pair, split into two different arrays for bid and ask orders. |

### 

### Endpoint 1 \- /contracts (info & types of products available)

The /contracts endpoint provides a summary of all contracts traded on the exchange. There should be a clear distinction between the type of contracts such as perpetual, futures, options, etc. See below for specifications of data required for the /contracts endpoint:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string | Mandatory | Identifier of a ticker with delimiter to separate base/target, eg. BTC-PERP |
| base\_currency | string | Mandatory | Symbol/currency code of base pair, eg. BTC |
| target\_currency | string | Mandatory | Symbol/currency code of target pair, eg. ETH |
| last\_price | decimal | Mandatory | Last transacted price of base currency based on given target currency |
| base\_volume | decimal | Mandatory | 24 hour trading single sided volume in base pair volume |
| target\_volume | decimal | Mandatory | 24 hour trading single sided volume in target pair volume |
| bid | decimal | Recommended | Current highest bid price |
| ask | decimal | Recommended | Current lowest ask price |
| high | decimal | Recommended | Rolling 24-hours highest transaction price |
| low | decimal | Recommended | Rolling 24-hours lowest transaction price |
| product\_type | string | Mandatory | What product is this? Futures, Perpetual, Options? |
| open\_interest | decimal | Mandatory | The open interest in the last 24 hours in contracts (in base currency) |
| open\_interest\_usd | decimal | Mandatory | The open interest in the last 24 hours in contracts (in USD) |
| index\_price | decimal | Mandatory | Underlying index price |
| index\_name | string | Recommended | Name of the underlying index if any |
| index\_currency | string | Mandatory | Underlying currency for index |
| start\_timestamp | integer | Mandatory | Starting of this derivative product (relevant for expirable futures or options) |
| end\_timestamp | integer | Mandatory | Ending of this derivative product (relevant for expirable futures or options) |
| funding\_rate | decimal | Mandatory | Current funding rate |
| next\_funding\_rate | decimal | Mandatory | Upcoming predicted funding rate |
| next\_funding\_rate\_timestamp | integer | Mandatory | Timestamp of the next funding rate change |

For reference, a good example would be

1. [https://archive.mantle-prod.vertexprotocol.com/v2/contracts](https://archive.mantle-prod.vertexprotocol.com/v2/contracts)   
2. [https://api.hitbtc.com/api/3/public/futures/info](https://api.hitbtc.com/api/3/public/futures/info)   
3. [https://mainnet-beta.api.drift.trade/contracts](https://mainnet-beta.api.drift.trade/contracts)

Ideally, all information should be returned in a single endpoint.

### 

### Endpoint 2 \- /contract\_specs (Contract specifications)

Describes the specification of the contracts, mainly the pricing of the contract and its type (vanilla, inverse, or quanto). See below for specifications of data required for the /contract\_specs endpoint:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| contract\_type | string | Mandatory | Describes the type of contract \- Vanilla, Inverse or Quanto? |
| contract\_price\_currency | string | Mandatory | Describes the currency which the contract is priced in. |
| contract\_price | decimal | Optional | Describes the price per contract. (If not same as last price) |

Note: As mentioned earlier, endpoint 2 (contract\_specs) can be combined with endpoint 1 (/contracts) to make it easier for implementation.

### 

### Endpoint 3 \- /orderbook (Order book depth details)

The /orderbook/ticker\_id endpoint is to provide order book information with at least depth \= 100 (50 each side) returned for a given market pair/ticker. See below for specifications of data required for the /orderbook endpoint:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string |   Mandatory | A pair such as "BTC-PERP", with delimiter between different cryptoassets |
| timestamp |   timestamp |   Recommended | Unix timestamp in milliseconds for when the last updated time occurred. |
| bids |   decimal |   Mandatory | An array containing 2 elements. The offer price and quantity for each bid order |
| asks |   decimal |   Mandatory | An array containing 2 elements. The ask price and quantity for each ask order |

    
Order book depth of any given trading pair, split into two different arrays for bid and ask orders.  
Example to refer [https://api.orderly.network/md/coingecko/orderbook?ticker\_id=NEAR-PERP\&scale=6](https://api.orderly.network/md/coingecko/orderbook?ticker_id=NEAR-PERP&scale=6)  
(Similar to endpoint for spot markets, kindly refer to Section A Endpoint 3 for extra information).

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| ticker\_id | string | Mandatory | Identifier of a ticker with delimiter to separate base/target, eg. BTC-PERP |
| base\_currency | string | Mandatory | Symbol/currency code of base pair, eg. BTC |
| target\_currency | string | Mandatory | Symbol/currency code of target pair, eg. ETH |
| last\_price | decimal | Mandatory | Last transacted price of base currency based on given target currency |
| base\_volume | decimal | Mandatory | 24 hour trading single sided volume in base pair volume |
| target\_volume | decimal | Mandatory | 24 hour trading single sided volume in target pair volume |
| bid | decimal | Mandatory | Current highest bid price |
| ask | decimal | Mandatory | Current lowest ask price |
| high | decimal | Mandatory | Rolling 24-hours highest transaction price |
| low | decimal | Mandatory | Rolling 24-hours lowest transaction price |
| product\_type | string | Mandatory | What product is this? Futures, Perpetual, Options? |
| open\_interest | decimal | Mandatory | The open interest in the last 24 hours in contracts  |
| index\_price | decimal | Mandatory | Underlying index price |
| index\_name | string | Mandatory | Name of the underlying index if any |
| index\_currency | string | Mandatory | Underlying currency for index |
| start\_timestamp | integer | Mandatory | Starting of this derivative product (relevant for expirable futures or options) |
| end\_timestamp | integer | Mandatory | Ending of this derivative product (relevant for expirable futures or options) |
| funding\_rate | decimal | Mandatory | Current funding rate |
| next\_funding\_rate | decimal | Mandatory | Upcoming predicted funding rate |
| next\_funding\_rate\_timestamp | integer | Mandatory | Timestamp of the next funding rate change |
| contract\_type | string | Mandatory | What type of contract is this? Vanilla, Inverse, or Quanto? |
| contract\_price | decimal | Mandatory | What is the price per contract |
| contract\_price\_currency | string | Mandatory | What is the currency of the priced contract |

## C. Circulating/Total Supply \- Reading via API

CoinGecko supports fetching circulating and total supply via REST API endpoint. However, the CoinGecko team will always prioritize deriving total and circulating supply via supply disclosures from the team and fetching circulating/token supply via on chain sources.

To submit circulating supply via supply disclosures: [https://support.coingecko.com/hc/en-us/articles/4499342867609](https://support.coingecko.com/hc/en-us/articles/4499342867609) 

**Requirements:**  
\- Simple **REST API endpoint with decimals** included.  
\- Endpoint should be **publicly accessible** without any form of authentication (password/API keys)  
\- Should not require api key (publicly accessible)  
\- **Adequate rate limits to support polling once every 30 minutes** 

Example endpoint: [https://api.coingecko.com/api/v3/supply/eth](https://api.coingecko.com/api/v3/supply/eth) 

**Note:**  
If your API endpoints are protected by CloudFlare, our requests may be flagged as automated, preventing us from retrieving supply data.

When we send requests to your API, we include the following headers:

```
{ 
 "X-Requested-With" => "com.coingecko", 
 "User-Agent" => "CoinGecko +https://coingecko.com/" 
}
```

To ensure smooth data retrieval, please configure your CloudFlare Web Application Firewall (WAF) to allow these requests.

## D. NFT Collection (Floor Price)

### NFT Floor price \- Endpoints Overview

endpoint response description:

| Name | Data Type | Category | Description |
| :---- | :---- | :---- | :---- |
| contract\_address | string | Mandatory | Contract address of the nft collection |
| name | string | Mandatory | Name of the nft collection |
| symbol | string | Recommended | S |
| slug | string | Mandatory | Slug of the nft collection |
| floor | decimal | Mandatory | The floor price of the nft collection |
| volume | decimal | Mandatory | 24 hour rolling trading volume |
| total\_supply | integer | Mandatory | Total number of supply of the nft collection |
| sales\_count | integer | Mandatory | 24 hour rolling number of token sales |
| unique\_owners | string | Recommended | Number of addresses holding 1 or more of the nft |
| image\_url | string | Mandatory | Url of the nft collection image |
| discord\_url | string | Recommended | Discord Url of the nft project |
| twitter\_url | string | Recommended | Twitter Url of the nft project |
| website\_url | string  | Recommended | Url of the nft project website |
| description | string | Recommended | Description of the nft collection |
| banner\_image\_url | string | Recommended | URL of the NFT collection banner image (prefer .webp format) |
| royalty\_fees | integer | Recommended | Royalties / creator fees for the NFT collection, in basis points (bps) |

Sample:

-  [https://barn.joepegs.com/v2/collections/0x942a02e5ec8fc3d066da8f97a9553736369494a1](https://barn.joepegs.com/v2/collections/0x942a02e5ec8fc3d066da8f97a9553736369494a1)  
- [https://api-mainnet.magiceden.dev/v3/rtp/ethereum/collections/v7?id=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d\&includeSalesCount=true](https://api-mainnet.magiceden.dev/v3/rtp/ethereum/collections/v7?id=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&includeSalesCount=true)

PS: the API output must match the onchain/website data\*  


[^1]:  