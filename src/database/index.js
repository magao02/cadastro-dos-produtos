const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {
	useCreateIndex: true,
	UseNewUrlParser: true,
	useUNifiedTopology: true,
});

module.exports = mongoose;
