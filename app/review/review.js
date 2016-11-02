import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

const Review = sequelize.define(
  'review',
  {
    reviewId: {
      type: Sequelize.INTEGER,
      field: 'review_id',
      primaryKey: true,
      autoIncrement: true
    },
    ipAddr: {
      type: Sequelize.STRING,
      field: 'ip_addr'
    },
    rating: Sequelize.DECIMAL,
    title: Sequelize.STRING,
    reviewText: {
      type: Sequelize.TEXT,
      field: 'review_text'
    },
    reviewStatus: {
      type: Sequelize.ENUM('0', '1', 't'),
      field: 'review_status'
    },
    details: Sequelize.TEXT,
    type: Sequelize.ENUM('course', 'institute', 'tutor', 'partner')
  },
  {
    tableName: 'user_review',
    createdAt: 'added_at',
    updatedAt: 'updated_at'
  }
);

export default Review;
