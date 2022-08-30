var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, sleep, debugLog, } from '@solana-suite/shared';
import { Internals_SplToken } from './_spl-token';
export var Internals;
(function (Internals) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    Internals.retryGetOrCreateAssociatedAccountInfo = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield Internals_SplToken.getOrCreateAssociatedTokenAccount(mint, owner, feePayer, true);
                if (inst.isOk && typeof inst.value === 'string') {
                    debugLog('# associatedTokenAccount: ', inst.value);
                    return Result.ok(inst.value);
                }
                return (yield inst.submit()).map((ok) => {
                    Node.confirmedSig(ok);
                    return inst.unwrap().data;
                }, (err) => {
                    debugLog('# Error submit getOrCreateAssociatedTokenAccount: ', err);
                    throw err;
                });
            }
            catch (e) {
                debugLog(`# retry: ${counter} create token account: `, e);
            }
            yield sleep(RETRY_SLEEP_TIME);
            counter++;
        }
        return Result.err(Error(`retry action is over limit ${RETRY_OVER_LIMIT}`));
    });
    // type guard
    Internals.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && arg.parsed;
    };
})(Internals || (Internals = {}));
