---
layout: post
title: Setting up a Solidity + Web3 Development environment using Truffle + Ganache
author: Ryan Miller
comments: true
tags:
- Solidity
- Ganache
- Web3
- Truffle
---

## Overview
It's quite easy to get setup and going with Ethereum development these days thanks to the great tooling available in the ecosystem.  
In this article, we'll be looking at how to get setup building a ReactJS web applicaiton that interacts with the Ethereum blockchain. 
The basic architecture of the application looks like this

<div style="text-align:center"><img src="/static/img/blogimages/soliditydevsetup/architecture.PNG" /><p style="width:40%; height:40%; text-align:center; margin: auto"><i></i></p></div><br />

### Key architecture components
#### MetaMask
While MetaMask is not the only web3 available, it is the most popular, and will be the one we'll focus on in this article. The purpose of a provider is to send data to, and read data from the block chain. In the background, MetaMask connects to an Ethereum full node on order to do this on our behalf. By default, it uses the Infura service, but for those interested in maximizing decentralization, it can also be configured to connect to you own local Ethereum node.
#### Web3JS
Web3JS is a popular library that basically encodes and decodes any data prior to, or after interaction with the blockchain. For example, if we want to send a simple transaction to a friend, we can use Web3JS API to:
1. Interact with Metamask (or any other compatible provider) to triger events and dialogs
1. Construct a valid transaction data structure
1. Interpret and format data returned from the blockchain


Aside from these components, things work pretty much the same as any other React application. Just imagine that instead of using a traditional database, our app is now persisting data on the Ethereum blockchain. But we all know that a database is important, and if Ethereum is our production database, how do we setup a development environment without incurring massive transaction costs for each test? Do we need to run an entirely new blockchain in our dev environment? Well, this is where the advancement of Ethereum's dev tools comes into play. Let's explore what's available in the next section.

### Developer Tooling for Ethereum
As an ethereum developer, we need several tools
1. A test blockchain
1. Tool to deploy smart contracts to the test blockchain
1. Accounts and Ethereum to spend on the test blockchain