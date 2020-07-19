require('dotenv').config()

module.exports = {
	development: {
		datasource: process.env.DB_DATASOURCE,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		dialect: process.env.DB_DIALECT
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory:'
	},

};
