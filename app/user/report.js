import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'report',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    instId: {
      type: Sequelize.INTEGER,
      field: 'inst_id'
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    ipAddr: {
      type: Sequelize.STRING,
      field: 'ip_addr'
    },
    fullName: {
      type: Sequelize.STRING,
      field: 'full_name'
    },
    email: Sequelize.STRING,
    msg: Sequelize.TEXT,
    reportStatus: {
      type: Sequelize.ENUM,
      field: 'report_status'
    }
  },
  {
    tableName: 'institute_reports',
    createdAt: 'added_at',
    updatedAt: false
  }
);
