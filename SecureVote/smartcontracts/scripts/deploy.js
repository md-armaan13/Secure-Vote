const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const secureContractFactory = await hre.ethers.getContractFactory('Secure')
  const secureContract = await secureContractFactory.deploy()
  await secureContract.deployed()
  console.log('Contract deployed to:', secureContract.address)
  console.log('Contract deployed by:', owner.address)

//   const time = await waveContract.set_time(1709251200,1735689599);

//   await time.wait()


//   const costituency1 = await waveContract.create_constituency(
//     'Arya Nagar',
//     '208001',
//     'Kanpur Nagar',
//     '1',
//     ['1', '2', '3'],
//     ['a', 'b', 'c'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency1.wait()

//   const costituency2 = await waveContract.create_constituency(
//     'Sisamau',
//     '208002',
//     'Kanpur Nagar',
//     '2',
//     ['1', '2', '3'],
//     ['Abhay', 'bjdn', 'cjhjd'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency2.wait()

//   const costituency3 = await waveContract.create_constituency(
//     'jajmau',
//     '208003',
//     'Kanpur Nagar',
//     '3',
//     ['1', '2', '3'],
//     ['Abhineet', 'hic', 'swndow'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency3.wait()


//   const costituency4 = await waveContract.create_constituency(
//     'Barra',
//     '208005',
//     'Kanpur Nagar',
//     '4',
//     ['1', '2', '3'],
//     ['sipllp', 'slsdn', 'dwk'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency4.wait()


//   const costituency5 = await waveContract.create_constituency(
//     'nayi sarak',
//     '208006',
//     'Kanpur Nagar',
//     '5',
//     ['1', '2', '3'],
//     ['dbecib', 'sdcndek', 'edeo'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency5.wait()


//   const costituency6 = await waveContract.create_constituency(
//     'parade',
//     '208007',
//     'Kanpur Nagar',
//     '6',
//     ['1', '2', '3'],
//     ['knce', 'dkne', 'dnke'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency6.wait()


//   const costituency7 = await waveContract.create_constituency(
//     'civil',
//     '208008',
//     'Kanpur Nagar',
//     '7',
//     ['1', '2', '3'],
//     ['cjc', 'wdjeo', 'eknd'],
//     ['cong', 'bjp', 'sp'],
//     ['http', 'http', 'http'],
//   )
//   await costituency7.wait()

//   const vote = await waveContract.vote('208001', '2', '1');

//   await vote.wait()

//   const vote1 = await waveContract.vote('208002', '4', '2');

//   await vote1.wait()

//   const vote2 = await waveContract.vote('208002', '5', '1');

//   await vote2.wait()

//   const getconstituency = await waveContract.get_all_constituencies()

//   const no_of_constituency = await waveContract.no_of_constituencies()
//   let data = []


//   for(let i=0 ; i< no_of_constituency;i++){
//       data.push(getconstituency[i]);
//   }

//   for(let i=0 ; i< no_of_constituency;i++){
//     const [name, pincode, district, id, candidates, winner] = data[i]
//     console.log('data', name, pincode, district, candidates, winner)
// }

  // const [data1, data2] = getconstituency
  // const [name, pincode, district, id, candidates, winner] = data1
  // console.log('data1', name, pincode, district, candidates, winner)

  // const [name1, pincode1, district1, id1, candidates1, winner1] = data2
  // console.log('data2', name1, pincode1, district1, candidates1, winner1)
  // Extract candidates' information

  // Output the trimmed data

  // console.log(getconstituency[0])
}

const runMain = async () => {
  try {
    await main()
    process.exit(0) // exit Node process without error
  } catch (error) {
    console.log(error)
    process.exit(1) // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
}

runMain()
