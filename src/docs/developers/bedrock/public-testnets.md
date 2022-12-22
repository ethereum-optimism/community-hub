---
title: Public Testnets
lang: en-US
---

We are operating a series of public Bedrock testnets to allow node operators and dApp developers to prepare their systems for the upcoming upgrade. Information on how to participate in these testnets is below.

## Goerli Upgrade Rehearsal

The Goerli Upgrade Rehearsal is a public testnet that will be used to rehearse the upgrade process. It will be a full upgrade of our Goerli testnet using a forked L1. The L2 network was upgraded at block 3324763.

:::warning Replayability Warning
This network is an exact fork of both L1 and L2 Goerli. The chain IDs for these forks are the same as their original networks. As a result, transactions submitted to either the forked L1 or the testnet L2 can be replayed on their respective actual networks. **Please do not send any transactions on this network that you do not want replayed.**
:::

<table width="100%">
    <tbody>
        <tr>
            <td colspan="2"><strong>Chain Parameters</strong></td>
        </tr>
        <tr>
            <td>L1 Chain</td>
            <td>Forked Goerli</td>
        </tr>
        <tr>
            <td>L1 Chain ID</td>
            <td>5</td>
        </tr>
        <tr>
            <td>L1 Fork RPC</td>
            <td><a href="https://goerli-l1-public-rehearsal.optimism.io">https://goerli-l1-public-rehearsal.optimism.io</a></td>
        </tr>
        <tr>
            <td>L2 Chain ID</td>
            <td><code>420</code></td>
        </tr>
        <tr>
            <td>Rollup Config</td>
            <td><a href="https://storage.googleapis.com/bedrock-goerli-regenesis-data/goerli-public-rehearsal/rollup.json">https://storage.googleapis.com/bedrock-goerli-regenesis-data/goerli-public-rehearsal/rollup.json</a></td>
        </tr>
        <tr>
            <td>Bedrock Data Directory</td>
            <td><a href="https://storage.googleapis.com/op-bedrock-migration/goerli-3324763-bedrock.tar">https://storage.googleapis.com/op-bedrock-migration/goerli-3324763-bedrock.tar</a></td>
        </tr>
        <tr>
            <td>Legacy Geth Data Directory</td>
            <td><a href="https://storage.googleapis.com/op-bedrock-migration/goerli-3324763-legacy.tar">https://storage.googleapis.com/op-bedrock-migration/goerli-3324763-legacy.tar</a></td>
        </tr>
        <tr>
            <td>Block Explorer</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td>Public RPC Endpoints</td>
            <td>
                Please use the sequencer endpoint below.
            </td>
        </tr>
        <tr>
            <td>Sequencer Endpoint</td>
            <td>
                <a href="https://goerli-l2-public-rehearsal-sequencer.optimism.io">https://goerli-l2-public-rehearsal-sequencer.optimism.io</a>
            </td>
        </tr>
        <tr>
            <td>Withdrawal Period</td>
            <td>2 Seconds</td>
        </tr>
        <tr>
            <td colspan="2"><strong>Software Images</strong></td>
        </tr>
        <tr>
            <td>op-node</td>
            <td><code>us-central1-docker.pkg.dev/bedrock-goerli-development/images/op-node:goerli-public-rehearsal-1</code></td>
        </tr>
        <tr>
            <td>op-geth</td>
            <td><code>ethereumoptimism/op-geth:goerli-public-rehearsal-1</code></td>
        </tr>
        <tr>
            <td>Legacy Geth</td>
            <td><code>ethereumoptimism/l2geth:0.5.29</code></td>
        </tr>
        <tr>
            <td colspan="2"><strong>Contract Addresses</strong></td>
        </tr>
        <tr>
            <td>L2OutputOracleProxy</td>
            <td><code>0x02Ac1923480E7fd234e7F2Fd11596b9F20372374</code></td>
        </tr>
        <tr>
            <td>OptimismMintableERC20FactoryProxy</td>
            <td><code>0x60fAF74F5F366B0e8F2D0bBC099a6cD7f5aE352A</code></td>
        </tr>
        <tr>
            <td>OptimismPortalProxy</td>
            <td><code>0x7Db2f4b1F880257a99e024647CeaD4e3aD63b665</code></td>
        </tr>
        <tr>
            <td>SystemConfigProxy</td>
            <td><code>0x26B331110F1358b6cD1d6ab3e1015b9f4916d2B7</code></td>
        </tr>
    </tbody>
</table>

## Beta

The beta network is our official public testnet. It will continue to be maintained until we upgrade Goerli in early 2023.

