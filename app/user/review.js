import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'review',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'review_id',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    ipAdde: {
      type: Sequelize.STRING,
      field: 'ip_addr'
    },
    intId: {
      type: Sequelize.INTEGER,
      field: 'inst_id'
    },
    rating: Sequelize.DECIMAL,
    title: Sequelize.STRING,
    reviewText: {
      type: Sequelize.TEXT,
      field: 'review_text'
    },
    reviewStatus: {
      type: Sequelize.ENUM,
      field: 'review_status'
    },
    details: Sequelize.TEXT,
    type: Sequelize.ENUM
  },
  {
    tableName: 'user_review',
    createdAt: false,
    updatedAt: false
  }
);
