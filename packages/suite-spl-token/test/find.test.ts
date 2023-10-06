import test, { ExecutionContext } from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { SplToken } from '../src/';
import { Sortable } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';
import { UserSideOutput } from '~/types/converter';
import { promisify } from 'node:util';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.source.pubkey;
});

test.only('Not found token', async (t) => {
  const onOk: OnOk<UserSideOutput.TokenMetadata> = (ok) => {
    console.log('ok: ', ok);
    // t.fail('Do not come here');
  };
  // const onErr: OnErr = (err) => t.is(err.message, 'fetch failed');

  const wrap = promisify((err: Error, pubkey: Pubkey, callback: any) => {
    SplToken.findByOwner(pubkey, callback, console.log);
  });
  const res = await wrap(notFoundTokenOwner);
  console.log(res);
  t.true(res);
});

test('Get token info owned', (t) => {
  const onErr: OnErr = (err: Error) => t.fail(err.message);
  SplToken.findByOwner(
    owner,
    (ok: UserSideOutput.TokenMetadata[]) => {
      ok.forEach((res) => {
        t.not(res.name, '');
        t.not(res.mint, '');
        t.not(res.symbol, '');
        t.not(res.uri, '');
        t.is(typeof res.royalty, 'number');
        t.not(res.offchain, '');
        t.not(res.tokenAmount, '');
      });
    },
    onErr,
  );
});

test('Get token info owned with no Hold', (t) => {
  const onOk: OnOk<UserSideOutput.TokenMetadata> = (ok) => {
    ok.forEach((res) => {
      t.not(res.name, '');
      t.not(res.mint, '');
      t.not(res.symbol, '');
      t.not(res.uri, '');
      t.is(typeof res.royalty, 'number');
      t.not(res.offchain, '');
      t.not(res.tokenAmount, '');
    });
  };
  const onErr: OnErr = (err: Error) => t.fail(err.message);

  SplToken.findByOwner(owner, onOk, onErr, { isHolder: false });
});

test('Get token info owned with Asc', (t) => {
  const onOk: OnOk<UserSideOutput.TokenMetadata> = (ok) => {
    ok.forEach((res) => {
      t.not(res.name, '');
      t.not(res.mint, '');
      t.not(res.symbol, '');
      t.not(res.uri, '');
      t.is(typeof res.royalty, 'number');
      t.not(res.offchain, '');
      t.not(res.tokenAmount, '');
    });
  };
  const onErr: OnErr = (err: Error) => t.fail(err.message);

  SplToken.findByOwner(owner, onOk, onErr, { sortable: Sortable.Asc });
  t.pass();
});

test('Get token info by mint address', async (t) => {
  (await SplToken.findByMint(mint)).match(
    (ok: UserSideOutput.TokenMetadata) => {
      t.not(ok.name, '');
      t.not(ok.mint, '');
      t.not(ok.symbol, '');
      t.not(ok.uri, '');
      t.not(ok.royalty, '');
      t.not(ok.tokenAmount, '');
      t.not(ok.offchain, '');
    },
    (err: Error) => t.fail(err.message),
  );
});

test('[Error]Get token info by mint address, but token standard is difierent', async (t) => {
  (await SplToken.findByMint(nftMint)).match(
    () => t.fail('Do not come here.'),
    (err: Error) => t.not(err.message, ''),
  );
});
