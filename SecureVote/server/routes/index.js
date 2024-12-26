const express = require('express')
const router = express.Router()
const homeController = require('../controller/home_controller')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/json' ||
    file.mimetype === 'text/csv' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Document uploaded is not supported type'))
  }
}
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, fileFilter: fileFilter })

console.log('Router initialised')
router.get('/', homeController.home)
router.get('/get-ipfs-data', homeController.Get_Ipfs_data)
router.post(
  '/create-constituency',
  upload.fields([
    { name: 'constituency_data', maxCount: 1 },
    { name: 'voter_list', maxCount: 1 },
  ]),
  homeController.create_constituency,
)
router.post('/check-voter', homeController.check_voter)
router.post('/get-constituency', homeController.get_constituency)
router.get('/get-timestamp', homeController.getTimestamp)
router.get('/show-result', homeController.showResult)
router.post(
  '/voter-id-verify',
  upload.fields([
    { name: 'front_id', maxCount: 1 },
    { name: 'back_id', maxCount: 1 },
  ]),
  homeController.voterIdVerify,
)
router.post(
  '/aadhar-id-verify',
  upload.fields([
    { name: 'front_id', maxCount: 1 },
    { name: 'back_id', maxCount: 1 },
  ]),
  homeController.aadharIdVerify,
)

module.exports = router
