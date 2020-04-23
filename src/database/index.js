const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/noderest', {
	useCreateIndex: true,
	UseNewUrlParser: true,
	useUNifiedTopology: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
