# How Fees Work in Optimistic Ethereum

Themes

- Costs
    - Anything related from getting tokens from L1 to L2, and interactions with contracts on L2
    - Real world examples (included below and in [Tx Fee Savings](https://www.notion.so/Tx-Fee-Savings-1ac93a98d48b4178b71bd1293ec2e420)

## **Kevin's notes**

`getGasPrice` will always return some constant (e.g. 0.1 gwei)
`estimateGas` will effectively be "getFee" - and will return the lowest fee that the sequencer will accept so that 0.1gwei * gasLimit = fee

fee = gasPrice * gasLimit
gasPrice = hardcoded constant
gasLimit = fee / (hardcoded constant)


## Kevin's discussion with Synthetix and Chainlink

Summary of gas discussions:

1. Majority of fee cost on L2 will be the cost of calldata. The larger the tx data, the more expensive the tx will be on L2
2. On L2 the per-tx execution gas limit is 9m. However, the custom compilation increases execution gas limit by sometimes >5x vs the execution gas usage in L1. So if you have a tx that uses >1-2m gas in L1, it **might** end up running out of gas on L2.

## Real-world Gas Costs/Savings on Optimistic Ethereum

> Stats/Benchmarks from notes from Optimism Prime Call #1 (Kevin's dope estimates on what we save people wrt gas fees)

### Specific Contract Calls

On Mainnet:
100k txs:

70 contract deployments,

- relayMessage: 4140,
- updateRates: 30870,
- issueMaxSynths: 23717,
- claimFees: 19618,
- burnSynthsToTarget: 15925,
- issueSynths: 4873,
- initiateWithdrawal: 928,
- transfer: 1176,
- burnSynths: 2528

Method id: num txs
'1627540c': 34,
'79ba5097': 42,
'400ada75': 1,
'08fd6322': 8,
'6101d761': 1,
'60e66100': 1,
'776d1a01': 7,
'52f445ca': 7,
'48bf1971': 8,
'00000000': 1,
fec9f9da: 2,
'19db2228': 3,
'7a9e5e4b': 1,
'95896b76': 1,
ab0b8f77: 4,
'766f7815': 5,
'47a9b6db': 1,
'28a1170d': 1,
'635a3872': 1,
'1e6e2190': 1,
'054be0b7': 1,
'04c49f2c': 1,
'2cce0e54': 1,
'5e0117d6': 1,
'946ce8cd': 1,
'2806a743': 1,
'79cb657a': 1,
e9422046: 1,
'6190dd7a': 1,
dc8f4a1b: 4,
e470df58: 1,
b10090b8: 2,

'157c51d3': 1,
'6057361d': 3,
'396e258e': 2,
'9e49e976': 170,
'67a280b2': 1,
'3ebc457a': 116,
'34c7fec9': 226,
f69053c5: 1,
'': 5,
'095ea7b3': 3,
'879f30ad': 20,
'47064d6a': 3,
da358a3c: 6,
f8f73808: 3

### Gas savings estimated benchmarks

Non calldata cost per tx (Assuming each tx has its own context):

- **Batches of 10 txs**: 9145 gas per tx
- **Batches of 50 txs:** 5253 gas per tx
- **Batches of 200 txs:** 2661 gas per tx

**Assuming 200 tx batches (with 200 contexts):**

- Synthetix mint sUSD **Savings: 140.0x**

    [https://etherscan.io/tx/0x8f4859145235f0c09f364e46f7da23fac9d0e24e3f7c4c2fef4fcb96f46742b2](https://etherscan.io/tx/0x8f4859145235f0c09f364e46f7da23fac9d0e24e3f7c4c2fef4fcb96f46742b2)
    2 'zero bytes,' 137 'data bytes'
    Total OE L1 Gas: 2200 + 2661 = 4861
    Original L1 gas 680347

- Synthetix updateRates, 28 rate updates **Savings: 23.1x**

    [https://etherscan.io/tx/0x2c4e6ae23ad143f6baee80bb908fe74ec91cf5ff4d267b98cebad4749cfe35ec](https://etherscan.io/tx/0x2c4e6ae23ad143f6baee80bb908fe74ec91cf5ff4d267b98cebad4749cfe35ec)
    1596 'zero bytes,' 501 'data bytes'
    Total OE L1 Gas: 14400 + 2661 = 17061
    Original L1 gas 394153

- Synthetix burn sUSD **Savings: 247.3x**

    [https://etherscan.io/tx/0xf47a7619ba9d54113010001dbe09b5fbeccf77310ace3694f66e93eb96e68217](https://etherscan.io/tx/0xf47a7619ba9d54113010001dbe09b5fbeccf77310ace3694f66e93eb96e68217)
    26 'zero bytes,' 146 'data bytes'
    Total OE L1 Gas: 2440 + 2661 = 5101
    Original L1 gas 1261616

- dYdX trade **Savings: 29.2x**

    [https://etherscan.io/tx/0xcbded434d0002e9af13394090b3d8eeb2afddbef584602ce18b68e353469d467](https://etherscan.io/tx/0xcbded434d0002e9af13394090b3d8eeb2afddbef584602ce18b68e353469d467)
    3012 'zero bytes,' 684 'data bytes'
    Total OE L1 Gas: 22992 + 2661 = 25653
    Original L1 gas 750023

- Chainlink DAI/USD oracle update **Savings: 166.3x**

    [https://etherscan.io/tx/0xfde526055f8228c466135bd725b6f5b599893cff3b347fd715a0a975b32d94ca](https://etherscan.io/tx/0xfde526055f8228c466135bd725b6f5b599893cff3b347fd715a0a975b32d94ca)
    33 'zero bytes,' 141 'data bytes'
    Total OE L1 Gas: 2388 + 2661 = 5049
    Original L1 gas 839745

- Synthetix - synth exchange **Savings: 86.6x**

    [https://etherscan.io/tx/0x3a4d99fd0f1e2b14ca42cbfbf4fe8891dd969b3e2af076f194668002d83d036a](https://etherscan.io/tx/0x3a4d99fd0f1e2b14ca42cbfbf4fe8891dd969b3e2af076f194668002d83d036a)
    82 'zero bytes,' 154 'data bytes'
    Total OE L1 Gas: 2792 + 2661 = 5453
    Original L1 gas 472174

- Synthetix, btc<->usd chainlink requestRateUpdate **Savings: 473.8x**

    [https://etherscan.io/tx/0x6421837fa962982a7d74da713292e92c1989b580888fd76503d2e994349a1745](https://etherscan.io/tx/0x6421837fa962982a7d74da713292e92c1989b580888fd76503d2e994349a1745)
    34 'zero bytes,' 140 'data bytes'
    Total OE L1 Gas: 2376 + 2661 = 5037
    Original L1 gas 2386536

- ETH<->USD chainlink fulfillOracleRequest (109,230) **Savings: 16.7x**

    [https://etherscan.io/tx/0xbc038ed067d885eb122111ddc5a112e7aef157091b8715149be10e3021779167](https://etherscan.io/tx/0xbc038ed067d885eb122111ddc5a112e7aef157091b8715149be10e3021779167)
    124 'zero bytes,' 211 'data bytes'
    Total OE L1 Gas: 3872 + 2661 = 6533
    Original L1 gas 109230

- Uniswap swap **Savings: 27.9x**

    [https://etherscan.io/tx/0x68f8442e3a4ea3c1bd6fa1c5e95594ab960a58c4765c0a2f01fae105da450e44](https://etherscan.io/tx/0x68f8442e3a4ea3c1bd6fa1c5e95594ab960a58c4765c0a2f01fae105da450e44)
    152 'zero bytes,' 220 'data bytes'
    Total OE L1 Gas: 4128 + 2661 = 6789
    Original L1 gas 189543

- Normal WBTC (ERC20) Transfer **Savings: 9.8x**

    [https://etherscan.io/tx/0x2c36f3ac1404584585199d42b75f8f02b6ee56cbda0dbd9ae171885e370d9b5f](https://etherscan.io/tx/0x2c36f3ac1404584585199d42b75f8f02b6ee56cbda0dbd9ae171885e370d9b5f)
    42 'zero bytes,' 162 'data bytes'
    Total OE L1 Gas: 2760 + 2661 = 5421
    Original L1 gas 53299