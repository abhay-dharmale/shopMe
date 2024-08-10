// const mongoose = require('mongoose')
// const dbgr = require('debug')('development:mongoose');
// const config = require('config');
// require('dotenv').config();

// mongoose.connect(`${config.get(process.env.MONGO_URI)}/shopMe`)
// .then(() => {
//   dbgr('connected')
// })
// .catch((err)=>{
//   dbgr(err);
// })

// module.exports = mongoose.connection;

const mongoose = require('mongoose');
const dbgr = require('debug')('development:mongoose');
require('dotenv').config();

// Directly use process.env to access the MONGO_URI environment variable
const mongoURI = process.env.MONGO_URI;

mongoose.connect(`${mongoURI}/shopMe`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  dbgr('connected to MongoDB');
})
.catch((err) => {
  dbgr('MongoDB connection error:', err);
});

module.exports = mongoose.connection;