<table width="100%">
    <tbody>
    <tr>
        <td colspan="2"><strong>Chain Parameters</strong></td>
    </tr>
    <tr>
        <td>L1 Chain</td>
        <td>Goerli</td>
    </tr>
    <tr>
        <td>L1 Chain ID</td>
        <td>5</td>
    </tr>
    <tr>
        <td>L2 Chain ID</td>
        <td><code>902</code></td>
    </tr>
    <tr>
        <td>Rollup Config</td>
        <td>None. Specify <code>--network=beta-1</code> on the CLI or <code>OP_NODE_NETWORK=beta-1</code> as an
            environment variable.
        </td>
    </tr>
    <tr>
        <td>Block Explorer</td>
        <td><a href="https://blockscout.com/optimism/bedrock-beta">Blockscout</a></td>
    </tr>
    <tr>
        <td>Public RPC Endpoints</td>
        <td>
            Choose one of:
            <ul>
                <li>
                    <a href="https://bedrock-beta-1-replica-0.optimism.io">https://bedrock-beta-1-replica-0.optimism.io</a>
                </li>
                <li>
                    <a href="https://bedrock-beta-1-replica-1.optimism.io">https://bedrock-beta-1-replica-1.optimism.io</a>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Sequencer Endpoint</td>
        <td>
            <a href="https://bedrock-beta-1-sequencer.optimism.io">https://bedrock-beta-1-sequencer.optimism.io</a>
        </td>
    </tr>
    <tr>
        <td>Withdrawal Period</td>
        <td>2 Seconds</td>
    </tr>
    <tr>
        <td colspan="2"><strong>Software Images</strong></td>
    </tr>
    <tr>
        <td>op-node</td>
        <td><code>us-central1-docker.pkg.dev/bedrock-goerli-development/images/op-node:v0.1.0-beta.1</code></td>
    </tr>
    <tr>
        <td>op-geth</td>
        <td><code>ethereumoptimism/op-geth:v0.1.0-beta.1</code></td>
    </tr>
    <tr>
        <td colspan="2"><strong>Contract Addresses</strong></td>
    </tr>
    <tr>
        <td>FreshSystemDictator</td>
        <td><code>0x545CB23c98095a8e98D6b561baAB6bb0d86317C4</code></td>
    </tr>
    <tr>
        <td>SystemConfigProxy</td>
        <td><code>0x686dF068eaa71aF78DadC1C427e35600E0FADaC5</code></td>
    </tr>
    <tr>
        <td>L1ERC721Bridge</td>
        <td><code>0xeDB153028E711Fcde54d2FcDc3cac72B593528c2</code></td>
    </tr>
    <tr>
        <td>L1CrossDomainMessengerProxy</td>
        <td><code>0x3e654CBd61711dC9D114b61813846b6401695f07</code></td>
    </tr>
    <tr>
        <td>OptimismMintableERC20Factory</td>
        <td><code>0x5E83A814A3d78362Eea9dE2725443Ae8f1eC5A6f</code></td>
    </tr>
    <tr>
        <td>L2OutputOracleProxy</td>
        <td><code>0xAc92cEc51dFA387F37590Bc1DC049F50AB99D8eC</code></td>
    </tr>
    <tr>
        <td>L1CrossDomainMessenger</td>
        <td><code>0x7BE679072aA579278D5e70665E3FfD38C470A778</code></td>
    </tr>
    <tr>
        <td>ProxyAdmin</td>
        <td><code>0x677CB0Eba0FC01F65E05F82C218027d8dcb9B99f</code></td>
    </tr>
    <tr>
        <td>OptimismPortalProxy</td>
        <td><code>0xf91795564662DcC9a17de67463ec5BA9C6DC207b</code></td>
    </tr>
    <tr>
        <td>L2OutputOracle</td>
        <td><code>0x388a75C49a2C45F69be3925616fbb1f52313f287</code></td>
    </tr>
    <tr>
        <td>SystemConfig</td>
        <td><code>0xB8ed4737d1a7187F3A8CC7AAf811BcCBDEF9b6Cb</code></td>
    </tr>
    <tr>
        <td>L1ERC721BridgeProxy</td>
        <td><code>0x550D68323Ec7CbA3D568e6C695B4609d450e5670</code></td>
    </tr>
    <tr>
        <td>L1StandardBridge</td>
        <td><code>0x25E4731aC3ee613290A54fB52060e404341f9e4d</code></td>
    </tr>
    <tr>
        <td>PortalSender</td>
        <td><code>0x558777af921ac97F9f55A1d527e79482109AFD0a</code></td>
    </tr>
    <tr>
        <td>L1StandardBridgeProxy</td>
        <td><code>0x3F0135534453CEC0eA94187C62bF80EF21dc9C91</code></td>
    </tr>
    <tr>
        <td>OptimismMintableERC20FactoryProxy</td>
        <td><code>0xC9E9D0EaBD09B8AD6a4ace95a098a49a7550E7A4</code></td>
    </tr>
    <tr>
        <td>OptimismPortal</td>
        <td><code>0x3287F5c18237DBb24588854f77fF977254Ee1037</code></td>
    </tr>
    </tbody>
</table>

## Alpha

:::warning Deprecation Warning
While still active, the Alpha testnet should be considered deprecated. Do not use it for new deployments. It is missing
significant but backwards-incompatible changes with the later testnets. It may be taken down at any time.
:::

