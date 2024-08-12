(async () => {

const optimism = require("@eth-optimism/sdk")
const ethers = require("ethers")

const privateKey = process.env.TUTORIAL_PRIVATE_KEY

const l1Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
const l2Provider = new ethers.providers.StaticJsonRpcProvider("https://sepolia.optimism.io")
const l1Wallet = new ethers.Wallet(privateKey, l1Provider)
const l2Wallet = new ethers.Wallet(privateKey, l2Provider)

const l1Token = "0x5589BB8228C07c4e15558875fAf2B859f678d129"
const l2Token = "0xD08a2917653d4E460893203471f0000826fb4034"

const erc20ABI = [{ constant: true, inputs: [{ name: "_owner", type: "address" }], name: "balanceOf", outputs: [{ name: "balance", type: "uint256" }], type: "function" }, { inputs: [], name: "faucet", outputs: [], stateMutability: "nonpayable", type: "function" }]

const l1ERC20 = new ethers.Contract(l1Token, erc20ABI, l1Wallet)

console.log('Getting L1 tokens from faucet...')
tx = await l1ERC20.faucet()
await tx.wait()

console.log('L1 balance:')
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())

const oneToken = 1000000000000000000n

const messenger = new optimism.CrossChainMessenger({
  l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
  l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
  l1SignerOrProvider: l1Wallet,
  l2SignerOrProvider: l2Wallet,
})

console.log('Approving L1 tokens for deposit...')
tx = await messenger.approveERC20(l1Token, l2Token, oneToken)
await tx.wait()

console.log('Depositing L1 tokens...')
tx = await messenger.depositERC20(l1Token, l2Token, oneToken)
await tx.wait()

console.log('Waiting for deposit to be relayed...')
await messenger.waitForMessageStatus(tx.hash, optimism.MessageStatus.RELAYED)

console.log('L1 balance:')
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())

const l2ERC20 = new ethers.Contract(l2Token, erc20ABI, l2Wallet)

console.log('L2 balance:')
console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString())

console.log('Withdrawing L2 tokens...')
const withdrawal = await messenger.withdrawERC20(l1Token, l2Token, oneToken)
await withdrawal.wait()

console.log('L2 balance:')
console.log((await l2ERC20.balanceOf(l2Wallet.address)).toString())

console.log('Waiting for withdrawal to be provable...')
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.READY_TO_PROVE)

console.log('Proving withdrawal...')
await messenger.proveMessage(withdrawal.hash)

console.log('Waiting for withdrawal to be relayable...')
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.READY_FOR_RELAY)

// Wait for the next block to be produced, only necessary for CI because messenger can return
// READY_FOR_RELAY before the RPC we're using is caught up to the latest block. Waiting for an
// additional block ensures that the RPC is caught up and the message can be relayed. Users
// should not need to do this when running the tutorial.
const maxWaitTime = Date.now() + 120000 // 2 minutes in milliseconds
const currentBlock = await l1Provider.getBlockNumber()
while (await l1Provider.getBlockNumber() < currentBlock + 1) {
  if (Date.now() > maxWaitTime) {
    throw new Error('Timed out waiting for block to be produced')
  }
  await new Promise(resolve => setTimeout(resolve, 1000))
}

console.log('Relaying withdrawal...')
await messenger.finalizeMessage(withdrawal.hash)

console.log('Waiting for withdrawal to be relayed...')
await messenger.waitForMessageStatus(withdrawal.hash, optimism.MessageStatus.RELAYED)

console.log('L1 balance:')
console.log((await l1ERC20.balanceOf(l1Wallet.address)).toString())

})()
