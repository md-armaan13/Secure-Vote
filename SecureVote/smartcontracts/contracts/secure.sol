// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

struct Candidate {
    string candidate_id;
    string name;
    string party;
    string party_image_url;
    uint256 voteCount;
}

contract Constituency {
    string public name;
    string public pincode;
    string public district;
    string public id;
    Candidate[] public candidates;

    constructor(
        string memory _name,
        string memory _pincode,
        string memory _district,
        string memory _id,
        string[] memory _candidates_id,
        string[] memory _names,
        string[] memory _parties,
        string[] memory _party_image_urls
    ) {
        console.log("Constituency created");
        name = _name;
        pincode = _pincode;
        district = _district;
        id = _id;

        for (uint i = 0; i < _names.length; i++) {

            candidates.push(
                Candidate(
                    _candidates_id[i],
                    _names[i],
                    _parties[i],
                    _party_image_urls[i],
                    0
                )
            );
        }
    }

    function vote(string memory _candidate_id) public {
        console.log("Voting for a candidate", _candidate_id);
        for (uint i = 0; i < candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i].candidate_id)) ==
                keccak256(abi.encodePacked(_candidate_id))
            ) {
                console.log("Voting for a candidate", candidates[i].name);
                candidates[i].voteCount++;
            }
        }
    }

    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    function getPincode() public view returns (string memory _pincodes){
        return pincode;

    }

    function getCandidate(uint256 index) public view returns (string memory _id, string memory _name, string memory _party, string memory partyImageUrl, uint256 voteCount) {
    require(index < candidates.length, "Index out of bounds");
    Candidate storage candidate = candidates[index];
    return (candidate.candidate_id, candidate.name, candidate.party, candidate.party_image_url, candidate.voteCount);
}

}

