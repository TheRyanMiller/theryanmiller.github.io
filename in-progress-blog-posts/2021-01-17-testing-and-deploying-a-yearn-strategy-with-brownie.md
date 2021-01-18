---
layout: post
title: Testing and Deploying a Yearn Strategy with Brownie (pt. 3)
author: Ryan Miller
comments: true
tags:
- Brownie
- Solidity
---

# Overview
This post is the 3rd in a three part series for getting started with Brownie and d

### Requirements
To properly follow along with this post yourself:
- Make sure you've read the [first post] in this series and have installed all the pre-requisites(./setting-up-smart-contract-development-environment.html) in this series.
- Install the official yearn-strategy Brownie mix with `brownie bake yearn-strategy`

# Brownie Usage
In [my last blog post](https://theryanmiller.com/setting-up-smart-contract-development-environment.html), I walked through what Brownie is, installation, and a basic compilation of a smart contract. In this post, we'll go a few steps further and learn about accounts, contract deployment, and testing with transactions after deployment.

## Accounts setup
Brownie allows us to manage Ethereum accounts we'll be using to interact with our testnet on our local machine. The following command will generate a local json keystore at `~/.brownie/accounts/dev.json` which stores our accounts
```
brownie accounts generate dev
```
In this scenario, we use `dev` as the account alias because it is used in the default scripts provided by the Yearn Strategy Brownie Mix I'm using. But really, the alias can be set to anything (just know it will be used to name the file in the Brownie accounts directory).
After issuing this command, input a passphrase that will be used to unlock the keystore. A recovery mnemonic will be generated to keep if recovery is needed for any reason.  
That's it on accounts for now. More information can be found [here](https://eth-brownie.readthedocs.io/en/stable/account-management.html).

## Deployment Scripts
Deployment scripts are a simple, and effective way to interact with your contracts using Brownie. Scripts are extremely useful for deployment of contracts (to mainnet or testnet) and for automating processes.  
With Brownie, scripts must be stored in the `scripts/` directory. You can run scripts in two ways:  
- From your shell with `brownie run <script>`
- From console with `>>> run('script')`

Let's try a sample script. Here is a sample
{% highlight python %}
from brownie import *

def main():
    #accounts[0].deploy(Token, "Test Token", "TEST", 18, "1000 ether")
    accounts[0].deploy(Token, "Test Token", "TEST", 18, "1000 ether")
{% endhighlight %}

The default deployment script will interact with the Yearn registry. But we'll use another 

More information on deploying with Brownie is [here](https://eth-brownie.readthedocs.io/en/v1.3.0/deploy.html).
