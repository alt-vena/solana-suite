var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/convert/collection.ts
var Convert;
((Convert8) => {
  let Collection;
  ((Collection2) => {
    Collection2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return {
        key: input.toPublicKey(),
        verified: false
      };
    };
    Collection2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        address: output.key.toString(),
        verified: output.verified
      };
    };
  })(Collection = Convert8.Collection || (Convert8.Collection = {}));
})(Convert || (Convert = {}));

// src/convert/creators.ts
var Convert2;
((Convert8) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfraSide = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        let modify = null;
        modify = {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
    Creators2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output.map((data) => {
        const modify = {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified
        };
        return modify;
      });
    };
  })(Creators = Convert8.Creators || (Convert8.Creators = {}));
})(Convert2 || (Convert2 = {}));

// src/convert/uses.ts
var Convert3;
((Convert8) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Convert8.Uses || (Convert8.Uses = {}));
})(Convert3 || (Convert3 = {}));

// src/convert/token-metadata.ts
import { convertTimestampToDateTime } from "@solana-suite/shared";
var Convert4;
((Convert8) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Convert2.Creators.intoInfraSide(input.creators),
        collection: null,
        uses: input.uses || null
      };
    };
    TokenMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.name),
        symbol: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.symbol),
        tokenAmount,
        uri: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.uri),
        creators: Convert2.Creators.intoUserSide(output.onchain.data.creators),
        uses: Convert3.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Convert8.TokenMetadata || (Convert8.TokenMetadata = {}));
})(Convert4 || (Convert4 = {}));

// src/convert/nft-metadata.ts
import { convertTimestampToDateTime as convertTimestampToDateTime2 } from "@solana-suite/shared";
var Convert5;
((Convert8) => {
  let NftMetadata;
  ((NftMetadata2) => {
    NftMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Convert2.Creators.intoInfraSide(input.creators),
        collection: Convert.Collection.intoInfraSide(input.collection),
        uses: input.uses || null
      };
    };
    NftMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Convert4.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Convert4.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        tokenAmount,
        uri: Convert4.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Convert2.Creators.intoUserSide(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Convert.Collection.intoUserSide(
          output.onchain.collection
        ),
        uses: Convert3.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime2(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(NftMetadata = Convert8.NftMetadata || (Convert8.NftMetadata = {}));
})(Convert5 || (Convert5 = {}));

// src/convert/properties.ts
import { overwriteObject } from "@solana-suite/shared";
var Convert6;
((Convert8) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfraSide = (input, storageFunc, storageType, feePayer) => __async(void 0, null, function* () {
      if (!input || !input.files) {
        return {};
      }
      const files = yield Promise.all(
        input.files.map((file) => __async(void 0, null, function* () {
          if (!file.filePath) {
            return {};
          }
          const res = yield storageFunc(file.filePath, storageType, feePayer);
          if (res.isErr) {
            throw Error(res.error.message);
          }
          return overwriteObject(file, [
            {
              existsKey: "filePath",
              will: { key: "uri", value: res.value }
            }
          ]);
        }))
      );
      return __spreadProps(__spreadValues({}, input), { files });
    });
  })(Properties = Convert8.Properties || (Convert8.Properties = {}));
})(Convert6 || (Convert6 = {}));

// src/convert/index.ts
var Convert7 = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Convert), Convert2), Convert5), Convert6), Convert4), Convert3);

// src/types/user-side/input.ts
var UserSideInput;
((UserSideInput2) => {
  let TokenStandard;
  ((TokenStandard2) => {
    TokenStandard2[TokenStandard2["NonFungible"] = 0] = "NonFungible";
    TokenStandard2[TokenStandard2["FungibleAsset"] = 1] = "FungibleAsset";
    TokenStandard2[TokenStandard2["Fungible"] = 2] = "Fungible";
    TokenStandard2[TokenStandard2["NonFungibleEdition"] = 3] = "NonFungibleEdition";
    TokenStandard2[TokenStandard2["ProgrammableNonFungible"] = 4] = "ProgrammableNonFungible";
  })(TokenStandard = UserSideInput2.TokenStandard || (UserSideInput2.TokenStandard = {}));
})(UserSideInput || (UserSideInput = {}));

