import * as _solana_web3_js from '@solana/web3.js';
import { TransactionSignature, PublicKey, Keypair, TransactionInstruction } from '@solana/web3.js';
import * as _metaplex_foundation_mpl_token_metadata from '@metaplex-foundation/mpl-token-metadata';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import BN from 'bn.js';

declare enum Sortable {
    Asc = "asc",
    Desc = "desc"
}
type Find = {
    sol?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: string;
    memo?: string;
    dateTime?: Date;
    type?: string;
    sig?: string;
    innerInstruction?: boolean;
};

declare abstract class AbstractResult$1<T, E extends Error> {
    protected abstract _chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
    unwrap(): T;
    unwrap<U>(ok: (value: T) => U): U;
    unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
    map<U>(ok: (value: T) => U): Result$1<U, E>;
    map<U, F extends Error>(ok: (value: T) => U, err: (error: E) => F): Result$1<U, F>;
    chain<X>(ok: (value: T) => Result$1<X, E>): Result$1<X, E>;
    chain<X>(ok: (value: T) => Result$1<X, E>): Result$1<X, E>;
    chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
    match<U, F>(ok: (value: T) => U, err: (error: E) => F): void | Promise<void>;
    submit(): Promise<Result$1<TransactionSignature, Error>>;
}
declare class InternalOk$1<T, E extends Error> extends AbstractResult$1<T, E> {
    readonly value: T;
    readonly isOk = true;
    readonly isErr = false;
    constructor(value: T);
    protected _chain<X, U extends Error>(ok: (value: T) => Result$1<X, U>, _err: (error: E) => Result$1<X, U>): Result$1<X, U>;
}
declare class InternalErr$1<T, E extends Error> extends AbstractResult$1<T, E> {
    readonly error: E;
    readonly isOk = false;
    readonly isErr = true;
    constructor(error: E);
    protected _chain<X, U extends Error>(_ok: (value: T) => Result$1<X, U>, err: (error: E) => Result$1<X, U>): Result$1<X, U>;
}
declare namespace Result$1 {
    export type Ok<T, E extends Error> = InternalOk$1<T, E>;
    export type Err<T, E extends Error> = InternalErr$1<T, E>;
    export function ok<T, E extends Error>(value: T): Result$1<T, E>;
    export function err<E extends Error, T = never>(error?: E): Result$1<T, E>;
    type U = Result$1<unknown>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U, R15 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>,
        OkType$1<R14>,
        OkType$1<R15>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>,
        OkType$1<R14>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>,
        OkType$1<R12>,
        OkType$1<R13>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>,
        OkType$1<R11>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>,
        OkType$1<R10>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>,
        OkType$1<R9>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>,
        OkType$1<R8>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>,
        OkType$1<R7>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>,
        OkType$1<R6>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5 | R6>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U>(obj: [R0, R1, R2, R3, R4, R5]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>,
        OkType$1<R5>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4 | R5>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U>(obj: [R0, R1, R2, R3, R4]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>,
        OkType$1<R4>
    ], ErrType$1<R0 | R1 | R2 | R3 | R4>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U>(obj: [R0, R1, R2, R3]): Result$1<[
        OkType$1<R0>,
        OkType$1<R1>,
        OkType$1<R2>,
        OkType$1<R3>
    ], ErrType$1<R0 | R1 | R2 | R3>>;
    export function all<R0 extends U, R1 extends U, R2 extends U>(obj: [R0, R1, R2]): Result$1<[OkType$1<R0>, OkType$1<R1>, OkType$1<R2>], ErrType$1<R0 | R1 | R2>>;
    export function all<R0 extends U, R1 extends U>(obj: [R0, R1]): Result$1<[OkType$1<R0>, OkType$1<R1>], ErrType$1<R0 | R1>>;
    export function all<R0 extends U>(obj: [R0]): Result$1<[OkType$1<R0>], ErrType$1<R0>>;
    export function all(obj: []): Result$1<[]>;
    export function all<T extends U[] | Record<string, U>>(obj: T): Result$1<{
        [K in keyof T]: T[K] extends Result$1<infer I> ? I : never;
    }, {
        [K in keyof T]: T[K] extends Result$1<unknown, infer E> ? E : never;
    }[keyof T]>;
    export {};
}
type Result$1<T, E extends Error = Error> = Result$1.Ok<T, E> | Result$1.Err<T, E>;
type OkType$1<R extends Result$1<unknown>> = R extends Result$1<infer O> ? O : never;
type ErrType$1<R extends Result$1<unknown>> = R extends Result$1<unknown, infer E> ? E : never;

type History = {
    sol?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: string;
    memo?: string;
    dateTime?: Date;
    type?: string;
    sig?: string;
    innerInstruction?: boolean;
};
type HistoryOptions = {
    waitTime: number;
    narrowDown: number;
};

type OnOk<T extends History | Find> = (ok: T[]) => void;
type OnErr = (err: Error) => void;

declare enum FilterType {
    Memo = "memo",
    Mint = "mint",
    OnlyMemo = "only-memo",
    Transfer = "transfer"
}

type Option<T> = T | null;
type bignum = number | BN;
type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
declare namespace Common {
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileContent;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Options = {
        [key: string]: unknown;
    };
}

declare namespace InfraSideInput {
    interface File extends Blob {
        readonly lastModified: number;
        readonly name: string;
    }
    type StorageNftStorageMetadata = {
        storageType?: 'nftStorage';
    };
    type StorageArweaveMetadata = {
        storageType?: 'arweave';
    };
    type Collection = {
        key: PublicKey;
        verified: boolean;
    };
    type Creators = {
        address: PublicKey;
        verified: boolean;
        share: number;
    };
    type Properties = Common.Properties;
    type Offchain = {
        name?: string;
        symbol?: string;
        description?: string;
        seller_fee_basis_points?: number;
        image?: string;
        external_url?: string;
        attributes?: Common.Attribute[];
        properties?: Common.Properties;
        collection?: {
            name?: string;
            family?: string;
            [key: string]: unknown;
        };
        created_at?: number;
    };
    type MetaplexDataV2 = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        creators: Option<Creators[]>;
        collection: Option<Collection>;
        uses: Option<Common.Uses>;
    };
}

