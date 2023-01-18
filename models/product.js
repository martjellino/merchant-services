'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Merchant, {
        as: 'merchant',
        foreignKey: 'merchant_id'
      })
      // define association here
    }
  }
  Product.init({
    merchant_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};