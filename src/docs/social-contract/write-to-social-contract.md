# How to make an attestation on the Social Contract

The Social Contract smart contract contains a public `attestations` mapping that anyone can write to and read from. Let's make our first attestation using the Social Contract and [ethers.js](https://docs.ethers.io/v5/).

## Initialize project

Start by creating a new directory and navigating inside:

```
mkdir op-social-contract
cd op-social-contract
```

Generate a `package.json` with:

```
npm init -y
```

or

```
yarn init -y
```

We will need a way to interact with `SocialContract.sol` deployed on Optimism. This can be accomplished with the `ethers` library, so let's install that developer dependency.

```
npm install --save-dev ethers
```

or

```
yarn add --dev ethers
```

Now let's create a script called `attest.js` with:

```
touch attest.js
```

## Add boilerplate

Open up `attest.js` with the text editor of your choice. Add the `ethers` library and `SocialContract.sol` ABI (available [here](./resources/SocialContractABI.json))

```
const { ethers } = require("ethers");
const SocialContractABI = require("SocialContractABI.json");
```

Now let's add boilerplate code that we'll drop out attestation logic into. This pattern lets us use `await` in the main function and handles errors gracefully.

```
async function main() {
    // Attestation code goes here
}

// This pattern enables async/await everywhere and
// properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Setup node provider and signer

We will now create a `provider` and `signer` so we have a way to interact with the Optimism blockchain. The `provider` is an abstraction of a connection to the Optimism network. The `signer` an abstraction of an Ethereum Account, you will need to supply your private key, so you can make sign transactions.

_Note: This example code uses an Alchemy node provider. To use your preferred node provider, checkout the [provider](https://docs.ethers.io/v5/) documentation._

```
const provider = new ethers.providers.AlchemyProvider("optimism-goerli", "API_KEY");
const signer = new ethers.Wallet("PRIVATE_KEY", provider);
```

## Implement attestation logic

Next up, we will create a [contract instance](https://docs.ethers.io/v5/api/contract/contract/) of the Social Contract. To do that we need one additional piece of information, the contract address. We can feed `ethers` the address, ABI, and provider. That will spit out a contract instance we can use to write to the Social Contract:

```
const socialContractAddress = "0x"; // TODO: add address
const socialContract = new ethers.Contract(socialContractAddress, SocialContractABI, signer);
```

Now that we have that contract instance, we can start making attestations. `SocialContract.sol` has a public `attest` function that takes an array of `AttestationData`. The `attest` function iterates over the array, writes the attestation to a state variable, and emits an `AttestationCreated` event.

The `AttestationData` struct is written as follows:

```
struct AttestationData {
    address about;
    bytes32 key;
    bytes val;
}
```

To create our own attestation data, we can add the following code to our script:

```
// Format into an object that conforms to the `AttestationData` struct.
const attestation = {
    about: "0x48d9DabE939Ac1d129C12b627fb694f6CDA1d5B0",
    key: ethers.utils.formatBytes32String("education"),
    val: ethers.utils.toUtf8Bytes("taught me how to make an attestation")
};
```

_Note: Use `ethers` utility functions to reformat strings into their appropriate variable types. The `key` is `bytes32` and `val` is `bytes`._

Remember the `attest` function takes an array so it can handle multiple attestations. So let's drop our newly created object into an array to conform to the functions parameters.

```
// The attest function takes an array of AttestationData
const attestationArray = [attestation]
```

Now that everything is in place, we can send it off and make our attestment.

```
// write attestation to the Social Contract
socialContract.attest(attestationArray);
```

Congratulations! You've just learned how to make your first attestation to the Optimist's Social Contract. The following is the full script.

## Complete script

```
const { ethers } = require("ethers");
const SocialContractABI = require("./SocialContractABI.json")

async function main() {
    const provider = new ethers.providers.AlchemyProvider("optimism-goerli", "API_KEY");
    const signer = new ethers.Wallet("PRIVATE_KEY", provider);

    const socialContractAddress = "0x"; // TODO: add address
    const socialContract = new ethers.Contract(socialContractAddress, SocialContractABI, signer);

    // Format into an object that conforms to the `AttestationData` struct.
    const attestation = {
        about: "0x48d9DabE939Ac1d129C12b627fb694f6CDA1d5B0",
        key: ethers.utils.formatBytes32String("education"),
        val: ethers.utils.toUtf8Bytes("taught me how to make an attestation")
    };

    // The attest function takes an array of AttestationData
    const attestationArray = [attestation]

    // write attestation to the Social Contract
    socialContract.attest(attestationArray);
}

// This pattern enables async/await everywhere and
// properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

If you'd like to learn how to consume data from the Social Contract checkout: [How to read attestations from the Social Contract](./02-social-contract-read.md)