<table width="100%">
    <tbody>
    <tr>
        <td colspan="2"><strong>Chain Parameters</strong></td>
    </tr>
    <tr>
        <td>L1 Chain</td>
        <td>Goerli</td>
    </tr>
    <tr>
        <td>L1 Chain ID</td>
        <td>5</td>
    </tr>
    <tr>
        <td>L2 Chain ID</td>
        <td><code>28528</code></td>
    </tr>
    <tr>
        <td>Rollup Config</td>
        <td>Download from <a
                href="https://storage.googleapis.com/bedrock-goerli-regenesis-data/alpha-1/rollup.json">https://storage.googleapis.com/bedrock-goerli-regenesis-data/alpha-1/rollup.json</a>
        </td>
    </tr>
    <tr>
        <td>Genesis Config</td>
        <td>Download from <a
                href="https://storage.googleapis.com/bedrock-goerli-regenesis-data/alpha-1/genesis.json">https://storage.googleapis.com/bedrock-goerli-regenesis-data/alpha-1/genesis.json</a>
        </td>
    </tr>
    <tr>
        <td>Block Explorer</td>
        <td>Discontinued</td>
    </tr>
    <tr>
        <td>Public RPC Endpoints</td>
        <td>
            Choose one of:
            <ul>
                <li><a href="https://alpha-1-replica-0.bedrock-goerli.optimism.io">https://alpha-1-replica-0.bedrock-goerli.optimism.io</a>
                </li>
                <li><a href="https://alpha-1-replica-1.bedrock-goerli.optimism.io">https://alpha-1-replica-1.bedrock-goerli.optimism.io</a>
                </li>
                <li><a href="https://alpha-1-replica-2.bedrock-goerli.optimism.io">https://alpha-1-replica-2.bedrock-goerli.optimism.io</a>
                </li>
                <li><a href="https://alpha-1-replica-3.bedrock-goerli.optimism.io">https://alpha-1-replica-3.bedrock-goerli.optimism.io</a>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Withdrawal Period</td>
        <td>1 Hour</td>
    </tr>
    <tr>
        <td colspan="2"><strong>Software Images</strong></td>
    </tr>
    <tr>
        <td>Oneshot Container</td>
        <td><code>us-central1-docker.pkg.dev/bedrock-goerli-development/images/bedrock-oneshot:v0.1.0-alpha.1</code>
        </td>
    </tr>
    <tr>
        <td>op-node</td>
        <td><code>us-central1-docker.pkg.dev/bedrock-goerli-development/images/op-node:v0.1.0-alpha.1</code></td>
    </tr>
    <tr>
        <td>op-geth</td>
        <td><code>ethereumoptimism/op-geth:v0.1.0-alpha.1</code></td>
    </tr>
    <tr>
        <td>Monorepo Codebase</td>
        <td><code>bedrock/v0.1.0-alpha.1</code></td>
    </tr>
    <tr>
        <td colspan="2"><strong>Contract Addresses</strong></td>
    </tr>
    <tr>
        <td>L1StandardBridge</td>
        <td><code>0xCBBAf1644147BaeCf70441e07a36bEaCd0b89623</code></td>
    </tr>
    <tr>
        <td>OptimismPortalProxy</td>
        <td><code>0xA581Ca3353DB73115C4625FFC7aDF5dB379434A8</code></td>
    </tr>
    <tr>
        <td>L1CrossDomainMessengerProxy</td>
        <td><code>0x838a6DC4E37CA45D4Ef05bb776bf05eEf50798De</code></td>
    </tr>
    <tr>
        <td>AddressManager</td>
        <td><code>0xb4e08DcE1F323608229265c9d4125E22a4B9dbAF</code></td>
    </tr>
    <tr>
        <td>L2OutputOracle</td>
        <td><code>0xD54EEac0423186df59641D2fA945AdDB3d385b19</code></td>
    </tr>
    <tr>
        <td>ProxyAdmin</td>
        <td><code>0x657ABd214bbA3580e8E82345DC5B2b308A738457</code></td>
    </tr>
    <tr>
        <td>L1CrossDomainMessenger</td>
        <td><code>0x8AB9b7Aa77B8Eb4c9aed319957A408cEc550218c</code></td>
    </tr>
    <tr>
        <td>OptimismMintableERC20FactoryProxy</td>
        <td><code>0x28A8256cEC0B8044Bd40221A651ccEe92Cd320bC</code></td>
    </tr>
    <tr>
        <td>OptimismPortal</td>
        <td><code>0x1A164AcA739BDC7455bF70aE9dF1AA9A8E8b2d05</code></td>
    </tr>
    <tr>
        <td>OptimismMintableERC20Factory</td>
        <td><code>0xCa07cdc32f256e60D9d65CC69A41629DA634411e</code></td>
    </tr>
    <tr>
        <td>L1StandardBridgeProxy</td>
        <td><code>0xFf94B6C486350aD92561Ba09bad3a59df764Da92</code></td>
    </tr>
    <tr>
        <td>L2OutputOracleProxy</td>
        <td><code>0x3A234299a14De50027eA65dCdf1c0DaC729e04A6</code></td>
    </tr>
    </tbody>
</table>