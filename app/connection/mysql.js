import Sequelize from 'sequelize';
import '../../lib/paginate';
import '../../lib/sequelizeSearch';
import Logger from '../../lib/logger';

const log = new Logger(__filename);

console.log(process.env.MYSQL_DB);

// const log = console.log.bind(console);
const sequelize = new Sequelize(
  process.env.MYSQL_DB || 'edunuts1',
  process.env.MYSQL_USER || 'edunuts',
  process.env.MYSQL_PASS || '1234',
  {
    host: process.env.MYSQL_HOST || '192.168.1.31',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);
sequelize.authenticate().then(() => {
  log.info('Connected to sql');
}).catch((err) => {
  log.error('Unable to connect', err);
});

export default sequelize;
