import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'documents',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    type: Sequelize.STRING,
    doc: Sequelize.STRING,
    status: Sequelize.ENUM('0', '1')
  },
  {
    tableName: 'user_documents',
    createdAt: false,
    updatedAt: false
  }
);
