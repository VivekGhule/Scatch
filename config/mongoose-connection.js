const mongoose = require('mongoose');

const config = require('config')
const dbgr = require('debug')('development:mongoose')




main()
  .then(() => {
    dbgr("Connection Successful!...");
  })
  .catch((err) => {
    dbgr("UNABLE TO CONNECT DB: ", err.message);
  });

async function main() {

  await mongoose.connect(`${config.get("MONGO_URI")}/Scatch`)
}


module.exports = main