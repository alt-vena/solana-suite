import test from 'ava';
import { CompressedNft } from '~/suite-compressed-nft';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';
import { InputCreators } from '~/types/regular-nft';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Transaction } from '@solana/web3.js';
import { TransactionBuilder } from '../src';

let source: KeypairAccount;
let feePayer: KeypairAccount;
let treeOwner: Pubkey;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
  treeOwner = obj.treeOwner;
  collectionMint = obj.collectionMint;
});

test('[Over size]Calculate transaction size', async (t) => {
  const asset = RandomAsset.get();
  const creators: InputCreators[] = [];
  const unverifyCreator = Account.Keypair.create();
  const receiver = Account.Keypair.create();

  creators.push({
    address: 'H7WEabRV8vvCJxK8forAUfeXunoYpWFbhewGj9eC4Pj8',
    secret:
      '4DRpsEkwfAMc7268urkNu2AFC4tweXTLJArwXG9LGvjqcFUoy9mqmBZHLhf2yHEbj3AgrjVppEBQ5hfBTnDzLVSA',
    share: 70,
  });

  creators.push({
    address: unverifyCreator.pubkey,
    secret: '',
    share: 30,
  });

  const properties = {
    files: [
      {
        filePath: asset.filePath,
        fileName: 'properties image',
        fileType: 'image/jpg',
      },
    ],
  };

  const collection = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';

  const attributes = [
    {
      trait_type: 'hair',
      value: 'brown',
    },
    {
      trait_type: 'eye',
      value: 'blue',
    },
  ];

  const options = {
    github_url: 'https://github.com/atonoy/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const inst = await CompressedNft.mint(
    source.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      external_url: 'https://atonoy.github.io/solana-suite/',
      royalty: 50,
      isMutable: false,
      creators,
      properties,
      collection,
      attributes,
      options,
    },
    treeOwner,
    collectionMint,
    {
      feePayer: feePayer.secret,
      receiver: receiver.pubkey,
    },
  );
  const transaction = new Transaction();
  inst.unwrap().instructions.forEach((inst) => transaction.add(inst));
  const size = TransactionBuilder.calculateTxSize(
    transaction,
    feePayer.pubkey.toPublicKey(),
  );
  t.log('# transaction size: ', size);
  t.true(size > 0);
  const bool = TransactionBuilder.isOverTransactionSize(
    transaction,
    feePayer.pubkey.toPublicKey(),
  );
  t.true(bool);
});

test('[Under size]Calculate transaction size', async (t) => {
  const asset = RandomAsset.get();
  const creators: InputCreators[] = [];
  const unverifyCreator = Account.Keypair.create();
  const receiver = Account.Keypair.create();

  creators.push({
    address: 'H7WEabRV8vvCJxK8forAUfeXunoYpWFbhewGj9eC4Pj8',
    secret:
      '4DRpsEkwfAMc7268urkNu2AFC4tweXTLJArwXG9LGvjqcFUoy9mqmBZHLhf2yHEbj3AgrjVppEBQ5hfBTnDzLVSA',
    share: 70,
  });

  creators.push({
    address: unverifyCreator.pubkey,
    secret: '',
    share: 30,
  });

  const properties = {
    files: [
      {
        filePath: asset.filePath,
        fileName: 'properties image',
        fileType: 'image/jpg',
      },
    ],
  };

  const collection = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';

  const attributes = [
    {
      trait_type: 'hair',
      value: 'brown',
    },
    {
      trait_type: 'eye',
      value: 'blue',
    },
  ];

  const options = {
    github_url: 'https://github.com/atonoy/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const inst = await CompressedNft.mint(
    source.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      external_url: 'https://atonoy.github.io/solana-suite/',
      royalty: 50,
      isMutable: false,
      // creators,
      properties,
      collection,
      attributes,
      options,
    },
    treeOwner,
    collectionMint,
    {
      feePayer: feePayer.secret,
      receiver: receiver.pubkey,
    },
  );
  const transaction = new Transaction();
  inst.unwrap().instructions.forEach((inst) => transaction.add(inst));
  const size = TransactionBuilder.calculateTxSize(
    transaction,
    feePayer.pubkey.toPublicKey(),
  );
  t.log('# transaction size: ', size);
  t.true(size > 0);
  const bool = TransactionBuilder.isOverTransactionSize(
    transaction,
    feePayer.pubkey.toPublicKey(),
  );
  t.false(bool);
});
