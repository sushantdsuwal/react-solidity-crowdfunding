const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // removes the folder
fs.ensureDirSync(buildPath); // checks if directory exists, otherwise it creates it.

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];
const outputContracts = output['Campaign'];

fs.ensureDirSync(buildPath); // checks if directory exists, otherwise it creates it.

for (let contract in output) {
  console.log(contract);
  fs.outputJsonSync(path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]);
}

module.exports.abi = outputContracts.abi;
module.exports.bytecode = outputContracts.evm.bytecode.object;
