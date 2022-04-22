import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Constants, ConstantsFunc} from '../src/';

describe('Constants', () => {
  it('Fetch nft.storage api key in solana-suite.json', () => {
    const apikey = Constants.NFT_STORAGE_API_KEY;
    assert.equal(apikey, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE');
  });

  it('ConstantsFunc use round robin function in mainnet-beta', () => {
    for (let i = 0; i < 30; i++) {
      const cluster = ConstantsFunc.switchApi(Constants.Cluster.prdrr);
      console.log('# cluster url: ', cluster);
      assert.isNotEmpty(cluster);
    }
  });
})
