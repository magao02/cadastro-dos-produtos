const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

module.exports = mongoose;
