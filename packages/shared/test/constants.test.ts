import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Constants } from '../src/constants';
import { sleep } from '../src/global';

describe('Constants', () => {
  it('Fetch nft.storage api key in solana-suite.json', () => {
    const apiKey = Constants.NFT_STORAGE_API_KEY;
    assert.equal(
      apiKey,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE'
    );
  });

  it('Constants use test', () => {
    const cluster = Constants.switchCluster({
      cluster: Constants.Cluster.test,
    });
    assert.equal(cluster, Constants.EndPointUrl.test);
  });

  it('Constants use dev', () => {
    const cluster = Constants.switchCluster({ cluster: Constants.Cluster.dev });
    assert.equal(cluster, Constants.EndPointUrl.dev);
  });

  it('Constants use localhost', () => {
    const cluster = Constants.switchCluster({
      cluster: Constants.Cluster.localhost,
    });
    assert.equal(cluster, Constants.EndPointUrl.localhost);
  });

  it('Constants use prd', () => {
    const cluster = Constants.switchCluster({ cluster: Constants.Cluster.prd });
    assert.equal(cluster, Constants.EndPointUrl.prd);
  });

  it('Constants use customUrl', () => {
    const customClusterUrl = ['https://hoge.hoge'];
    const cluster = Constants.switchCluster({ customClusterUrl });
    console.log('# cluster url: ', cluster);
    assert.equal(cluster, customClusterUrl[0]);
  });

  it('Constants use multiple customUrls', async() => {
    const customClusterUrl = ['https://hoge.hoge', 'https://fuga.fuga'];
    for (let i = 0; i < 10; i++) {
      const cluster = Constants.switchCluster({ customClusterUrl });
      console.log('# cluster url: ', cluster);
      await sleep(1);
      assert.isTrue(customClusterUrl.includes(cluster));
    }
  });
});
