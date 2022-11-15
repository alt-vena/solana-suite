import { Metaplex as Mint } from './mint';
import { Metaplex as Find } from './find';
import { Metaplex as Royalty } from './royalty';
import { Metaplex as Transfer } from './transfer';

export const Metaplex = { ...Mint, ...Find, ...Royalty, ...Transfer };
