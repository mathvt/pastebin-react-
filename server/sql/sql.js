const pgtools = require("pgtools")
const {Pool} = require('pg')


const config = {
  user: "mathieu",
  host: "localhost",
  database: 'pastebinDB',
  password: "undefined",
  port: 5432
}


var pool = new Pool(config)


start()


async function start(){
    await createTable().catch(err => console.log(err))
    setInterval(() => {
        controlExpiration()
    }, 3600*1000);
}



async function listPaste(){
    let select = await pool.query('SELECT hash, name, syntax, time, timeOfExpiration FROM pasteTable')
    return select.rows
}



async function searchPaste(hash){
    let sql = 'SELECT * FROM pasteTable WHERE hash = $1'
    const select = await pool.query(sql, [hash])
    return select.rows[0]
}



async function insertPaste(data){
        await pool.query('INSERT INTO pasteTable (hash, name, content, syntax, time , expiration, timeOfExpiration) VALUES ($1, $2, $3, $4, $5 , $6, $7)'
        ,[
            data.hash,
            data.name,
            data.main,
            data.syntax,
            data.time ,
            data.expiration,
            data.timeOfExpiration
        ]
    )
    console.log(data)
}


module.exports = {searchPaste, insertPaste, listPaste}




async function createTable(){
    
    try{
        await pool.query('CREATE TABLE IF NOT EXISTS pasteTable (hash text, name varchar(100), content varchar(10000), syntax text, time text, expiration varchar(10), timeOfExpiration bigint, UNIQUE(hash))')
        // pasteTable (hash, name, content, syntax, time , expiration, timeOfExpiration)
    } catch (err) {
        console.log(err.stack)
    } finally { console.log('Table OK') }
    await controlExpiration()
}



async function controlExpiration(){
    let time = Date.now()
    await pool.query('DELETE FROM pasteTable WHERE timeOfExpiration <= $1', [time])
}



function createDB(){
    pgtools.createdb(config, "pastebinDB", function(err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(res);
    });    
}