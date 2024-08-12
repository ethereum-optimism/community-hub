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
const address = '0x5A07785F07D8ba8a9e5323181fBDab51FE9a36c3'

const l1Provider = new ethers.providers.StaticJsonRpcProvider(l1RpcUrl)
const l2Provider = new ethers.providers.StaticJsonRpcProvider(l2RpcUrl)

const messenger = new optimism.CrossChainMessenger({
  l1ChainId: 11155111, // 11155111 for Sepolia, 1 for Ethereum
  l2ChainId: 11155420, // 11155420 for OP Sepolia, 10 for OP Mainnet
  l1SignerOrProvider: l1Provider,
  l2SignerOrProvider: l2Provider,
})

console.log('Grabbing deposits...')
const deposits = await messenger.getDepositsByAddress(address)

console.log('Grabbed deposits:')
for (const deposit of deposits) {
  console.log('----------------------------------------------------')
  console.log('From:    ', deposit.from)
  console.log('To:      ', deposit.to)
  console.log('L1 Token:', deposit.l1Token)
  console.log('L2 Token:', deposit.l2Token)
  console.log('Amount:  ', deposit.amount.toString())
}

console.log('Grabbing withdrawals...')
const withdrawals = await messenger.getWithdrawalsByAddress(address)

console.log('Grabbed withdrawals:')
for (const withdrawal of withdrawals) {
  console.log('----------------------------------------------------')
  console.log('From:    ', withdrawal.from)
  console.log('To:      ', withdrawal.to)
  console.log('L1 Token:', withdrawal.l1Token)
  console.log('L2 Token:', withdrawal.l2Token)
  console.log('Amount:  ', withdrawal.amount.toString())
}

})()
