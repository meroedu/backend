
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
		{
			indexes: [
				{
					unique: true,
					fields: ['email']
				}
			]
		},
	);

	// Hooks
	User.beforeCreate(async (user, options) => {
		if (user.changed('password')) {
			const hashedPassword = await user.generateHash(user.password);
			user.password = hashedPassword;
		}
	});

	// Instance Methods
	User.prototype.validatePassword = function (password, cb) {
		bcrypt.compare(password, this.password, (err, isMatch) => {
			cb(err, isMatch);
		});
	};

	User.prototype.generateHash = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	return User;
};