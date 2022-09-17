export interface TransferHistory {
    info: {
        destination?: string;
        source?: string;
        authority?: string;
        multisigAuthority?: string;
        signers?: string[];
        amount?: string;
        mint?: string;
        tokenAmount?: any[];
    };
    type: string;
    date: Date;
    innerInstruction: boolean;
    sig: string;
    memo?: string;
}
export declare enum Filter {
    Transfer = "transfer",
    TransferChecked = "transferChecked",
    OnlyMemo = "spl-memo",
    MintTo = "mintTo",
    Create = "create"
}
export declare enum DirectionFilter {
    Dest = "destination",
    Source = "source"
}
