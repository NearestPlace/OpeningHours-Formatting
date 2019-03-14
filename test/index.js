import chai from 'chai';
import formatOh from '../src/index';

import data from './data';

const expect = chai.expect;

describe('Check if locations are identical', () => {
  it('Check identical', (done) => {
    data.forEach((value) => {
      // console.log(value);
      const val = formatOh(value, { locale: 'de', warnings: 0 }, { address: { country_code: 'de' } });
      console.log(value);
      console.log('Result', val);
      console.log();
    });

    done();
  });

  it('Check wrong input', (done) => {
    // console.log(value);
    const val = formatOh('wfefqwefqwefqwe', { locale: 'de', warnings: 0, verbose: false }, { address: { country_code: 'de' } });
    expect(val).to.be.null; // eslint-disable-line
    done();
  });

});
