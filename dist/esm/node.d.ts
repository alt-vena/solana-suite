import { Connection } from '@solana/web3.js';
export declare namespace Node {
    const getConnection: () => Connection;
    const getApiUrl: () => "https://api.mainnet-beta.solana.com" | "https://api.testnet.solana.com" | "http://api.devnet.solana.com";
}
