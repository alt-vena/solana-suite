import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace AssociatedAccount {
    const get: (mint: PublicKey, owner: PublicKey, feePayer: Keypair, allowOwnerOffCurve?: boolean) => Promise<Result<string | Instruction, Error>>;
    const retryGetOrCreate: (mint: PublicKey, owner: PublicKey, feePayer: Keypair) => Promise<Result<string, Error>>;
}
