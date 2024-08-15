(async () => {

const optimism = require("@eth-optimism/sdk")
const ethers = require("ethers")

// Need to use Alchemy or something here because the getDepositsByAddress and
// getWithdrawalsByAddress functions use a large block range that the public RPC doesn't support
// because it uses Ankr. Maybe the SDK should be updated to use smaller block ranges depending
// on the RPC but that's a separate issue.
const l1RpcUrl = process.env.L1_RPC_URL
const l2RpcUrl = process.env.L2_RPC_URL

// Docs CI wallet, will have deposits and withdrawals.
const deposit = '0x5896d6e4a47b465e0d925723bab838c62ef53468139a5e9ba501efd70f90cccb'
const withdrawal = '0x18b8b4022b8d9e380fd89417a2e897adadf31e4f41ca17442870bf89ad024f42'

const l1Provider = new ethers.providers.StaticJsonRpcProvider(l1RpcUrl)
const l2Provider = new ethers.providers.StaticJsonRpcProvider(l2RpcUrl)

const messenger = new optimism.CrossChainMessenger({
  l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
  l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
  l1SignerOrProvider: l1Provider,
  l2SignerOrProvider: l2Provider,
})

console.log('Grabbing deposit status...')
const depositStatus = await messenger.getMessageStatus(deposit)
console.log(depositStatus)

console.log('Grabbing deposit receipt...')
const depositReceipt = await messenger.getMessageReceipt(deposit)
console.log(depositReceipt)

console.log('Grabbing deposit txn...')
const depositTx = await l2Provider.getTransaction(depositReceipt.transactionReceipt.transactionHash)
console.log(depositTx)

console.log('Grabbing withdrawal status...')
const withdrawalStatus = await messenger.getMessageStatus(withdrawal)
console.log(withdrawalStatus)

console.log('Grabbing withdrawal receipt...')
const withdrawalReceipt = await messenger.getMessageReceipt(withdrawal)
console.log(withdrawalReceipt)

console.log('Grabbing withdrawal txn...')
const withdrawalTx = await l1Provider.getTransaction(withdrawalReceipt.transactionReceipt.transactionHash)
console.log(withdrawalTx)

})()
