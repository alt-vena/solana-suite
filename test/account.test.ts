import {describe, it} from 'mocha';
import {Account, KeypairStr} from '../src';
import {assert} from 'chai';
import {PublicKey} from '@solana/web3.js';

let source: KeypairStr;

describe('Account', () => {
  before(async () => {
    source = Account.create();
    console.log('# source address: ', source.pubkey.toAddressUrl());
  });

  it('Reuest airdrop', async () => {
    const res = await Account.requestAirdrop(source.toPubkey());
    assert.isTrue(res.isOk);
  });

  it('Get balance at publicKey', async () => {
    const dropSol = 1;
    const res = await Account.getBalance(source.toPubkey());
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), dropSol);
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await Account.getBalance(
      source.toPubkey(),
      'lamports'
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), Account.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubkey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('find metaplex token address', async () => {
    const res = await Account.findMetaplexAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('string to PublicKey', async () => {
    const pubkey = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
    const res = pubkey.toPubkey();
    assert.deepEqual(res, new PublicKey(pubkey));
  });

  it('Account to PublicKey', async () => {
    const account = Account.create();
    const res = account.toPubkey();
    assert.deepEqual(res, new PublicKey(account.pubkey));
  });

  it('Account to Keypair', async () => {
    const account = Account.create();
    const res = account.toKeypair();
    assert.deepEqual(res, account.secret.toKeypair());
  });
})