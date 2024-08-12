(async () => {

const contracts = require("@eth-optimism/contracts-ts")
const utils = require("@eth-optimism/core-utils")
const ethers = require("ethers")

const privateKey = process.env.TUTORIAL_PRIVATE_KEY

const l1Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
const l2Provider = new ethers.providers.StaticJsonRpcProvider("https://sepolia.optimism.io")
const l1Wallet = new ethers.Wallet(privateKey, l1Provider)
const l2Wallet = new ethers.Wallet(privateKey, l2Provider)

console.log('Initial balance:')
const initialBalance = await l2Wallet.getBalance()
console.log(ethers.utils.formatEther(initialBalance))

const OptimismPortal = new ethers.Contract(
  '0x16Fc5058F25648194471939df75CF27A2fdC48BC',
  contracts.optimismPortalABI,
  l1Wallet,
)

console.log('Estimating L1 transaction gas...')
const gas = await OptimismPortal.estimateGas.depositTransaction(
  '0x1000000000000000000000000000000000000000', // _to
  ethers.utils.parseEther('0.000069420'), // _value
  1e6, // _gasLimit
  false, // _isCreation
  '0x', // _data
)

console.log('Sending L1 transaction...')
const tx = await OptimismPortal.depositTransaction(
  '0x1000000000000000000000000000000000000000', // _to
  ethers.utils.parseEther('0.000069420'), // _value
  1e6, // _gasLimit
  false, // _isCreation
  '0x', // _data
  {
    gasLimit: gas.mul(120).div(100) // Add 20% buffer
  }
)

console.log('Waiting for L1 transaction...')
const receipt = await tx.wait()

console.log('Waiting for L2 transaction to be relayed...')
const deposit = utils.DepositTx.fromL1Receipt(receipt, 0)
await l2Provider.waitForTransaction(deposit.hash())

console.log('Final balance:')
const finalBalance = await l2Wallet.getBalance()
console.log(ethers.utils.formatEther(finalBalance))

console.log('Difference:')
const difference = initialBalance.sub(finalBalance)
console.log(ethers.utils.formatEther(difference))

})()
