//Imports
require('dotenv').config() //Allows Stashing Of Artificial '.env' Variable In Separate File
const { PORT } = require('./config')


//Require
const server = require('./api/server.js');


//Launch
server.listen(PORT, () => {
    console.log(`Listening On ${PORT}`)
})
