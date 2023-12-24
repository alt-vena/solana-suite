import {
  createCloseAccountInstruction,
  createMint,
  createTransferInstruction,
  createWrappedNativeAccount,
} from '@solana/spl-token';

import { debugLog, Result, Try } from '~/shared';
import { TransactionBuilder } from '~/transaction-builder';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';
import { TransferOptions } from '~/types/sol-native';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SolNative {
  const RADIX = 10;

  /**
   * Transfer NFT for only multiSig account
   * NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
   *
   * @param {Pubkey} owner              // current multisig owner
   * @param {Pubkey} dest               // new owner
   * @param {Secret[]} multisig         // multisig account Secret
   * @param {number} amount             // want to transfer SOL amount
   * @param {Partial<TransferOptions>} options       // options
   * @return {Result<CommonStructure<unknown>, Error> }
   */
  export const transferWithMultisig = async (
    owner: Pubkey,
    dest: Pubkey,
    multisig: Secret[],
    amount: number,
    options: Partial<TransferOptions> = {},
  ): Promise<Result<CommonStructure, Error>> => {
    return Try(async () => {
      const connection = Node.getConnection();
      const payer = options.feePayer ? options.feePayer : multisig[0];
      const keypairs = multisig.map((s) => s.toKeypair());
      const wrapped = await createWrappedNativeAccount(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        parseInt(`${amount.toLamports()}`, RADIX),
      );

      debugLog('# wrapped sol: ', wrapped.toBase58());

      const instructions = [];

      const token = await createMint(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        owner.toPublicKey(),
        0,
      );

      const sourceToken = await Account.Associated.retryGetOrCreate(
        token.toString(),
        owner,
        payer,
      );

      debugLog('# sourceToken: ', sourceToken);

      const destToken = await Account.Associated.retryGetOrCreate(
        token.toString(),
        wrapped.toString(),
        payer,
      );

      debugLog('# destToken: ', destToken);

      instructions.push(
        createTransferInstruction(
          sourceToken.toPublicKey(),
          destToken.toPublicKey(),
          owner.toPublicKey(),
          parseInt(`${amount}`, RADIX), // No lamports, its sol
          keypairs,
        ),
      );

      instructions.push(
        createCloseAccountInstruction(
          wrapped,
          dest.toPublicKey(),
          owner.toPublicKey(),
          keypairs,
        ),
      );

      return new TransactionBuilder.Common(
        instructions,
        multisig.map((s) => s.toKeypair()),
        payer.toKeypair(),
      );
    });
  };
}
