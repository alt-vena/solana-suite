import { Metaplex as Mint } from './mint';
import { Metaplex as Find } from './find';
import { Metaplex as Royalty } from './royalty';
import { Metaplex as Transfer } from './transfer';
export * from './validator';
export * from './types';
export const Metaplex = Object.assign(Object.assign(Object.assign(Object.assign({}, Mint), Find), Royalty), Transfer);
//# sourceMappingURL=index.js.map