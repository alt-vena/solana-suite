import { SolNative as Find } from './find';
import { SolNative as FeePayer } from './fee-payer-partial-sign-transfer';
import { SolNative as History } from './history';
import { SolNative as Transfer } from './transfer';
export const SolNative = Object.assign(Object.assign(Object.assign(Object.assign({}, Find), FeePayer), History), Transfer);
