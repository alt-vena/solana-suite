import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Transaction } from '@solana/web3.js';
import { Node } from '~/node';
import { Result, Try } from '~/suite-utils';
import { TransactionBuilder } from '~/transaction-builder';
import { Pubkey, Secret } from '~/types/account';
import { SplToken as Calculator } from './calculate-amount';
import { Account } from '~/account';
import { PartialSignStructure } from '~/types/transaction-builder';
import { GasLessTransferOptions } from '~/types/spl-token';

export namespace SplToken {
  /**
   * Transfer without solana sol, delegate feepayer for commission
   *
   * @param {Pubkey} mint
   * @param {Secret} owner
   * @param {Pubkey} dest
   * @param {number} amount
   * @param {number} mintDecimal
   * @param {Pubkey} feePayer
   * @param {Partial<GasLessTransferOptions>} options
   * @return Promise<Result<PartialSignStructure, Error>>
   */
  export const gasLessTransfer = async (
    mint: Pubkey,
    owner: Secret,
    dest: Pubkey,
    amount: number,
    mintDecimal: number,
    feePayer: Pubkey,
    options: Partial<GasLessTransferOptions> = {},
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const ownerPublicKey = owner.toKeypair().publicKey;
      const sourceToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        ownerPublicKey.toString(),
        feePayer,
      );

      const destToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        dest,
        feePayer,
      );

      const blockhashObj = await Node.getConnection().getLatestBlockhash();

      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      const inst2 = createTransferCheckedInstruction(
        sourceToken.tokenAccount.toPublicKey(),
        mint.toPublicKey(),
        destToken.tokenAccount.toPublicKey(),
        ownerPublicKey,
        Calculator.calculateAmount(amount, mintDecimal),
        mintDecimal,
        [owner.toKeypair()],
      );

      // return associated token account
      if (!destToken.inst) {
        tx.add(inst2);
      } else {
        // return instruction and undecided associated token account
        tx.add(destToken.inst).add(inst2);
      }

      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder.PriorityFee.createPriorityFeeInstruction(tx),
        );
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      tx.partialSign(owner.toKeypair());

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new TransactionBuilder.PartialSign(hex);
    });
  };
}
