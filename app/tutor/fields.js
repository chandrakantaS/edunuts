import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'tutor',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    parentId: {
      type: Sequelize.INTEGER,
      field: 'parent_id'
    },
    expertise: Sequelize.TEXT
  },
  {
    tableName: 'tutor_fields',
    createdAt: 'added_at',
    updatedAt: 'updated_at'
  }
);
