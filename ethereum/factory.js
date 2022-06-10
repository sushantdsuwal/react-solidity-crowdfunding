import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(CampaignFactory.abi, '0x98CFc2Db890f6fFb85F45C4Ee6F0F585a85A0317');

export default instance;
