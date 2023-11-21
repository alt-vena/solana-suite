import { Converter } from '~/converter';
import { DasApi } from '~/das-api';
import { Result, Try } from '~/shared';
import { Offchain } from '~/types/storage';
import {
  CompressedNftMetadata,
  NftMetadata,
  SortBy,
} from '~/types/compressed-nft';

export namespace CompressedNft {
  //@internal
  export const defaultSortBy: SortBy = {
    sortBy: 'recent_action',
    sortDirection: 'desc',
  };

  //@internal
  export const fetchOffchain = async (uri: string) => {
    const json = await (await fetch(uri)).json();
    return json;
  };

  /**
   * Find nft by owner address
   *
   * @param {Pubkey} owner
   * @param {number} limit
   * @param {number} page
   * @param {SortBy} sortBy?
   * @param {string} before?
   * @param {string} after?
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
    limit: number = 1000,
    page: number = 1,
    sortBy: SortBy = defaultSortBy,
    before?: string,
    after?: string,
  ): Promise<Result<CompressedNftMetadata, Error>> => {
    return Try(async () => {
      const assets = await DasApi.getAssetsByOwner(
        owner,
        limit,
        page,
        sortBy,
        before,
        after,
      );
      if (assets.isErr) {
        throw assets.error;
      }

      const items = assets.value.items;

      const metadatas = await Promise.all(
        items
          .filter((item) => item.compression.compressed === true)
          .map(async (item) => {
            const offchain: Offchain = await fetchOffchain(
              item.content.json_uri,
            );
            const merged = {
              onchain: item,
              offchain: offchain,
            };
            return Converter.CompressedNftMetadata.intoUser(merged);
          }),
      );
      return {
        page: assets.value.page,
        total: assets.value.total,
        limit: assets.value.limit,
        metadatas,
      };
    });
  };

  /**
   * Find nft by mint address
   *
   * @param {Pubkey} mint
   * @return Promise<Result<NftMetadata, Error>>
   */
  export const findByMint = async (
    mint: Pubkey,
  ): Promise<Result<NftMetadata, Error>> => {
    return Try(async () => {
      const asset = await DasApi.getAsset(mint);
      if (asset.isErr) {
        throw asset.error;
      }

      const offchain: Offchain = await fetchOffchain(
        asset.value.content.json_uri,
      );
      const merged = {
        onchain: asset.value,
        offchain: offchain,
      };
      return Converter.CompressedNftMetadata.intoUser(merged);
    });
  };

  /**
   * Find nft by collection mint
   *
   * @param {Pubkey} collectionMint
   * @param {number} limit
   * @param {number} page
   * @param {SortBy} sortBy?
   * @param {string} before?
   * @param {string} after?
   * @return Promise<Result<CompressedNftMetadata, Error>>
   */
  export const findByCollection = async (
    collectionMint: Pubkey,
    limit: number = 1000,
    page: number = 1,
    sortBy: SortBy = defaultSortBy,
    before?: string,
    after?: string,
  ): Promise<Result<CompressedNftMetadata, Error>> => {
    return Try(async () => {
      const assets = await DasApi.getAssetsByGroup(
        'collection',
        collectionMint,
        limit,
        page,
        sortBy,
        before,
        after,
      );
      if (assets.isErr) {
        throw assets.error;
      }

      const items = assets.value.items;

      const metadatas = await Promise.all(
        items
          .filter((item) => item.compression.compressed === true)
          .map(async (item) => {
            const offchain: Offchain = await fetchOffchain(
              item.content.json_uri,
            );
            const merged = {
              onchain: item,
              offchain: offchain,
            };
            return Converter.CompressedNftMetadata.intoUser(merged);
          }),
      );
      return {
        page: assets.value.page,
        total: assets.value.total,
        limit: assets.value.limit,
        metadatas,
      };
    });
  };
}
