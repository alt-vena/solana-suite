import {
  Instruction,
  KeypairAccount,
  Pubkey,
  Result,
  Secret,
  Try,
} from '@solana-suite/shared';
import { Pda } from 'internal/shared-metaplex';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createFreezeDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';

export namespace Metaplex {
  /**
   * Freezing a target nft
   * it should set to freezeAuthority when mint()
   * @param {Pubkey} mint             // mint address
   * @param {Pubkey} owner            // current owner
   * @param {Secret} freezeAuthority  // setted freeze authority of nft
   * @param {Secret} feePayer?       // fee payer
   */
  export const freeze = (
    mint: Pubkey,
    owner: Pubkey,
    freezeAuthority: Secret,
    feePayer?: Secret
  ): Result<Instruction, Error> => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const editionAddress = Pda.getMasterEdition(mint);

      const inst = createFreezeDelegatedAccountInstruction({
        delegate: new KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
        tokenAccount: tokenAccount,
        edition: editionAddress,
        mint: mint.toPublicKey(),
      });
      return new Instruction(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
}
