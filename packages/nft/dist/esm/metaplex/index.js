import { Metaplex as Mint } from './mint';
import { Metaplex as Find } from './find';
import { Metaplex as FeePayer } from './fee-payer-partial-sign-mint';
import { Metaplex as Transfer } from './transfer';
export const Metaplex = Object.assign(Object.assign(Object.assign(Object.assign({}, Mint), Find), FeePayer), Transfer);
//# sourceMappingURL=index.js.map