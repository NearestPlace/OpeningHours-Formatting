import OpeningHours from 'opening_hours';
import compact from 'lodash.compact';

const cleanValue = (value = '') => {
  if (typeof value === 'undefined') return [];
  let checkValue = value.toString();
  const remove = /[&#,+()$~%'"*?<>{}»]/g;
  if (Number(checkValue) && Number(checkValue) > 2200) return [];
  if (checkValue.includes('24/7')) return ['24/7'];
  if (checkValue.includes('24hours')) checkValue = checkValue.replace(new RegExp('24hours', 'g'), '24 hours');
  const separators = ['\r\n', '\n', '\r', '<br>', '<br/>', '<br />', '/', '\\|', ';'];
  const tokens = checkValue.split(new RegExp(separators.join('|'), 'g'));
  return compact(tokens.map(t => t.replace(remove, ' ')));
};

const parse = (value = '', options = {}, nominatim = {}) => {
  let result;
  const { verbose } = options;
  try {
    const oh = new OpeningHours(value, nominatim, options);
    result = oh.prettifyValue({});
  } catch (err) {
    if (verbose) console.log({ err });
    result = null;
  }
  return result;
};

/**
 * Nominatim: https://wiki.openstreetmap.org/wiki/Nominatim#Reverse_Geocoding_.2F_Address_lookup
 */
export default (value, options = {}, nominatim = {}) => {
  const result = [];
  const cleanedValues = cleanValue(value);
  cleanedValues.forEach((val) => {
    const parsed = parse(val, options, nominatim);
    if (parsed) result.push(parsed);
  });
  return (!result.length) ? null :
    parse(result.join(';'), options, nominatim);
};
