---
layout: post
title: Getting Started with Solidity
author: Ryan Miller
comments: true
tags:
- Solidity
- Geth
- Ethereum
---

# Getting Started with Solidity on Windows
#### Table of Contents
* [Installing Go Ethereum (geth)](#installing)  
* [Set up a test/dev blockchain](#setup)  
* [Mining on your dev chain](#mining)   
* Send transactions  
* Deploy and mine a smart contract to your local dev network  
* How gas works  
* Resources + Links  



### <a name="installing">Installing Go Ethereum (geth)</a>  

### <a name="setup">Set up a test/dev blockchain </a>   
By default, geth will connect to the main consensus network and begin downloading the full blockchain (very large!). To avoid this default behavior, and to instead create and mine your own private chain, you must create a custom "genesis" block ([example here](https://github.com/ethereum/go-ethereum/wiki/Private-network), [and here](/genesisblock.html)).
Here are some quick steps I used:   

- Create a new directory on your desktop: e.g. "DevChain"  
- Inside the directory, create a new file called genesis.json and insert the code snippet (see links above) where the account address below will be swapped out for your personal account. This
- Use the following command to initialize your genesis file, where the file path represents the location of your genesis file (Windows):    

      geth --datadir "C:\Users\Ryan\Desktop\DevChain" init genesis.json  

- Next, we want to actually run your geth to start up your node. We could simply run the geth command, but for reasons which will be explained later, let's run it with some additional flags. Be sure to swap out the etherbase account with your personal account so that the Ether will be pre-mined to an account you control (if you haven't already created an account, check out the section on that).  

      geth --networkid=12345 --datadir "C:\Users\Ryan\Desktop\DevChain" --rpccorsdomain "*" --nodiscover --port 8545 --rpc --rpcport "8545" --etherbase=0x6c790892ee90cf0b509ef5c86036468c9eb76323 console

- After running this command, you have successfully started your node! The `console` keyword on the end of the command above will persist the "Interactive Console". What is that you may ask? It is the [JavaScript based runtime environment](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) used to interact with, and administer your node. At anytime, you can run a separate console window by loading up another terminal/cmd window and typing `geth attach`.
- In the interactive console you can run commands like   
  - `miner.start(1)` to start a miner (1 thread).
  - `personal.listAccounts` to view all local accounts
  - `personal.newAccount()` to create a new local account.
  - `personal.unlockAccount()` to unlock an account you control.
  - ... a reference to more commands [can be found here](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console).  

Note: you can also set variables to be referenced later as you would in any JavaScript console, e.g.: `var primaryAcct = personal.listAccounts[0]`

### <a name="mining">Mining on your dev chain</a>  
Before you start mining, it is a good idea to create an account first. If you haven't already done so, it's simple. Use one of these two methods:  
- From Windows command prompt, enter `geth account new`  
- From the web3 JavaScript console enter `personal.newAccount()`  

Both of these methods will prompt you for a password. If you haven't already done so, make sure to insert one of your account addresses into the genesis block file so that you can receive the genesis funds, as it is designed to deposit money into the account you've specified.  

To begin mining, open your web3 JS console and use the command `miner.start(1)`. This should start mining. After a short amount of time (assuming the difficulty set in your genesis file is low) you should have mined your first test net block!
To make sure, let's check your account balance:
`eth.getBalance(eth.coinbase)`  
The command above calls the .getBalance() method on the coinbase account (the account allocated by the genesis block). If mined successfully, you will likely see a very large number. This is because the balance, by default, is displayed in "wei" which is the lowest denomination in Ethereum. To view how many full Ether are in that account, try this command: `web3.fromWei(eth.getBalance(eth.coinbase), "ether")`.
