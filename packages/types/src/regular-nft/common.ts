import { Pubkey, Secret } from '../account';
import BN from 'bn.js';

export type bignum = number | BN;

export type Option<T> = T | null;

export enum UseMethod {
  Burn = 0,
  Multiple = 1,
  Single = 2,
}

export type Uses = {
  useMethod: UseMethod;
  remaining: bignum;
  total: bignum;
};

export type Creators = {
  address: Pubkey;
  share: number;
  verified: boolean;
};

export type InputCreators = {
  address: Pubkey;
  secret: Secret;
  share: number;
};
