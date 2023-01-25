const User=  require('../modals/user');
const VoterId = require('../modals/voterid');
var ethers = require('ethers');  
var crypto = require('crypto');
//const web3 = new Web3('https://ropsten.infura.io/v3/76162cfy074u522fa49be7ca11cc9a33')
// const API_KEY = "uf2PVpdhCigp4T0TjM-6iaqo495IZHcV";
// 
const CONTRACT_ADDRESS = "0x9E3F72e647302fe1B95A5021Bf825c1A43516034";
const Web3 = require("web3");
const Provider = require('@truffle/hdwallet-provider');
const PRIVATE_KEY = "6fb6b08acf3a52027d7cde06c9c9c54085f738384a3a7e9d46d8ac1a81803dc4";
const address = '0x872de6B597c962f4ecA8BA497EeF43E3d374108A'
const API_URL = "https://stylish-burned-aura.ethereum-goerli.discover.quiknode.pro/3b6a6e64b1b2426592ca68bc5c5da97dbfaf1a9a/";
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);
const contract = require("../../client/src/utilits/secure.json").abi;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");


const  request = require('request');
module.exports.home= (req,res)=>{ // exporting the fuction so that router can use

    return res.send("hello");
};


module.exports.Create_user= async (req,res)=>{

    try{
        const user = await  User.create({
            email : req.body.email,
            voterId : req.body.voterId
        })
    
        return res.status(200).json({
            
                "user" : "user created successfully"
        
        })

    
    }
    catch(err){

            console.log(err);
            return res.status(402).json({
                "user" : "Error Something got wrong"
            })


    }
    

   
}


module.exports.vote = async (req,res) =>{
//     const contractAddress = "0x9E3F72e647302fe1B95A5021Bf825c1A43516034";
//     const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);
//     const message = await helloWorldContract.getdatadescribe(0);
//    console.log("The message is: " + message);
//     const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

//     // Signer
//     const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
    
//     // Contract
//     const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract, signer);
//     const message = await helloWorldContract.getdatadescribe(0);
//   console.log("The message is: " + message);

    

  

  //  const { API_URL, PRIVATE_KEY } = process.env;
  try{

    var id = await  crypto.randomBytes(32).toString('hex');
    var privateKey = "0x"+id;
    console.log("SAVE BUT DO NOT SHARE THIS:", privateKey);

    var wallet =  await new ethers.Wallet(privateKey);
    console.log("Address: " + wallet.address);

  
    const web3 = await createAlchemyWeb3(API_URL);
    const myAddress = '0x872de6B597c962f4ecA8BA497EeF43E3d374108A' //TODO: replace this address with your own public address
   
    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': wallet.address, // faucet address to return eth
     'value': 10000000000000000,
     'gas': 30000,
     'maxFeePerGas': 100000000000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };
    
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    
      const transfer = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
      await transfer.wait;


      var provider = await new Provider(id, API_URL);
    var web4 =  await new Web3(provider);
    
    var myContract = await new web4.eth.Contract(contract, CONTRACT_ADDRESS)
    
    var receipt = await myContract.methods.addvote(req.body.index).send({ from: wallet.address });

    console.log(receipt);


  }
  catch(err){
console.log(err);
  }
    
      
//     if (!error) {
//         await transfer.wait;
//       console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
//     } else {
//       console.log("❗Something went wrong while submitting your transaction:", error)
//     }
//    });




}

module.exports.isValid = async (req,res)=>{




}


module.exports.voterId = async (req,res)=>{
try{

    const voterId = await  VoterId.create(req.body);
    return res.status(200).json({
        "status" : "Voterid data successfully"
    })
}catch(err){
    console.log(err);
return res.status(402).json({

    "Error" : "error in creating voterID"
})
}
   



}

module.exports.Data = async (req,res)=>{

    try{

        var provider = await new Provider(PRIVATE_KEY, API_URL);
        var web3 =  await new Web3(provider);
        
        var myContract = await new web3.eth.Contract(contract, CONTRACT_ADDRESS)
        
        var name1 = await myContract.methods.getdataname(0).call();
        var about1 = await myContract.methods.getdataabout(0).call();
        var vote = await myContract.methods.getvotes(0).call();
        // var name2 = await myContract.methods.getdataname(1).call();
        // var about2 = await myContract.methods.getdataabout(1).call();
    
        // var name3 = await myContract.methods.getdataname(3).call();
        // var about3 = await myContract.methods.getdataabout(3).call();
        
        // var name4 = await myContract.methods.getdataname(4).call();
        // var about4 = await myContract.methods.getdataabout(4).call();
    
        console.log(name1);
        console.log(about1);
        console.log(vote)
        return res.status(200).json({
            entity1 : {
                name : name1,
                about : about1
            }
        })
    }
    catch(err){

        console.log(err);
        return res.status(402).json({
                "error" : "Error in fetching data from smartcontract"
        })
    }

   



}
//creating session when user sign in
