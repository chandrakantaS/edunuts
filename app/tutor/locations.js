import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'location',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    tutorId: {
      type: Sequelize.INTEGER,
      field: 'tutor_id'
    },
    name:Sequelize.STRING,
    colonyId: {
      type: Sequelize.INTEGER,
      field: 'colony_id'
    },
    areaId: {
      type: Sequelize.INTEGER,
      field: 'area_id',
    },
    regionId: {
      type: Sequelize.STRING,
      field: 'region_id'
    },
    cityId: {
      type: Sequelize.INTEGER,
      field: 'city_id'
    },
    radius: Sequelize.INTEGER,
    latitude: Sequelize.STRING,
    longitude: Sequelize.STRING
  },
  {
    tableName: 'tutor_locations',
    createdAt: 'created_at',
    updatedAt: false
  }
);
