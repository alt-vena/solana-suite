import { Commitment, PublicKey } from '@solana/web3.js';
import './global';
export declare namespace Constants {
    enum Cluster {
        prd = "mainnet-beta",
        prd2 = "mainnet-beta-sereum",
        prdrr = "mainnet-beta-round-robin",
        dev = "devnet",
        test = "testnet",
        localhost = "localhost-devnet",
        custom = "custom"
    }
    const currentCluster: string;
    const customUrl: string;
    const isDebugging: boolean;
    const nftStorageApiKey: string;
}
export declare namespace ConstantsFunc {
    const switchCluster: (env: string | undefined, customUrl?: string) => string;
    const switchBundlr: (env: string) => string;
}
export declare namespace Constants {
    const WRAPPED_TOKEN_PROGRAM_ID: PublicKey;
    const MEMO_PROGRAM_ID: PublicKey;
    const METAPLEX_PROGRAM_ID: PublicKey;
    const COMMITMENT: Commitment;
    const NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
    const NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
    const BUNDLR_NETWORK_URL: string;
}
