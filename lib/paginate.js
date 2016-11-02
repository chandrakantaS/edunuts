import Model from 'sequelize/lib/model';
import _ from 'lodash';
import Utils from 'sequelize/lib/utils';

function params(o) {
	let a = '';
	_.each(o, function(d, i) {
		a += `${i}=${d}&`;
	});
	return a.slice(0, a.length-1);
}

Model.prototype.paginate = function(options, req, paginate) {
  // console.log(process.env)
  const page = parseInt(req.query.page) || 1;
  // console.log(req, req.port)
  paginate = parseInt(paginate || process.env.PAGINATION_ROWS);
  if (options !== undefined && !_.isPlainObject(options)) {
    throw new Error('The argument passed to findAndCount must be an options object');
  }

  const self = this,
    countOptions = Utils.cloneDeep(options);
  if (countOptions.attributes) {
      countOptions.attributes = undefined;
  }
  return self.count(countOptions).then(function(count) {
    if (count === 0) {
      return {
        count: count || 0,
        rows: []
      };
    }

    const limit = paginate,
    offset = parseInt((page - 1)) * limit;
    // console.log(limit, offset)
    options.limit = limit;
    options.offset = offset;
    const lastPage = parseInt(count / limit) + 1;
    // console.log(options);
    return self.findAll(options).then(function(results) {
      const q = _.clone(req.query);
      q.page = page + 1;
      const nextPageUrl = `${req.baseUrl}${req.path}?${params(q)}`;
      q.page = page - 1;
      const prevPageUrl = `${req.baseUrl}${req.path}?${params(q)}`;

      return {
        total: count,
        per_page: limit,
        current_page: page,
        last_page: lastPage,
        next_page_url: lastPage === page ? null : nextPageUrl,
        prev_page_url: page === 1 ? null : prevPageUrl,
        from: offset+1,
        to: offset + limit,
        data: results
      };
    });
  });
}
