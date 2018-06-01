import opening_hours from 'opening_hours';
import compact from 'lodash.compact';

const cleanValue = (value = '') => {
  const remove = /[&#,+()$~%'"*?<>{}»]/g;
  const separators = ['\r\n', '\n', '\r', '<br>', '<br/>', '<br />', '/', '\\|'];
  const tokens = value.split(new RegExp(separators.join('|'), 'g'));
  return compact(tokens.map(t => t.replace(remove, ' ')));
};

const parse = (value = '', options) => {
  let result;
  try {
    const oh = new opening_hours(value, {}, options);
    result = oh.prettifyValue({});
  } catch (err) {
    console.log(err);
    result = null;
  }
  return result;
};

export default (value, options) => {
  const result = [];
  const cleanedValues = cleanValue(value);
  cleanedValues.forEach((val) => {
    const parsed = parse(val, options);
    if (parsed) result.push(parsed);
  });
  return (!result.length) ? null :
    parse(result.join(';'), options);
};
