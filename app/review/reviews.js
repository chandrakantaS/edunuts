import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'reviews',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.STRING,
      field: 'user_id'
    },
    rating: Sequelize.DECIMAL,
    review: Sequelize.STRING,
    entityId: {
      type: Sequelize.INTEGER,
      field: 'entity_id'
    },
    status: Sequelize.STRING,
    data: Sequelize.TEXT,
    type: Sequelize.ENUM('course', 'institute', 'tutor')
  },
  {
    tableName: 'reviews',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);
