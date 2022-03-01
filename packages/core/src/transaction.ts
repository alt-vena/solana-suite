import {
  PublicKey,
  ParsedTransactionWithMeta,
  Commitment,
  RpcResponseAndContext,
  SignatureResult,
  ConfirmedSignatureInfo,
  ParsedInstruction,
  TokenBalance,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Constants
} from '@solana-suite/shared';

import {ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID} from '@solana/spl-token';

export namespace Transaction {

  // type guard
  const isParsedInstructon = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  }

  const filterTransactions = (
    transactions: ParsedTransactionWithMeta[],
    filterOptions: Filter[],
    inOutFilter?: TransferFilter,
  ) => {
    const hist: TransferHistory[] = [];

    transactions.forEach(tx => {
      tx.transaction.message.instructions.forEach(t => {
        if (isParsedInstructon(t)) {
          // ParsedInstruction
          if (filterOptions.includes(t.parsed.type)) {
            const v: TransferHistory = t.parsed;
            v.date = convertTimestmapToDate(tx.blockTime as number);
            v.sig = tx.transaction.signatures[0];
            if (tx.meta?.innerInstructions && tx.meta?.innerInstructions.length !== 0) {
              // inner instructions
              v.innerInstruction = true;
            } else {
              v.innerInstruction = false;
            } if (inOutFilter) {
              if (v.info[inOutFilter.filter] === inOutFilter.pubkey.toString()) {
                hist.push(v);
              }
            } else {
              hist.push(v);
            }
          } else {
            //spl-memo
            if (filterOptions.includes(t.program as Filter)) {
              const v: TransferHistory = {info: {}, type: '', sig: '', date: new Date(), innerInstruction: false};
              v.memo = t.parsed;
              v.type = t.program;
              v.date = convertTimestmapToDate(tx.blockTime as number);
              v.sig = tx.transaction.signatures[0];
              if (tx.meta?.innerInstructions && tx.meta?.innerInstructions.length !== 0) {
                // inner instructions
                v.innerInstruction = true;
              } else {
                v.innerInstruction = false;
              }
              if (inOutFilter) {
                if (v.info[inOutFilter.filter] === inOutFilter.pubkey.toString()) {
                  hist.push(v);
                }
              } else {
                hist.push(v);
              }
            }
          }
        }
      });
    });
    return hist;
  }

  const convertTimestmapToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await getTransactionHistory(
        pubkey,
        [
          Filter.Transfer,
          Filter.TransferChecked
        ]
      );
      if (res.isErr) {
        return res;
      }
      callback((res.value as TransferHistory[])[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number)
    : Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);

  export interface TransferHistory {
    info: {
      destination?: string,
      source?: string,
      authority?: string,
      multisigAuthority?: string,
      signers?: string[],
      amount?: string,
      mint?: string,
      tokenAmount?: any[],
    },
    type: string,
    date: Date,
    innerInstruction: boolean,
    sig: string,
    memo?: string,
  }

  export interface TransferDestinationList {
    dest: PublicKey,
    date: Date,
  }

  export enum Filter {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
    Memo = 'spl-memo',
    MintTo = 'mintTo',
    Create = 'create',
  }

  export enum DirectionType {
    Dest = 'destination',
    Source = 'source',
  }

  export interface TransferFilter {
    filter: DirectionType,
    pubkey: PublicKey,
  }

  export const get = async (signature: string):
    Promise<Result<ParsedTransactionWithMeta, Error>> => {
    const res = await Node.getConnection().getParsedTransaction(signature)
      .then(Result.ok)
      .catch(Result.err);
    if (res.isErr) {
      return Result.err(res.error);
    } else {
      if (!res.value) {
        return Result.ok({} as ParsedTransactionWithMeta);
      }
      return Result.ok(res.value);
    }
  }

  export const getAll = async (
    pubkey: PublicKey,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined,
  ): Promise<Result<ParsedTransactionWithMeta[], Error>> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey,
      {
        limit,
        before,
        until,
      },
    )
      .then(Result.ok)
      .catch(Result.err);

    if (transactions.isErr) {
      return Result.err(transactions.error);
    } else {
      const parsedSig: ParsedTransactionWithMeta[] = [];
      for (const tx of transactions.value as ConfirmedSignatureInfo[]) {
        const res = await get(tx!.signature);
        if (res.isErr) {
          return Result.err(res.error);
        }
        res !== null && parsedSig.push(res.value as ParsedTransactionWithMeta);
      }
      return Result.ok(parsedSig);
    }
  }

  export const getTransactionHistory = async (
    pubkey: PublicKey,
    filterOptions?: Filter[],
    limit?: number,
    transferFilter?: TransferFilter
  ): Promise<Result<TransferHistory[], Error>> => {

    const filter = filterOptions !== undefined && filterOptions.length > 0
      ? filterOptions
      : [
        Filter.Transfer,
        Filter.TransferChecked,
      ];

    let bufferedLimit = 0;
    if (limit && limit < 980) {
      bufferedLimit = limit + 20;
    } else {
      bufferedLimit = 1000;
      limit = 1000;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Transaction.getAll(pubkey, bufferedLimit, before);

      console.debug('# getTransactionHistory loop');

      if (transactions.isErr) {
        return transactions as Result<[], Error>;
      }
      const tx = transactions.unwrap() as ParsedTransactionWithMeta[];
      const res = filterTransactions(tx, filter, transferFilter);
      console.error('res', res);
      hist = hist.concat(res);
      if (hist.length >= limit || res.length === 0) {
        hist = hist.slice(0, limit);
        break;
      }
      before = hist[hist.length - 1].sig;
    }
    return Result.ok(hist);
  }

  export const getTokenTransactionHistory = async (
    tokenKey: PublicKey,
    pubkey: PublicKey,
    filterOptions?: Filter[],
    limit?: number,
    transferFilter?: TransferFilter
  ): Promise<Result<TransferHistory[], Error>> => {

    const tokenPubkey = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      tokenKey,
      pubkey
    ).then(Result.ok)
      .catch(Result.err);

    if (tokenPubkey.isErr) {
      return Result.err(tokenPubkey.error);
    }
    const filter = filterOptions !== undefined && filterOptions.length > 0
      ? filterOptions
      : [
        Filter.Transfer,
        Filter.TransferChecked,
      ];

    return getTransactionHistory(tokenPubkey.value, filter, limit, transferFilter);
  }

  export const confirmedSig = async (
    signature: string,
    commitment: Commitment = Constants.COMMITMENT
  ): Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>> => {
    return await Node.getConnection().confirmTransaction(signature, commitment)
      .then(Result.ok)
      .catch(Result.err);
  }
}
