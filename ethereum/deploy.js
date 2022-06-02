const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');
const util = require('util');

const provider = new HDWalletProvider(
  'PHRASE',
  // remember to change this to your own phrase!
  'rinkeby_infura'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });
  console.log(util.inspect(abi, false, null, true));
  console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};
deploy();
