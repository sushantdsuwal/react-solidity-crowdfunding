import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0xd4ec3773E56EF66b6b6a5a5Af26e88ED8E038287');

export default instance;
