import { Pubkey, Result, Try } from '@solana-suite/shared';
import {
  OutputNftMetadata,
  Creators,
  Collections,
} from '@solana-suite/shared-metaplex';
import { Metadata } from '@metaplex-foundation/js';
import { Bundlr } from '@solana-suite/storage';

export namespace Metaplex {
  export const findByOwner = async (
    owner: Pubkey
  ): Promise<Result<OutputNftMetadata[], Error>> => {
    return Try(async () => {
      const allData = await Bundlr.make()
        .nfts()
        .findAllByOwner({ owner: owner.toPublicKey() });

      const res = allData.map((d) => {
        return {
          mint: (d as Metadata).mintAddress.toString(),
          updateAuthority: d.updateAuthorityAddress.toString(),
          royalty: d.sellerFeeBasisPoints,
          name: d.name,
          symbol: d.symbol,
          uri: d.uri,
          isMutable: d.isMutable,
          primarySaleHappened: d.primarySaleHappened,
          creators: Creators.toOutputConvert(d.creators),
          editionNonce: d.editionNonce,
          collection: Collections.toOutputConvert(d.collection),
          uses: d.uses,
        };
      });
      return res;
    });
  };
}
