import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'contacts',
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
    contact: Sequelize.STRING,
    type: Sequelize.ENUM,
    badge: Sequelize.STRING,
    primary: Sequelize.INTEGER,
    status: Sequelize.ENUM
  },
  {
    tableName: 'user_contacts',
    createdAt: false,
    updatedAt: false
  }
);
