import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'tutor',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'tutor_id'
    },
    class: {
      type: Sequelize.STRING,
      field: 'cass_id'
    },
    amount: Sequelize.INTEGER,
    session: Sequelize.STRING,
    level: Sequelize.INTEGER,
    expertise: Sequelize.TEXT
  },
  {
    tableName: 'tutor_classes',
    createdAt: 'added_at',
    updatedAt: 'updated_at'
  }
);
