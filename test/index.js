import chai from 'chai';
import formatOh from '../src/index';

import data from './data';

const expect = chai.expect;

describe('Check if locations are identical', () => {
  it('Check identical', (done) => {
    data.forEach((value) => {
      // console.log(value);
      const val = formatOh(value, { locale: 'de', warnings: 7 });
      console.log(value);
      console.log('Result', val);
      console.log();
    });

    done();
  });
});
