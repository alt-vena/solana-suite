import { PublicKey, Signer, ParsedInstruction } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Internals {
    const retryGetOrCreateAssociatedAccountInfo: (mint: PublicKey, owner: PublicKey, feePayer: Signer) => Promise<Result<string, Error>>;
    const isParsedInstruction: (arg: any) => arg is ParsedInstruction;
}
