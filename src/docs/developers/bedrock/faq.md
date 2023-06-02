---
title: FAQ 
lang: en-US
meta:
    - name: og:image
      content: https://dev.optimism.io/content/images/size/w2000/2022/12/bedrock-BLUE.jpg
---

![Bedrock](https://dev.optimism.io/content/images/size/w2000/2022/12/bedrock-BLUE.jpg)


## Upgrade day

### What if the upgrade fails?

There are multiple validity tests planned during the upgrade downtime window (the 2-4 hours starting at 16:00 UTC on June 6th, 2023).
In the unlikely case that those tests fail, we anticipate being able to roll back to pre-Bedrock without exceeding the 4 hour window.


### When will the Docker images be published?

They will be published on the day of the upgrade, close to the end of the migration. You will be able to see when they are available [on the mission control page](https://oplabs.notion.site/Bedrock-Mission-Control-EXTERNAL-fca344b1f799447cb1bcf3aae62157c5).


### When will the migrated datadir be available?

It will be published on the day of the upgrade, close to the end of the migration. You will be able to see when it is available [on the mission control page](https://oplabs.notion.site/Bedrock-Mission-Control-EXTERNAL-fca344b1f799447cb1bcf3aae62157c5).


### When do I upgrade my node?

The best time to upgrade your node would be immediately after Optimism itself finishes the Bedrock upgrade.
The images we distribute will be nearly up to date, so you'll be able to synchronize relatively quickly.


## Blocks

### The EVM

[See here for the minor EVM differences](https://community.optimism.io/docs/developers/bedrock/differences/#the-evm).

### Finality

In Bedrock you determine finality the same way you do in Ethereum.
For example, you can use this command:

```sh
cast block finalized number --rpc-url https://mainnet.optimism.io
```

### How long could it take a block to move from latest to finalized?

In theory it could take up to twelve hours.
In practice, the sequencer is setup to take 5-10 minutes to write the transactions, and then finalization on L1 can take 15 minutes. 


## Pricing

### What is the new gas limit?

In Bedrock the block gas limit is 30,000,000. 
Note that we use EIP 1559 for congestion pricing and if a block has more than 5,000,000 gas the base fee increases.

### How do I determine the priority fee?

You can see what priority fee was paid by transactions in the last block, as you can do on L1.
You can also use [this dashboard](https://optimism.io/gas-tracker).


### How will costs change immediately after the upgrade?

The L1 gas price formula will not be changed immediately.
After Bedrock runs in production for a few weeks we hope to reduce [the dynamic overhead multiplier](https://community.optimism.io/docs/developers/build/transaction-fees/#the-l2-execution-fee) because of the better compression, but it's best to do that when we have a track record.

The L2 gas price depends on congestion, using the EIP 1559 mechanism.
Our gas target is 5,000,000 gas per 2 second block, or 150 million gas per minute.
For reference, in L1 Ethereum the gas target is 15 milliom per 12 second block, or 75 million gas per minute.