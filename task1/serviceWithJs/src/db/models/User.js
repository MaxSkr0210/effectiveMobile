const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.JSONB,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'actions'
});

User.sync()

module.exports = User;