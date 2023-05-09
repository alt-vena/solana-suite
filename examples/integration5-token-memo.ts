//////////////////////////////////////////////
// $ npx ts-node examples/integration5-token-memo
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop, FilterType, Memo, SplToken } from '@solana-suite/core';

import { KeypairAccount, Node, Pubkey } from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = KeypairAccount.create();
  const receipt = KeypairAccount.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.pubkey);
  } else {
    await requestTransferByKeypair(owner.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# receipt: ', receipt.pubkey);

  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////

  // Basically SPL and Metaplex NFT is same logic
  const totalAmount = 100000;
  const decimals = 1;
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: RandomAsset.get().filePath as string,
    storageType: 'nftStorage',
    isMutable: false,
  };

  const inst1 = await SplToken.mint(
    owner.pubkey,
    owner.secret,
    totalAmount,
    decimals,
    tokenMetadata
  );

  const mint = inst1.unwrap().data as Pubkey;

  // this is NFT ID
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // CREATE MEMO
  //////////////////////////////////////////////

  const memoData = `
  Omicron Is a Dress Rehearsal for the Next Pandemic
  America’s response to the variant highlights both
  how much progress we have made over the past two years — and
  how much work remains
  `;
  const inst2 = Memo.create(
    memoData,
    receipt.pubkey, // memo's owner
    owner.secret // signer or feePayer
  );

  (await [inst1, inst2].submit()).match(
    async (value) => {
      console.log('# nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst3 = await SplToken.transfer(
    mint,
    owner.pubkey,
    receipt.pubkey,
    [owner.secret],
    10,
    decimals
  );

  (await inst3.submit()).match(
    async (value) => {
      console.log('# Transfer sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // GET MEMO DATA
  //////////////////////////////////////////////

  await SplToken.getHistory(
    mint,
    receipt.pubkey,
    FilterType.Transfer,
    (histories) => {
      histories.match(
        (ok) => {
          ok.forEach((history) => {
            console.log(history);
          });
        },
        (err) => assert.fail(err.message)
      );
    }
  );
})();
