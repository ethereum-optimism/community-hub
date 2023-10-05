---
title: Oracles 
lang: en-US
---


[Oracles](https://ethereum.org/en/developers/docs/oracles/) provide offchain data onchain. 
This allows code running on a blockchain to access a wide variety of information.
For example, a [stablecoin](https://ethereum.org/en/stablecoins/) that accepts ETH as collateral needs to know the ETH/USD exchange rate:

- How many stablecoins can we give a user for a given amount of ETH?
- Do we need to liquidate any deposits because they are under collateralized?

Different oracles have different security assumptions and different levels of decentralization.
Usually they are either run by the organization that produces the information, or have a mechanism to reward entities that provide accurate information and penalize those that provide incorrect information.

## Types of oracles

There are two types of oracles:

1. **Push oracles** are updated continuously and always have up to date information available onchain.

1. **Pull oracles** are only updated when information is requested by a contract.
   Pull oracles are themselves divided into two types:
   1. Double-transaction oracles, which require two transactions. 
      The first transaction is the request for information, which usually causes the oracle to emit an event that triggers some offchain mechanism to provide the answer (through its own transaction).
      The second transaction actually reads onchain the result from the oracle and uses it.
   1. Single-transaction oracles, which only require one transaction, such as [Chainlink's random number generator](https://docs.chain.link/docs/get-a-random-number/#request-random-values).
      The way this works is that the transaction that requests the information includes a callback (address and the call data to provide it). 
      When the oracle is updated (which also happens through a transaction, but one that is not sent by the user), the oracle uses the callback to inform a contract of the result.

## Gas Oracle


OP Mainnet provides a [Gas Price Oracle](https://github.com/ethereum-optimism/optimism/blob/233ede59d16cb01bdd8e7ff662a153a4c3178bdd/packages/contracts/contracts/L2/predeploys/OVM_GasPriceOracle.sol) that provides information about [gas prices and related parameters](../developers/build/transaction-fees.md).
It can also calculate the total cost of a transaction for you before you send it.

This contract is a predeploy at address `0x420000000000000000000000000000000000000F`:

- [On OP Mainnet](https://explorer.optimism.io/address/0x420000000000000000000000000000000000000F#readContract)
- [On OP Goerli](https://goerli-explorer.optimism.io/address/0x420000000000000000000000000000000000000F)

This is a push Oracle. 
OP Mainnet (and the testnets) updates the gas price parameters onchain whenever those parameters change. 
The L1 gas price, which can be volatile, is only pushed once every 5 minutes, and each time can change only by up to 20%.

## Chainlink

On OP Mainnet [Chainlink](https://chain.link/) provides a number of [price feeds](https://docs.chain.link/docs/optimism-price-feeds/).
Those feeds are available on the production network.

This is a push Oracle. 
You can always get up to date information (see, for example, [here (scroll down to **latestAnswer**)](https://explorer.optimism.io/address/0x13e3Ee699D1909E989722E753853AE30b17e08c5#readContract)).

[See this guide to learn how to use the Chainlink feeds](https://docs.chain.link/docs/get-the-latest-price/).

## Tellor

[Tellor](https://tellor.io/) is a permissionless, censorship-resistant, and customizable oracle.

The Tellor protocol can secure putting any verifiable data onchain, from spot price feeds, TWAPs, random numbers, to EVM calldata - you can even [specify your own "query type"](https://github.com/tellor-io/dataSpecs/issues/new?assignees=&labels=&template=new_query_type.yaml&title=%5BNew+Data+Request+Form%5D%3A+) to build a feed to fit your specific needs.

As described in the oracles overview section of this page, we are an oracle protocol that has "a mechanism to reward entities that provide accurate information and penalize those that provide incorrect information." Therefore it is necessary to allow some reasonable [amount of time](https://docs.tellor.io/tellor/getting-data/solidity-integration#reading-data) between an oracle update and using that data, to allow for a potential dispute (probabilistic finality).

Tellor is a pull oracle where users fund (tip) a specific feed to get updated data reports and then read the data from our oracle contract, however under certain circumstances it can act similar to a push oracle; if your reading from a feed that is already being updated by others, or if you are [running your own data reporter.](https://docs.tellor.io/tellor/reporting-data/introduction)

To learn more about using tellor please [read our docs](https://docs.tellor.io) or [get in touch](https://discord.gg/tellor).

[Tellor contract addresses on OP Mainnet and the testnets can be found here.](https://docs.tellor.io/tellor/the-basics/contracts-reference#optimism)

### Verifiable Randomness Function (VRF)

#### Band
[Band](https://bandprotocol.com/vrf) provides a source of [onchain randomness](https://bandprotocol.com/vrf). 
[You can learn how to use it here](https://docs.bandchain.org/vrf/getting-started.html).
It is a single-transaction pull oracle.



## Universal Market Access (UMA)

[UMA](https://umaproject.org/) is a generic oracle.
It lets any contract request information (ask a question), and any staked entity can provide an answer.
Other external entities can dispute the proposed answer by providing their own answer and putting up their own stake.
In the case of dispute the question goes to a vote of token holders.
The token holders that vote with the majority are assumed to be truthful and get rewarded.
The external entities that proposed the correct answer are rewarded.
Those that proposed the wrong answer lose their stake.

[See here for the UMA addresses on OP Mainnet](https://github.com/UMAprotocol/protocol/blob/master/packages/core/networks/10.json). 

[See here for instructions how to use UMA](https://docs.umaproject.org/build-walkthrough/build-process).

UMA is a pull Oracle, it does not get information until it is requested by a contract. 
This means that a decentralized application needs to issue two transactions.
First, a transaction that causes a contract on the blockchain to ask for the information.
Later (in the case of UMA 48 hours later if there is no dispute, longer if there is), a second transaction need to be triggered to cause the contract to read from the Oracle and see the response to the request.

## Uniswap

Technically speaking [Uniswap](https://uniswap.io/) is not an oracle, because the information comes from onchain sources.
However, Uniswap pools do provide [quotes that give the relative costs of assets](https://docs.uniswap.org/concepts/protocol/oracle).

::: warning

Using onchain asset prices, especially those in low liquidity pools, makes you vulnerable to price manipulation. 

:::

To use Uniswap as an Oracle:

1. See [the list of pools on OP Mainnet](https://info.uniswap.org/#/optimism/).
1. To find the pool address, [look at the Uniswap factory](https://explorer.optimism.io/address/0x1f98431c8ad98523631ae4a59f267346ea31f984#readContract).
   Use **getPool** with these parameters:

      | Parameter           | Meaning                             |
      | ------------------- | ----------------------------------- | 
      | One token address   | [Address of the ERC-20 contract for that token on OP Mainnet (chainId 10)](https://static.optimism.io/optimism.tokenlist.json) |
      | Other token address | [Address of the ERC-20 contract for that token on OP Mainnet (chainId 10)](https://static.optimism.io/optimism.tokenlist.json) |      
      | Pool fee            | The pool fee percentage times ten thousand. For example, for 0.3% enter `3000` |

1. In your contract, use [IUniswapV3PoolState](https://github.com/Uniswap/v3-core/blob/main/contracts/interfaces/pool/IUniswapV3PoolState.sol) and [IUniswapV3PoolDerivedState](https://github.com/Uniswap/v3-core/blob/main/contracts/interfaces/pool/IUniswapV3PoolDerivedState.sol) to get the pool state.

## What is Supra?


Supra is a novel, high-throughput Oracle & IntraLayer: A vertically integrated toolkit of cross-chain solutions (data oracles, asset bridges, automation network, and more) that interlink all blockchains, public (L1s and L2s) or private (enterprises).

## Supra VRF


Supra’s VRF can provide the exact properties required for a random number generator (RNG) to be fair with tamper-proof, unbiased, and cryptographically verifiable random numbers to be employed by smart contracts.

## How to use Supras' VRF


Integrating with Supras' VRF is quick and easy. Supra currently supports several Solidity/EVM-based networks, like Arbitrum, and non-EVM networks like Sui, Aptos.

To see all of the networks Supra is on, please visit   [Supras' Networks](https://supraoracles.com/docs/vrf/networks)!

To get started, you will want to visit   [Supras' docs site](https://supraoracles.com/docs/vrf) and review the documentation or continue to follow this guide for a quick start.

Latest version of Supra VRF requires a customer controlled wallet address to act as the main reference for access permissions and call back(response) transaction gas fee payments. Therefore, users planning to consume Supra VRF should get in touch with our team to get your wallet registered with Supra.

Once your wallet is registered by the Supra team, you could use it to whitelist any number of VRF requester smart contracts and pre-pay/top up the deposit balance maintained with Supra in order to pay for the gas fees of callback(response) transactions.

You will be interacting with two main contracts:

- **Supra Deposit Contract:** To whitelist smart contracts under the registered wallet address, pre-pay/top up the callback gas fee deposit maintained with Supra.
  
- **Supra Router Contract:** To request and receive random numbers.

## Step 1: Create the Supra Router Contract Interface​


Add the following code to the requester contract i.e, the contract which uses VRF as a service. You can also add the code in a separate Interface and inherit the interface in the requester contract.

```
interface ISupraRouterContract {
	function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, uint256 _clientSeed, address _clientWalletAddress) external returns(uint256);
	function generateRequest(string memory _functionSig, uint8 _rngCount, uint256 _numConfirmations, address _clientWalletAddress) external returns(uint256);
}
```

This interface will help the requester contract interact with the Supra Router contract and through which the requester contract can use the VRF service.


## Step 2: Configure the Supra Router Contract Address​

Contracts that need random numbers should utilize the Supra Router Contract. In order to do that, they need to create an interface and bind it to the on-chain address of the Supra router contract.

```
contract ExampleContract {
    ISupraRouter internal supraRouter;

    constructor(address routerAddress) {
        supraRouter = ISupraRouter(0x7d86fbfc0701d0bf273fd550eb65be1002ed304e);
    }
}
```

## Step 3: Use the VRF service and request a Random Number​

In this step, we will use the “generateRequest” function of the Supra Router Contract to create a request for random numbers. There are two modes for the "generateRequest" function. The only difference between them is that you can optionally provide a client-side input, which will also be part of the payload being threshold signed to provide randomness.

_functionSig- a string parameter, here the requester contract will have to pass the function signature which will receive the callback i.e., a random number from the Supra Router Contract. The function signature should be in the form of the function name following the parameters it accepts. We will see an example later in the document.
_rngCount - an integer parameter, it is for the number of random numbers a particular requester wants to generate. Currently, we can generate a maximum of 255 random numbers per request.
_numConfirmations - an integer parameter that specifies the number of block confirmations needed before supra VRF can generate the random number.
_clientSeed (optional) - an optional integer parameter that could be provided by the client (defaults to 0). This is for additional unpredictability. The source of the seed can be a UUID of 256 bits. This can also be from a centralized source.
_clientWalletAddress - an “address” type parameter, which takes the client wallet address which is already registered with the Supra Team, as input.
Supra's VRF process requires splitting the contract logic into two functions.
The request function - the signature of this function is up to the developer
The callback function - the signature must be of the form “uint256 nonce, uint256[] calldata rngList”

```
function exampleRNG() external {  
     //Function validation and logic
     // requesting 10 random numbers
     uint8 rngCount = 10; 

     // we want to wait for 1 confirmation before the request is considered complete/final
     uint256 numConfirmations = 1; 
	address _clientWalletAddress = //Add the whitelisted wallet address here
     uint256 generated_nonce = supraRouter.generateRequest(“exampleCallback(uint256,uint256[])”, rngCount, numConfirmations, _clientWalletAddress);

     // store generated_nonce if necessary (eg: in a hashmap)
     // this can be used to track parameters related to the request, such as user address, nft address etc in a lookup table
     // these can be accessed inside the callback since the response from supra will include the nonce
}
```

## Step 4 - Add the validation in the callback function of requester contract​

Inside the callback function where the requester contract wants the random number (in this example the callback function is exampleCallback), the requester contract will have to add the validation such that only the Supra router contract can call the function. The validation is necessary to protect against malicious contracts/users executing the callback with fake data. For example, if the callback function is pickWinner in the requester contract, the snippet can be as follows.

```
function exampleCallback(uint256 _nonce ,uint256[] _rngList) external {
    require(msg.sender == address(SupraRouter));
    // Following the required logic of the function
 }
```

## Step 5 : Whitelist your requester contract  with Supra Deposit Contract and deposit funds​

It is important to note that your wallet address must be registered with Supra before this step. If that is completed, then you need to whitelist your requester smart contract under your wallet address and deposit funds to be paid for your call back transactions gas fees.
The simplest way to interact with the deposit contract will be through Remix IDE. 
Go to Remix IDE & create a file with name IDepositContract.sol
Paste the following code in the file:

```
interface IDepositUserContract {
	function depositFundClient() external payable;
	function addContractToWhitelist(address _contractAddress) external;
	function removeContractFromWhitelist(address _contractAddress) external;
	function setMinBalanceClient(uint256 _limit) external;
	function withdrawFundClient(uint256 _amount) external;
	function checkClientFund(address _clientAddress) external view returns (uint256);
	function checkEffectiveBalance(address _clientAddress) external view returns (uint256);
	function checkMinBalanceSupra() external view returns (uint256);
	function checkMinBalance(address _clientAddress) external view returns(uint256);
	function countTotalWhitelistedContractByClient(address _clientAddress) external view returns (uint256);
	function getSubscriptionInfoByClient(address _clientAddress) external view returns (uint256, uint256, bool);
	function isMinimumBalanceReached(address _clientAddress) external view returns (bool);
	function listAllWhitelistedContractByClient(address _clientAddress) external view returns (address[] memory);
	
}
```

Navigate to the “Navigate & run Transactions” tab in remix, and Paste the Deposit Contract Address into the text box besides the “At Address” button & Press the At Address button. You will find the instance for the Deposit Contract created using which a user can interact and use the features provided by the Deposit Contract.
Following functions will facilitate whitelisting your requester smart contracts and fund deposits.
“addContracttoWhitelist(address)” - The whitelisted users will have to whitelist their contract which they will be using to request for random numbers. The parameter this function takes is the User’s contract address. This function will be called after the user deploys the requester contract post development and makes it ready for interacting with the Supra Contracts.
“depositFundClient()” - is another mandatory function for a user to use  once, before the user starts requesting from that contract. This is a function which will deposit funds in the deposit contract from the users for the response/callback transaction. The funds for a specific user should remain higher than the minimum amount set by the Supra( 0.1 Eth for Arbitrum testnet) for the new request transactions to be accepted.  
Basically the gist here is that the user will have to interact with the Deposit contract and add funds for their accounts, which will be utilized for the response transaction gas fee. There will be a script from Supra which will be monitoring the funds and will alert the user if a refill is required. 

## Example Implementation

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
interface ISupraRouter {
   function generateRequest(string memory _functionSig , uint8 _rngCount, uint256 _numConfirmations, uint256 _clientSeed,address _clientWalletAddress) external returns(uint256);
   function generateRequest(string memory _functionSig , uint8 _rngCount, uint256 _numConfirmations,address _clientWalletAddress) external returns(uint256);
}
contract Interaction {
   address supraAddr;
   constructor(address supraSC) {
       supraAddr = supraSC;
   }
   mapping (uint256 => string ) result;
   mapping (string => uint256[] ) rngForUser;
   function getRNGForUser(uint8 rngCount, string memory username) external {
      uint256 nonce =  ISupraRouter(supraAddr).generateRequest("myCallbackUsername(uint256,uint256[])", rngCount, 1, 123, msg.sender);
//Can pass "msg.sender" when calling from the whitelisted wallet address
      result[nonce] = username;
   }
   function myCallbackUsername(uint256 nonce, uint256[] calldata rngList) external {
      require(msg.sender == supraAddr, "only supra router can call this function");
      uint8 i = 0;
      uint256[] memory x = new uint256[](rngList.length);
      rngForUser[result[nonce]] = x;
      for(i=0; i<rngList.length;i++){
         rngForUser[result[nonce]][i] = rngList[i] % 100;
      }
   }
   function viewUserName(string memory username) external view returns (uint256[] memory) {
      return rngForUser[username];
   }
   }								
```

## Going Further with Supra

If you want to take the next step, consider registering for the [Supra Network Activate Program (SNAP)](https://join.supraoracles.com/network-activate-program).

The Supra Network Activate Program (SNAP) offers companies discounted oracle credits, technical documentation, and customer support to embed much-needed oracles and VRF/RNG. SNAP supports Web3 scaling and growth to buffer costs which could typically inhibit a company’s success.

The SNAP program is partnered with some of Web3's most prolific names who are helping with project selection and qualification.

## Connect with us!

Still looking for answers? We got them! Check out all the ways you can reach us:

- Visit us at [supraoracles.com](https://supraoracles.com)
- Read our [Docs](https://supraoracles.com/docs/overview)
- Chat with us on [Telegram](https://t.me/SupraOracles)
- Follow us on [Twitter](https://twitter.com/SupraOracles)
- Join our [Discord](https://discord.gg/supraoracles)
- Check us out on [Youtube](https://www.youtube.com/SupraOfficial)
