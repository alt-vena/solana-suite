"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const spl_token_1 = require("@solana/spl-token");
const storage_1 = require("@solana-suite/storage");
var Metaplex;
(function (Metaplex) {
    Metaplex.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const allData = yield storage_1.Bundlr.make()
                .nfts()
                .findAllByOwner({ owner: owner.toPublicKey() });
            const res = allData.map((d) => {
                return {
                    mint: d.mintAddress.toString(),
                    updateAuthority: d.updateAuthorityAddress.toString(),
                    royalty: d.sellerFeeBasisPoints,
                    name: d.name,
                    symbol: d.symbol,
                    uri: d.uri,
                    isMutable: d.isMutable,
                    primarySaleHappened: d.primarySaleHappened,
                    creators: shared_metaplex_1.Creators.toConvertUser(d.creators),
                    editionNonce: d.editionNonce,
                    collection: shared_metaplex_1.Collections.toConvertUser(d.collection),
                    uses: d.uses,
                };
            });
            return res;
        }));
    });
    Metaplex.findByOwner2 = (owner) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const info = yield shared_1.Node.getConnection().getParsedTokenAccountsByOwner(owner.toPublicKey(), {
                programId: spl_token_1.TOKEN_PROGRAM_ID,
            });
            info.value.forEach((el) => {
                // console.log('pubkey: ', el.pubkey.toString());
                const mint = el.account.data.parsed.info.mint;
                console.log('account: ', mint);
                const tokenAccount = shared_metaplex_1.Pda.getMetadata(mint.toPublicKey());
                console.log(tokenAccount);
            });
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=find.js.map