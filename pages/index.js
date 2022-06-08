import React, { useState, useEffect } from 'react';
import factory from '../ethereum/factory';

function CampaignIndex({ campaigns }) {
  console.log('campaigns', campaigns);

  return <h1>{campaigns && campaigns[0]}</h1>;
}

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaign().call();
  return { campaigns };
};

export default CampaignIndex;
