import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'skills',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    authorId: {
      type: Sequelize.INTEGER,
      field: 'skill_id',
      primaryKey: true
    },
    type: Sequelize.STRING,
    status: Sequelize.ENUM
  },
  {
    tableName: 'user_skills',
    createdAt: 'created_at',
    updatedAt: false
  }
);
