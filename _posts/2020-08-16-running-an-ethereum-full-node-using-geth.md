---
layout: post
title: Running an Ethereum Full Node Using Geth
author: Ryan Miller
comments: true
tags:
- Ethereum
- Geth
- Linux
---

# Syncronizing Your Node
Before we can do anything we need to synchronize our node with the Ethereum
blockchain. This takes a long time, even in “fast” mode. Days, in fact. To start the
process, type:
```
tmux
geth --syncmode "fast" --cache=1024
```
To detach, type `ctrl-b`, release, and then tap `d`.  
As the sync continues, you may check on the progress of the synchronization, attach to the geth node via the built-in JavaScript console and issue the syncing command:
```
geth attach
```

To re-attach, use the following command:
```
tmux attach -t 0
```

## How Geth Sync Works
Geth has 3 sync types: “fast”, “full”, or “light”. The most common type is "fast", which is also the default type. The way it works (as described [here](https://github.com/ethereum/go-ethereum/issues/16251)) is multiple phased: 

- Phase 1: Instead of starting from the genesis block and reprocessing all the transactions that ever occurred (which could take weeks), fast sync downloads the blocks, and only verifies the associated proof-of-works. Downloading all the blocks is a straightforward and fast procedure and will relatively quickly reassemble the entire chain.

- Phase 2: State Trie Download: Many people falsely assume that because they have the blocks, they are in sync. Unfortunately this is not the case, since no transaction was executed, so we do not have any account state available (ie. balances, nonces, smart contract code and data). These need to be downloaded separately and cross checked with the latest blocks. This phase is called the state trie download and it actually runs concurrently with the block downloads; alas it take a lot longer nowadays than downloading the blocks.

## Running Geth with Options
Options that can be passed to geth at startup are listed [here](https://github.com/ethereum/go-ethereum/wiki/Command-Line-Options). Below I've pasted my default startup script along with the purpose of each flag:
```
geth --datadir /path/to/chain/data --syncmode "fast" -cache=2048 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --http.api "eth,net,web3,txpool" --rpccorsdomain "*"

geth --datadir /path/to/chain/data --syncmode "fast" -cache=2048 --rpc --rpcaddr 0.0.0.0 --rpcport 8545 --http.api "eth,net,web3,txpool" --rpccorsdomain "*" --txpool.globalslots 9192 --metrics --pprof --metrics.addr 0.0.0.0 --metrics.port 6060 --pprof.addr 0.0.0.0

```
- `--datadir [value]`: Allows me to read/write all blockchain data to a specific directory.  
- `--syncmode "fast"`: Blockchain sync mode ("fast", "full", or "light"), with the default being fast.  
- `-cache=[value]`: Megabytes of memory allocated to internal caching (default = 4096 mainnet full node, 128 light mode) default: 1024.  
- `--rpc`: Enable the HTTP-RPC server 
- `--rpcaddr`: HTTP-RPC server listening interface (default: "localhost")
- `--http.api [value]`: API's offered over the HTTP-RPC interface (e.g. value `"eth,net,web3,txpool"`)
- `--ws`: Enable the WS-RPC server  
- `--wsaddr value`: WS-RPC server listening interface (default: "localhost")  
- `--wsport value`: WS-RPC server listening port (default: 8546) 
- `--txpool.globalslots [value]`: Specify maximium number of tx slots available for the tx pool. I set this high because one of the apps I'm working on depends on being able to locate low-gas transactions in the txpool.
- `--metrics`: Enable metrics collection and reporting
- `--metrics.addr [value]`: Specify listening interface for metrics (default=127.0.0.1, use 0.0.0.0 to open acces to all hosts)
- `--metrics.port [value]`: Specify metrics listening port if different from default: 6060
- `--pprof`: Enable the pprof HTTP server - do not open this up to public internet
- `--pprof.addr [value]` Specify listening interface for pprof (default=127.0.0.1, use 0.0.0.0 to open acces to all hosts)

## Interacting with Geth 
Below, we'll cover two ways to interact with your running Geth node. One using an interactive console, and the other using the web3 library which allows us to run scripts.
### Attaching a console to Geth
Attaching a console simply allows us to interact with Geth from the command line. Use the command below to attach your console to the running geth node:
```
geth attach --datadir /path/to/geth/data
```
From here, we can issue [any number of commands](https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands) to our node and have a result output.
```
eth.blockNumber
// e.g. output: 3890893
```
If your node is still syncing and you'd like to track progress, try this:
```
eth.syncing  

// E.g. output:  
//  {
//      currentBlock: 3890742,
//      highestBlock: 3890893,
//      knownStates: 17124512,
//      pulledStates: 17105895,
//      startingBlock: 3890340
//  }
```
 

### Connecting to Geth Withe Web3.js
An alternative way of interacting with our node is to use a web3 package in a custom script. A package is available for both [NodeJS](https://www.npmjs.com/package/web3), [Python](https://web3py.readthedocs.io/en/stable/). I'll be using the Node/Javascript package in my examples below. 
Once you get the package installed via your package manager and open a new script, we'll first have to import/require web3, and then feed it a connection to a "provider". A provider basically refers to the geth node we started up in the above steps. We have the option to connect via http or websocket, and for this demo I'll be showing http. 
  
Below is an example script of how we might write a interact with our geth node. This simple script will show us the balance of a common Ethereum burn address. Before executing it, make sure you've imported the web3 npm package and supplied the appropriate http URL and port.

{% highlight javascript %}
const Web3 = require("web3");
const TxPool = require("web3-eth-txpool");

// Supply IP address & portwhere geth node is running (e.g. localhost:8545)
const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.2:8545"));
let myAddress = "0x0000000000000000000000000000000000000000";
web3.eth.getBalance(myAddress, function(err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log(web3.utils.fromWei(result, "ether") + " ETH")
  }
});
{% endhighlight %}

The output for the above script should be:
{% highlight javascript %}
/// output
8230.197124024330023377 ETH
{% endhighlight %}

In some cases web3 functionality must be explicitly extended. For example, if we want to access data about the mempool, we can use the following snippet of code to our script to add a few methods to web3, and then, once implemented, use those methods normally.
{% highlight javascript %}
// Extend web3
web3.eth.extend({
    property: 'txpool',
    methods: [{
      name: 'content',
      call: 'txpool_content'
    },{
      name: 'inspect',
      call: 'txpool_inspect'
    },{
      name: 'status',
      call: 'txpool_status'
    }]
});
// Example of using extended method from previous step
web3.eth.txpool.status().then(console.log).catch(console.error)
{% endhighlight %}
{% highlight javascript %}
// Output
{ pending: '0x1000', queued: '0x400' }
{% endhighlight %}