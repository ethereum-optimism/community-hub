---
title: JSON-RPC API Differences
lang: en-US
---

# {{ $frontmatter.title }}

Most JSON-RPC methods in Optimistic Ethereum are identical to the corresponding methods in the Ethereum JSON-RPC API.
However, a few JSON-RPC methods have been added or changed to better fit the needs of Optimistic Ethereum.

## Modified JSON-RPC Methods

### `eth_estimateGas`

`eth_estimateGas` has been modified to encode information about both the cost of _executing_ a transaction and the cost to _publish_ the transaction data to Layer 1 (Ethereum).
See our dedicated [Transaction Fees page](docs/infra/fees.html) for more information.

### `eth_getBlockByNumber` and `eth_getBlockByHash`

Currently, Optimistic Ethereum blocks only include a single transaction.
If you query `eth_getBlockByNumber` or `eth_getBlockByHash`, you should expect to only see one transaction.
Note that this increases the number of blocks produced by the network, which may have an impact on the performance of applications that assume a slower block production rate.

## Added JSON-RPC Methods

::: tip On custom JSON-RPC methods
Our custom JSON-RPC methods are highly subject to change.
We generally do not recommend relying on these JSON-RPC methods for the moment.
:::

### `eth_estimateExecutionGas`

Behaves identically to `eth_estimateGas` on a standard L1 node.
Returns the expected _execution_ gas cost of a transaction and does not include any information about the cost to publish the transaction data to Layer 1.

### `eth_getBlockRange`

::: tip Deprecation Notice
We will likely remove this method in a future release in favor of simply using batched RPC requests.
If your application relies on this method, please file an issue and we will provide a migration path.
Otherwise, please use `eth_getBlockByNumber` instead.
:::

Like `eth_getBlockByNumber` but accepts a range of block numbers instead of just a single block.

**Parameters**

1. `QUANTITY|TAG` - integer of the starting block number for the range, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
2. `QUANTITY|TAG` - integer of the ending block number for the range, or the string `"earliest"`, `"latest"` or `"pending"`, as in the [default block parameter](https://eth.wiki/json-rpc/API#the-default-block-parameter).
3. `Boolean` - If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.

**Returns**

An array of blocks (see [eth_getBlockByHash](https://eth.wiki/json-rpc/API#eth_getblockbyhash)).

### `rollup_getInfo`

Returns useful L2-specific information about the current node.

**Parameters**

None

**Returns**

- Object with the following fields:
  - `mode` - `"sequencer"` or `"verifier"` depending on the node's mode of operation
  - `syncing` - `true` if the node is currently syncing, `false` otherwise
  - `ethContext` - Object with the following fields:
    - `blockNumber` - Block number that would currently be returned by the OVM
    - `timestamp` - Timestamp that would currently be returned by the OVM
  - `rollupContext` - Object with the following fields:
    - `queueIndex` - Index within the CTC of the last L1 to L2 message ingested
    - `index` - Index of the last L2 tx processed
    - `verifiedIndex` - Index of the last tx that was ingested from a batch that was posted to L1

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"rollup_getInfo","params":[],"id":1}' <node url>

// Result
{
  "mode": "sequencer",
  "syncing": false,
  "ethContext": {
    "blockNumber": 12635529,
    "timestamp": 1623712886
  },
  "rollupContext": {
    "index": 51593,
    "queueIndex": 1388,
    "verifiedIndex": 0
  }
}
```

### `rollup_gasPrices`

Returns the L1 and L2 gas prices that are being used by the Sequencer to calculate fees.

**Parameters**

None

**Returns**

- Object with the following fields:
  - `l1GasPrice` - L1 gas price in wei that the Sequencer will use to estimate the L1 portion of fees (calldata costs).
  - `l2GasPrice` - L2 gas price in wei that the Sequencer will use to estimate the L2 portion of fees (execution costs).

**Example**

```json
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"rollup_gasPrices","params":[],"id":1}' <node url>

// Result
{
  "l1GasPrice": "0x165a0bc00",
  "l2GasPrice": "0x0"
}
```

## Unsupported JSON-RPC Methods

### `eth_getAccounts`

This method is used to retrieve a list of addresses owned by a user.
Optimistic Ethereum nodes do not expose internal wallets for security reasons and therefore block the `eth_getAccounts` method by default.
You should use external wallet software as an alternative.

### `eth_sendTransaction`

Optimistic Ethereum nodes also block the `eth_sendTransaction` method for the same reasons as `eth_getAccounts`.
You should use external wallet software as an alternative.
Please note that this is not the same as the `eth_sendRawTransaction` method, which accepts a signed transaction as an input.
`eth_sendRawTransaction` _is_ supported by Optimistic Ethereum.

### `evm_increaseTime`, `evm_snapshot`, and `evm_revert`

All of these methods are debug methods exposed by `ethereumjs-vm` and are not part of the standard JSON-RPC API.
We currently do not support any of these methods but may add support in the future.
