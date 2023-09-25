import { MetaplexFile, toMetaplexFile } from '@metaplex-foundation/js';

import {
  debugLog,
  isBrowser,
  isNode,
  Result,
  Secret,
  Try,
} from '@solana-suite/shared';
import { FileContent, InfraSideInput } from 'shared-metaplex/';
import { Bundlr } from './bundlr';

export interface MetaplexFileOptions {
  readonly displayName: string;
  readonly uniqueName: string;
  readonly contentType: string | undefined;
  readonly extension: string | undefined;
  readonly tags: { name: string; value: string }[];
}

export namespace Arweave {
  export const uploadContent = async (
    filePath: FileContent,
    feePayer: Secret,
    fileOptions?: MetaplexFileOptions, // only arweave, not nft-storage
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload content: ', filePath);
      let file!: MetaplexFile;
      if (isNode()) {
        const filepath = filePath as string;
        const buffer = (await import('fs')).readFileSync(filepath);
        if (fileOptions) {
          file = toMetaplexFile(buffer, filepath, fileOptions);
        } else {
          file = toMetaplexFile(buffer, filepath);
        }
      } else if (isBrowser()) {
        const filepath = filePath;
        if (fileOptions) {
          file = toMetaplexFile(filepath, '', fileOptions);
        } else {
          file = toMetaplexFile(filepath, '');
        }
      } else {
        throw Error('Supported environment: only Node.js and Browser js');
      }

      return Bundlr.useStorage(feePayer.toKeypair()).upload(file);
    });
  };

  export const uploadMetadata = async (
    metadata: InfraSideInput.Offchain,
    feePayer: Secret,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('# upload meta data: ', metadata);

      const uploaded = await Bundlr.make(feePayer.toKeypair())
        .nfts()
        .uploadMetadata(metadata);

      return uploaded.uri;
    });
  };
}
