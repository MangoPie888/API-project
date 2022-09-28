'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.User,
        {foreignKey:'userId'}
      );
      Review.hasMany(
        models.ReviewImage,
        {foreignKey:'reviewId',onDelete:'CASCADE',hooks:true}
      );

      Review.belongsTo(
        models.Spot,
        {foreignKey:"spotId"}
      )
    }
  }
  Review.init({
    id:{
      type:DataTypes.INTEGER,
      allowNull:true,
      autoIncrement:true,
      primaryKey:true
    },
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};