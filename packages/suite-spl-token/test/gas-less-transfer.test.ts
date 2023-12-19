import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src/';
import { KeypairAccount, Pubkey } from '~/types/account';
import { Account } from '~/account';

let source: KeypairAccount;
let feePayer: KeypairAccount;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  isMutable: false,
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('transfer feePayerPartialSign', async (t) => {
  const tokenOwner = Account.Keypair.create();
  const receipt = Account.Keypair.create();
  t.log('# owner: ', tokenOwner.pubkey);
  t.log('# receipt: ', receipt.pubkey);

  const inst1 = await SplToken.mint(
    tokenOwner.secret,
    TOKEN_TOTAL_AMOUNT,
    MINT_DECIMAL,
    TOKEN_METADATA,
    {
      feePayer: feePayer.secret,
    },
  );

  t.true(inst1.isOk, `${inst1.unwrap()}`);
  await inst1.submit();
  const token = inst1.unwrap().data as Pubkey;
  t.log('# mint: ', token);

  const serialized = await SplToken.gasLessTransfer(
    token,
    tokenOwner.secret,
    receipt.pubkey,
    100,
    MINT_DECIMAL,
    source.pubkey,
  );

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    const res = await serialized.value.submit(source.secret);
    t.true(res.isOk, `${res.unwrap()}`);
    t.log('# tx signature: ', res.unwrap());
  }
});
