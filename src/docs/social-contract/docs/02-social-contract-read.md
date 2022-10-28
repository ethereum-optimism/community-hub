# How to read an attestation from the Social Contract

The Social Contract smart contract contains a public `attestations` mapping that anyone can write to and read from. Let's read our first attestation using the Social Contract and [ethers.js](https://docs.ethers.io/v5/).

Start by creating a new directory and navigating inside:

```
$ mkdir op-social-contract
$ cd op-social-contract
```

Generate a `package.json` with:

```
$ npm init -y
```

or

```
$ yarn init -y
```

We will need a way to interact with `SocialContract.sol` deployed on Optimism. This can be accomplished with the `ethers` library, so let's install that developer dependency.

```
$ npm install --save-dev ethers
```

or

```
$ yarn add --dev ethers
```

Now let's create a script called `read-attestation.js` with:

```
$ touch read-attestation.js
```

Open up `read-attestation.js` with the text editor of your choice. Add the `ethers` library and `SocialContract.sol` ABI (available [here](./resources/SocialContractABI.json))

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

We will now create a `provider` so we have a way to interact with the Optimism blockchain. The `provider` is a read-only abstraction of a connection to the Optimism network.

_Note: This example code uses an Alchemy node provider. To use your preferred node provider, checkout the [provider](https://docs.ethers.io/v5/) documentation._

```
const provider = new ethers.providers.AlchemyProvider("optimism-goerli", "API_KEY");
```

Next up, we will create a [contract instance](https://docs.ethers.io/v5/api/contract/contract/) of the Social Contract. To do that we need one additional piece of information, the contract address. We can feed `ethers` the address, ABI, and provider. That will spit out a contract instance we can use to write to the Social Contract:

```
const socialContractAddress = "0x"; // TODO: add address
const socialContract = new ethers.Contract(socialContractAddress, SocialContractABI, provider);
```

Now that we have that contract instance, we can start reading attestations. If you followed the [How to make an attestation on the Social Contract](./01-social-contract-write.md) guide, you made the following attestation:

```
const attestation = {
    about: "0x48d9DabE939Ac1d129C12b627fb694f6CDA1d5B0",
    key: ethers.utils.formatBytes32String("education"),
    val: ethers.utils.toUtf8Bytes("taught me how to make an attestation")
};
```

`SocialContract.sol` has a public `attestations` mapping that stores all of the attestations made to the Social Contract. This is the definition and how its written to:

```
// State defined in the contract
mapping(address => mapping(address => mapping(bytes32 => bytes))) public attestations;
...
// Located in the attest function
attestations[msg.sender][attestation.about][attestation.key] = attestation.val;
```

As you can see the mapping is nested three levels deep. To get the attestation value, you need to provide the creator of the attestation, who it is about, and the key. In our script, it looks like this:

```
// read attestation bytes
const attestationValueHex = await socialContract.attestations(
        "ATTESTERS_ADDRESS",
        "0x48d9DabE939Ac1d129C12b627fb694f6CDA1d5B0",
        ethers.utils.formatBytes32String("education")
      )
```

This will return the `bytes` value in hexadecimal format. We can use `ethers` to get the human reable string:

```
// Convert the bytes back to a human readable string
const attestationValueString = ethers.utils.toUtf8String(attestationValueHex)
console.log(attestationValueString)
```

Good job! Now you know how to read attestations from the Optimist's Social Contract. The following is a copy of the full script:

```
const { ethers } = require("ethers");
const SocialContractABI = require("SocialContractABI.json");

async function main() {
    const provider = new ethers.providers.AlchemyProvider("optimism-goerli", "API_KEY");
    const socialContractAddress = "0x"; // TODO: add address
    const socialContract = new ethers.Contract(socialContractAddress, SocialContractABI, provider);

    // read attestation bytes
    const attestationValueHex = await socialContract.attestations(
        "ATTESTERS_ADDRESS",
        "0x48d9DabE939Ac1d129C12b627fb694f6CDA1d5B0",
        ethers.utils.formatBytes32String("education")
      )

    // Convert the bytes back to a human readable string
    const attestationValueString = ethers.utils.toUtf8String(attestationValueHex)
    console.log(attestationValueString)
}

// This pattern enables async/await everywhere and
// properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
