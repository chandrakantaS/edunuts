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
    type: Sequelize.ENUM('mobile', 'email'),
    primary: Sequelize.INTEGER,
    status: Sequelize.ENUM('0', '1')
  },
  {
    tableName: 'user_contacts',
    createdAt: false,
    updatedAt: false,
    scopes: {
      verified: {
        where: {
          status: '1'
        }
      },
      notVerified: {
        where: {
          status: '0'
        }
      },
      email: {
        where: {
          type: 'email'
        }
      }
    }
  }
);