// src/types/shared.ts
var _Shared;
((_Shared2) => {
  let UseMethod;
  ((UseMethod2) => {
    UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
    UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
    UseMethod2[UseMethod2["Single"] = 2] = "Single";
  })(UseMethod = _Shared2.UseMethod || (_Shared2.UseMethod = {}));
})(_Shared || (_Shared = {}));

// src/pda.ts
import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
var Pda;
((Pda2) => {
  Pda2.getMetadata = (mint) => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toPublicKey().toBuffer()],
      PROGRAM_ID
    );
    return publicKey;
  };
  Pda2.getMasterEdition = (mint) => {
    const [publicKey] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer(),
        Buffer.from("edition")
      ],
      PROGRAM_ID
    );
    return publicKey;
  };
})(Pda || (Pda = {}));

// src/validator.ts
import { Try } from "@solana-suite/shared";

// src/royalty.ts
var Royalty;
((Royalty2) => {
  Royalty2.THRESHOLD = 100;
  Royalty2.convert = (percentage) => {
    return percentage * Royalty2.THRESHOLD;
  };
})(Royalty || (Royalty = {}));

// src/validator.ts
var Validator;
((Validator2) => {
  let Message;
  ((Message2) => {
    Message2.SUCCESS = "success";
    Message2.SMALL_NUMBER = "too small";
    Message2.BIG_NUMBER = "too big";
    Message2.LONG_LENGTH = "too long";
    Message2.EMPTY = "invalid empty value";
    Message2.INVALID_URL = "invalid url";
    Message2.ONLY_NODE_JS = "`string` type is only Node.js";
  })(Message = Validator2.Message || (Validator2.Message = {}));
  Validator2.NAME_LENGTH = 32;
  Validator2.SYMBOL_LENGTH = 10;
  Validator2.URL_LENGTH = 200;
  Validator2.ROYALTY_MAX = 100;
  Validator2.SELLER_FEE_BASIS_POINTS_MAX = 1e4;
  Validator2.ROYALTY_MIN = -1;
  Validator2.isRoyalty = (royalty) => {
    return Try(() => {
      const key = "royalty";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSellerFeeBasisPoints = (royalty) => {
    return Try(() => {
      const key = "sellerFeeBasisPoints/seller_fee_basis_points";
      if (royalty !== 0 && !royalty) {
        throw createError(key, Message.EMPTY, royalty);
      }
      if (royalty < Validator2.ROYALTY_MIN) {
        throw createError(key, Message.SMALL_NUMBER, royalty, {
          threshold: Validator2.ROYALTY_MIN,
          condition: "underMin"
        });
      } else if (royalty > Validator2.ROYALTY_MAX * Royalty.THRESHOLD) {
        throw createError(key, Message.BIG_NUMBER, royalty, {
          threshold: Validator2.SELLER_FEE_BASIS_POINTS_MAX,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isName = (name) => {
    return Try(() => {
      const key = "name";
      if (!name) {
        throw createError(key, Message.EMPTY, name);
      }
      if (byteLength(name) > Validator2.NAME_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, name, {
          threshold: Validator2.NAME_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isSymbol = (symbol) => {
    return Try(() => {
      const key = "symbol";
      if (!symbol) {
        throw createError(key, Message.EMPTY, symbol);
      }
      if (byteLength(symbol) > Validator2.SYMBOL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, symbol, {
          threshold: Validator2.SYMBOL_LENGTH,
          condition: "overMax"
        });
      }
      return Message.SUCCESS;
    });
  };
  Validator2.isImageUrl = (image) => isUriOrImage(image, "image");
  Validator2.checkAll = (metadata) => {
    return Try(() => {
      const keys = Object.keys(metadata);
      const results = [];
      keys.map((key) => {
        let res;
        switch (key) {
          case "image":
            if (key in metadata && metadata.image) {
              res = (0, Validator2.isImageUrl)(metadata.image);
            }
            break;
          case "royalty":
            if (key in metadata) {
              res = (0, Validator2.isRoyalty)(metadata.royalty);
            }
            break;
          case "seller_fee_basis_points":
            if (key in metadata && metadata.seller_fee_basis_points) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.seller_fee_basis_points);
            }
            break;
          case "sellerFeeBasisPoints":
            if (key in metadata) {
              res = (0, Validator2.isSellerFeeBasisPoints)(metadata.sellerFeeBasisPoints);
            }
            break;
          case "name":
            if (metadata.name) {
              res = (0, Validator2.isName)(metadata.name);
            }
            break;
          case "symbol":
            if (metadata.symbol) {
              res = (0, Validator2.isSymbol)(metadata.symbol);
            }
            break;
        }
        if (res && res.isErr) {
          results.push(...res.error.details);
        }
      });
      if (results.length > 0) {
        const message = "Caught in the validation errors. see information e.g: err<ValidatorError>.details";
        throw new ValidatorError(message, results);
      }
      return Message.SUCCESS;
    });
  };
  const byteLength = (value) => {
    const text = new TextEncoder();
    return text.encode(value).length;
  };
  const createError = (key, message, actual, limit) => {
    let error;
    if (limit) {
      error = new ValidatorError(message, [{ key, message, actual, limit }]);
    } else {
      error = new ValidatorError(message, [{ key, message, actual }]);
    }
    return error;
  };
  const isUriOrImage = (imageOrUri, key) => {
    return Try(() => {
      if (!imageOrUri) {
        throw createError(key, Message.EMPTY, imageOrUri);
      }
      if (byteLength(imageOrUri) > Validator2.URL_LENGTH) {
        throw createError(key, Message.LONG_LENGTH, imageOrUri, {
          threshold: Validator2.URL_LENGTH,
          condition: "overMax"
        });
      }
      if (!/https?:\/\/[-_.!~*\\()a-zA-Z0-9;?:&=+,%#]+/g.test(imageOrUri)) {
        throw createError(key, Message.INVALID_URL, imageOrUri);
      }
      return Message.SUCCESS;
    });
  };
})(Validator || (Validator = {}));
var ValidatorError = class extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
  }
};
export {
  Convert7 as Convert,
  Pda,
  Royalty,
  UserSideInput,
  Validator,
  ValidatorError,
  _Shared
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2NvbnZlcnQvY29sbGVjdGlvbi50cyIsICIuLi8uLi9zcmMvY29udmVydC9jcmVhdG9ycy50cyIsICIuLi8uLi9zcmMvY29udmVydC91c2VzLnRzIiwgIi4uLy4uL3NyYy9jb252ZXJ0L3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL3NyYy9jb252ZXJ0L25mdC1tZXRhZGF0YS50cyIsICIuLi8uLi9zcmMvY29udmVydC9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL3NyYy9jb252ZXJ0L2luZGV4LnRzIiwgIi4uLy4uL3NyYy90eXBlcy91c2VyLXNpZGUvaW5wdXQudHMiLCAiLi4vLi4vc3JjL3R5cGVzL3NoYXJlZC50cyIsICIuLi8uLi9zcmMvcGRhLnRzIiwgIi4uLy4uL3NyYy92YWxpZGF0b3IudHMiLCAiLi4vLi4vc3JjL3JveWFsdHkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIE9wdGlvbixcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248VXNlclNpZGVJbnB1dC5Db2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LkNvbGxlY3Rpb24+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LkNvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIEluZnJhU2lkZU91dHB1dCxcbiAgT3B0aW9uLFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnQge1xuICBleHBvcnQgbmFtZXNwYWNlIENyZWF0b3JzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248VXNlclNpZGVJbnB1dC5DcmVhdG9yc1tdPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgbGV0IG1vZGlmeTogT3B0aW9uPEluZnJhU2lkZUlucHV0LkNyZWF0b3JzPiA9IG51bGw7XG4gICAgICAgIG1vZGlmeSA9IHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZGF0YS52ZXJpZmllZCxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbW9kaWZ5O1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbmZyYVNpZGVPdXRwdXQuQ3JlYXRvcltdPixcbiAgICApOiBVc2VyU2lkZU91dHB1dC5DcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGlmeSA9IHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9TdHJpbmcoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZGF0YS52ZXJpZmllZCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG1vZGlmeTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIE9wdGlvbiwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEluZnJhU2lkZU91dHB1dC5Vc2VzPixcbiAgICApOiBVc2VyU2lkZU91dHB1dC5Vc2VzIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0IGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Ub2tlbk1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IEluZnJhU2lkZUlucHV0Lk1ldGFwbGV4RGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYVNpZGUoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBudWxsLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuT25jaGFpbkFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydCBhcyBfQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydCBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIF9Ub2tlbiB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHtcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIEluZnJhU2lkZU91dHB1dCxcbiAgVXNlclNpZGVJbnB1dCxcbiAgVXNlclNpZGVPdXRwdXQsXG59IGZyb20gJy4uL3R5cGVzJztcblxuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhU2lkZShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sLFxuICAgICAgICApLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLmlzTXV0YWJsZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucHJpbWFyeVNhbGVIYXBwZW5lZCxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uZWRpdGlvbk5vbmNlLFxuICAgICAgICBjb2xsZWN0aW9uOiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9Vc2VyU2lkZShcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0LCBTZWNyZXQgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQge1xuICBGaWxlQ29udGVudCxcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIFN0b3JhZ2VUeXBlLFxuICBVc2VyU2lkZUlucHV0LFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUHJvcGVydGllcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYVNpZGUgPSBhc3luYyAoXG4gICAgICBpbnB1dDogVXNlclNpZGVJbnB1dC5Qcm9wZXJ0aWVzIHwgdW5kZWZpbmVkLFxuICAgICAgc3RvcmFnZUZ1bmM6IChcbiAgICAgICAgZGF0YTogRmlsZUNvbnRlbnQsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8SW5mcmFTaWRlSW5wdXQuUHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgc3RvcmFnZUZ1bmMoZmlsZS5maWxlUGF0aCwgc3RvcmFnZVR5cGUsIGZlZVBheWVyKTtcbiAgICAgICAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihyZXMuZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvdmVyd3JpdGVPYmplY3QoZmlsZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBleGlzdHNLZXk6ICdmaWxlUGF0aCcsXG4gICAgICAgICAgICAgIHdpbGw6IHsga2V5OiAndXJpJywgdmFsdWU6IHJlcy52YWx1ZSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHsgLi4uaW5wdXQsIGZpbGVzIH0gYXMgSW5mcmFTaWRlSW5wdXQuUHJvcGVydGllcztcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydCBhcyBDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCB7IENvbnZlcnQgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnQgYXMgTmZ0TWV0YWRhdGEgfSBmcm9tICcuL25mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIFByb3BlcnRpZXMgfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xuaW1wb3J0IHsgQ29udmVydCBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0IGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydCA9IHtcbiAgLi4uQ29sbGVjdGlvbixcbiAgLi4uQ3JlYXRvcnMsXG4gIC4uLk5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IF9TaGFyZWQsIGJpZ251bSwgRmlsZUNvbnRlbnQgfSBmcm9tICcuLi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnQHNvbGFuYS1zdWl0ZS9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFVzZXJTaWRlSW5wdXQge1xuICBleHBvcnQgdHlwZSBDb2xsZWN0aW9uID0gUHVia2V5O1xuXG4gIGV4cG9ydCB0eXBlIENyZWF0b3JzID0ge1xuICAgIGFkZHJlc3M6IFB1YmtleTtcbiAgICBzaGFyZTogbnVtYmVyO1xuICAgIHZlcmlmaWVkOiBib29sZWFuO1xuICB9O1xuXG4gIGV4cG9ydCB0eXBlIFByb3BlcnRpZXMgPSBfU2hhcmVkLlByb3BlcnRpZXM7XG5cbiAgZXhwb3J0IGVudW0gVG9rZW5TdGFuZGFyZCB7XG4gICAgTm9uRnVuZ2libGUgPSAwLFxuICAgIEZ1bmdpYmxlQXNzZXQgPSAxLFxuICAgIEZ1bmdpYmxlID0gMixcbiAgICBOb25GdW5naWJsZUVkaXRpb24gPSAzLFxuICAgIFByb2dyYW1tYWJsZU5vbkZ1bmdpYmxlID0gNCxcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIE5mdE1ldGFkYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzeW1ib2w6IHN0cmluZztcbiAgICByb3lhbHR5OiBudW1iZXI7XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgICBmaWxlUGF0aD86IEZpbGVDb250ZW50O1xuICAgIHVyaT86IHN0cmluZztcbiAgICBpc011dGFibGU/OiBib29sZWFuO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGV4dGVybmFsX3VybD86IHN0cmluZztcbiAgICBhdHRyaWJ1dGVzPzogX1NoYXJlZC5BdHRyaWJ1dGVbXTtcbiAgICBwcm9wZXJ0aWVzPzogUHJvcGVydGllcztcbiAgICBtYXhTdXBwbHk/OiBiaWdudW07XG4gICAgY3JlYXRvcnM/OiBDcmVhdG9yc1tdO1xuICAgIHVzZXM/OiBfU2hhcmVkLlVzZXM7XG4gICAgY29sbGVjdGlvbj86IENvbGxlY3Rpb247XG4gICAgb3B0aW9ucz86IF9TaGFyZWQuT3B0aW9ucztcbiAgfTtcblxuICBleHBvcnQgdHlwZSBUb2tlbk1ldGFkYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzeW1ib2w6IHN0cmluZztcbiAgICBmaWxlUGF0aD86IEZpbGVDb250ZW50O1xuICAgIHVyaT86IHN0cmluZztcbiAgICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHJveWFsdHk/OiBudW1iZXI7XG4gICAgdXNlcz86IF9TaGFyZWQuVXNlcztcbiAgICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gICAgYXR0cmlidXRlcz86IF9TaGFyZWQuQXR0cmlidXRlW107XG4gICAgb3B0aW9ucz86IF9TaGFyZWQuT3B0aW9ucztcbiAgfTtcbn1cbiIsICJpbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuXG5leHBvcnQgdHlwZSBPcHRpb248VD4gPSBUIHwgbnVsbDtcbmV4cG9ydCB0eXBlIGJpZ251bSA9IG51bWJlciB8IEJOO1xuZXhwb3J0IHR5cGUgRmlsZUNvbnRlbnQgPSBzdHJpbmcgfCBCdWZmZXIgfCBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXI7XG5cbmV4cG9ydCBuYW1lc3BhY2UgX1NoYXJlZCB7XG4gIGV4cG9ydCB0eXBlIFByb3BlcnRpZXMgPSB7XG4gICAgY3JlYXRvcnM/OiB7XG4gICAgICBhZGRyZXNzPzogc3RyaW5nO1xuICAgICAgc2hhcmU/OiBudW1iZXI7XG4gICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH1bXTtcbiAgICBmaWxlcz86IHtcbiAgICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgICBmaWxlUGF0aD86IEZpbGVDb250ZW50O1xuICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgICB9W107XG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBBdHRyaWJ1dGUgPSB7XG4gICAgdHJhaXRfdHlwZT86IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGV4cG9ydCBlbnVtIFVzZU1ldGhvZCB7XG4gICAgQnVybiA9IDAsXG4gICAgTXVsdGlwbGUgPSAxLFxuICAgIFNpbmdsZSA9IDIsXG4gIH1cblxuICBleHBvcnQgdHlwZSBVc2VzID0ge1xuICAgIHVzZU1ldGhvZDogVXNlTWV0aG9kO1xuICAgIHJlbWFpbmluZzogYmlnbnVtO1xuICAgIHRvdGFsOiBiaWdudW07XG4gIH07XG5cbiAgZXhwb3J0IHR5cGUgT3B0aW9ucyA9IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9O1xufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ0Bzb2xhbmEtc3VpdGUvc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAobWludDogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgW0J1ZmZlci5mcm9tKCdtZXRhZGF0YScpLCBQUk9HUkFNX0lELnRvQnVmZmVyKCksIG1pbnQudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgIFBST0dSQU1fSUQsXG4gICAgKTtcbiAgICByZXR1cm4gcHVibGljS2V5O1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRNYXN0ZXJFZGl0aW9uID0gKG1pbnQ6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgIFtcbiAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIEJ1ZmZlci5mcm9tKCdlZGl0aW9uJyksXG4gICAgICBdLFxuICAgICAgUFJPR1JBTV9JRCxcbiAgICApO1xuICAgIHJldHVybiBwdWJsaWNLZXk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICdAc29sYW5hLXN1aXRlL3NoYXJlZCc7XG5pbXBvcnQgeyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnLi90eXBlcy8nO1xuaW1wb3J0IHsgRGV0YWlscywgTGltaXQgfSBmcm9tICcuL3R5cGVzL3ZhbGlkYXRvcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVmFsaWRhdG9yIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZXNzYWdlIHtcbiAgICBleHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdzdWNjZXNzJztcbiAgICBleHBvcnQgY29uc3QgU01BTExfTlVNQkVSID0gJ3RvbyBzbWFsbCc7XG4gICAgZXhwb3J0IGNvbnN0IEJJR19OVU1CRVIgPSAndG9vIGJpZyc7XG4gICAgZXhwb3J0IGNvbnN0IExPTkdfTEVOR1RIID0gJ3RvbyBsb25nJztcbiAgICBleHBvcnQgY29uc3QgRU1QVFkgPSAnaW52YWxpZCBlbXB0eSB2YWx1ZSc7XG4gICAgZXhwb3J0IGNvbnN0IElOVkFMSURfVVJMID0gJ2ludmFsaWQgdXJsJztcbiAgICBleHBvcnQgY29uc3QgT05MWV9OT0RFX0pTID0gJ2BzdHJpbmdgIHR5cGUgaXMgb25seSBOb2RlLmpzJztcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBOQU1FX0xFTkdUSCA9IDMyO1xuICBleHBvcnQgY29uc3QgU1lNQk9MX0xFTkdUSCA9IDEwO1xuICBleHBvcnQgY29uc3QgVVJMX0xFTkdUSCA9IDIwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUFYID0gMTAwO1xuICBleHBvcnQgY29uc3QgU0VMTEVSX0ZFRV9CQVNJU19QT0lOVFNfTUFYID0gMTAwMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01JTiA9IC0xO1xuXG4gIGV4cG9ydCBjb25zdCBpc1JveWFsdHkgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAncm95YWx0eSc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUFYLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogUm95YWx0eS5USFJFU0hPTEQpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNFTExFUl9GRUVfQkFTSVNfUE9JTlRTX01BWCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc05hbWUgPSAobmFtZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICduYW1lJztcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgobmFtZSkgPiBOQU1FX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIG5hbWUsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IE5BTUVfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU3ltYm9sID0gKHN5bWJvbDogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdzeW1ib2wnO1xuICAgICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBzeW1ib2wpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoc3ltYm9sKSA+IFNZTUJPTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBzeW1ib2wsIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFNZTUJPTF9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNJbWFnZVVybCA9IChpbWFnZTogc3RyaW5nKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+XG4gICAgaXNVcmlPckltYWdlKGltYWdlLCAnaW1hZ2UnKTtcblxuICBleHBvcnQgY29uc3QgY2hlY2tBbGwgPSA8XG4gICAgVCBleHRlbmRzIFBpY2tOZnRTdG9yYWdlIHwgUGlja05mdFN0b3JhZ2VNZXRhcGxleCB8IFBpY2tNZXRhcGxleFxuICA+KFxuICAgIG1ldGFkYXRhOiBUXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1JveWFsdHkobWV0YWRhdGEucm95YWx0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyRmVlQmFzaXNQb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNOYW1lKG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTeW1ib2wobWV0YWRhdGEuc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRXJyKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnJlcy5lcnJvci5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdDYXVnaHQgaW4gdGhlIHZhbGlkYXRpb24gZXJyb3JzLiBzZWUgaW5mb3JtYXRpb24gZS5nOiBlcnI8VmFsaWRhdG9yRXJyb3I+LmRldGFpbHMnO1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIHR5cGUgUGlja05mdFN0b3JhZ2UgPSBQaWNrPFxuICAgIEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ2ltYWdlJyB8ICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cydcbiAgPjtcbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4ID0gUGljazxcbiAgICBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3JveWFsdHknIHwgJ2ZpbGVQYXRoJ1xuICA+O1xuICB0eXBlIFBpY2tNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdFxuICApOiBWYWxpZGF0b3JFcnJvciA9PiB7XG4gICAgbGV0IGVycm9yOiBWYWxpZGF0b3JFcnJvcjtcbiAgICBpZiAobGltaXQpIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsLCBsaW1pdCB9XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvckVycm9yKG1lc3NhZ2UsIFt7IGtleSwgbWVzc2FnZSwgYWN0dWFsIH1dKTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9O1xuXG4gIGNvbnN0IGlzVXJpT3JJbWFnZSA9IChcbiAgICBpbWFnZU9yVXJpOiBzdHJpbmcsXG4gICAga2V5OiBzdHJpbmdcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGlmICghaW1hZ2VPclVyaSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoaW1hZ2VPclVyaSkgPiBVUkxfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgaW1hZ2VPclVyaSwge1xuICAgICAgICAgIHRocmVzaG9sZDogVVJMX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIS9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTs/OiY9KywlI10rL2cudGVzdChpbWFnZU9yVXJpKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuSU5WQUxJRF9VUkwsIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBkZXRhaWxzOiBEZXRhaWxzW107XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZGV0YWlsczogRGV0YWlsc1tdKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBjb252ZXJ0ID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFPLElBQVU7QUFBQSxDQUFWLENBQVVBLGFBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMsZ0JBQVY7QUFDRSxJQUFNQSxZQUFBLGdCQUFnQixDQUMzQixVQUNzQztBQUN0QyxVQUFJLENBQUMsT0FBTztBQUNWLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTztBQUFBLFFBQ0wsS0FBSyxNQUFNLFlBQVk7QUFBQSxRQUN2QixVQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFFTyxJQUFNQSxZQUFBLGVBQWUsQ0FDMUIsV0FDMEM7QUFDMUMsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU87QUFBQSxRQUNMLFNBQVMsT0FBTyxJQUFJLFNBQVM7QUFBQSxRQUM3QixVQUFVLE9BQU87QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFBQSxLQXpCZSxhQUFBRCxTQUFBLGVBQUFBLFNBQUE7QUFBQSxHQURGOzs7QUNBVixJQUFVRTtBQUFBLENBQVYsQ0FBVUEsYUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxjQUFWO0FBQ0UsSUFBTUEsVUFBQSxnQkFBZ0IsQ0FDM0IsVUFDc0M7QUFDdEMsVUFBSSxDQUFDLE9BQU87QUFDVixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU8sTUFBTSxJQUFJLENBQUMsU0FBUztBQUN6QixZQUFJLFNBQTBDO0FBQzlD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QVk7QUFDN0IsV0FBTyxLQUFLLE9BQU8sS0FBSyxFQUFFO0FBQUEsRUFDNUI7QUFFQSxRQUFNLGNBQWMsQ0FDbEIsS0FDQSxTQUNBLFFBQ0EsVUFDbUI7QUFDbkIsUUFBSTtBQUNKLFFBQUksT0FBTztBQUNULGNBQVEsSUFBSSxlQUFlLFNBQVMsQ0FBQyxFQUFFLEtBQUssU0FBUyxRQUFRLE1BQU0sQ0FBQyxDQUFDO0FBQUEsSUFDdkUsT0FBTztBQUNMLGNBQVEsSUFBSSxlQUFlLFNBQVMsQ0FBQyxFQUFFLEtBQUssU0FBUyxPQUFPLENBQUMsQ0FBQztBQUFBLElBQ2hFO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGVBQWUsQ0FDbkIsWUFDQSxRQUNtQztBQUNuQyxXQUFPLElBQUksTUFBTTtBQUNmLFVBQUksQ0FBQyxZQUFZO0FBQ2YsY0FBTSxZQUFZLEtBQUssUUFBUSxPQUFPLFVBQVU7QUFBQSxNQUNsRDtBQUNBLFVBQUksV0FBVyxVQUFVLElBQUlBLFdBQUEsWUFBWTtBQUN2QyxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsWUFBWTtBQUFBLFVBQ3RELFdBQVdBLFdBQUE7QUFBQSxVQUNYLFdBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNIO0FBQ0EsVUFBSSxDQUFDLDhDQUE4QyxLQUFLLFVBQVUsR0FBRztBQUNuRSxjQUFNLFlBQVksS0FBSyxRQUFRLGFBQWEsVUFBVTtBQUFBLE1BQ3hEO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQTlNZTtBQWlOVixJQUFNLGlCQUFOLGNBQTZCLE1BQU07QUFBQSxFQUV4QyxZQUFZLFNBQWlCLFNBQW9CO0FBQy9DLFVBQU0sT0FBTztBQUNiLFNBQUssVUFBVTtBQUFBLEVBQ2pCO0FBQ0Y7IiwKICAibmFtZXMiOiBbIkNvbnZlcnQiLCAiQ29sbGVjdGlvbiIsICJDb252ZXJ0IiwgIkNyZWF0b3JzIiwgIkNvbnZlcnQiLCAiVXNlcyIsICJDb252ZXJ0IiwgIlRva2VuTWV0YWRhdGEiLCAiY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUiLCAiQ29udmVydCIsICJOZnRNZXRhZGF0YSIsICJDb252ZXJ0IiwgIlByb3BlcnRpZXMiLCAiQ29udmVydCIsICJVc2VyU2lkZUlucHV0IiwgIlRva2VuU3RhbmRhcmQiLCAiX1NoYXJlZCIsICJVc2VNZXRob2QiLCAiUGRhIiwgIlJveWFsdHkiLCAiVmFsaWRhdG9yIiwgIk1lc3NhZ2UiXQp9Cg==