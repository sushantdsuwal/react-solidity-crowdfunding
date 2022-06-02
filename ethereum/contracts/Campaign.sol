// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaign() public view returns(address[] memory){
        return deployedCampaigns;
    }

}

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Campaign {

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint private numRequests;
    uint private currentIndex;
    mapping(uint => Request) public requests;


    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(manager == msg.sender);
        _;
    }

    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
       require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }


    function createRequest(string memory description, uint value, address payable recipient) payable public restricted {
        Request storage newRequestInStorage = requests[currentIndex];
        newRequestInStorage.description = description;
        newRequestInStorage.value = value;
        newRequestInStorage.recipient = recipient;
        newRequestInStorage.complete = false;
        newRequestInStorage.approvalCount = 0;
        currentIndex++;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }



}
