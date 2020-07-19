
const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
	let Course = sequelize.define('Course', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: () => uuid()
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: DataTypes.STRING,
	});
    
	return Course;
};
