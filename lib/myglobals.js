import _ from 'lodash';
import config from '../configs/config';

global.config = function(get, set) {
  if (set) {
    return _.set(config, get, set);
  }
  return _.get(config, get);
};
