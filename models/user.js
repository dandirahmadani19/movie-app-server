'use strict';
const {
  Model
} = require('sequelize');
const { hashing } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Movie, {
        foreignKey: "authorId",
      });
      User.belongsToMany(models.Movie, {
        through: "MoviesAuthors",
        foreignKey: "authorId",
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email is required",
        },
        notEmpty: {
          args: true,
          msg: "Email is required"
        },
        isEmail: {
          args: true,
          msg: "Invalid email input"
        }
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password is required"
        },
        notEmpty: {
          args: true,
          msg: "Password is required"
        },
        isLengthMoreThanFive(value) {
          if ( value.length > 0 && value.length < 5 ) {
            throw new Error("Password minimum 5 characters");
          }
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instanceUser, options) {
        instanceUser.password = hashing(instanceUser.password);
        if (!instanceUser.role) {
          instanceUser.role = "admin";
        }
      }
    }
  });
  return User;
};