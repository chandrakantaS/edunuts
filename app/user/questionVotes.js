import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'question',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    questionId: {
      type: Sequelize.INTEGER,
      field: 'question_id',
      primaryKey: true
    },
    vote: Sequelize.INTEGER
  },
  {
    tableName: 'user_question_votes',
    createdAt: false,
    updatedAt: false
  }
);
