import { Pubkey, Secret } from '~/types/account';
import { Result } from '~/suite-utils';
import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

export type SubmitOptions = {
  feePayer: Secret;
  isPriorityFee: boolean;
  addSolPriorityFee: number;
};

export type BatchSubmitOptions = {
  feePayer: Secret;
  isPriorityFee: boolean;
  addSolPriorityFee: number;
  instructions: CommonStructure[] | MintStructure[];
};

export type CommonStructure<T = undefined> = {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: T;
  submit: (
    options: Partial<SubmitOptions>,
  ) => Promise<Result<TransactionSignature, Error>>;
};

export type MintStructure<T = Pubkey> = {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  data: T;
  feePayer: Keypair;
  submit: (
    options: Partial<SubmitOptions>,
  ) => Promise<Result<TransactionSignature, Error>>;
};

export type PartialSignStructure<T = Pubkey> = {
  hexInstruction: string;
  data?: T;
  submit: (options: Partial<SubmitOptions>) => Promise<Result<string, Error>>;
};
