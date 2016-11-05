import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'social',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    }
    providerId: {
      type: Sequelize.STRING,
      field: 'provider_id'
    },
    providerUserId: {
      type: Sequelize.STRING,
      field: 'provider_user_id'
    },
    accessToken: {
      type: Sequelize.STRING,
      field: 'access_token'
    },
    secret: Sequelize.STRING,
    displayName: {
      type: Sequelize.STRING,
      field: 'display_name'
    },
    profileUrl: {
      type: Sequelize.STRING,
      field: 'profile_url'
    },
    imageUrl: {
      type: Sequelize.STRING,
      field: 'image_url'
    },
    rank: Sequelize.INTEGER
  },
  {
    tableName: 'user_social_connection',
    createdAt: false,
    updatedAt: false
  }
);
