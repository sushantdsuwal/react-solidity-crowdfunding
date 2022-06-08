const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const util = require('util');
// 0xd4ec3773E56EF66b6b6a5a5Af26e88ED8E038287
const provider = new HDWalletProvider(
  'perfect trust around eternal negative sorry text soccer flag track lonely stumble',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/f102bef22ba540399857c94b44d1243e'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy using account ' + accounts[0]);

  const txn = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });
  console.log('Contract is at ' + txn.options.address);
  provider.engine.stop();
};
deploy();
