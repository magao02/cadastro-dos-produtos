const mongoose = require("mongoose");


const ImagemSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  
});

module.exports = mongoose.model("Imagem", ImagemSchema);