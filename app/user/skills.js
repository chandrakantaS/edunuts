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
    skillId: {
      type: Sequelize.INTEGER,
      field: 'skill_id',
      primaryKey: true
    }
  },
  {
    tableName: 'user_skills',
    createdAt: false,
    updatedAt: false
  }
);
