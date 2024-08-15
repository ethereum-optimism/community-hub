interface Chain {
  name: string
  id: number
  explorer: string
}

interface Network {
  mainnet: {
    l1: Chain
    l2: Chain
  }
  testnet: {
    l1: Chain
    l2: Chain
  }
}

const chains: {
  [name: string]: Chain
} = {
  ethereum: {
    name: 'Ethereum',
    id: 1,
    explorer: 'https://etherscan.io',
  },
  opmainnet: {
    name: 'OP Mainnet',
    id: 10,
    explorer: 'https://optimistic.etherscan.io',
  },
  sepolia: {
    name: 'Sepolia',
    id: 11155111,
    explorer: 'https://sepolia.etherscan.io',
  },
  opsepolia: {
    name: 'OP Sepolia',
    id: 11155420,
    explorer: 'https://sepolia-optimistic.etherscan.io/',
  },
}

const networks: {
  [name: string]: Network
} = {
  op: {
    mainnet: {
      l1: chains.ethereum,
      l2: chains.opmainnet,
    },
    testnet: {
      l1: chains.sepolia,
      l2: chains.opsepolia,
    },
  }
}

export const network = networks[process.env.DOCS_NETWORK_NAME || 'op']
