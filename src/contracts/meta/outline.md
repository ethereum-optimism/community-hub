# Contract Docs Outline

## Introduction
* Give a warm welcome to the docs & project as a whole!
* Explain the target audience for these specific docs (make sure people can tell if this will be useful to them or not)
* Give an overview of the content structure (so people can quickly find the information they care about)

## High-Level Overview
* Explain the basic problem/solution statement (execution on Ethereum is expensive, Optimistic Rollup makes it cheaper)
* Give a quick version of the architecture in a nutshell
    * Put tx on Ethereum
    * L2 nodes run tx
    * L2 node puts result on L1
    * (As opposed to L1 handling everything)
* Use this as an opportunity to link to contract components
    * "Put tx on Ethereum" => "Rollup Contracts"
    * "L2 node puts result on L1" => "Rollup Contracts"
* Introduce fraud & fraud proofs
    * Show how fraud happens
    * Explain what a fraud proof must do ("convince Ethereum")
    * Explain how our fraud proof works at a high level (no details yet)
* Revisit contract structure one final time as a recap
    * Now adding:
    * "L2 nodes run tx" => "Execution Contracts"
    * (new) "user proves fraud" => "Execution Contracts"

## System Architecture (Deep Dive)

### Rollup Contracts
* Start by briefly presenting the architecture diagram again and point to Rollup contracts, recap their purpose
* Specify exactly what the Rollup Contracts need to do
    * (meta)
        * Probably the most detailed section of this chapter
        * Will derive spec from current contracts and ask for review before we publish
    * Instead of sending transactions to nodes, send transaction to smart contract (inside a transaction, lol)
    * Transactions go into a list of transactions (canonical transaction chain)
    * Can submit transactions in batches to decrease costs of doing this (because of base fee)
    * Don't actually store transactions (expensive), use Merkle tree - hence Rollup
    * Main jobs recap:
        * Accept incoming transactions
        * Roll transactions up via tree
        * Make these transactions accessible 
    * Intro sequencer
        * Explain ability to order transactions 
        * And commitments on state
        * Explain MEVA concept
        * Needs "force inclusion period"
    * Explain how sequencer impacts contracts
        * Need separate queue for sequencer and others
        * General infra around sequencer

### Execution Contracts
* (meta)
    * This could potentially be a huge section, I think best to separate execution and verification 
    * Still need to go into fraud proof stuff here anyway
* Restate need for fraud verification
* Explain basic fraud proof system
    * Execute tx on Ethereum
    * But needs to be deterministic!
* Explain basic reasons why it's hard to just run transactions again on Ethereum
    * Contracts have access to state that would make execution non-deterministic
    * We need to make it so code that runs cannot access this state 
    * Hence compiler and safety checker
    * But need to replace these opcodes with something (execution manager, state manager)
* Brief reference to compiler, then explain safety checker
* Execution Manager/State Manager explanation
    * Gives access to banned opcodes 
    * But done as a contract
    * So that when we run the transaction on L1, we can affix the state by setting the state of these contracts 
    * List out the opcodes 
* Precompiles
* Goodies
    * Custom opcodes like account abstraction stuff!

### Verification Contracts
* Explain fraud proof process in detail
    * Set up initial state
    * Execute transaction
    * Commit final state into root
    * Finalize, remove bad results
* Setup phase
    * FraudVerifier/StateTransitioner
    * General process of setting up state (proving inclusion)
* Execution phase
    * Running through execution manager
    * Give example of valid state access
        * Use this as an opportunity to explain "nuisance gas"
    * Show what happens with invalid state access (and why we need to instantly end the execution)
        * Invalid state access means we didn't provide all necessary storage slots
        * Explain how we hijack reverts
        * Also explain how we do this within contract creations
    * So execution either reverts (invalid state access) or succeeds in all other cases
* Commit phase
    * Similar to setup phase
    * Use proofs to update the root
* Finalization phase
    * Remove bad results via FraudVerifier
    * Reward users who contributed to fraud proof
    * Introduce "bonds" here

### Bridge Contracts
* Utilities that make communication between L1 and L2 possible
    * Explain basic strategy
* L1 => L2 mechanism
* L2 => L1 mechanism

## Contract APIs

### Rollup Contracts

* `OVM_L1ToL2TransactionQueue`
* `OVM_CanonicalTransactionChain`
* `OVM_StateCommitmentChain`

### Execution Contracts

* `OVM_SafetyChecker`
* `OVM_ExecutionManager`
* `OVM_StateManager`
* `OVM_StateManagerFactory`

### Verification Contracts

* `OVM_FraudVerifier`
* `OVM_StateTransitioner`
* `OVM_StateTransitionerFactory`

### Bridge Contracts

* `OVM_L1CrossDomainMessenger`
* `OVM_L2CrossDomainMessenger`

### Precompiles

* `OVM_L1MessageSender`
* `OVM_L2ToL1MessagePasser`
* `OVM_DeployerWhitelist`

## Examples

### Submitting Rollup Transactions

### Sending Data Between L1 and L2
