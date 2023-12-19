import { Result } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { SplToken } from '~/suite-spl-token';
import { CommonStructure } from '~/types/transaction-builder';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signer: Secret,
    options: Partial<AuthorityOptions> = {},
  ): Result<CommonStructure, Error> => {
    const feePayer = options.feePayer ? options.feePayer : signer;
    return SplToken.burn(mint, owner, [signer], NFT_AMOUNT, NFT_DECIMALS, {
      feePayer,
    });
  };
}
