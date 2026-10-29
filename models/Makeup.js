const mongoose = require('mongoose')

const makeupSchema = new mongoose.Schema({
  name:String, 
  available: Boolean
},{timeseries: true}
);

const Makeup = mongoose.model('Makeup', makeupSchema)
module.exports = Makeup