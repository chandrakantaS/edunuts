import generator from 'sequelize/lib/dialects/abstract/query-generator';
import _ from 'lodash';

generator.whereItemsQuery = function(where, options, binding) {
  if (
    (Array.isArray(where) && where.length === 0) ||
    (_.isPlainObject(where) && _.isEmpty(where)) ||
    where === null ||
    typeof where === 'undefined'
  ) {
    // NO OP
    return '';
  }

  if (_.isString(where)) {
    throw new Error('where: "raw query" has been removed, please use where ["raw query", [replacements]]');
  }

  const self = this,
     items = [];

  binding = binding || 'AND';
  if (binding.substr(0, 1) !== ' ') binding = ' '+binding+' ';

  if (_.isPlainObject(where)) {
    _.forOwn(where, function (value, key) {
      if (value && value.$search !== undefined) {
        items.push(self.whereItemQuery(key, {
          $or: [
            {$like: value.$search + '%'},
            {$like: '% ' + value.$search + '%'},
          ]

        }, options));

      } else {
        items.push(self.whereItemQuery(key, value, options));

      }
    });
  } else {
    items.push(self.whereItemQuery(undefined, where, options));
  }

  return items.length && items.filter(function (item) {
    return item && item.length;
  }).join(binding) || '';
}
