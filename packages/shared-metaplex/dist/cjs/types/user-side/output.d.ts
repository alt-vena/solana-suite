import { _Shared, Option } from '../shared';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';
export declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey;
        verified: boolean;
    };
    type Uses = _Shared.Uses;
    type TokenAmount = {
        amount: string;
        decimals: number;
        uiAmount: number;
        uiAmountString: string;
    };
    type NftMetadata = {
        mint: string;
        updateAuthority: string;
        royalty: number;
        name: string;
        symbol: string;
        uri: string;
        isMutable: boolean;
        primarySaleHappened: boolean;
        editionNonce: Option<number>;
        offchain: InfraSideOutput.Offchain;
        collection?: Collection | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
        created_at?: number | undefined;
    };
    type TokenMetadata = {
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        offchain: InfraSideOutput.Offchain;
        tokenAmount?: TokenAmount;
        attributes?: _Shared.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
    };
}
