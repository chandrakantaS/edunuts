import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'data',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    website: Sequelize.STRING,
    company: Sequelize.STRING,
    currentCity: {
      type: Sequelize.STRING,
      field: 'current_city'
    },
    badge: Sequelize.STRING,
    college: Sequelize.STRING,
    joined: Sequelize.STRING,
    passwordHash: {
      type: Sequelize.STRING,
      field: 'password_hash'
    },
    profilePicure: {
      type: Sequelize.STRING,
      field: 'profile_picture'
    },
    active: Sequelize.INTEGER,
    confirmedAt: {
      type: Sequelize.DATE,
      field: 'confirmed_at'
    },
    title: Sequelize.ENUM,
    gender: Sequelize.ENUM,
    dob: Sequelize.DATEONLY,
    about: Sequelize.TEXT
  },
  {
    tableName: 'user_profile',
    createdAt: false,
    updatedAt: false
  }
);
