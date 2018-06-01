import opening_hours from 'opening_hours';


export default (value, options) => {
  const { locale, warnings = 4, mode = 2 } = options;
  const ohOptions = {
    mode,
    warnings_severity: warnings,
  };
  if (locale) ohOptions.locale = locale;
  let result;
  try {
    const oh = new opening_hours(value, {}, ohOptions);
    result = oh.prettifyValue({});
  } catch (err) {
    console.log(err);
    result = 0;
  }
  return result;
};
