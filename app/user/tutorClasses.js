import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

const TutorClasses = sequelize.define(
  'tutorClasses',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    classId: {
      type: Sequelize.INTEGER,
      field: 'class_id'
    },
    addressId: {
      type: Sequelize.INTEGER,
      field: 'address_id'
    },
    amount: Sequelize.INTEGER,
    session: Sequelize.STRING,
    duration: Sequelize.STRING,
    type: Sequelize.STRING,
    scheduledAt: {
      type: Sequelize.DATE,
      field: 'scheduled_at'
    },
    startedAt: {
      type: Sequelize.DATE,
      field: 'started_at'
    },
    cmpletedAt: {
      type: Sequelize.DATE,
      field: 'completed_at'
    },
    status: Sequelize.ENUM('0', '1', '2', '3')
  },
  {
    tableName: 'user_tutor_classes',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);


TutorClasses.status = {
  0: 'Applied',
  1: 'Requested',
  2: 'Accepted',
  3: 'Rejected'
};
export default TutorClasses;
