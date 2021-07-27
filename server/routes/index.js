let express = require('express');
let router = express.Router();
const crypto = require('crypto');
const { insertPaste, searchPaste } = require('../sql/sql')
const path = require('path')


router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


router.post('/', async function(req, res) {
  const data = req.body
  if (!data.main){
    return res.send('0')
  }
  else{
    await dataPreprocess(data)
    await insertPaste(data)
    .catch(err => err.errno !== 19 && console.error(err))
    // errno 19 = try to insert a hash already in the db
    res.type('html')
    res.send(data.hash)    
  }
});


router.get('/:id', async function(req, res) {
  let hash = req.originalUrl.replace('/', '')
  let row = await searchPaste(hash)
  if(await row && (row.timeofexpiration > Date.now() || row.timeofexpiration === null)){
    res.json(row)
  }
  else{
    res.sendStatus(404)
  }
});


module.exports = router


async function dataPreprocess(data){
  data.time = THEdate()
  data.hash = sha1(data.main + data.name)
  data.name = data.name || 'Untitled paste'
  data.expiration_in_millisec = convert_in_millisec(data.expiration)
  data.timeOfExpiration = 
    data.expiration_in_millisec === 0 ? null : data.expiration_in_millisec + Date.now()
}


function convert_in_millisec(expiration){
  switch(expiration){
      case 'never':
          return 0
      case '5 minutes':
          return 5*60*1000
      case '1 hour':
          return 3600*1000
      case '1 day':
          return 24*3600*1000
      case '1 month':
          return 30.5*24*3600*1000
      case '1 year':
          return 365*24*3600*1000
  }
}


function THEdate(){
  let d = new Date()
  let postDate = d.toLocaleString('default', { month: 'long' }) + ' ' + d.getDate() + 'th ' +  + d.getFullYear()
  return postDate
}


function sha1(input){
  let sha1 = crypto.createHash('sha1')
  return sha1.update(input).digest('hex');
}