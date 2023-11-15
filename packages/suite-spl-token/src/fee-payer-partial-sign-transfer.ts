import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Transaction } from '@solana/web3.js';
import { Node } from '~/node';
import { Result, Try } from '~/shared';
import { PartialSignTransaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';
import { SplToken as Calculator } from './calculate-amount';
import { Account } from '~/account';

export namespace SplToken {
  export const feePayerPartialSignTransfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    mintDecimal: number,
    feePayer: Pubkey,
  ): Promise<Result<PartialSignTransaction, Error>> => {
    return Try(async () => {
      const keypairs = signers.map((s) => s.toKeypair());

      const sourceToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        owner,
        feePayer,
      );

      const destToken = await Account.Associated.makeOrCreateInstruction(
        mint,
        dest,
        feePayer,
      );

      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();

      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      // return associated token account
      if (!destToken.inst) {
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs,
        );
        tx.add(inst2);
      } else {
        // return instruction and undecided associated token account
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          Calculator.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs,
        );
        tx.add(destToken.inst).add(inst2);
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      keypairs.forEach((signer) => {
        tx.partialSign(signer);
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignTransaction(hex);
    });
  };
}
