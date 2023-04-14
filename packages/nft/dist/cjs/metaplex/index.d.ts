/// <reference types="@solana/web3.js" />
export declare const Metaplex: {
    transfer: (mint: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").Instruction, Error>>;
    feePayerPartialSignTransferNft: (mint: import("@solana-suite/shared").Pubkey, owner: import("@solana-suite/shared").Pubkey, dest: import("@solana-suite/shared").Pubkey, signers: import("@solana-suite/shared").Secret[], feePayer: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignInstruction, Error>>;
    feePayerPartialSignMint: (owner: import("@solana-suite/shared").Pubkey, signer: import("@solana-suite/shared").Secret, input: import("@solana-suite/shared-metaplex").InputNftMetadata, feePayer: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").PartialSignMintInstruction, Error>>;
    findByOwner: (owner: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared-metaplex").OutputNftMetadata[], Error>>;
    findByOwner2: (owner: import("@solana-suite/shared").Pubkey) => Promise<import("@solana-suite/shared").Result<void, Error>>;
    createMintInstructions: (mint: import("@solana/web3.js").PublicKey, owner: import("@solana/web3.js").PublicKey, nftMetadata: import("@metaplex-foundation/mpl-token-metadata").DataV2, feePayer: import("@solana/web3.js").PublicKey, isMutable: boolean) => Promise<import("@solana/web3.js").TransactionInstruction[]>;
    mint: (owner: import("@solana-suite/shared").Pubkey, signer: import("@solana-suite/shared").Secret, input: import("@solana-suite/shared-metaplex").InputNftMetadata, feePayer?: import("@solana-suite/shared").Secret | undefined) => Promise<import("@solana-suite/shared").Result<import("@solana-suite/shared").MintInstruction, Error>>;
};
