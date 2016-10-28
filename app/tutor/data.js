import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'tutor',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true
    },
    feeSession: {
      type: Sequelize.INTEGER,
      field: 'fee_session'
    },
    feeHour: {
      type: Sequelize.INTEGER,
      field: 'fee_hour'
    },
    teachingMode: {
      type: Sequelize.STRING,
      field: 'teaching_mode'
    },
    demoClass: {
      type: Sequelize.STRING,
      field: 'demo_class',
    },
    cancellation: Sequelize.STRING,
    feeGuide: {
      type: Sequelize.TEXT,
      field: 'fee_guide'
    }
  },
  {
    tableName: 'tutors_data',
    createdAt: 'added_at',
    updatedAt: 'updated_at'
  }
);
