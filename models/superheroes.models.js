const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/db.config");

class Superhero extends Model {}

Superhero.init(
  {
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    real_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    superpowers: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    catch_phrase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Superhero",
    tableName: "superheroes",
    timestamps: false,
  },
);

module.exports = Superhero;
