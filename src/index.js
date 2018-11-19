import OpeningHours from 'opening_hours';
import compact from 'lodash.compact';

const cleanValue = (value = '') => {
  let checkValue = value;
  const remove = /[&#,+()$~%'"*?<>{}»]/g;
  if (value.includes('24/7')) return ['24/7'];
  if (checkValue.includes('24hours')) checkValue = checkValue.replace('24hours', '24 hours');
  const separators = ['\r\n', '\n', '\r', '<br>', '<br/>', '<br />', '/', '\\|'];
  const tokens = checkValue.split(new RegExp(separators.join('|'), 'g'));
  return compact(tokens.map(t => t.replace(remove, ' ')));
};

const parse = (value = '', options = {}, nominatim = {}) => {
  let result;
  try {
    const oh = new OpeningHours(value, nominatim, options);
    result = oh.prettifyValue({});
  } catch (err) {
    console.log(err);
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

  console.log({ cleanedValues });

  cleanedValues.forEach((val) => {
    const parsed = parse(val, options, nominatim);
    if (parsed) result.push(parsed);
  });
  return (!result.length) ? null :
    parse(result.join(';'), options, nominatim);
};
