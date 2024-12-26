const axios = require('axios')
const pinataSDK = require('@pinata/sdk')
const { Readable } = require('stream')
const ethers = require('ethers')
const uuid = require('uuid')

const pinata = new pinataSDK({
  pinataJWTKey: process.env.pinataJWTKey,
})

const abi = require('../utils/abi.json')

const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL,
)
const signer = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider,
)

const contractAddress = process.env.CONTRACT_ADDRESS
module.exports.home = (req, res) => {
  // exporting the fuction so that router can use

  return res.send('hello')
}

module.exports.Get_Ipfs_data = async (req, res) => {
  try {
    //   const stream = fs.createReadStream(path.join(__dirname, './student.json'));
    //   const options = {
    //     pinataMetadata: {
    //         name: 'student.json', // Provide your filename here
    //         // You can also add other metadata here
    //     },
    //     pinataOptions: {
    //         cidVersion: 0
    //     }
    // };
    //   const response = await pinata.pinFileToIPFS(stream , options)
    //   console.log(response)

    const response = await axios.get(
      'https://gateway.pinata.cloud/ipfs/QmV7cGULqLBdNywkDYgXeXA5n52T7X3X5vivmxwXd728hU',
    )
    console.log(response)
    return res.status(200).json({
      data: response.data,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports.create_constituency = async (req, res) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)

    const files = req.files
    let start_date = req.body.start_date
    let end_date = req.body.end_date

    if (files.constituency_data == undefined || files.voter_list == undefined) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please upload files',
      })
    }

    if (req.body.start_date == undefined || req.body.end_date == undefined) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please enter start and end date',
      })
    }
    const voter_bufferStream = new Readable()
    voter_bufferStream.push(files.voter_list[0].buffer)
    voter_bufferStream.push(null)
    const voter_options = {
      pinataMetadata: {
        name: 'voter_list.json',
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const voter_response = await pinata.pinFileToIPFS(
      voter_bufferStream,
      voter_options,
    )

    const voter_hash = voter_response.IpfsHash

    const constituency_bufferStream = new Readable()
    constituency_bufferStream.push(files.constituency_data[0].buffer)
    constituency_bufferStream.push(null)
    const constituency_options = {
      pinataMetadata: {
        name: 'constituency_data.json',
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const constituency_response = await pinata.pinFileToIPFS(
      constituency_bufferStream,
      constituency_options,
    )
    const constituency_hash = constituency_response.IpfsHash

    start_date = new Date(start_date)
    let start_unixTime = start_date / 1000

    end_date = new Date(end_date)
    let end_unixTime = end_date / 1000

    await contract.set_time(start_unixTime, end_unixTime)

    await contract.set_constituency_data_url(constituency_hash)

    await contract.set_candidate_data_url(voter_hash)

    let jsonString = files.constituency_data[0].buffer.toString()
    let jsonObject = JSON.parse(jsonString)

    for (const constituency of jsonObject) {
      let nonce = await provider.getTransactionCount(signer.address)
      console.log(nonce)

      const result = await contract.create_constituency(
        constituency.constituency,
        constituency.pincode,
        constituency.district,
        constituency.id,
        constituency.candidate_id,
        constituency.candidate_name,
        constituency.candidate_party,
        constituency.party_image_url,
      )
      await result.wait()
      console.log('Executed transaction')
      console.log(result)
    }

    return res.status(200).json({
      data: null,
      error: false,
      msg: 'Constituency created successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.check_voter = async (req, res) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    let voter_id = req.body.voter_id
    let pincode = req.body.pincode
    if (voter_id == undefined) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please enter voter id',
      })
    }
    const voter_list_hash = await contract.get_candidate_data_url()
    const response = await axios.get(
      `https://gateway.pinata.cloud/ipfs/${voter_list_hash}`,
    )
    const voter_list = response.data
    console.log(voter_list)
    const voter = voter_list.find(
      (voter) => voter.voter_id === voter_id && voter.pincode === pincode,
    )
    if (voter === undefined) {
      return res.status(422).json({
        data: false,
        error: false,
        msg: 'Voter not found',
      })
    }

    voter_id = voter_id.toString()
    const result = await contract.check_voter(voter_id)
    console.log(result)

    return res.status(200).json({
      data: result,
      error: false,
      msg: 'Voter checked successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.get_constituency = async (req, res) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    let voter_pincode = req.body.pincode
    if (voter_pincode == undefined) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please enter pincode',
      })
    }
    voter_pincode = voter_pincode.toString()
    const result = await contract.get_constituency(voter_pincode)

    const candidateData = result[4].map((candidate) => {
      return {
        candidate_id: candidate[0],
        candidate_name: candidate[1],
        candidate_party: candidate[2],
        party_image_url: candidate[3],
      }
    })

    const jsonData = {
      constituency: result[0],
      pincode: result[1],
      district: result[2],
      id: result[3],
      candidates: candidateData,
    }

    console.log(jsonData)

    return res.status(200).json({
      data: jsonData,
      error: false,
      msg: 'Constituency fetched successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.getTimestamp = async (req, res) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    const start = await contract.gettimestamp()
    let start_date = new Date(end_unixTime * 1000)
    let localDateTime = date1.toString()
    console.log(localDateTime)
    return res.status(200).json({
      start: start.toNumber(),
      end: end.toNumber(),
      error: false,
      msg: 'Timestamp fetched successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.showResult = async (req, res) => {
  try {
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    const result = await contract.get_all_constituencies()

    const no_of_constituencies = await contract.no_of_constituencies()

    let data = []

    for (let i = 0; i < no_of_constituencies; i++) {
      const candidateData = result[i][4].map((candidate) => {
        const bigNumber = ethers.BigNumber.from(candidate[4]._hex)
        const voteCount = bigNumber.toNumber()
        return {
          candidate_id: candidate[0],
          candidate_name: candidate[1],
          candidate_party: candidate[2],
          party_image_url: candidate[3],
          vote_count: voteCount,
        }
      })
      const jsonData = {
        constituency: result[i][0],
        pincode: result[i][1],
        district: result[i][2],
        id: result[i][3],
        candidates: candidateData,
        winner: result[i][5],
      }
      data.push(jsonData)
    }

    return res.status(200).json({
      data: data,
      error: false,
      msg: 'Result fetched successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.voterIdVerify = async (req, res) => {
  try {
    const files = req.files
    if (files.front_id == undefined || files.back_id ==  undefined) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please upload files',
      })
    }
    const front_id_bufferStream = new Readable()
    front_id_bufferStream.push(files.front_id[0].buffer)
    front_id_bufferStream.push(null)

    let id = uuid.v4()
    // How to create unique name for each file
    const front_id_filename = `front_id_${id}.jpg`

    const front_id_options = {
      pinataMetadata: {
        name: front_id_filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const front_id_response = await pinata.pinFileToIPFS(
      front_id_bufferStream,
      front_id_options,
    )
    const front_id_hash = front_id_response.IpfsHash

    const front_id_url = `https://gateway.pinata.cloud/ipfs/${front_id_hash}`

    const back_id_bufferStream = new Readable()
    back_id_bufferStream.push(files.back_id[0].buffer)
    back_id_bufferStream.push(null)
    id = uuid.v4()
    const back_id_filename = `back_id_${id}.jpg`

    const back_id_options = {
      pinataMetadata: {
        name: back_id_filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const back_id_response = await pinata.pinFileToIPFS(
      back_id_bufferStream,
      back_id_options,
    )
    const back_id_hash = back_id_response.IpfsHash

    const back_id_url = `https://gateway.pinata.cloud/ipfs/${back_id_hash}`

    console.log(front_id_url)
    console.log(back_id_url)
    const data = {
      front_id_url: front_id_url,
      back_id_url: back_id_url,
    }
    const response = await axios.post(
      'https://54c8459a-73fa-478c-9125-b11aaee8efbd-00-20vwnvyxqkrz4.pike.replit.dev/check-voter-id',data
    )


    console.log(response.data)
    console.log(response.data.data)
    const data1 = response.data.data
    return res.status(200).json({
      data: {
        front_id_url: front_id_url,
        back_id_url: back_id_url,
        data1
      },
      error: false,
      msg: 'Voter checked successfully',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}

module.exports.aadharIdVerify = async (req, res) => {
  try {
    const files = req.files
    if (files.front_id == undefined || files.back_id == undefined ) {
      return res.status(422).json({
        data: null,
        error: true,
        msg: 'Please upload files',
      })
    }
    const aadhar_front_bufferStream = new Readable()
    aadhar_front_bufferStream.push(files.front_id[0].buffer)
    aadhar_front_bufferStream.push(null)

    let id = uuid.v4()
    // How to create unique name for each file
    const aadhar_front_filename = `aadhar_front_${id}.jpg`

    const aadhar_front_options = {
      pinataMetadata: {
        name: aadhar_front_filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const aadhar_front_response = await pinata.pinFileToIPFS(
      aadhar_front_bufferStream,
      aadhar_front_options,
    )
    const aadhar_front_hash = aadhar_front_response.IpfsHash

    const aadhar_front_url = `https://gateway.pinata.cloud/ipfs/${aadhar_front_hash}`

    const aadhar_back_bufferStream = new Readable()
    aadhar_back_bufferStream.push(files.back_id[0].buffer)
    aadhar_back_bufferStream.push(null)
    id = uuid.v4()
    const aadhar_back_filename = `aadhar_back_${id}.jpg`

    const aadhar_back_options = {
      pinataMetadata: {
        name: aadhar_back_filename,
      },
      pinataOptions: {
        cidVersion: 0,
      },
    }

    const aadhar_back_response = await pinata.pinFileToIPFS(
      aadhar_back_bufferStream,
      aadhar_back_options,
    )
    const aadhar_back_hash = aadhar_back_response.IpfsHash

    const aadhar_back_url = `https://gateway.pinata.cloud/ipfs/${aadhar_back_hash}`

    console.log(aadhar_front_url)
    console.log(aadhar_back_url)
    const data = {
      front_id_url: aadhar_front_url,
      back_id_url: aadhar_back_url,
    }
    const response = await axios.post(
      'https://54c8459a-73fa-478c-9125-b11aaee8efbd-00-20vwnvyxqkrz4.pike.replit.dev/check-aadhar-id',data
    )

    console.log(response.data.data);
    const data1 = response.data.data
    return res.status(200).json({
      data: {
        aadhar_front_url: aadhar_front_url,
        aadhar_back_url: aadhar_back_url,
        data1
      },
      error: false,
      msg: 'Aadhar checked successfully',
    })
  }
  catch (error) {
    console.log(error)
    return res.status(422).json({
      data: null,
      error: true,
      msg: error,
    })
  }
}
