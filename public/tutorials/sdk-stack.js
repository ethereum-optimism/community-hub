(async () => {

const optimism = require("@eth-optimism/sdk")
const ethers = require("ethers")

const l1Provider = new ethers.providers.StaticJsonRpcProvider("https://rpc.ankr.com/eth_sepolia")
const l2Provider = new ethers.providers.StaticJsonRpcProvider("https://sepolia.optimism.io")

const AddressManager = '0x...'
const L1CrossDomainMessenger = '0x...'
const L1StandardBridge = '0x...' 
const OptimismPortal = '0x...'
const L2OutputOracle = '0x...'

const l1ChainId = await l1Provider.getNetwork().then(network => network.chainId)
const l2ChainId = await l2Provider.getNetwork().then(network => network.chainId)

const messenger = new optimism.CrossChainMessenger({
  l1SignerOrProvider: l1Provider,
  l2SignerOrProvider: l2Provider,
  l1ChainId,
  l2ChainId,

  // This is the only part that differs from natively included chains.
  contracts: {
    l1: {
      AddressManager,
      L1CrossDomainMessenger,
      L1StandardBridge,
      OptimismPortal,
      L2OutputOracle,

      // Need to be set to zero for this version of the SDK.
      StateCommitmentChain: ethers.constants.AddressZero,
      CanonicalTransactionChain: ethers.constants.AddressZero,
      BondManager: ethers.constants.AddressZero,
    }
  }
})

})()
