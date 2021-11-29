---
title: JSON-RPC API
lang: en-US
---

# {{ $frontmatter.title }}

Optimistic Ethereum shares the same [JSON-RPC API](https://eth.wiki/json-rpc/API) as Ethereum.
Some custom methods have been introduced to simplify certain Optimistic Ethereum specific interactions.

## Custom JSON-RPC Methods

::: warning NOTICE
Custom JSON-RPC methods are currently highly subject to change.
**We strongly discourage relying on these JSON-RPC methods.**
:::

---

### `eth_getBlockRange`

::: warning DEPRECATION NOTICE
We will likely remove this method in a future release in favor of simply using batched RPC requests.
If your application relies on this method, please file an issue and we will provide a migration path.
Otherwise, please use `eth_getBlockByNumber` instead.
:::

Like `eth_getBlockByNumber` but accepts a range of block numbers instead of just a single block.

**Parameters**

1. `QUANTITY|TAG` - integer of the starting block number for the range, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
2. `QUANTITY|TAG` - integer of the ending block number for the range, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
3. `BOOLEAN` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

**Returns**

An array of `block` objects.
See [`eth_getBlockByHash`](https://eth.wiki/json-rpc/API#eth_getblockbyhash) for the structure of a `block` object.

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockRange","params":["0x1", "0x2", false],"id":1}' <node url>

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":[
    {
      "difficulty":"0x2",
      "extraData":"0xd98301090a846765746889676f312e31352e3133856c696e75780000000000009c3827892825f0825a7e329b6913b84c9e4f89168350aff0939e0e6609629f2e7f07f2aeb62acbf4b16a739cab68866f4880ea406583a4b28a59d4f55dc2314e00",
      "gasLimit":"0xe4e1c0",
      "gasUsed":"0x3183d",
      "hash":"0xbee7192e575af30420cae0c7776304ac196077ee72b048970549e4f08e875453",
      "logsBloom":"0x00000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000400000000000100000000000000200000000002000000000000001000000000000000000004000000000000000000000000000040000400000100400000000000000100000000000000000000000000000020000000000000000000000000000000000000000000000001000000000000000000000100000000000000000000000000000000000000000000000000000000000000088000000080000000000010000000000000000000000000000800008000120000000000000000000000000000000002000",
      "miner":"0x0000000000000000000000000000000000000000",
      "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x0000000000000000",
      "number":"0x1",
      "parentHash":"0x7ca38a1916c42007829c55e69d3e9a73265554b586a499015373241b8a3fa48b",
      "receiptsRoot":"0xf4c97b1186b690ad3318f907c0cdaf46f4598f27f711a5609064b2690a767287",
      "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size":"0x30c",
      "stateRoot":"0xd3ac40854cd2ac17d8effeae6065cea990b04be714f7061544973feeb2f1c95f",
      "timestamp":"0x618d8837",
      "totalDifficulty":"0x3",
      "transactions":["0x5e77a04531c7c107af1882d76cbff9486d0a9aa53701c30888509d4f5f2b003a"],
      "transactionsRoot":"0x19f5efd0d94386e72fcb3f296f1cb2936d017c37487982f76f09c591129f561f",
      "uncles":[]
    },
    {
      "difficulty":"0x2",
      "extraData":"0xd98301090a846765746889676f312e31352e3133856c696e757800000000000064a82cb66c7810b9619e7f14ab65c769a828b1616974987c530684eb3870b65e5b2400c1b61c6d340beef8c8e99127ac0de50e479d21f0833a5e2910fe64b41801",
      "gasLimit":"0xe4e1c0",
      "gasUsed":"0x1c60d",
      "hash":"0x45fd6ce41bb8ebb2bccdaa92dd1619e287704cb07722039901a7eba63dea1d13",
      "logsBloom":"0x00080000000200000000000000000008000000000000000000000100008000000000000000000000000000000000000000000000000000000000400000000000100000000000000000000000020000000000000000000000000000000000004000000000000000000000000000000000400000000400000000000000100000000000000000000000000000020000000000000000000000000000000000000000100000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000008400000000000000000010000000000000000020000000020000000000000000000000000000000000000000000002000",
      "miner":"0x0000000000000000000000000000000000000000",
      "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x0000000000000000","number":"0x2",
      "parentHash":"0xbee7192e575af30420cae0c7776304ac196077ee72b048970549e4f08e875453",
      "receiptsRoot":"0x2057c8fb79c0f294062c1436aa56741134dc46d228a4f874929f8b791a7007a4",
      "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size":"0x30c",
      "stateRoot":"0x87026f3a614318ae24bcef6bc8f7564479afbbbe2b1fb189bc133a5de5a2b0f8",
      "timestamp":"0x618d8837",
      "totalDifficulty":"0x5",
      "transactions":["0xaf6ed8a6864d44989adc47c84f6fe0aeb1819817505c42cde6cbbcd5e14dd317"],
      "transactionsRoot":"0xa39c4d0d2397f8fcb1683ba833d4ab935cd2f4c5ca6f56a7d9a45b9904ea1c69",
      "uncles":[]
    }
  ]
}
```

---

### `rollup_getInfo`

Returns useful L2-specific information about the current node.

**Parameters**

None

**Returns**

`Object`
- `mode`: `STRING` - `"sequencer"` or `"verifier"` depending on the node's mode of operation
- `syncing`: `BOOLEAN` - `true` if the node is currently syncing, `false` otherwise
- `ethContext`: `OBJECT`
  - `blockNumber`: `QUANTITY` - Block number of the latest known L1 block
  - `timestamp`: `QUANTITY` - Timestamp of the latest known L1 block
- `rollupContext`: `OBJECT`
  - `queueIndex`: `QUANTITY` - Index within the CTC of the last L1 to L2 message ingested
  - `index`: `QUANTITY` - Index of the last L2 tx processed
  - `verifiedIndex`: `QUANTITY` - Index of the last tx that was ingested from a batch that was posted to L1

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"rollup_getInfo","params":[],"id":1}' <node url>

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "mode":"verifier",
    "syncing":false,
    "ethContext":{
      "blockNumber":13679735,
      "timestamp":1637791660
    },
    "rollupContext":{
      "index":430948,
      "queueIndex":12481,
      "verifiedIndex":0
    }
  }
}
```

---

### `rollup_gasPrices`

Returns the L1 and L2 gas prices that are being used by the Sequencer to calculate fees.

**Parameters**

None

**Returns**

`Object`
- `l1GasPrice`: `QUANTITY` - L1 gas price in wei that the Sequencer will use to estimate the L1 portion of fees (calldata costs).
- `l2GasPrice`: `QUANTITY` - L2 gas price in wei that the Sequencer will use to estimate the L2 portion of fees (execution costs).

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"rollup_gasPrices","params":[],"id":1}' <node url>

// Result
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "l1GasPrice":"0x237aa50984",
    "l2GasPrice":"0xf4240"
  }
}
```

---

## Unsupported JSON-RPC methods

### `eth_getAccounts`

This method is used to retrieve a list of addresses owned by a user.
Optimistic Ethereum nodes do not expose internal wallets for security reasons and therefore block the `eth_getAccounts` method by default.
You should use external wallet software as an alternative.

### `eth_sendTransaction`

Optimistic Ethereum nodes also block the `eth_sendTransaction` method for the same reasons as `eth_getAccounts`.
You should use external wallet software as an alternative.
Please note that this is not the same as the `eth_sendRawTransaction` method, which accepts a signed transaction as an input.
`eth_sendRawTransaction` _is_ supported by Optimistic Ethereum.
