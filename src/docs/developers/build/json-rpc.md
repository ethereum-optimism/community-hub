---
title: JSON-RPC API
lang: en-US
---


There are several OP Mainnet components with an RPC API:

## Rollup node (op-node)


[*Rollup node*](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md) refers to the component in the protocol specifications. 
The OP Mainnet implementation is called *op-node*.

The `op-node` component implements several RPC methods:

### `optimism_outputAtBlock`

Get the output root at a specific block.
This method is documented in [the specifications](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md#output-method-api).

```sh
curl -X POST -H "Content-Type: application/json" --data  \
   '{"jsonrpc":"2.0","method":"optimism_outputAtBlock","params":["latest"],"id":1}' \
   http://localhost:9545
```

Sample output:

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":[
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0xabe711e34c1387c8c56d0def8ce77e454d6a0bfd26cef2396626202238442421"
   ]
}
```

### `optimism_syncStatus`

Get the synchronization status.

```sh
curl -X POST -H "Content-Type: application/json" --data \
    '{"jsonrpc":"2.0","method":"optimism_syncStatus","params":[],"id":1}'  \
    http://localhost:9545
```

Sample output:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "current_l1": {
      "hash": "0x5adcfcbd1c2fcf9e06bfdaa8414a4586f84e11f487396abca940299eb0ed2da5",
      "number": 7569281,
      "parentHash": "0xfd022ca8a8c4e0f3bfd67081c18551840ea0717cc01d9a94601e1e41e92616d3",
      "timestamp": 1662862860
    },
    "head_l1": {
      "hash": "0x5c12fde5ea79aefe4b52c0c8cc0e0eb33a2ccb423cb3cd9c9132e18ad42e89b6",
      "number": 8042823,
      "parentHash": "0x74818f8ecaa932431bf9523e929dcfa11ab382c752529d8271a24810884a2551",
      "timestamp": 1669735356
    },
    "safe_l1": {
      "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "number": 0,
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0
    },
    "finalized_l1": {
      "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "number": 0,
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 0
    },
    "unsafe_l2": {
      "hash": "0x1cad05886ec0e2cda728674e00eadcbb9245ff34c0bfd86c866673a615c1c43a",
      "number": 1752,
      "parentHash": "0x0115dbbd26aaf9563d7e3cad65bad41926d94b2643ccb080f71e394c2c3d62a3",
      "timestamp": 1662861300,
      "l1origin": {
        "hash": "0x43fe1601041056e9a2a5dabaa20715518ae0058abf67a69f5ebdd53b1f6ff02f",
        "number": 7569162
      },
      "sequenceNumber": 0
    },
    "safe_l2": {
      "hash": "0x1cad05886ec0e2cda728674e00eadcbb9245ff34c0bfd86c866673a615c1c43a",
      "number": 1752,
      "parentHash": "0x0115dbbd26aaf9563d7e3cad65bad41926d94b2643ccb080f71e394c2c3d62a3",
      "timestamp": 1662861300,
      "l1origin": {
        "hash": "0x43fe1601041056e9a2a5dabaa20715518ae0058abf67a69f5ebdd53b1f6ff02f",
        "number": 7569162
      },
      "sequenceNumber": 0
    },
    "finalized_l2": {
      "hash": "0x6758307d692d4f2f6650acd3762674749a0c1cc2530b9b481845d0f8ee1bd456",
      "number": 0,
      "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1662857796,
      "l1origin": {
        "hash": "0xb0bbb79a00fb8485185b1bedfac386812d662e1cddba77b67a26e1ed9ba8f0ec",
        "number": 7568910
      },
      "sequenceNumber": 0
    }
  }
}
```

### `optimism_rollupConfig`

Get the rollup configuration parameters.

```sh
curl -X POST -H "Content-Type: application/json" --data \
    '{"jsonrpc":"2.0","method":"optimism_rollupConfig","params":[],"id":1}'  \
    http://localhost:9545
```

Sample output:

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":{
      "genesis":{
         "l1":{
            "hash":"0xb0bbb79a00fb8485185b1bedfac386812d662e1cddba77b67a26e1ed9ba8f0ec",
            "number":7568910
         },
         "l2":{
            "hash":"0x6758307d692d4f2f6650acd3762674749a0c1cc2530b9b481845d0f8ee1bd456",
            "number":0
         },
         "l2_time":1662857796
      },
      "block_time":2,
      "max_sequencer_drift":120,
      "seq_window_size":120,
      "channel_timeout":30,
      "l1_chain_id":5,
      "l2_chain_id":28528,
      "p2p_sequencer_address":"0x59dc8e68a80833cc8a9592d532fed42374c8b5dc",
      "fee_recipient_address":"0xdffc6a1c238ff9504b055ad7efeee0148f2d62bd",
      "batch_inbox_address":"0xfeb2acb903f95fb5f5497157c0727a7d16e3fd16",
      "batch_sender_address":"0x4ff79526ea1d492a3db2aa210d7318ff13f2012c",
      "deposit_contract_address":"0xa581ca3353db73115c4625ffc7adf5db379434a8"
   }
}
```

### `optimism_version`

Get the software version.

```sh
curl -X POST -H "Content-Type: application/json" \
'--data '{"jsonrpc":"2.0","method":"optimism_version","params":[],"id":1}' \
http://localhost:9545
```

Sample output:

```json
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"v0.0.0-"
}
```

### Peer to peer synchronization

Optionally, the rollup node can provide [peer to peer synchronization](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node-p2p.md) to provide pending L2 blocks to other rollup nodes.


## Execution engine (op-geth)


[*Execution engine*](https://github.com/ethereum-optimism/optimism/blob/65ec61dde94ffa93342728d324fecf474d228e1f/specs/rollup-node.md) refers to the component in the protocol specifications. 
The OP Mainnet implementation is called *op-geth*.

The execution engine's RPC interface is identical to [the upstream Geth RPC interface](https://geth.ethereum.org/docs/rpc/server). This includes the ability to provide [snap sync](https://github.com/ethereum/devp2p/blob/master/caps/snap.md) functionality to other execution engines.

The responses are nearly identical too, except we also include the L1 gas usage and price information.

## Daisy chain

The daisy chain is a proxy that distributes requests either to the execution engine (if related to post-Bedrock blocks), or the legacy geth (if related to blocks prior to bedrock). 
It accepts [the interface used by L1 execution engines](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false).

## Legacy geth

The legacy geth provides information about the blockchain prior to Bedrock.
It implements the read-only methods of [the interface used by L1 execution engines](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/execution-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false).
It does not implement `eth_sendTransaction` and `eth_sendRawTransaction`, because they don't make sense in a read-only copy.
