import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'grouprels',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    groupId: {
      type: Sequelize.INTEGER,
      field: 'group_id',
      primaryKey: true
    }
  },
  {
    tableName: 'user_group_relations',
    createdAt: false,
    updatedAt: false
  }
);
