import { Storage } from './';
import { Keypair } from '@solana/web3.js';
import { Result } from '../../';
export declare namespace StorageArweave {
    const upload: (payer: Keypair, storageData: Storage.Format) => Promise<Result<string, Error>>;
}
