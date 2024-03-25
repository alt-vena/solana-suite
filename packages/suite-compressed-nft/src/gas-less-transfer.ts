import { Result, Try } from '~/suite-utils';
import { Account } from '~/account';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Transaction } from '@solana/web3.js';
import { CompressedNft as Transfer } from './transfer';
import { CompressedNft as Delegate } from './gas-less-delegate';
import {
  GasLessTransferOptions,
  PartialSignStructure,
} from '~/types/transaction-builder';

export namespace CompressedNft {
  /**
   * Transfer with gas-less
   * @param {Pubkey} mint
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {Pubkey} feePayer
   * @param {Partial<GassLessTransferOptions> } options
   * @returns {Promise<Result<PartialSignTransaction[], Error>>}
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Secret,
    dest: Pubkey,
    feePayer: Pubkey,
    options: Partial<GasLessTransferOptions> = {},
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const delegate = await Delegate.gasLessDelegate(mint, owner, feePayer);
      await delegate.submit();
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      tx.add(
        await Transfer.createTransfer(
          mint,
          new Account.Keypair({ secret: owner }).pubkey,
          dest,
          feePayer,
        ),
      );

      if (options.isPriorityFee) {
        tx.instructions.unshift(
          await TransactionBuilder.PriorityFee.createInstruction(
            tx.instructions,
            options.addSolPriorityFee,
          ),
        );
      }

      tx.instructions.unshift(
        await TransactionBuilder.ComputeUnit.createInstruction(
          tx.instructions,
          owner.toKeypair(),
        ),
      );
      tx.recentBlockhash = blockhashObj.blockhash;

      return new TransactionBuilder.PartialSign(
        tx
          .serialize({
            requireAllSignatures: false,
          })
          .toString('hex'),
      );
    });
  };
}
