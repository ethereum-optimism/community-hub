(async () => {

const optimism = require("@eth-optimism/sdk")
const ethers = require("ethers")

const privateKey = process.env.TUTORIAL_PRIVATE_KEY

const provider = optimism.asL2Provider(new ethers.providers.StaticJsonRpcProvider("https://sepolia.optimism.io"))
const wallet = new ethers.Wallet(privateKey, provider)

const tx = await wallet.populateTransaction({
  to: '0x1000000000000000000000000000000000000000',
  value: ethers.utils.parseEther('0.00069420'),
  gasPrice: await provider.getGasPrice(),
})

console.log('Estimating L2 cost...')
const gasLimit = tx.gasLimit
const gasPrice = tx.maxFeePerGas
const l2CostEstimate = gasLimit.mul(gasPrice)
console.log(ethers.utils.formatEther(l2CostEstimate))

console.log('Estimating L1 cost...')
const l1CostEstimate = await provider.estimateL1GasCost(tx)
console.log(ethers.utils.formatEther(l1CostEstimate))

console.log('Summing total cost...')
const totalSum = l2CostEstimate.add(l1CostEstimate)
console.log(ethers.utils.formatEther(totalSum))

console.log('Sending transaction...')
const res = await wallet.sendTransaction(tx)
const receipt = await res.wait()
console.log(receipt.transactionHash)

console.log('Actual L2 cost:')
const l2CostActual = receipt.gasUsed.mul(receipt.effectiveGasPrice)
console.log(ethers.utils.formatEther(l2CostActual))

console.log('Actual L1 cost:')
const l1CostActual = receipt.l1Fee
console.log(ethers.utils.formatEther(l1CostActual))

console.log('Actual total cost:')
const totalActual = l2CostActual.add(l1CostActual)
console.log(ethers.utils.formatEther(totalActual))

console.log('Difference:')
const difference = totalActual.sub(totalSum).abs()
console.log(ethers.utils.formatEther(difference))

})()
