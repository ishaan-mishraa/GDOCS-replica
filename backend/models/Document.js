const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Document = sequelize.define('Document', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Document;