declare namespace InfraSideOutput {
    type Collection = {
        verified: boolean;
        key: PublicKey;
    };
    type OnchainAndOffchain = {
        onchain: Metadata;
        offchain: InfraSideOutput.Offchain;
    };
    type Transfer = {
        parsed: {
            info: {
                destination: Pubkey;
                source: Pubkey;
                lamports: number;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintTo = {
        parsed: {
            info: {
                account: Pubkey;
                mint: Pubkey;
                mintAuthority: Pubkey;
                tokenAmount: string;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type MintToChecked = MintTo;
    type TransferChecked = {
        parsed: {
            info: {
                destination: Pubkey;
                mint: Pubkey;
                multisigAuthority: Pubkey;
                signers: Pubkey[];
                source: Pubkey;
                tokenAmount: string;
            };
            type: string;
        };
        program: string;
        programId?: PublicKey;
    };
    type Memo = {
        parsed: string;
        program: string;
        programId: PublicKey;
    };
    type Creator = InfraSideInput.Creators;
    type Offchain = InfraSideInput.Offchain;
    type Uses = Common.Uses;
}

type StorageType = 'nftStorage' | 'arweave' | string;

declare const pubKeyNominality: unique symbol;
declare const secretNominality: unique symbol;
type Pubkey$1 = (string & {
    [pubKeyNominality]: never;
}) | string;
type Secret = (string & {
    [secretNominality]: never;
}) | string;

declare namespace UserSideInput {
    type Collection = Pubkey$1;
    type Creators = {
        address: Pubkey$1;
        share: number;
        verified: boolean;
    };
    type Properties = Common.Properties;
    enum TokenStandard {
        NonFungible = 0,
        FungibleAsset = 1,
        Fungible = 2,
        NonFungibleEdition = 3,
        ProgrammableNonFungible = 4
    }
    type NftMetadata = {
        name: string;
        symbol: string;
        royalty: number;
        storageType?: StorageType;
        filePath?: FileContent;
        uri?: string;
        isMutable?: boolean;
        description?: string;
        external_url?: string;
        attributes?: Common.Attribute[];
        properties?: Properties;
        maxSupply?: bignum;
        creators?: Creators[];
        uses?: Common.Uses;
        collection?: Collection;
        options?: Common.Options;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        filePath?: FileContent;
        uri?: string;
        storageType?: StorageType;
        description?: string;
        royalty?: number;
        uses?: Common.Uses;
        creators?: Creators[];
        attributes?: Common.Attribute[];
        options?: Common.Options;
    };
}

declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey$1;
        verified: boolean;
    };
    type Uses = Common.Uses;
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
        tokenAmount: string;
        collection?: Collection | undefined;
        creators?: Creators[] | undefined;
        uses?: Common.Uses | undefined;
        dateTime?: Date | undefined;
    };
    type TokenMetadata = {
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        offchain: InfraSideOutput.Offchain;
        tokenAmount: string;
        attributes?: Common.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: Common.Uses | undefined;
        dateTime?: Date | undefined;
    };
}

declare abstract class AbstractResult<T, E extends Error> {
    protected abstract _chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    unwrap(): T;
    unwrap<U>(ok: (value: T) => U): U;
    unwrap<U, V>(ok: (value: T) => U, err: (error: E) => V): U | V;
    map<U>(ok: (value: T) => U): Result<U, E>;
    map<U, F extends Error>(ok: (value: T) => U, err: (error: E) => F): Result<U, F>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X>(ok: (value: T) => Result<X, E>): Result<X, E>;
    chain<X, U extends Error>(ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
    match<U, F>(ok: (value: T) => U, err: (error: E) => F): void | Promise<void>;
    submit(): Promise<Result<TransactionSignature, Error>>;
}
declare class InternalOk<T, E extends Error> extends AbstractResult<T, E> {
    readonly value: T;
    readonly isOk = true;
    readonly isErr = false;
    constructor(value: T);
    protected _chain<X, U extends Error>(ok: (value: T) => Result<X, U>, _err: (error: E) => Result<X, U>): Result<X, U>;
}
declare class InternalErr<T, E extends Error> extends AbstractResult<T, E> {
    readonly error: E;
    readonly isOk = false;
    readonly isErr = true;
    constructor(error: E);
    protected _chain<X, U extends Error>(_ok: (value: T) => Result<X, U>, err: (error: E) => Result<X, U>): Result<X, U>;
}
declare namespace Result {
    export type Ok<T, E extends Error> = InternalOk<T, E>;
    export type Err<T, E extends Error> = InternalErr<T, E>;
    export function ok<T, E extends Error>(value: T): Result<T, E>;
    export function err<E extends Error, T = never>(error?: E): Result<T, E>;
    type U = Result<unknown>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U, R15 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>,
        OkType<R14>,
        OkType<R15>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14 | R15>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U, R14 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>,
        OkType<R14>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13 | R14>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U, R13 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>,
        OkType<R12>,
        OkType<R13>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11 | R12 | R13>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U, R12 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U, R11 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>,
        OkType<R11>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 | R11>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U, R10 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>,
        OkType<R10>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U, R9 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8, R9]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>,
        OkType<R9>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U, R8 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7, R8]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>,
        OkType<R8>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U, R7 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6, R7]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>,
        OkType<R7>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6 | R7>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U, R6 extends U>(obj: [R0, R1, R2, R3, R4, R5, R6]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>,
        OkType<R6>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5 | R6>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U, R5 extends U>(obj: [R0, R1, R2, R3, R4, R5]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>,
        OkType<R5>
    ], ErrType<R0 | R1 | R2 | R3 | R4 | R5>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U, R4 extends U>(obj: [R0, R1, R2, R3, R4]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>,
        OkType<R4>
    ], ErrType<R0 | R1 | R2 | R3 | R4>>;
    export function all<R0 extends U, R1 extends U, R2 extends U, R3 extends U>(obj: [R0, R1, R2, R3]): Result<[
        OkType<R0>,
        OkType<R1>,
        OkType<R2>,
        OkType<R3>
    ], ErrType<R0 | R1 | R2 | R3>>;
    export function all<R0 extends U, R1 extends U, R2 extends U>(obj: [R0, R1, R2]): Result<[OkType<R0>, OkType<R1>, OkType<R2>], ErrType<R0 | R1 | R2>>;
    export function all<R0 extends U, R1 extends U>(obj: [R0, R1]): Result<[OkType<R0>, OkType<R1>], ErrType<R0 | R1>>;
    export function all<R0 extends U>(obj: [R0]): Result<[OkType<R0>], ErrType<R0>>;
    export function all(obj: []): Result<[]>;
    export function all<T extends U[] | Record<string, U>>(obj: T): Result<{
        [K in keyof T]: T[K] extends Result<infer I> ? I : never;
    }, {
        [K in keyof T]: T[K] extends Result<unknown, infer E> ? E : never;
    }[keyof T]>;
    export {};
}
type Result<T, E extends Error = Error> = Result.Ok<T, E> | Result.Err<T, E>;
type OkType<R extends Result<unknown>> = R extends Result<infer O> ? O : never;
type ErrType<R extends Result<unknown>> = R extends Result<unknown, infer E> ? E : never;

declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(explorer?: Explorer): string;
    }
    interface Number {
        toSol(): number;
        toLamports(): number;
    }
    interface Console {
        debug(data: unknown, data2?: unknown, data3?: unknown): void;
    }
    interface Secret {
        toKeypair(): Keypair;
    }
    interface Pubkey {
        toPublicKey(): PublicKey;
    }
}
declare enum Explorer {
    Solscan = "solscan",
    SolanaFM = "solanafm"
}

declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}

declare class MintInstruction extends Instruction {
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}

declare class PartialSignInstruction {
    hexInstruction: string;
    data?: Pubkey$1;
    constructor(instructions: string, mint?: Pubkey$1);
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
}

declare global {
    interface Array<T> {
        submit(): Promise<Result$1<TransactionSignature, Error>>;
    }
}

declare const SplToken: {
    transfer: (mint: Pubkey$1, owner: Pubkey$1, dest: Pubkey$1, signers: Secret[], amount: number, mintDecimal: number, feePayer?: Secret | undefined) => Promise<Result<Instruction, Error>>;
    thaw: (mint: Pubkey$1, owner: Pubkey$1, freezeAuthority: Secret, feePayer?: Secret | undefined) => Result<Instruction, Error>;
    createFreezeAuthority: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, freezeAuthority: _solana_web3_js.PublicKey) => _solana_web3_js.TransactionInstruction;
    createMintInstructions: (mint: _solana_web3_js.PublicKey, owner: _solana_web3_js.PublicKey, totalAmount: number, mintDecimal: number, tokenMetadata: _metaplex_foundation_mpl_token_metadata.DataV2, feePayer: _solana_web3_js.PublicKey, isMutable: boolean) => Promise<_solana_web3_js.TransactionInstruction[]>;
    mint: (owner: Pubkey$1, signer: Secret, totalAmount: number, mintDecimal: number, input: UserSideInput.TokenMetadata, feePayer?: Secret | undefined, freezeAuthority?: Pubkey$1 | undefined) => Promise<Result<MintInstruction, Error>>;
    getHistory: (target: Pubkey$1, filterType: FilterType, onOk: OnOk<History>, onErr: OnErr, options?: Partial<HistoryOptions>) => Promise<void>;
    feePayerPartialSignTransfer: (mint: Pubkey$1, owner: Pubkey$1, dest: Pubkey$1, signers: Secret[], amount: number, mintDecimal: number, feePayer: Pubkey$1) => Promise<Result<PartialSignInstruction, Error>>;
    freeze: (mint: Pubkey$1, owner: Pubkey$1, freezeAuthority: Secret, feePayer?: Secret | undefined) => Result<Instruction, Error>;
    genericFindByOwner: <T extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata>(owner: Pubkey$1, callback: (result: Result<T[], Error>) => void, tokenStandard: UserSideInput.TokenStandard, sortable?: Sortable | undefined, isHolder?: boolean | undefined) => Promise<void>;
    genericFindByMint: <T_1 extends UserSideOutput.NftMetadata | UserSideOutput.TokenMetadata>(mint: Pubkey$1, tokenStandard: UserSideInput.TokenStandard) => Promise<Result<T_1, Error>>;
    findByOwner: (owner: Pubkey$1, onOk: OnOk<UserSideOutput.TokenMetadata>, onErr: OnErr, options?: {
        sortable?: Sortable | undefined;
        isHolder?: boolean | undefined;
    } | undefined) => void;
    findByMint: (mint: Pubkey$1) => Promise<Result<UserSideOutput.TokenMetadata, Error>>;
    burn: (mint: Pubkey$1, owner: Pubkey$1, signers: Secret[], burnAmount: number, tokenDecimals: number, feePayer?: Secret | undefined) => Result<Instruction, Error>;
    add: (token: Pubkey$1, owner: Pubkey$1, signers: Secret[], totalAmount: number, mintDecimal: number, feePayer?: Secret | undefined) => Promise<Result<Instruction, Error>>;
};

export { SplToken };