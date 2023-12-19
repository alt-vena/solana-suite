//////////////////////////////////////////////
// $ npx ts-node examples/integration10-sbt-mint.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import { Account, RegularNft } from '@solana-suite/regular-nft';
import { RandomAsset } from 'test-tools/setupAsset';
import { requestSol } from 'test-tools';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet.
  const owner = Account.Keypair.create();
  const freeze = Account.Keypair.create();
  const feePayer = Account.Keypair.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestSol(feePayer.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# freeze: ', freeze.pubkey);
  console.log('# feePayer: ', feePayer.pubkey);

  // Only test that call this function
  // Usually set custom param
  const asset = RandomAsset.get();
  console.log('# demo data: ', asset);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE
  //////////////////////////////////////////////

  const inst1 = await RegularNft.mint(
    owner.secret,
    {
      filePath: asset.filePath!,
      name: 'First Soul Bound Token',
      symbol: 'SBT',
      royalty: 0,
      storageType: 'nftStorage',
    },
    {
      feePayer: feePayer.secret,
      freezeAuthority: freeze.pubkey, // Pubkey !!
    },
  );

  // this is NFT ID
  const mint = inst1.unwrap().data;
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // CHANGE STATE TO SBT
  //////////////////////////////////////////////
  const inst2 = RegularNft.freeze(mint, owner.pubkey, freeze.secret, {
    feePayer: feePayer.secret,
  });

  (await [inst1, inst2].submit()).match(
    (value) => console.log(value.toExplorerUrl()),
    (error) => assert.fail(error),
  );
})();
