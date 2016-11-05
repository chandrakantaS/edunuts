import Logger from './logger';

const log = new Logger(__filename);
function buildRegEx(query) {
  let string = '';
  Object.values(query).forEach(q => {
    if (q.length === 0) return;
    string += '(^|\\s)' + q + '|';
  });
  string = string.slice(0, string.length - 1);
  const regEx = new RegExp(string, 'i');
  log.info(regEx);
  return regEx;
}

export default function (data, query) {
  // console.log(Object.values(query));
  const regEx = buildRegEx(query);
  return data.filter(d => {
    return (
      regEx.test(d.dataValues.name) ||
      regEx.test(d.dataValues.username) ||
      regEx.test(d.dataValues.type) ||
      regEx.test(d.dataValues.email)
    );
  });
}
