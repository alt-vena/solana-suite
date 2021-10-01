/// <reference types="node" />
import { MetaplexInstructure } from './';
export declare namespace MetaplexSerialize {
    const initData: () => {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
    };
    const serializeCreateArgs: (data: MetaplexInstructure.Data) => Buffer;
    const serializeUpdateArgs: (data: MetaplexInstructure.Data, newUpdateAuthority: string | null | undefined, primarySaleHappened: boolean | null | undefined) => Buffer;
    const decode: (data: Buffer) => {
        name: string;
        symbol: string;
        uri: string;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: number;
    };
}
