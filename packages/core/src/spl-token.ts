import {
  createMint,
  createBurnCheckedInstruction,
  createMintToCheckedInstruction,
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

import { PublicKey, Signer, Transaction } from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
  PartialSignInstruction,
  debugLog,
} from '@solana-suite/shared';

import { Account as Acc, Account } from './';

import { TransferHistory, Filter, DirectionFilter } from './types/find';
import { Internals_find } from './internals/_find';
import { Internals_SplToken } from './internals/_spl-token';

export namespace SplToken {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const calculateAmount = (
    amount: number,
    mintDecimal: number
  ): number => {
    return amount * 10 ** mintDecimal;
  };

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    !feePayer && (feePayer = signers[0]);

    const connection = Node.getConnection();
    const tokenRes = await createMint(
      connection,
      feePayer,
      owner,
      owner,
      mintDecimal
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated = await Internals_SplToken.retryGetOrCreateAssociatedAccountInfo(
      token,
      owner,
      feePayer
    );

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = createMintToCheckedInstruction(
      token,
      tokenAssociated.value.toPublicKey(),
      owner,
      calculateAmount(totalAmount, mintDecimal),
      mintDecimal,
      signers
    );

    return Result.ok(
      new Instruction([inst], signers, feePayer, token.toBase58())
    );
  };

  export const burn = async (
    mint: PublicKey,
    owner: PublicKey,
    signers: Signer[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Signer
  ) => {
    const tokenAccount = await Acc.findAssociatedTokenAddress(mint, owner);

    if (tokenAccount.isErr) {
      return Result.err(tokenAccount.error);
    }

    const inst = createBurnCheckedInstruction(
      tokenAccount.unwrap(),
      mint,
      owner,
      calculateAmount(burnAmount, tokenDecimals),
      tokenDecimals,
      signers
    );

    return Result.ok(new Instruction([inst], signers, feePayer));
  };

  export const transfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    !feePayer && (feePayer = signers[0]);

    const sourceToken = await Internals_SplToken.retryGetOrCreateAssociatedAccountInfo(
      mint,
      owner,
      feePayer
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await Internals_SplToken.retryGetOrCreateAssociatedAccountInfo(
      mint,
      dest,
      feePayer
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = createTransferCheckedInstruction(
      sourceToken.value.toPublicKey(),
      mint,
      destToken.value.toPublicKey(),
      owner,
      calculateAmount(amount, mintDecimal),
      mintDecimal,
      signers
    );

    return Result.ok(new Instruction([inst], signers, feePayer));
  };

  export const transferNft = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };

  export const feePayerPartialSignTransfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    const sourceToken =
      await Account.getOrCreateAssociatedTokenAccountInstruction(
        mint,
        owner,
        feePayer
      );

    const destToken =
      await Account.getOrCreateAssociatedTokenAccountInstruction(
        mint,
        dest,
        feePayer
      );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    let inst2;
    const blockhashObj = await Node.getConnection().getLatestBlockhash();

    const tx = new Transaction({
      lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
      blockhash: blockhashObj.blockhash,
      feePayer,
    });

    // return associated token account
    if (!destToken.value.inst) {
      inst2 = createTransferCheckedInstruction(
        sourceToken.unwrap().tokenAccount.toPublicKey(),
        mint,
        destToken.value.tokenAccount.toPublicKey(),
        owner,
        calculateAmount(amount, mintDecimal),
        mintDecimal,
        signers
      );
      tx.add(inst2);
    } else {
      // return instruction and undecided associated token account
      inst2 = createTransferCheckedInstruction(
        sourceToken.unwrap().tokenAccount.toPublicKey(),
        mint,
        destToken.value.tokenAccount.toPublicKey(),
        owner,
        calculateAmount(amount, mintDecimal),
        mintDecimal,
        signers
      );
      tx.add(destToken.value.inst).add(inst2);
    }

    tx.recentBlockhash = blockhashObj.blockhash;
    signers.forEach((signer) => {
      tx.partialSign(signer);
    });

    try {
      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return Result.ok(new PartialSignInstruction(hex));
    } catch (ex) {
      return Result.err(ex as Error);
    }
  };

  export const feePayerPartialSignTransferNft = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };

  export const findByOwner = async (
    mint: PublicKey,
    searchPubkey: PublicKey,
    options?: {
      limit?: number;
      actionFilter?: Filter[];
      directionFilter?: DirectionFilter;
    }
  ): Promise<Result<TransferHistory[], Error>> => {
    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        directionFilter: undefined,
      };
    }

    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [Filter.Transfer, Filter.TransferChecked];

    const searchKeyAccount = await getAssociatedTokenAddress(
      mint,
      searchPubkey,
      true
    )
      .then(Result.ok)
      .catch(Result.err);

    if (searchKeyAccount.isErr) {
      return Result.err(searchKeyAccount.error);
    }

    let bufferedLimit = 0;
    if (options.limit && options.limit < 50) {
      bufferedLimit = options.limit * 1.5; // To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Internals_find.getForAddress(
        searchKeyAccount.value,
        bufferedLimit,
        before
      );
      debugLog('# getTransactionHistory loop');
      const res = Internals_find.filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        true,
        options.directionFilter
      );
      hist = hist.concat(res);
      if (hist.length >= options.limit || res.length === 0) {
        hist = hist.slice(0, options.limit);
        break;
      }
      before = hist[hist.length - 1].sig;
    }
    return Result.ok(hist);
  };
}
