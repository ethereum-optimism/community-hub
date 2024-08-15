(async () => {

const optimism = require("@eth-optimism/sdk")
const ethers = require("ethers")

const privateKey = process.env.TUTORIAL_PRIVATE_KEY

const transactionHash = process.env.TUTORIAL_TRANSACTION_HASH

const l1Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
const l2Provider = new ethers.providers.StaticJsonRpcProvider("https://sepolia.optimism.io")
const l1Wallet = new ethers.Wallet(privateKey, l1Provider)
const l2Wallet = new ethers.Wallet(privateKey, l2Provider)

const messenger = new optimism.CrossChainMessenger({
  l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
  l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
  l1SignerOrProvider: l1Wallet,
  l2SignerOrProvider: l2Wallet,
})

console.log('Waiting for message to be provable...')
await messenger.waitForMessageStatus(transactionHash, optimism.MessageStatus.READY_TO_PROVE)

console.log('Proving message...')
await messenger.proveMessage(transactionHash)

console.log('Waiting for message to be relayable...')
await messenger.waitForMessageStatus(transactionHash, optimism.MessageStatus.READY_FOR_RELAY)

console.log('Relaying message...')
await messenger.finalizeMessage(transactionHash)

console.log('Waiting for message to be relayed...')
await messenger.waitForMessageStatus(transactionHash, optimism.MessageStatus.RELAYED)

})()
