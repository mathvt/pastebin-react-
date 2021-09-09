let express = require('express');
let router = express.Router();
const { listPaste } = require('../sql/sql')



router.patch('/', async function(req, res) {
  let list = await listPaste()
  let time = Date.now()
  list = list.filter((row) => row.timeofexpiration > time || row.timeofexpiration === null)
  res.json(list)
  })



module.exports = router