contract Secure {

    address owner;
    Constituency[] public constituencies;
    uint public startTime;
    uint public endTime;
    mapping(string => bool) public voters;
    string private constituenciesDataUrl;
    string private candidatesDataUrl;

    struct ConstituencyDetails {
        string name;
        string pincode;
        string district;
        string id;
        Candidate[] candidates;
        string winner;
}


    constructor() {
        console.log("Master Contract deployed");
        owner = msg.sender;
        console.log("Owner is", owner);
        console.log(block.timestamp);
    }

    function get_constituency_data_url() public view returns(string memory url){
        return constituenciesDataUrl;
    }

    function set_constituency_data_url(string memory _url) public{
        constituenciesDataUrl = _url;
    }


    function get_candidate_data_url() public view returns(string memory url){
        return candidatesDataUrl ;
    }

    function set_candidate_data_url(string memory _url) public {
        candidatesDataUrl = _url;
    }

    function create_constituency(
        string memory _name,
        string memory _pincode,
        string memory _district,
        string memory _id,
        string[] memory _candidates_id,
        string[] memory _names,
        string[] memory _parties,
        string[] memory _party_image_urls
    ) public {
        console.log("Creating a new constituency");
        Constituency newConstituency = new Constituency(
            _name,
            _pincode,
            _district,
            _id,
            _candidates_id,
            _names,
            _parties,
            _party_image_urls
        );
        constituencies.push(newConstituency);
    }

    function fetch_constituencies(
        string memory _pincode
    ) public view returns (Constituency) {

        console.log(_pincode);
        for (uint i = 0; i < constituencies.length; i++) {

            if (
                keccak256(abi.encodePacked(constituencies[i].pincode())) ==
                keccak256(abi.encodePacked(_pincode))
            ) {

                return constituencies[i];
            }
        }
        revert("Constituency Not Found");
    }

    function getPincode() public view returns (string memory _pincodes){

        return constituencies[0].pincode();

    }

    function vote(
        string memory _pincode,
        string memory _voter_id,
        string memory _candidate_id
    ) public {
        console.log(block.timestamp <= endTime);
        require(!(block.timestamp >= endTime), "Voting has ended");
        require(!voters[_voter_id], "You have already voted");

        Constituency constituency = fetch_constituencies(_pincode);
        constituency.vote(_candidate_id);
        voters[_voter_id] = true;
    }

    function get_constituency(
        string memory _pincode
    )
        public
        view
        returns (
            string memory name,
            string memory pincode,
            string memory district,
            string memory id,
            Candidate[] memory candidates
        )
    {
        for (uint i = 0; i < constituencies.length; i++) {
            if (
                keccak256(abi.encodePacked(constituencies[i].pincode())) ==
                keccak256(abi.encodePacked(_pincode))
            ) {

                Constituency constituency = constituencies[i];
                uint256 candidatesCount = constituency.getCandidatesCount();
                candidates = new Candidate[](candidatesCount);

                for (uint j = 0; j < candidatesCount; j++) {
                (
                    candidates[j].candidate_id,
                    candidates[j].name,
                    candidates[j].party,
                    candidates[j].party_image_url,
                    candidates[j].voteCount
                ) = constituency.getCandidate(j);
            }

                 return (
                constituency.name(),
                constituency.pincode(),
                constituency.district(),
                constituency.id(),
                candidates
            );
            }
        }

        revert("Constituency not found");
    }


function get_all_constituencies()
    public
    view
    returns (ConstituencyDetails[] memory)
{
    ConstituencyDetails[] memory allConstituencies = new ConstituencyDetails[](constituencies.length);

    for (uint i = 0; i < constituencies.length; i++) {

        uint maxVotes = 0;
        uint numWinners = 0;
        string[] memory winners;
        string memory winner;
        uint randNonce = 0;

        Constituency constituency = constituencies[i];
        uint256 candidatesCount = constituency.getCandidatesCount();
        Candidate[] memory candidates = new Candidate[](candidatesCount);
        uint j = 0;
        for (; j < candidatesCount; j++) {


            (
                candidates[j].candidate_id,
                candidates[j].name,
                candidates[j].party,
                candidates[j].party_image_url,
                candidates[j].voteCount
            ) = constituency.getCandidate(j);

              if(candidates[j].voteCount>maxVotes){
                maxVotes = candidates[j].voteCount;
                numWinners = 1;
                delete winners;
                string[] memory tempWinner = new string[](1);
                tempWinner[0]=candidates[j].party;
                winners = tempWinner;
              }else if (candidates[j].voteCount == maxVotes) {
                numWinners++;
                string[] memory temp = new string[](numWinners);
                for (uint k = 0; k < winners.length; k++) {
                temp[k] = winners[k];
               }
                temp[numWinners - 1] = candidates[j].party;
                winners = temp;
            }
        }
        if (numWinners == 1) {

            winner= winners[0];
        } else {

            uint randIndex = uint(keccak256(abi.encodePacked(block.timestamp , msg.sender,i*2943447399437))) % numWinners;
            console.log("value", uint(keccak256(abi.encodePacked(block.timestamp , msg.sender,i*2943447399437))));
            console.log("numWinners", numWinners);
            console.log("Random Index", randIndex);
            randNonce++;
            winner = winners[randIndex];
        }

        allConstituencies[i] = ConstituencyDetails(
            constituency.name(),
            constituency.pincode(),
            constituency.district(),
            constituency.id(),
            candidates,
            winner
        );
    }

    return allConstituencies;
}

function gettimestamp() public view returns (uint256 , uint256) {
        return (startTime,endTime);
    }


function no_of_constituencies() public view returns (uint256) {
        return constituencies.length;
    }

function set_time(uint _startTime , uint _endTime) public {

        require(_startTime < _endTime, "Start time must be less than end time");
        startTime = _startTime;
        endTime = _endTime;
    }

function check_voter(string memory _voter_id) public view returns (bool) {
        if (voters[_voter_id]) {
            return true;
        } else {
            return false;
        }
    }


}

