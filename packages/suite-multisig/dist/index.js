"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Account: () => Account4,
  Explorer: () => Explorer,
  FilterOptions: () => FilterOptions,
  FilterType: () => FilterType,
  ModuleName: () => ModuleName,
  Multisig: () => Multisig4,
  Node: () => Node,
  Try: () => Try,
  Validator: () => Validator,
  ValidatorError: () => ValidatorError,
  bufferToArray: () => bufferToArray,
  convertTimestampToDateTime: () => convertTimestampToDateTime,
  debugLog: () => debugLog,
  isBrowser: () => isBrowser,
  isNode: () => isNode,
  isPromise: () => isPromise,
  overwriteObject: () => overwriteObject,
  sleep: () => sleep,
  unixTimestamp: () => unixTimestamp
});
module.exports = __toCommonJS(src_exports);

// src/create.ts
var import_web310 = require("@solana/web3.js");
var import_buffer_layout = require("@solana/buffer-layout");
var import_spl_token2 = require("@solana/spl-token");

// ../shared/src/constants.ts
var import_web3 = require("@solana/web3.js");
var import_load = __toESM(require("@solana-suite/config/load"));
var Config = import_load.default;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    const THRESHHOLD = 7;
    let isDisplay = false;
    WarnningMessage2.NFT_STORAGE_API_KEY = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update nftStorageApiKey define parameter in solana-suite.json.
        Can get api key from https://nft.storage/
        --------------------------------------
        `;
    WarnningMessage2.DAS_API_URL = `
        [YOU HAVE TO DO]
        --------------------------------------
        You need to update dasApiUrl define parameter in solana-suite.json.
        can get api url from https://www.helius.dev/
        -------------------------------------- 
        `;
    WarnningMessage2.calculateProbability = () => {
      const randomValue = Math.random();
      const probability = 1 / THRESHHOLD;
      if (!isDisplay && randomValue < probability) {
        isDisplay = true;
        return true;
      }
      return false;
    };
  })(WarnningMessage = Constants2.WarnningMessage || (Constants2.WarnningMessage = {}));
})(Constants || (Constants = {}));
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.nftStorageApiKey = Config.nftStorageApiKey;
  Constants2.dasApiUrl = Config.dasApiUrl;
  let Cluster;
  ((Cluster2) => {
    Cluster2["prd"] = "mainnet-beta";
    Cluster2["prdMetaplex"] = "mainnet-beta-metaplex";
    Cluster2["dev"] = "devnet";
    Cluster2["test"] = "testnet";
    Cluster2["localhost"] = "localhost-devnet";
  })(Cluster = Constants2.Cluster || (Constants2.Cluster = {}));
  let EndPointUrl;
  ((EndPointUrl2) => {
    EndPointUrl2["prd"] = "https://api.mainnet-beta.solana.com";
    EndPointUrl2["prdMetaplex"] = "https://api.metaplex.solana.com";
    EndPointUrl2["dev"] = "https://api.devnet.solana.com";
    EndPointUrl2["test"] = "https://api.testnet.solana.com";
    EndPointUrl2["localhost"] = "http://api.devnet.solana.com";
  })(EndPointUrl = Constants2.EndPointUrl || (Constants2.EndPointUrl = {}));
  let BundlrUrl;
  ((BundlrUrl2) => {
    BundlrUrl2["prd"] = "https://node1.irys.xyz,https://node2.irys.xyz";
    BundlrUrl2["dev"] = "https://devnet.irys.xyz";
  })(BundlrUrl = Constants2.BundlrUrl || (Constants2.BundlrUrl = {}));
  let DasApiUrl;
  ((DasApiUrl2) => {
    DasApiUrl2["dev"] = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639";
  })(DasApiUrl = Constants2.DasApiUrl || (Constants2.DasApiUrl = {}));
  let NftstorageApiKey;
  ((NftstorageApiKey2) => {
    NftstorageApiKey2["dev"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
  })(NftstorageApiKey = Constants2.NftstorageApiKey || (Constants2.NftstorageApiKey = {}));
  Constants2.loadConfig = async () => {
    Config = await import("@solana-suite/config/load");
  };
  Constants2.switchCluster = (param) => {
    const { cluster: env, customClusterUrl: customClusterUrl2 } = param;
    if (customClusterUrl2 && customClusterUrl2.length > 0) {
      const index = Date.now() % customClusterUrl2.length;
      return customClusterUrl2[index];
    }
    switch (env) {
      case "mainnet-beta" /* prd */:
        return "https://api.mainnet-beta.solana.com" /* prd */;
      case "mainnet-beta-metaplex" /* prdMetaplex */:
        return "https://api.metaplex.solana.com" /* prdMetaplex */;
      case "testnet" /* test */:
        return "https://api.testnet.solana.com" /* test */;
      case "devnet" /* dev */:
        return "https://api.devnet.solana.com" /* dev */;
      default:
        return "http://api.devnet.solana.com" /* localhost */;
    }
  };
  Constants2.switchBundlr = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */: {
        const urls = "https://node1.irys.xyz,https://node2.irys.xyz" /* prd */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        return "https://devnet.irys.xyz" /* dev */;
      }
    }
  };
  Constants2.switchDasApi = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */: {
        if (Constants2.dasApiUrl.length < 1) {
          throw Error(Constants2.WarnningMessage.DAS_API_URL);
        }
        const urls = "https://node1.irys.xyz,https://node2.irys.xyz" /* prd */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
      default: {
        const urls = "https://devnet.helius-rpc.com/?api-key=15319bf4-5b40-4958-ac8d-6313aa55eb92,https://rpc-devnet.helius.xyz?api-key=9f70a843-3274-4ffd-a0a9-323f8b7c0639" /* dev */.split(",");
        const index = Date.now() % urls.length;
        return urls[index];
      }
    }
  };
  Constants2.switchNftStorage = (env) => {
    switch (env) {
      case "mainnet-beta" /* prd */:
        if (!Constants2.nftStorageApiKey) {
          throw Error(Constants2.WarnningMessage.NFT_STORAGE_API_KEY);
        }
        return Constants2.nftStorageApiKey;
      default: {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE" /* dev */;
      }
    }
  };
  Constants2.WRAPPED_TOKEN_PROGRAM_ID = new import_web3.PublicKey(
    "So11111111111111111111111111111111111111112"
  );
  Constants2.MEMO_PROGRAM_ID = new import_web3.PublicKey(
    "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
  );
  Constants2.METAPLEX_PROGRAM_ID = new import_web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  Constants2.COMMITMENT = "confirmed";
  Constants2.NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
  Constants2.IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
  Constants2.BUNDLR_NETWORK_URL = (0, Constants2.switchBundlr)(Config.cluster.type);
  Constants2.DAS_API_URL = (0, Constants2.switchDasApi)(Config.cluster.type);
  Constants2.NFT_STORAGE_API_KEY = (0, Constants2.switchNftStorage)(Config.cluster.type);
  Constants2.EXPLORER_SOLSCAN_URL = "https://solscan.io";
  Constants2.EXPLORER_SOLANAFM_URL = "https://solana.fm";
  Constants2.EXPLORER_XRAY_URL = "https://xray.helius.xyz";
})(Constants || (Constants = {}));

// ../transaction-builder/src/batch.ts
var import_web34 = require("@solana/web3.js");

// ../node/src/index.ts
var import_web32 = require("@solana/web3.js");
var Node;
((Node2) => {
  const setted = {
    clusterUrl: "",
    commitment: Constants.COMMITMENT,
    customClusterUrl: []
  };
  Node2.getConnection = () => {
    if (setted.customClusterUrl.length > 0) {
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: setted.customClusterUrl
      });
    } else if (Constants.customClusterUrl.length > 0) {
      setted.clusterUrl = Constants.switchCluster({
        customClusterUrl: Constants.customClusterUrl
      });
    } else if (!setted.clusterUrl) {
      setted.clusterUrl = Constants.switchCluster({
        cluster: Constants.currentCluster
      });
    }
    if (!setted.commitment) {
      setted.commitment = Constants.COMMITMENT;
    }
    return new import_web32.Connection(setted.clusterUrl, setted.commitment);
  };
  Node2.changeConnection = (param) => {
    setted.clusterUrl = "";
    setted.customClusterUrl = [];
    setted.commitment = Constants.COMMITMENT;
    const { cluster, commitment, customClusterUrl } = param;
    if (commitment) {
      setted.commitment = commitment;
      debugLog("# Node change commitment: ", setted.commitment);
    }
    if (cluster) {
      setted.clusterUrl = Constants.switchCluster({ cluster });
      debugLog("# Node change clusterUrl: ", setted.clusterUrl);
    }
    if (customClusterUrl) {
      debugLog("# customClusterUrl: ", customClusterUrl);
      setted.clusterUrl = Constants.switchCluster({ customClusterUrl });
      setted.customClusterUrl = customClusterUrl;
      debugLog(
        "# Node change cluster, custom cluster url: ",
        setted.clusterUrl
      );
    }
  };
  Node2.confirmedSig = async (signature, commitment = Constants.COMMITMENT) => {
    const connection = Node2.getConnection();
    const latestBlockhash = await connection.getLatestBlockhash();
    return await connection.confirmTransaction(
      {
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature
      },
      commitment
    ).then(Result.ok).catch(Result.err);
  };
})(Node || (Node = {}));

// ../transaction-builder/src/common.ts
var import_web33 = require("@solana/web3.js");
var MAX_RETRIES = 3;
var TransactionBuilder;
((TransactionBuilder7) => {
  class Common2 {
    static MAX_TRANSACTION_SIZE = 1232;
    instructions;
    signers;
    feePayer;
    data;
    constructor(instructions, signers, feePayer, data) {
      this.instructions = instructions;
      this.signers = signers;
      this.feePayer = feePayer;
      this.data = data;
    }
    submit = async () => {
      return Try(async () => {
        if (!(this instanceof Common2)) {
          throw Error("only Instruction object that can use this");
        }
        const transaction = new import_web33.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        return await (0, import_web33.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Common = Common2;
})(TransactionBuilder || (TransactionBuilder = {}));

// ../shared/src/shared.ts
var bufferToArray = (buffer) => {
  const nums = [];
  for (const byte of buffer) {
    nums.push(buffer[byte]);
  }
  return nums;
};
var overwriteObject = (object, targets) => {
  const that = object;
  targets.forEach((target) => {
    delete that[target.existsKey];
    that[target.will.key] = target.will.value;
  });
  return that;
};
var debugLog = (data1, data2 = "", data3 = "", data4 = "") => {
  if (Constants.isDebugging === "true" || process.env.DEBUG === "true") {
    console.log("[DEBUG]", data1, data2, data3, data4);
  }
};
var sleep = async (sec) => {
  return new Promise((r) => setTimeout(r, sec * 1e3));
};
var isBrowser = () => {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
};
var isNode = () => {
  return typeof process !== "undefined" && process.versions != null && process.versions.node != null;
};
var isPromise = (obj) => {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};
function Try(input, finallyInput) {
  try {
    const v = input();
    if (isPromise(v)) {
      return v.then(
        (x) => Result.ok(x),
        (err) => Result.err(err)
      );
    } else {
      return Result.ok(v);
    }
  } catch (e) {
    if (e instanceof Error) {
      return Result.err(e);
    }
    return Result.err(Error(e));
  } finally {
    if (finallyInput) {
      debugLog("# finally input:", finallyInput);
      finallyInput();
    }
  }
}
var convertTimestampToDateTime = (created_at) => {
  if (created_at) {
    return new Date(created_at * 1e3);
  }
  return;
};
var unixTimestamp = () => {
  return Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
};

// ../transaction-builder/src/batch.ts
var TransactionBuilder2;
((TransactionBuilder7) => {
  class Batch {
    submit = async (arr) => {
      return Try(async () => {
        let i = 0;
        for (const a of arr) {
          if (!a.instructions && !a.signers) {
            throw Error(
              `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`
            );
          }
          i++;
        }
        const instructions = arr.flatMap((a) => a.instructions);
        const signers = arr.flatMap((a) => a.signers);
        const feePayers = arr.filter((a) => a.feePayer !== void 0);
        let feePayer = signers[0];
        if (feePayers.length > 0 && feePayers[0].feePayer) {
          feePayer = feePayers[0].feePayer;
        }
        const transaction = new import_web34.Transaction();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        return await (0, import_web34.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Batch = Batch;
})(TransactionBuilder2 || (TransactionBuilder2 = {}));

// ../transaction-builder/src/mint.ts
var import_web35 = require("@solana/web3.js");
var TransactionBuilder3;
((TransactionBuilder7) => {
  class Mint {
    instructions;
    signers;
    feePayer;
    data;
    constructor(instructions, signers, feePayer, data) {
      this.instructions = instructions;
      this.signers = signers;
      this.data = data;
      this.feePayer = feePayer;
    }
    submit = async () => {
      return Try(async () => {
        if (!(this instanceof Mint)) {
          throw Error("only MintInstruction object that can use this");
        }
        const transaction = new import_web35.Transaction();
        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;
        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.forEach((inst) => transaction.add(inst));
        const options = {
          maxRetries: MAX_RETRIES
        };
        if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
          debugLog("# Change metaplex cluster on mainnet-beta");
          Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
        }
        return await (0, import_web35.sendAndConfirmTransaction)(
          Node.getConnection(),
          transaction,
          finalSigners,
          options
        );
      });
    };
  }
  TransactionBuilder7.Mint = Mint;
})(TransactionBuilder3 || (TransactionBuilder3 = {}));

// ../transaction-builder/src/partial-sign.ts
var import_web36 = require("@solana/web3.js");
var TransactionBuilder4;
((TransactionBuilder7) => {
  class PartialSign {
    hexInstruction;
    data;
    canSubmit;
    constructor(instructions, mint, canSubmit = false) {
      this.hexInstruction = instructions;
      this.data = mint;
      this.canSubmit = canSubmit;
    }
    submit = async (feePayer) => {
      return Try(async () => {
        if (!(this instanceof PartialSign)) {
          throw Error("only PartialSignInstruction object that can use this");
        }
        const decode = Buffer.from(this.hexInstruction, "hex");
        const transactionFromJson = import_web36.Transaction.from(decode);
        transactionFromJson.partialSign(feePayer.toKeypair());
        const options = {
          maxRetries: MAX_RETRIES
        };
        const wireTransaction = transactionFromJson.serialize();
        return await Node.getConnection().sendRawTransaction(
          wireTransaction,
          options
        );
      });
    };
  }
  TransactionBuilder7.PartialSign = PartialSign;
})(TransactionBuilder4 || (TransactionBuilder4 = {}));

// ../transaction-builder/src/calculate-txsize.ts
var TransactionBuilder5;
((TransactionBuilder7) => {
  const LOW_VALUE = 127;
  const HIGH_VALUE = 16383;
  const MAX_TRANSACTION_SIZE = 1232;
  const compactHeader = (n) => n <= LOW_VALUE ? 1 : n <= HIGH_VALUE ? 2 : 3;
  const compactArraySize = (n, size) => compactHeader(n) + n * size;
  TransactionBuilder7.calculateTxSize = (transaction, feePayer) => {
    const feePayerPk = [feePayer.toBase58()];
    const signers = new Set(feePayerPk);
    const accounts = new Set(feePayerPk);
    const ixsSize = transaction.instructions.reduce((acc, ix) => {
      ix.keys.forEach(({ pubkey, isSigner }) => {
        const pk = pubkey.toBase58();
        if (isSigner)
          signers.add(pk);
        accounts.add(pk);
      });
      accounts.add(ix.programId.toBase58());
      const nIndexes = ix.keys.length;
      const opaqueData = ix.data.length;
      return acc + 1 + // PID index
      compactArraySize(nIndexes, 1) + compactArraySize(opaqueData, 1);
    }, 0);
    return compactArraySize(signers.size, 64) + // signatures
    3 + // header
    compactArraySize(accounts.size, 32) + // accounts
    32 + // blockhash
    compactHeader(transaction.instructions.length) + // instructions
    ixsSize;
  };
  TransactionBuilder7.isOverTransactionSize = (transaction, feePayer) => {
    return (0, TransactionBuilder7.calculateTxSize)(transaction, feePayer) > MAX_TRANSACTION_SIZE;
  };
})(TransactionBuilder5 || (TransactionBuilder5 = {}));

// ../types/src/global/index.ts
var Explorer = /* @__PURE__ */ ((Explorer2) => {
  Explorer2["Solscan"] = "solscan";
  Explorer2["SolanaFM"] = "solanafm";
  Explorer2["Xray"] = "xray";
  return Explorer2;
})(Explorer || {});

// ../global/src/index.ts
var import_web39 = require("@solana/web3.js");

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");

// ../account/src/keypair.ts
var import_web37 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var Account;
((Account5) => {
  class Keypair5 {
    secret;
    pubkey;
    constructor(params) {
      if (!params.pubkey) {
        const keypair = params.secret.toKeypair();
        this.pubkey = keypair.publicKey.toString();
      } else {
        this.pubkey = params.pubkey;
      }
      this.secret = params.secret;
    }
    toPublicKey() {
      return new import_web37.PublicKey(this.pubkey);
    }
    toKeypair() {
      const decoded = import_bs58.default.decode(this.secret);
      return import_web37.Keypair.fromSecretKey(decoded);
    }
    static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
    static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
    static create = () => {
      const keypair = import_web37.Keypair.generate();
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair5({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair5;
})(Account || (Account = {}));

// ../account/src/associated.ts
var Account2;
((Account5) => {
  let Associated;
  ((Associated2) => {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    const get = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
      const res = await (0, Associated2.makeOrCreateInstruction)(
        mint,
        owner,
        new Account.Keypair({ secret: feePayer }).pubkey,
        allowOwnerOffCurve
      );
      if (!res.inst) {
        return res.tokenAccount;
      }
      return new TransactionBuilder6.Common(
        [res.inst],
        [],
        feePayer.toKeypair(),
        res.tokenAccount
      );
    };
    Associated2.retryGetOrCreate = async (mint, owner, feePayer) => {
      let counter = 1;
      while (counter < RETRY_OVER_LIMIT) {
        try {
          const inst = await get(mint, owner, feePayer, true);
          if (inst && typeof inst === "string") {
            debugLog("# associatedTokenAccount: ", inst);
            return inst;
          } else if (inst instanceof TransactionBuilder6.Common) {
            (await inst.submit()).map(
              async (ok) => {
                await Node.confirmedSig(ok);
                return inst.data;
              },
              (err) => {
                debugLog("# Error submit retryGetOrCreate: ", err);
                throw err;
              }
            );
          }
        } catch (e) {
          debugLog(`# retry: ${counter} create token account: `, e);
          debugLog(`# mint: ${mint}, owner: ${owner}, feePayer: ${feePayer}`);
        }
        await sleep(RETRY_SLEEP_TIME);
        counter++;
      }
      throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
    };
    Associated2.makeOrCreateInstruction = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
      const associatedTokenAccount = (0, import_spl_token.getAssociatedTokenAddressSync)(
        mint.toPublicKey(),
        owner.toPublicKey(),
        allowOwnerOffCurve,
        import_spl_token.TOKEN_PROGRAM_ID,
        import_spl_token.ASSOCIATED_TOKEN_PROGRAM_ID
      );
      debugLog("# associatedTokenAccount: ", associatedTokenAccount.toString());
      try {
        await (0, import_spl_token.getAccount)(
          Node.getConnection(),
          associatedTokenAccount,
          Node.getConnection().commitment,
          import_spl_token.TOKEN_PROGRAM_ID
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst: void 0
        };
      } catch (error) {
        if (!(error instanceof import_spl_token.TokenAccountNotFoundError) && !(error instanceof import_spl_token.TokenInvalidAccountOwnerError)) {
          throw Error("Unexpected error");
        }
        const payer = !feePayer ? owner : feePayer;
        const inst = (0, import_spl_token.createAssociatedTokenAccountInstruction)(
          payer.toPublicKey(),
          associatedTokenAccount,
          owner.toPublicKey(),
          mint.toPublicKey(),
          import_spl_token.TOKEN_PROGRAM_ID,
          import_spl_token.ASSOCIATED_TOKEN_PROGRAM_ID
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst
        };
      }
    };
  })(Associated = Account5.Associated || (Account5.Associated = {}));
})(Account2 || (Account2 = {}));

// ../account/src/pda.ts
var import_web38 = require("@solana/web3.js");
var import_mpl_token_metadata = require("@metaplex-foundation/mpl-token-metadata");
var import_mpl_bubblegum = require("@metaplex-foundation/mpl-bubblegum");
var import_bn = __toESM(require("bn.js"));
var Account3;
((Account5) => {
  let Pda;
  ((Pda2) => {
    Pda2.getMetadata = (address) => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          import_mpl_token_metadata.PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer()
        ],
        import_mpl_token_metadata.PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getMasterEdition = (address) => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          import_mpl_token_metadata.PROGRAM_ID.toBuffer(),
          address.toPublicKey().toBuffer(),
          Buffer.from("edition")
        ],
        import_mpl_token_metadata.PROGRAM_ID
      );
      return publicKey;
    };
    Pda2.getTreeAuthority = (address) => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [address.toPublicKey().toBuffer()],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getBgumSigner = () => {
      const [publicKey] = import_web38.PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf8")],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return publicKey;
    };
    Pda2.getAssetId = (address, leafIndex) => {
      const node = new import_bn.default.BN(leafIndex);
      const [assetId] = import_web38.PublicKey.findProgramAddressSync(
        [
          Buffer.from("asset", "utf8"),
          address.toPublicKey().toBuffer(),
          Uint8Array.from(node.toArray("le", 8))
        ],
        import_mpl_bubblegum.MPL_BUBBLEGUM_PROGRAM_ID.toPublicKey()
      );
      return assetId.toString();
    };
  })(Pda = Account5.Pda || (Account5.Pda = {}));
})(Account3 || (Account3 = {}));

// ../account/src/index.ts
var Account4 = {
  ...Account2,
  ...Account,
  ...Account3
};

// ../global/src/index.ts
var import_bignumber = require("bignumber.js");
var import_bs582 = __toESM(require("bs58"));
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */, options = {}) {
  const endPointUrl = Node.getConnection().rpcEndpoint;
  debugLog("# toExplorerUrl rpcEndpoint:", endPointUrl);
  let cluster = "";
  if (endPointUrl === Constants.EndPointUrl.prd) {
    cluster = Constants.Cluster.prd;
  } else if (endPointUrl === Constants.EndPointUrl.test) {
    cluster = Constants.Cluster.test;
  } else if (endPointUrl === Constants.EndPointUrl.dev) {
    cluster = Constants.Cluster.dev;
  } else {
    cluster = Constants.Cluster.dev;
  }
  const addressOrSignature = this.toString();
  let url = "";
  if (options.replacePath) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/${options.replacePath}/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/${options.replacePath}/${addressOrSignature}?cluster=${cluster}`;
    }
    return url;
  }
  if (Account4.Keypair.isPubkey(addressOrSignature)) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/address/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/account/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/account/${addressOrSignature}?cluster=${cluster}`;
    }
  } else {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `${Constants.EXPLORER_SOLANAFM_URL}/tx/${addressOrSignature}?cluster=${cluster}`;
    } else if (explorer === "xray" /* Xray */) {
      url = `${Constants.EXPLORER_XRAY_URL}/tx/${addressOrSignature}?network=${cluster}`;
    } else {
      url = `${Constants.EXPLORER_SOLSCAN_URL}/tx/${addressOrSignature}?cluster=${cluster}`;
    }
  }
  return url;
};
String.prototype.toPublicKey = function() {
  if (!Account4.Keypair.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new import_web39.PublicKey(this.toString());
};
String.prototype.toKeypair = function() {
  if (!Account4.Keypair.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = import_bs582.default.decode(this.toString());
  return import_web39.Keypair.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return (0, import_bignumber.BigNumber)(this).div(import_web39.LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return (0, import_bignumber.BigNumber)(this).times(import_web39.LAMPORTS_PER_SOL).toNumber();
};

// ../transaction-builder/src/index.ts
var TransactionBuilder6 = {
  ...TransactionBuilder2,
  ...TransactionBuilder5,
  ...TransactionBuilder3,
  ...TransactionBuilder,
  ...TransactionBuilder4
};

// ../shared/src/result.ts
var AbstractResult = class {
  unwrap(ok, err) {
    const r = this._chain(
      (value) => Result.ok(ok ? ok(value) : value),
      (error) => err ? Result.ok(err(error)) : Result.err(error)
    );
    if (r.isErr) {
      throw r.error;
    }
    return r.value;
  }
  map(ok, err) {
    return this._chain(
      (value) => Result.ok(ok(value)),
      (error) => Result.err(err ? err(error) : error)
    );
  }
  chain(ok, err) {
    return this._chain(ok, err || ((error) => Result.err(error)));
  }
  match(ok, err) {
    this._chain(
      (value) => Result.ok(ok(value)),
      (error) => Result.err(err(error))
    );
  }
  /// single TransactionBuilder ////
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async submit(feePayer) {
    const res = this.map(
      async (ok) => {
        debugLog("# result single submit: ", ok);
        if (feePayer) {
          const obj = ok;
          return await obj.submit(feePayer);
        } else {
          const obj = ok;
          return await obj.submit();
        }
      },
      (err) => {
        return err;
      }
    );
    if (res.isErr) {
      return Result.err(res.error);
    }
    return res.value;
  }
};
Array.prototype.submit = async function(feePayer) {
  if (feePayer) {
    let i = 1;
    for await (const obj of this) {
      if (obj.isErr) {
        return obj;
      } else if (obj.value.canSubmit) {
        debugLog("# Result batch canSubmit");
        const sig = await obj.submit(feePayer);
        if (sig.isErr) {
          return sig;
        }
        await Node.confirmedSig(sig.value);
      } else {
        debugLog("# Result batch other than canSubmit");
        if (this.length == i) {
          return obj.submit(feePayer);
        }
        obj.submit(feePayer);
      }
      i++;
    }
  } else {
    const instructions = [];
    for (const obj of this) {
      if (obj.isErr) {
        return obj;
      } else if (obj.isOk) {
        instructions.push(obj.value);
      } else {
        return Result.err(Error("Only Array Instruction object"));
      }
    }
    debugLog("# Result batch submit: ", instructions);
    return new TransactionBuilder6.Batch().submit(instructions);
  }
};
var InternalOk = class extends AbstractResult {
  constructor(value) {
    super();
    this.value = value;
  }
  isOk = true;
  isErr = false;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  _chain(ok, _err) {
    return ok(this.value);
  }
};
var InternalErr = class extends AbstractResult {
  constructor(error) {
    super();
    this.error = error;
  }
  isOk = false;
  isErr = true;
  _chain(_ok, err) {
    return err(this.error);
  }
};
var Result;
((Result10) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result10.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result10.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result10.ok(resArr);
    }
    const res = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
      const item = obj[key];
      if (item.isErr) {
        return item;
      }
      res[key] = item.value;
    }
    return Result10.ok(res);
  }
  Result10.all = all;
})(Result || (Result = {}));

// ../converter/src/collection.ts
var Converter;
((Converter15) => {
  let Collection;
  ((Collection2) => {
    Collection2.intoInfra = (input) => {
      if (!input) {
        return null;
      }
      return {
        key: input.toPublicKey(),
        verified: false
      };
    };
    Collection2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        address: output.key.toString(),
        verified: output.verified
      };
    };
  })(Collection = Converter15.Collection || (Converter15.Collection = {}));
  let CollectionMint;
  ((CollectionMint2) => {
    CollectionMint2.intoUser = (output) => {
      const res = output.find((value) => {
        if (value.group_key === "collection") {
          return value.group_value;
        }
      });
      return res ? res.group_value : "";
    };
  })(CollectionMint = Converter15.CollectionMint || (Converter15.CollectionMint = {}));
})(Converter || (Converter = {}));

// ../converter/src/creators.ts
var Converter2;
((Converter15) => {
  let Creators;
  ((Creators2) => {
    Creators2.intoInfra = (input) => {
      if (!input) {
        return null;
      }
      return input.map((data) => {
        return {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
      });
    };
    Creators2.intoCompressedNftInfra = (input) => {
      if (!input) {
        return [];
      }
      return input.map((data) => {
        return {
          address: data.address.toPublicKey(),
          share: data.share,
          verified: false
        };
      });
    };
    Creators2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return output.map((data) => {
        return {
          address: data.address.toString(),
          share: data.share,
          verified: data.verified
        };
      });
    };
  })(Creators = Converter15.Creators || (Converter15.Creators = {}));
})(Converter2 || (Converter2 = {}));

// ../converter/src/royalty.ts
var Converter3;
((Converter15) => {
  let Royalty;
  ((Royalty2) => {
    Royalty2.THRESHOLD = 100;
    Royalty2.intoInfra = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
    Royalty2.intoUser = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
  })(Royalty = Converter15.Royalty || (Converter15.Royalty = {}));
})(Converter3 || (Converter3 = {}));

// ../converter/src/compressed-nft-metadata.ts
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
var Converter4;
((Converter15) => {
  let CompressedNftMetadata;
  ((CompressedNftMetadata2) => {
    CompressedNftMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoCompressedNftInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null,
        primarySaleHappened: false,
        isMutable: input.isMutable ?? false,
        editionNonce: 0,
        tokenStandard: import_mpl_bubblegum_instruction.TokenStandard.NonFungible,
        tokenProgramVersion: import_mpl_bubblegum_instruction.TokenProgramVersion.Original
      };
    };
    CompressedNftMetadata2.intoUser = (output) => {
      return {
        mint: output.onchain.id.toString(),
        collectionMint: Converter.CollectionMint.intoUser(
          output.onchain.grouping
        ),
        authorities: output.onchain.authorities,
        royalty: Converter3.Royalty.intoUser(output.onchain.royalty.percent),
        name: output.onchain.content.metadata.name,
        symbol: output.onchain.content.metadata.symbol,
        uri: output.onchain.content.json_uri,
        creators: Converter2.Creators.intoUser(output.onchain.creators),
        treeAddress: output.onchain.compression.tree,
        isCompressed: output.onchain.compression.compressed,
        isMutable: output.onchain.mutable,
        isBurn: output.onchain.burnt,
        editionNonce: output.onchain.supply.edition_nonce,
        primarySaleHappened: output.onchain.royalty.primary_sale_happened,
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(CompressedNftMetadata = Converter15.CompressedNftMetadata || (Converter15.CompressedNftMetadata = {}));
})(Converter4 || (Converter4 = {}));

// ../converter/src/memo.ts
var Converter5;
((Converter15) => {
  let Memo;
  ((Memo2) => {
    Memo2.intoUserSide = (output, meta, outputTransfer, mappingTokenAccount) => {
      const history = {};
      if (outputTransfer && outputTransfer.program !== "") {
        if (mappingTokenAccount && outputTransfer.program === "spl-token") {
          const foundSource = mappingTokenAccount.find(
            (m) => m.account === outputTransfer.parsed.info.source
          );
          const foundDest = mappingTokenAccount.find(
            (m) => m.account === outputTransfer.parsed.info.destination
          );
          history.mint = outputTransfer.parsed.info.mint;
          foundSource && (history.source = foundSource.owner);
          foundDest && (history.destination = foundDest.owner);
        } else {
          history.source = outputTransfer.parsed.info.source;
          history.destination = outputTransfer.parsed.info.destination;
        }
      }
      history.memo = output.parsed;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Memo = Converter15.Memo || (Converter15.Memo = {}));
})(Converter5 || (Converter5 = {}));

// ../converter/src/mint.ts
var Converter6;
((Converter15) => {
  let Mint;
  ((Mint2) => {
    Mint2.intoUserSide = (output, meta) => {
      const history = {};
      history.mint = output.parsed.info.mint;
      history.mintAuthority = output.parsed.info.mintAuthority;
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.account = output.parsed.info.account;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Mint = Converter15.Mint || (Converter15.Mint = {}));
})(Converter6 || (Converter6 = {}));

// ../converter/src/collection-details.ts
var Converter7;
((Converter15) => {
  let CollectionDetails;
  ((CollectionDetails2) => {
    CollectionDetails2.intoUser = (output) => {
      if (!output) {
        return void 0;
      }
      return {
        __kind: output.__kind,
        size: parseInt(output.size.toString(10))
      };
    };
  })(CollectionDetails = Converter15.CollectionDetails || (Converter15.CollectionDetails = {}));
})(Converter7 || (Converter7 = {}));

// ../converter/src/uses.ts
var Converter8;
((Converter15) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Converter15.Uses || (Converter15.Uses = {}));
})(Converter8 || (Converter8 = {}));

// ../converter/src/token-metadata.ts
var Converter9;
((Converter15) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfra(input.creators),
        collection: null,
        uses: input.uses || null
      };
    };
    TokenMetadata2.intoUser = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.name),
        symbol: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.symbol),
        tokenAmount,
        uri: (0, TokenMetadata2.deleteNullStrings)(output.onchain.data.uri),
        creators: Converter2.Creators.intoUser(output.onchain.data.creators),
        uses: Converter8.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter15.TokenMetadata || (Converter15.TokenMetadata = {}));
})(Converter9 || (Converter9 = {}));

// ../converter/src/regular-nft-metadata.ts
var Converter10;
((Converter15) => {
  let RegularNftMetadata;
  ((RegularNftMetadata2) => {
    RegularNftMetadata2.intoInfra = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfra(input.creators),
        collection: Converter.Collection.intoInfra(input.collection),
        uses: input.uses || null
      };
    };
    RegularNftMetadata2.intoUser = (output) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Converter9.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Converter9.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        uri: Converter9.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Converter2.Creators.intoUser(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUser(output.onchain.collection),
        collectionDetails: Converter7.CollectionDetails.intoUser(
          output.onchain.collectionDetails
        ),
        uses: Converter8.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(RegularNftMetadata = Converter15.RegularNftMetadata || (Converter15.RegularNftMetadata = {}));
})(Converter10 || (Converter10 = {}));

// ../converter/src/properties.ts
var Converter11;
((Converter15) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfra = async (input, callbackFunc, storageType, feePayer) => {
      if (!input || !input.files) {
        return {};
      }
      const files = await Promise.all(
        input.files.map(async (file) => {
          if (!file.filePath) {
            return {};
          }
          const res = await callbackFunc(file.filePath, storageType, feePayer);
          if (res.isErr) {
            throw Error(res.error.message);
          }
          return overwriteObject(file, [
            {
              existsKey: "filePath",
              will: { key: "uri", value: res.value }
            }
          ]);
        })
      );
      return { ...input, files };
    };
  })(Properties = Converter15.Properties || (Converter15.Properties = {}));
})(Converter11 || (Converter11 = {}));

// ../converter/src/transfer-checked.ts
var Converter12;
((Converter15) => {
  let TransferChecked;
  ((TransferChecked2) => {
    TransferChecked2.intoUserSide = (output, meta, mappingTokenAccount) => {
      const history = {};
      if (mappingTokenAccount) {
        const foundSource = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.source
        );
        const foundDest = mappingTokenAccount.find(
          (m) => m.account === output.parsed.info.destination
        );
        foundSource && (history.source = foundSource.owner);
        foundDest && (history.destination = foundDest.owner);
      }
      history.tokenAmount = output.parsed.info.tokenAmount;
      history.mint = output.parsed.info.mint;
      history.multisigAuthority = output.parsed.info.multisigAuthority;
      history.signers = output.parsed.info.signers;
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(TransferChecked = Converter15.TransferChecked || (Converter15.TransferChecked = {}));
})(Converter12 || (Converter12 = {}));

// ../converter/src/transfer.ts
var Converter13;
((Converter15) => {
  let Transfer;
  ((Transfer2) => {
    Transfer2.intoUserSide = (output, meta) => {
      const history = {};
      if (!output.parsed.info.destination || !output.parsed.info.lamports) {
        return;
      }
      history.source = output.parsed.info.source;
      history.destination = output.parsed.info.destination;
      history.sol = output.parsed.info.lamports?.toSol().toString();
      history.type = output.program;
      history.dateTime = convertTimestampToDateTime(meta.blockTime);
      history.sig = meta.transaction.signatures[0];
      history.innerInstruction = false;
      if (meta.meta?.innerInstructions && meta.meta?.innerInstructions.length !== 0) {
        history.innerInstruction = true;
      }
      return history;
    };
  })(Transfer = Converter15.Transfer || (Converter15.Transfer = {}));
})(Converter13 || (Converter13 = {}));

// ../converter/src/index.ts
var Converter14 = {
  ...Converter4,
  ...Converter,
  ...Converter2,
  ...Converter5,
  ...Converter6,
  ...Converter10,
  ...Converter11,
  ...Converter3,
  ...Converter9,
  ...Converter12,
  ...Converter13,
  ...Converter8
};

// ../validator/src/index.ts
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
  Validator2.ROYALTY_MIN = 0;
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
      } else if (royalty > Validator2.ROYALTY_MAX * Converter14.Royalty.THRESHOLD) {
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
            if (key in metadata && metadata.royalty) {
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
  details;
  constructor(message, details) {
    super(message);
    this.details = details;
  }
};

// ../types/src/transaction-filter/index.ts
var FilterType = /* @__PURE__ */ ((FilterType2) => {
  FilterType2["Memo"] = "memo";
  FilterType2["Mint"] = "mint";
  FilterType2["OnlyMemo"] = "only-memo";
  FilterType2["Transfer"] = "transfer";
  return FilterType2;
})(FilterType || {});
var ModuleName = /* @__PURE__ */ ((ModuleName2) => {
  ModuleName2["SolNative"] = "system";
  ModuleName2["SplToken"] = "spl-token";
  return ModuleName2;
})(ModuleName || {});
var FilterOptions = {
  Transfer: {
    program: ["system", "spl-token"],
    action: ["transfer", "transferChecked"]
  },
  Memo: {
    program: ["spl-memo"],
    action: ["*"]
  },
  Mint: {
    program: ["spl-token"],
    action: ["mintTo", "mintToChecked"]
  }
};

// src/create.ts
var Multisig;
((Multisig5) => {
  Multisig5.create = async (m, feePayer, signerPubkeys) => {
    return Try(async () => {
      if (m > signerPubkeys.length) {
        throw Error("signers number less than m number");
      }
      const account = import_web310.Keypair.generate();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        MultisigInstruction.Layout.span
      );
      const inst1 = MultisigInstruction.account(
        account,
        feePayer.toKeypair(),
        balanceNeeded
      );
      const inst2 = MultisigInstruction.multisig(
        m,
        account,
        signerPubkeys.map((pubkey) => pubkey.toPublicKey())
      );
      return new TransactionBuilder6.Common(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString()
      );
    });
  };
})(Multisig || (Multisig = {}));
var MultisigInstruction;
((MultisigInstruction2) => {
  const createLayoutPubKey = (property) => {
    return (0, import_buffer_layout.blob)(32, property);
  };
  MultisigInstruction2.Layout = (0, import_buffer_layout.struct)([
    (0, import_buffer_layout.u8)("m"),
    (0, import_buffer_layout.u8)("n"),
    (0, import_buffer_layout.u8)("is_initialized"),
    createLayoutPubKey("signer1"),
    createLayoutPubKey("signer2"),
    createLayoutPubKey("signer3"),
    createLayoutPubKey("signer4"),
    createLayoutPubKey("signer5"),
    createLayoutPubKey("signer6"),
    createLayoutPubKey("signer7"),
    createLayoutPubKey("signer8"),
    createLayoutPubKey("signer9"),
    createLayoutPubKey("signer10"),
    createLayoutPubKey("signer11")
  ]);
  MultisigInstruction2.account = (newAccount, feePayer, balanceNeeded) => {
    return import_web310.SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: MultisigInstruction2.Layout.span,
      programId: import_spl_token2.TOKEN_PROGRAM_ID
    });
  };
  MultisigInstruction2.multisig = (m, feePayer, signerPubkey) => {
    const keys = [
      {
        pubkey: feePayer.publicKey,
        isSigner: false,
        isWritable: true
      },
      {
        pubkey: import_web310.SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false
      }
    ];
    signerPubkey.forEach(
      (pubkey) => keys.push({
        pubkey,
        isSigner: false,
        isWritable: false
      })
    );
    const dataLayout = (0, import_buffer_layout.struct)([
      (0, import_buffer_layout.u8)("instruction"),
      (0, import_buffer_layout.u8)("m")
    ]);
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
        m
      },
      data
    );
    return new import_web310.TransactionInstruction({
      keys,
      programId: import_spl_token2.TOKEN_PROGRAM_ID,
      data
    });
  };
})(MultisigInstruction || (MultisigInstruction = {}));

// src/get-info.ts
var import_spl_token3 = require("@solana/spl-token");
var import_web311 = require("@solana/web3.js");
var Multisig2;
((Multisig5) => {
  Multisig5.getInfo = async (multisig) => {
    return Try(async () => {
      const info = await Node.getConnection().getAccountInfo(
        multisig.toPublicKey()
      );
      if (info === null) {
        throw Error("Failed to find multisig");
      }
      if (!info.owner.equals(import_spl_token3.TOKEN_PROGRAM_ID)) {
        throw Error("Invalid multisig owner");
      }
      if (info.data.length !== MultisigInstruction.Layout.span) {
        throw Error("Invalid multisig size");
      }
      const data = Buffer.from(info.data);
      const multisigInfo = MultisigInstruction.Layout.decode(data);
      multisigInfo.signer1 = new import_web311.PublicKey(multisigInfo.signer1);
      multisigInfo.signer2 = new import_web311.PublicKey(multisigInfo.signer2);
      multisigInfo.signer3 = new import_web311.PublicKey(multisigInfo.signer3);
      multisigInfo.signer4 = new import_web311.PublicKey(multisigInfo.signer4);
      multisigInfo.signer5 = new import_web311.PublicKey(multisigInfo.signer5);
      multisigInfo.signer6 = new import_web311.PublicKey(multisigInfo.signer6);
      multisigInfo.signer7 = new import_web311.PublicKey(multisigInfo.signer7);
      multisigInfo.signer8 = new import_web311.PublicKey(multisigInfo.signer8);
      multisigInfo.signer9 = new import_web311.PublicKey(multisigInfo.signer9);
      multisigInfo.signer10 = new import_web311.PublicKey(multisigInfo.signer10);
      multisigInfo.signer11 = new import_web311.PublicKey(multisigInfo.signer11);
      return multisigInfo;
    });
  };
})(Multisig2 || (Multisig2 = {}));

// src/is-address.ts
var Multisig3;
((Multisig5) => {
  Multisig5.isAddress = async (multisig) => {
    return Try(async () => {
      const info = await Multisig2.getInfo(multisig);
      if (info.isErr) {
        return false;
      }
      return true;
    });
  };
})(Multisig3 || (Multisig3 = {}));

// src/index.ts
var Multisig4 = { ...Multisig, ...Multisig2, ...Multisig3 };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Account,
  Explorer,
  FilterOptions,
  FilterType,
  ModuleName,
  Multisig,
  Node,
  Try,
  Validator,
  ValidatorError,
  bufferToArray,
  convertTimestampToDateTime,
  debugLog,
  isBrowser,
  isNode,
  isPromise,
  overwriteObject,
  sleep,
  unixTimestamp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uL3NyYy9jcmVhdGUudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY29tbW9uLnRzIiwgIi4uLy4uL3NoYXJlZC9zcmMvc2hhcmVkLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NhbGN1bGF0ZS10eHNpemUudHMiLCAiLi4vLi4vdHlwZXMvc3JjL2dsb2JhbC9pbmRleC50cyIsICIuLi8uLi9nbG9iYWwvc3JjL2luZGV4LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2Fzc29jaWF0ZWQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9wZGEudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vc2hhcmVkL3NyYy9yZXN1bHQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jb2xsZWN0aW9uLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY3JlYXRvcnMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9yb3lhbHR5LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9tZW1vLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbWludC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24tZGV0YWlscy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3VzZXMudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90b2tlbi1tZXRhZGF0YS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JlZ3VsYXItbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcHJvcGVydGllcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLWNoZWNrZWQudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3ZhbGlkYXRvci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHlwZXMvc3JjL3RyYW5zYWN0aW9uLWZpbHRlci9pbmRleC50cyIsICIuLi9zcmMvZ2V0LWluZm8udHMiLCAiLi4vc3JjL2lzLWFkZHJlc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IE11bHRpc2lnIGFzIENyZWF0ZSB9IGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCB7IE11bHRpc2lnIGFzIEdldEluZm8gfSBmcm9tICcuL2dldC1pbmZvJztcbmltcG9ydCB7IE11bHRpc2lnIGFzIElzQWRkcmVzcyB9IGZyb20gJy4vaXMtYWRkcmVzcyc7XG5pbXBvcnQgJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBjb25zdCBNdWx0aXNpZyA9IHsgLi4uQ3JlYXRlLCAuLi5HZXRJbmZvLCAuLi5Jc0FkZHJlc3MgfTtcbmV4cG9ydCAqIGZyb20gJ34vc2hhcmVkL2V4cG9ydHMnO1xuIiwgImltcG9ydCB7XG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgYmxvYiwgc3RydWN0LCB1OCB9IGZyb20gJ0Bzb2xhbmEvYnVmZmVyLWxheW91dCc7XG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBtdWx0aXNpZ1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbSAgICAgICAgICAgICAgICAgLy8gIG51bWJlciBvZiBtdWx0aXNpZ1xuICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXIgICAgICAgICAgLy8gIG1lbW8gb3duZXJcbiAgICogQHBhcmFtIHtQdWJrZXlbXX0gc2lnbmVyUHVia2V5cyAgIC8vICBzaWduZXJzXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tbW9uU3RydWN0dXJlPFB1YmtleT4sIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBjcmVhdGUgPSBhc3luYyAoXG4gICAgbTogbnVtYmVyLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgc2lnbmVyUHVia2V5czogUHVia2V5W10sXG4gICk6IFByb21pc2U8UmVzdWx0PENvbW1vblN0cnVjdHVyZTxQdWJrZXk+LCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChtID4gc2lnbmVyUHVia2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3NpZ25lcnMgbnVtYmVyIGxlc3MgdGhhbiBtIG51bWJlcicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhY2NvdW50ID0gS2V5cGFpci5nZW5lcmF0ZSgpO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgYmFsYW5jZU5lZWRlZCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0aW9uKFxuICAgICAgICBNdWx0aXNpZ0luc3RydWN0aW9uLkxheW91dC5zcGFuLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDEgPSBNdWx0aXNpZ0luc3RydWN0aW9uLmFjY291bnQoXG4gICAgICAgIGFjY291bnQsXG4gICAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICBiYWxhbmNlTmVlZGVkLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdDIgPSBNdWx0aXNpZ0luc3RydWN0aW9uLm11bHRpc2lnKFxuICAgICAgICBtLFxuICAgICAgICBhY2NvdW50LFxuICAgICAgICBzaWduZXJQdWJrZXlzLm1hcCgocHVia2V5OiBQdWJrZXkpID0+IHB1YmtleS50b1B1YmxpY0tleSgpKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBbaW5zdDEsIGluc3QyXSxcbiAgICAgICAgW2FjY291bnRdLFxuICAgICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgICAgYWNjb3VudC5wdWJsaWNLZXkudG9TdHJpbmcoKSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWdJbnN0cnVjdGlvbiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgY3JlYXRlTGF5b3V0UHViS2V5ID0gKHByb3BlcnR5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgIHJldHVybiBibG9iKDMyLCBwcm9wZXJ0eSk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudCAqL1xuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29tbWl0bWVudCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBTb2xhbmFKc29uQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnL2xvYWQnO1xuXG5sZXQgQ29uZmlnID0gU29sYW5hSnNvbkNvbmZpZztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgbmFtZXNwYWNlIFdhcm5uaW5nTWVzc2FnZSB7XG4gICAgY29uc3QgVEhSRVNISE9MRCA9IDc7XG4gICAgbGV0IGlzRGlzcGxheSA9IGZhbHNlO1xuICAgIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBuZnRTdG9yYWdlQXBpS2V5IGRlZmluZSBwYXJhbWV0ZXIgaW4gc29sYW5hLXN1aXRlLmpzb24uXG4gICAgICAgIENhbiBnZXQgYXBpIGtleSBmcm9tIGh0dHBzOi8vbmZ0LnN0b3JhZ2UvXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGA7XG4gICAgZXhwb3J0IGNvbnN0IERBU19BUElfVVJMID0gYFxuICAgICAgICBbWU9VIEhBVkUgVE8gRE9dXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIFlvdSBuZWVkIHRvIHVwZGF0ZSBkYXNBcGlVcmwgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGkgdXJsIGZyb20gaHR0cHM6Ly93d3cuaGVsaXVzLmRldi9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG5cbiAgICBleHBvcnQgY29uc3QgY2FsY3VsYXRlUHJvYmFiaWxpdHkgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBwcm9iYWJpbGl0eSA9IDEgLyBUSFJFU0hIT0xEO1xuICAgICAgaWYgKCFpc0Rpc3BsYXkgJiYgcmFuZG9tVmFsdWUgPCBwcm9iYWJpbGl0eSkge1xuICAgICAgICBpc0Rpc3BsYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgbmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRTdG9yYWdlQXBpS2V5O1xuICBleHBvcnQgY29uc3QgZGFzQXBpVXJsID0gQ29uZmlnLmRhc0FwaVVybDtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIHRlc3QgPSAndGVzdG5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICB0ZXN0ID0gJ2h0dHBzOi8vYXBpLnRlc3RuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gQnVuZGxyVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9ub2RlMS5pcnlzLnh5eixodHRwczovL25vZGUyLmlyeXMueHl6JyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaXJ5cy54eXonLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRGFzQXBpVXJsIHtcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyLGh0dHBzOi8vcnBjLWRldm5ldC5oZWxpdXMueHl6P2FwaS1rZXk9OWY3MGE4NDMtMzI3NC00ZmZkLWEwYTktMzIzZjhiN2MwNjM5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5mdHN0b3JhZ2VBcGlLZXkge1xuICAgIGRldiA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJyxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBsb2FkQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgIENvbmZpZyA9IGF3YWl0IGltcG9ydCgnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCcpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgaWYgKGRhc0FwaVVybC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICBpZiAoIW5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihXYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuTmZ0c3RvcmFnZUFwaUtleS5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBXUkFQUEVEX1RPS0VOX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdTbzExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEyJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FTU9fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ01lbW8xVWhrSlJmSHl2TE1jVnVjSnd4WGV1RDcyOEVxVkREd1FEeEZNTm8nLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVUQVBMRVhfUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ21ldGFxYnh4VWVyZHEyOGNqMVJiQVdrWVFtM3liempiNmE4YnQ1MTh4MXMnLFxuICApO1xuICBleHBvcnQgY29uc3QgQ09NTUlUTUVOVDogQ29tbWl0bWVudCA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9pcGZzLmlvL2lwZnMnO1xuICBleHBvcnQgY29uc3QgSVJZU19HQVRFV0FZX1VSTCA9ICdodHRwczovL2dhdGV3YXkuaXJ5cy54eXonO1xuICBleHBvcnQgY29uc3QgQlVORExSX05FVFdPUktfVVJMID0gc3dpdGNoQnVuZGxyKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBzd2l0Y2hEYXNBcGkoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gc3dpdGNoTmZ0U3RvcmFnZShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTFNDQU5fVVJMID0gJ2h0dHBzOi8vc29sc2Nhbi5pbyc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xBTkFGTV9VUkwgPSAnaHR0cHM6Ly9zb2xhbmEuZm0nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfWFJBWV9VUkwgPSAnaHR0cHM6Ly94cmF5LmhlbGl1cy54eXonO1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMsIFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDb21tb24gfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBUcnkgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZCc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuLi8uLi9zaGFyZWQvc3JjL3Jlc3VsdCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBhcnI6IENvbW1vbi5Db21tb25bXSB8IE1pbnQuTWludFtdLFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgYSBvZiBhcnIpIHtcbiAgICAgICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGEpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5pbnN0cnVjdGlvbnMpO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbW1pdG1lbnQsIENvbm5lY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5vZGUge1xuICBjb25zdCBzZXR0ZWQgPSB7XG4gICAgY2x1c3RlclVybDogJycsXG4gICAgY29tbWl0bWVudDogQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICAgY3VzdG9tQ2x1c3RlclVybDogW10gYXMgc3RyaW5nW10sXG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldENvbm5lY3Rpb24gPSAoKTogQ29ubmVjdGlvbiA9PiB7XG4gICAgaWYgKHNldHRlZC5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGN1c3RvbSBjbHVzdGVyIGJ5IGpzb24gY29uZmlnXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY3VzdG9tQ2x1c3RlclVybDogQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFzZXR0ZWQuY2x1c3RlclVybCkge1xuICAgICAgLy8gZGVmYXVsdCBjbHVzdGVyXG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgICAgY2x1c3RlcjogQ29uc3RhbnRzLmN1cnJlbnRDbHVzdGVyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzZXR0ZWQuY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGV4cG9ydCBjbGFzcyBDb21tb248VCA9IHVuZGVmaW5lZD4gaW1wbGVtZW50cyBDb21tb25TdHJ1Y3R1cmU8VD4ge1xuICAgIHN0YXRpYyBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI/OiBLZXlwYWlyO1xuICAgIGRhdGE/OiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyPzogS2V5cGFpcixcbiAgICAgIGRhdGE/OiBULFxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnM7XG4gICAgICB0aGlzLnNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21tb24pKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcblxuICAgICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICAgIHRyYW5zYWN0aW9uLnJlY2VudEJsb2NraGFzaCA9IGJsb2NraGFzaE9iai5ibG9ja2hhc2g7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IHRoaXMuZmVlUGF5ZXIucHVibGljS2V5O1xuICAgICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMuZm9yRWFjaCgoaW5zdCkgPT4gdHJhbnNhY3Rpb24uYWRkKGluc3QpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IE1pbnRTdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgTWludDxUID0gUHVia2V5PiBpbXBsZW1lbnRzIE1pbnRTdHJ1Y3R1cmU8VD4ge1xuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdO1xuICAgIHNpZ25lcnM6IEtleXBhaXJbXTtcbiAgICBmZWVQYXllcjogS2V5cGFpcjtcbiAgICBkYXRhOiBUO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXSxcbiAgICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICAgIGZlZVBheWVyOiBLZXlwYWlyLFxuICAgICAgZGF0YTogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmZlZVBheWVyID0gZmVlUGF5ZXI7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWludCkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBNaW50SW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNhY3Rpb24gPSBuZXcgVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50ID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgICAgTm9kZS5jaGFuZ2VDb25uZWN0aW9uKHsgY2x1c3RlcjogQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICB0cmFuc2FjdGlvbixcbiAgICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBDb25maXJtT3B0aW9ucyxcbiAgVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uU2lnbmF0dXJlLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduIGltcGxlbWVudHMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUge1xuICAgIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgZGF0YT86IFB1YmtleTtcbiAgICBjYW5TdWJtaXQ/OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXksIGNhblN1Ym1pdCA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5kYXRhID0gbWludDtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gY2FuU3VibWl0O1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbkZyb21Kc29uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXksIFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IExPV19WQUxVRSA9IDEyNzsgLy8gMHg3ZlxuICBjb25zdCBISUdIX1ZBTFVFID0gMTYzODM7IC8vIDB4M2ZmZlxuICBjb25zdCBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IGhlYWRlciBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXkgaGVhZGVyXG4gICAqL1xuICBjb25zdCBjb21wYWN0SGVhZGVyID0gKG46IG51bWJlcikgPT5cbiAgICBuIDw9IExPV19WQUxVRSA/IDEgOiBuIDw9IEhJR0hfVkFMVUUgPyAyIDogMztcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBieXRlcyBwZXIgZWFjaCBlbGVtZW50XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXlcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RBcnJheVNpemUgPSAobjogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+XG4gICAgY29tcGFjdEhlYWRlcihuKSArIG4gKiBzaXplO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdHhzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlVHhTaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyUGsgPSBbZmVlUGF5ZXIudG9CYXNlNTgoKV07XG5cbiAgICBjb25zdCBzaWduZXJzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuICAgIGNvbnN0IGFjY291bnRzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuXG4gICAgY29uc3QgaXhzU2l6ZSA9IHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaXgpID0+IHtcbiAgICAgIGl4LmtleXMuZm9yRWFjaCgoeyBwdWJrZXksIGlzU2lnbmVyIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGsgPSBwdWJrZXkudG9CYXNlNTgoKTtcbiAgICAgICAgaWYgKGlzU2lnbmVyKSBzaWduZXJzLmFkZChwayk7XG4gICAgICAgIGFjY291bnRzLmFkZChwayk7XG4gICAgICB9KTtcblxuICAgICAgYWNjb3VudHMuYWRkKGl4LnByb2dyYW1JZC50b0Jhc2U1OCgpKTtcblxuICAgICAgY29uc3QgbkluZGV4ZXMgPSBpeC5rZXlzLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9wYXF1ZURhdGEgPSBpeC5kYXRhLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYWNjICtcbiAgICAgICAgMSArIC8vIFBJRCBpbmRleFxuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG5JbmRleGVzLCAxKSArXG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUob3BhcXVlRGF0YSwgMSlcbiAgICAgICk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFjdEFycmF5U2l6ZShzaWduZXJzLnNpemUsIDY0KSArIC8vIHNpZ25hdHVyZXNcbiAgICAgIDMgKyAvLyBoZWFkZXJcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoYWNjb3VudHMuc2l6ZSwgMzIpICsgLy8gYWNjb3VudHNcbiAgICAgIDMyICsgLy8gYmxvY2toYXNoXG4gICAgICBjb21wYWN0SGVhZGVyKHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5sZW5ndGgpICsgLy8gaW5zdHJ1Y3Rpb25zXG4gICAgICBpeHNTaXplXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgbWF4IHRyYW5zYWN0aW9uIHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc092ZXJUcmFuc2FjdGlvblNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBjYWxjdWxhdGVUeFNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyKSA+IE1BWF9UUkFOU0FDVElPTl9TSVpFO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBTdHJpbmcge1xuICAgIHRvUHVibGljS2V5KCk6IFB1YmxpY0tleTtcbiAgICB0b0tleXBhaXIoKTogS2V5cGFpcjtcbiAgICB0b0V4cGxvcmVyVXJsKGV4cGxvcmVyPzogRXhwbG9yZXIsIG9wdGlvbnM/OiBFeHBsb3Jlck9wdGlvbnMpOiBzdHJpbmc7XG4gIH1cbiAgaW50ZXJmYWNlIE51bWJlciB7XG4gICAgdG9Tb2woKTogbnVtYmVyO1xuICAgIHRvTGFtcG9ydHMoKTogbnVtYmVyO1xuICB9XG5cbiAgaW50ZXJmYWNlIENvbnNvbGUge1xuICAgIGRlYnVnKGRhdGE6IHVua25vd24sIGRhdGEyPzogdW5rbm93biwgZGF0YTM/OiB1bmtub3duKTogdm9pZDtcbiAgfVxuXG4gIGludGVyZmFjZSBTZWNyZXQge1xuICAgIHRvS2V5cGFpcigpOiBLZXlwYWlyO1xuICB9XG5cbiAgaW50ZXJmYWNlIFB1YmtleSB7XG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5O1xuICB9XG59XG5cbmV4cG9ydCBlbnVtIEV4cGxvcmVyIHtcbiAgU29sc2NhbiA9ICdzb2xzY2FuJyxcbiAgU29sYW5hRk0gPSAnc29sYW5hZm0nLFxuICBYcmF5ID0gJ3hyYXknLFxufVxuXG5leHBvcnQgdHlwZSBFeHBsb3Jlck9wdGlvbnMgPSB7XG4gIHJlcGxhY2VQYXRoOiBzdHJpbmc7XG59O1xuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEJpZ051bWJlciB9IGZyb20gJ2JpZ251bWJlci5qcyc7XG5pbXBvcnQgeyBFeHBsb3JlciwgRXhwbG9yZXJPcHRpb25zIH0gZnJvbSAnfi90eXBlcy9nbG9iYWwnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG4vKipcbiAqIENyZWF0ZSBleHBsb3JlciB1cmwgZm9yIGFjY291bnQgYWRkcmVzcyBvciBzaWduYXR1cmVcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0V4cGxvcmVyVXJsID0gZnVuY3Rpb24gKFxuICBleHBsb3JlcjogRXhwbG9yZXIgPSBFeHBsb3Jlci5Tb2xzY2FuLFxuICBvcHRpb25zOiBQYXJ0aWFsPEV4cGxvcmVyT3B0aW9ucz4gPSB7fSxcbikge1xuICBjb25zdCBlbmRQb2ludFVybCA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnJwY0VuZHBvaW50O1xuICBkZWJ1Z0xvZygnIyB0b0V4cGxvcmVyVXJsIHJwY0VuZHBvaW50OicsIGVuZFBvaW50VXJsKTtcbiAgbGV0IGNsdXN0ZXIgPSAnJztcbiAgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkKSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnByZDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnRlc3QpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDtcbiAgfSBlbHNlIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldikge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH0gZWxzZSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfVxuXG4gIGNvbnN0IGFkZHJlc3NPclNpZ25hdHVyZTogc3RyaW5nID0gdGhpcy50b1N0cmluZygpO1xuICBsZXQgdXJsID0gJyc7XG5cbiAgaWYgKG9wdGlvbnMucmVwbGFjZVBhdGgpIHtcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlhyYXkpIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9YUkFZX1VSTH0vJHtvcHRpb25zLnJlcGxhY2VQYXRofS8ke2FkZHJlc3NPclNpZ25hdHVyZX0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgaWYgKEFjY291bnQuS2V5cGFpci5pc1B1YmtleShhZGRyZXNzT3JTaWduYXR1cmUpKSB7XG4gICAgLy8gYWRkcmVzc1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L2FkZHJlc3MvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIHNpZ25hdHVyZVxuICAgIC8vIGZvciBJbnZhbGlkIHR5cGUgXCJuZXZlclwiIG9mIGFkZHJlc3NPclNpZ25hdHVyZSwgc28gYGFzIHN0cmluZ2BcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MQU5BRk1fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vdHgvJHtcbiAgICAgICAgYWRkcmVzc09yU2lnbmF0dXJlIGFzIHN0cmluZ1xuICAgICAgfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXJsO1xufTtcblxuLyoqXG4gKiBQdWJLZXkoQHNvbGFuYS1zdWl0ZSkgdG8gUHVibGljS2V5KEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBQdWJsaWNLZXlcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b1B1YmxpY0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNQdWJrZXkodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlB1YktleTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy50b1N0cmluZygpKTtcbn07XG5cbi8qKlxuICogU2VjcmV0KEBzb2xhbmEtc3VpdGUpIHRvIEtleXBhaXIoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIEtleXBhaXJcbiAqL1xuU3RyaW5nLnByb3RvdHlwZS50b0tleXBhaXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghQWNjb3VudC5LZXlwYWlyLmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGRlYnVnTG9nLCBzbGVlcCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IENvbW1vblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmltcG9ydCB7XG4gIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBY2NvdW50LFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcixcbiAgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuaW1wb3J0IHsgQWNjb3VudCBhcyBLZXlwYWlyIH0gZnJvbSAnLi9rZXlwYWlyJztcblxuLyoqXG4gKiBHZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAqXG4gKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWxsb3dPd25lck9mZkN1cnZlXG4gKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZyB8IEluc3RydWN0aW9uPlxuICovXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgbmFtZXNwYWNlIEFzc29jaWF0ZWQge1xuICAgIGNvbnN0IFJFVFJZX09WRVJfTElNSVQgPSAxMDtcbiAgICBjb25zdCBSRVRSWV9TTEVFUF9USU1FID0gMztcbiAgICAvL0BpbnRlcm5hbFxuICAgIGNvbnN0IGdldCA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICAgYWxsb3dPd25lck9mZkN1cnZlID0gZmFsc2UsXG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCBDb21tb25TdHJ1Y3R1cmU8UHVia2V5Pj4gPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBuZXcgS2V5cGFpci5LZXlwYWlyKHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSxcbiAgICAgICk7XG5cbiAgICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgICAgcmV0dXJuIHJlcy50b2tlbkFjY291bnQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbjxQdWJrZXk+KFxuICAgICAgICBbcmVzLmluc3RdLFxuICAgICAgICBbXSxcbiAgICAgICAgZmVlUGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIHJlcy50b2tlbkFjY291bnQhLFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV0cnkgZnVuY3Rpb24gaWYgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1NlY3JldH0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgcmV0cnlHZXRPckNyZWF0ZSA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcjogU2VjcmV0LFxuICAgICk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICBsZXQgY291bnRlciA9IDE7XG4gICAgICB3aGlsZSAoY291bnRlciA8IFJFVFJZX09WRVJfTElNSVQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBpbnN0ID0gYXdhaXQgZ2V0KG1pbnQsIG93bmVyLCBmZWVQYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgICBpZiAoaW5zdCAmJiB0eXBlb2YgaW5zdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGluc3QpO1xuICAgICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgICAgfSBlbHNlIGlmIChpbnN0IGluc3RhbmNlb2YgVHJhbnNhY3Rpb25CdWlsZGVyLkNvbW1vbikge1xuICAgICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgICAgYXN5bmMgKG9rOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluc3QuZGF0YTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBkZWJ1Z0xvZygnIyBFcnJvciBzdWJtaXQgcmV0cnlHZXRPckNyZWF0ZTogJywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnTG9nKGAjIHJldHJ5OiAke2NvdW50ZXJ9IGNyZWF0ZSB0b2tlbiBhY2NvdW50OiBgLCBlKTtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyBtaW50OiAke21pbnR9LCBvd25lcjogJHtvd25lcn0sIGZlZVBheWVyOiAke2ZlZVBheWVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKFJFVFJZX1NMRUVQX1RJTUUpO1xuICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcihgcmV0cnkgYWN0aW9uIGlzIG92ZXIgbGltaXQgJHtSRVRSWV9PVkVSX0xJTUlUfWApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbTWFpbiBsb2dpY11HZXQgQXNzb2NpYXRlZCB0b2tlbiBBY2NvdW50LlxuICAgICAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICAgIG1pbnQ6IFB1YmtleSxcbiAgICAgIG93bmVyOiBQdWJrZXksXG4gICAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8e1xuICAgICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgICBpbnN0OiBUcmFuc2FjdGlvbkluc3RydWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIH0+ID0+IHtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIEFTU09DSUFURURfVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICk7XG5cbiAgICAgIGRlYnVnTG9nKCcjIGFzc29jaWF0ZWRUb2tlbkFjY291bnQ6ICcsIGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgICBhd2FpdCBnZXRBY2NvdW50KFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCkuY29tbWl0bWVudCxcbiAgICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRva2VuQWNjb3VudDogYXNzb2NpYXRlZFRva2VuQWNjb3VudC50b1N0cmluZygpLFxuICAgICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5BY2NvdW50Tm90Rm91bmRFcnJvcikgJiZcbiAgICAgICAgICAhKGVycm9yIGluc3RhbmNlb2YgVG9rZW5JbnZhbGlkQWNjb3VudE93bmVyRXJyb3IpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgICAgICBwYXllci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyIGFzIE9yaWdpbmFsLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEFjY291bnQge1xuICBleHBvcnQgY2xhc3MgS2V5cGFpciB7XG4gICAgc2VjcmV0OiBTZWNyZXQ7XG4gICAgcHVia2V5OiBQdWJrZXk7XG5cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXM6IHsgcHVia2V5PzogUHVia2V5OyBzZWNyZXQ6IFNlY3JldCB9KSB7XG4gICAgICBpZiAoIXBhcmFtcy5wdWJrZXkpIHtcbiAgICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICAgIHRoaXMucHVia2V5ID0ga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VjcmV0ID0gcGFyYW1zLnNlY3JldDtcbiAgICB9XG5cbiAgICB0b1B1YmxpY0tleSgpOiBQdWJsaWNLZXkge1xuICAgICAgcmV0dXJuIG5ldyBQdWJsaWNLZXkodGhpcy5wdWJrZXkpO1xuICAgIH1cblxuICAgIHRvS2V5cGFpcigpOiBPcmlnaW5hbCB7XG4gICAgICBjb25zdCBkZWNvZGVkID0gYnMuZGVjb2RlKHRoaXMuc2VjcmV0KTtcbiAgICAgIHJldHVybiBPcmlnaW5hbC5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezMyLDQ0fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGlzU2VjcmV0ID0gKHZhbHVlOiBzdHJpbmcpOiB2YWx1ZSBpcyBTZWNyZXQgPT5cbiAgICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgICBzdGF0aWMgY3JlYXRlID0gKCk6IEtleXBhaXIgPT4ge1xuICAgICAgY29uc3Qga2V5cGFpciA9IE9yaWdpbmFsLmdlbmVyYXRlKCk7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogT3JpZ2luYWwpOiBLZXlwYWlyID0+IHtcbiAgICAgIHJldHVybiBuZXcgS2V5cGFpcih7XG4gICAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICAgIHNlY3JldDogYnMuZW5jb2RlKGtleXBhaXIuc2VjcmV0S2V5KSBhcyBTZWNyZXQsXG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRCB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC1idWJibGVndW0nO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQZGEge1xuICAgIGV4cG9ydCBjb25zdCBnZXRNZXRhZGF0YSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0TWFzdGVyRWRpdGlvbiA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdtZXRhZGF0YScpLFxuICAgICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnZWRpdGlvbicpLFxuICAgICAgICBdLFxuICAgICAgICBQUk9HUkFNX0lELFxuICAgICAgKTtcbiAgICAgIHJldHVybiBwdWJsaWNLZXk7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBnZXRUcmVlQXV0aG9yaXR5ID0gKGFkZHJlc3M6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0Qmd1bVNpZ25lciA9ICgpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW0J1ZmZlci5mcm9tKCdjb2xsZWN0aW9uX2NwaScsICd1dGY4JyldLFxuICAgICAgICBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0QXNzZXRJZCA9IChhZGRyZXNzOiBQdWJrZXksIGxlYWZJbmRleDogbnVtYmVyKTogUHVia2V5ID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBuZXcgQk4uQk4obGVhZkluZGV4KTtcbiAgICAgIGNvbnN0IFthc3NldElkXSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgICBbXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2Fzc2V0JywgJ3V0ZjgnKSxcbiAgICAgICAgICBhZGRyZXNzLnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgICBVaW50OEFycmF5LmZyb20obm9kZS50b0FycmF5KCdsZScsIDgpKSxcbiAgICAgICAgXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFzc2V0SWQudG9TdHJpbmcoKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQWNjb3VudCBhcyBBc3NvY2lhdGVkIH0gZnJvbSAnLi9hc3NvY2lhdGVkJztcbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5pbXBvcnQgeyBBY2NvdW50IGFzIFBkYSB9IGZyb20gJy4vcGRhJztcblxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSB7XG4gIC4uLkFzc29jaWF0ZWQsXG4gIC4uLktleXBhaXIsXG4gIC4uLlBkYSxcbn07XG4iLCAiaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaCc7XG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgYXMgQ29tbW9uIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIFBhcnRpYWxTaWduIH0gZnJvbSAnLi9wYXJ0aWFsLXNpZ24nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENhbGN1bGF0ZVR4c2l6ZSB9IGZyb20gJy4vY2FsY3VsYXRlLXR4c2l6ZSc7XG5pbXBvcnQgJ34vdHlwZXMvZ2xvYmFsJztcbmltcG9ydCAnfi9nbG9iYWwnO1xuXG5leHBvcnQgY29uc3QgVHJhbnNhY3Rpb25CdWlsZGVyID0ge1xuICAuLi5CYXRjaCxcbiAgLi4uQ2FsY3VsYXRlVHhzaXplLFxuICAuLi5NaW50LFxuICAuLi5Db21tb24sXG4gIC4uLlBhcnRpYWxTaWduLFxufTtcbiIsICIvLyBmb3JrZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9iYWRyYXAvcmVzdWx0LCB0aGFuayB5b3UgYWR2aWNlICBAanZpaWRlXG5pbXBvcnQgeyBUcmFuc2FjdGlvblNpZ25hdHVyZSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBDb21tb25TdHJ1Y3R1cmUsXG4gIE1pbnRTdHJ1Y3R1cmUsXG4gIFBhcnRpYWxTaWduU3RydWN0dXJlLFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5cbmFic3RyYWN0IGNsYXNzIEFic3RyYWN0UmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvcj4ge1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcblxuICB1bndyYXAoKTogVDtcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBVO1xuICB1bndyYXA8VSwgVj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFYpOiBVIHwgVjtcbiAgLy8gdW5pZmllZC1zaWduYXR1cmVzLiBpbnRvIGxpbmUgMTBcbiAgdW53cmFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBVKTogVTtcbiAgdW53cmFwKG9rPzogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IHVua25vd24pOiB1bmtub3duIHtcbiAgICBjb25zdCByID0gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayA/IG9rKHZhbHVlKSA6IHZhbHVlKSxcbiAgICAgIChlcnJvcikgPT4gKGVyciA/IFJlc3VsdC5vayhlcnIoZXJyb3IpKSA6IFJlc3VsdC5lcnIoZXJyb3IpKSxcbiAgICApO1xuICAgIGlmIChyLmlzRXJyKSB7XG4gICAgICB0aHJvdyByLmVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gci52YWx1ZTtcbiAgfVxuXG4gIC8vLy8gbWFwIC8vLy9cbiAgbWFwPFU+KG9rOiAodmFsdWU6IFQpID0+IFUpOiBSZXN1bHQ8VSwgRT47XG4gIG1hcDxVLCBGIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFUsXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IEYsXG4gICk6IFJlc3VsdDxVLCBGPjtcbiAgbWFwKG9rOiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gRXJyb3IpOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rKHZhbHVlKSksXG4gICAgICAoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyID8gZXJyKGVycm9yKSA6IGVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vLyBjaGFpbiAvLy8vXG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IFJlc3VsdDxYLCBFPjtcbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHNpbmdsZSBUcmFuc2FjdGlvbkJ1aWxkZXIgLy8vL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gIGFzeW5jIHN1Ym1pdChcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4ge1xuICAgIGNvbnN0IHJlcyA9IHRoaXMubWFwKFxuICAgICAgYXN5bmMgKG9rKSA9PiB7XG4gICAgICAgIGRlYnVnTG9nKCcjIHJlc3VsdCBzaW5nbGUgc3VibWl0OiAnLCBvayk7XG4gICAgICAgIGlmIChmZWVQYXllcikge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBvYmogPSBvayBhcyBDb21tb25TdHJ1Y3R1cmUgfCBNaW50U3RydWN0dXJlO1xuICAgICAgICAgIHJldHVybiBhd2FpdCBvYmouc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIHJldHVybiBlcnI7XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIocmVzLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy52YWx1ZTtcbiAgfVxufVxuXG4vLy8gTXVsdGlwbGUgVHJhbnNhY3Rpb25CdWlsZGVyIC8vLy9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIGludGVyZmFjZSBBcnJheTxUPiB7XG4gICAgc3VibWl0KGZlZVBheWVyPzogU2VjcmV0KTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj47XG4gIH1cbn1cblxuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uIChmZWVQYXllcj86IFNlY3JldCkge1xuICBpZiAoZmVlUGF5ZXIpIHtcbiAgICBsZXQgaSA9IDE7XG4gICAgZm9yIGF3YWl0IChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmoudmFsdWUuY2FuU3VibWl0KSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBjYW5TdWJtaXQnKTtcbiAgICAgICAgY29uc3Qgc2lnID0gYXdhaXQgKG9iaiBhcyBQYXJ0aWFsU2lnblN0cnVjdHVyZSkuc3VibWl0KGZlZVBheWVyKTtcbiAgICAgICAgaWYgKHNpZy5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBzaWc7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcoc2lnLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnTG9nKCcjIFJlc3VsdCBiYXRjaCBvdGhlciB0aGFuIGNhblN1Ym1pdCcpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGggPT0gaSkge1xuICAgICAgICAgIC8vIGxhc3Qgb2JqZWN0XG4gICAgICAgICAgcmV0dXJuIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnM6IENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmVbXSA9IFtdO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKCdPbmx5IEFycmF5IEluc3RydWN0aW9uIG9iamVjdCcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIHN1Ym1pdDogJywgaW5zdHJ1Y3Rpb25zKTtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5CYXRjaCgpLnN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9XG59O1xuXG5jbGFzcyBJbnRlcm5hbE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSB0cnVlO1xuICByZWFkb25seSBpc0VyciA9IGZhbHNlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSB2YWx1ZTogVCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBfZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxFcnI8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IGZhbHNlO1xuICByZWFkb25seSBpc0VyciA9IHRydWU7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IGVycm9yOiBFKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBfb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgbmFtZXNwYWNlIFJlc3VsdCB7XG4gIGV4cG9ydCB0eXBlIE9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbE9rPFQsIEU+O1xuICBleHBvcnQgdHlwZSBFcnI8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsRXJyPFQsIEU+O1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBvazxULCBFIGV4dGVuZHMgRXJyb3I+KHZhbHVlOiBUKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsT2sodmFsdWUpO1xuICB9XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yPzogRSk6IFJlc3VsdDxULCBFPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I6IEUpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxFcnIoZXJyb3IgfHwgRXJyb3IoKSk7XG4gIH1cblxuICB0eXBlIFUgPSBSZXN1bHQ8dW5rbm93bj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgICBSMTUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNCwgUjE1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgICAgT2tUeXBlPFIxNT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgICB8IFIxNVxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTMsIFIxNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxM10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgUjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTEgfCBSMTIgfCBSMTNcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNj5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+LCBPa1R5cGU8UjU+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNF0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFUsIFIzIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjNdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjM+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMl0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPl0sIEVyclR5cGU8UjAgfCBSMSB8IFIyPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMV0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPl0sIEVyclR5cGU8UjAgfCBSMT4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjBdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD5dLCBFcnJUeXBlPFIwPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiBbXSk6IFJlc3VsdDxbXT47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8VCBleHRlbmRzIFVbXSB8IFJlY29yZDxzdHJpbmcsIFU+PihcbiAgICBvYmo6IFQsXG4gICk6IFJlc3VsdDxcbiAgICB7IFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PGluZmVyIEk+ID8gSSA6IG5ldmVyIH0sXG4gICAge1xuICAgICAgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT4gPyBFIDogbmV2ZXI7XG4gICAgfVtrZXlvZiBUXVxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogdW5rbm93bik6IHVua25vd24ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIGNvbnN0IHJlc0FyciA9IFtdO1xuICAgICAgZm9yIChjb25zdCBpdGVtIG9mIG9iaikge1xuICAgICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICAgIHJldHVybiBpdGVtIGFzIHVua25vd247XG4gICAgICAgIH1cbiAgICAgICAgcmVzQXJyLnB1c2goaXRlbS52YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHJlc0Fycik7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9O1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSAob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KVtrZXldO1xuICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9XG4gICAgICByZXNba2V5XSA9IGl0ZW0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQub2socmVzKTtcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yID0gRXJyb3I+ID1cbiAgfCBSZXN1bHQuT2s8VCwgRT5cbiAgfCBSZXN1bHQuRXJyPFQsIEU+O1xuXG50eXBlIE9rVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgTz4gPyBPIDogbmV2ZXI7XG50eXBlIEVyclR5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+XG4gID8gRVxuICA6IG5ldmVyO1xuIiwgImltcG9ydCB7IEludGVybmFsQ29sbGVjdGlvbiB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEdyb3VwaW5nIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgSW5wdXRDb2xsZWN0aW9uLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb24ge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q29sbGVjdGlvbj4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxJbnRlcm5hbENvbGxlY3Rpb24+LFxuICAgICk6IENvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJveWFsdHkge1xuICAgIGV4cG9ydCBjb25zdCBUSFJFU0hPTEQgPSAxMDA7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAocGVyY2VudGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICByZXR1cm4gcGVyY2VudGFnZSAqIFRIUkVTSE9MRDtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9jb21wcmVzc2VkLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQXNzZXRBbmRPZmZjaGFpbiB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAob3V0cHV0OiBBc3NldEFuZE9mZmNoYWluKTogTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4uaWQudG9TdHJpbmcoKSxcbiAgICAgICAgY29sbGVjdGlvbk1pbnQ6IENvbGxlY3Rpb24uQ29sbGVjdGlvbk1pbnQuaW50b1VzZXIoXG4gICAgICAgICAgb3V0cHV0Lm9uY2hhaW4uZ3JvdXBpbmcsXG4gICAgICAgICkgYXMgUHVia2V5LFxuICAgICAgICBhdXRob3JpdGllczogb3V0cHV0Lm9uY2hhaW4uYXV0aG9yaXRpZXMsXG4gICAgICAgIHJveWFsdHk6IFJveWFsdHkuUm95YWx0eS5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5yb3lhbHR5LnBlcmNlbnQpLFxuICAgICAgICBuYW1lOiBvdXRwdXQub25jaGFpbi5jb250ZW50Lm1ldGFkYXRhLm5hbWUsXG4gICAgICAgIHN5bWJvbDogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5zeW1ib2wsXG4gICAgICAgIHVyaTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5qc29uX3VyaSxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmNyZWF0b3JzKSEsXG4gICAgICAgIHRyZWVBZGRyZXNzOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi50cmVlLFxuICAgICAgICBpc0NvbXByZXNzZWQ6IG91dHB1dC5vbmNoYWluLmNvbXByZXNzaW9uLmNvbXByZXNzZWQsXG4gICAgICAgIGlzTXV0YWJsZTogb3V0cHV0Lm9uY2hhaW4ubXV0YWJsZSxcbiAgICAgICAgaXNCdXJuOiBvdXRwdXQub25jaGFpbi5idXJudCxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5zdXBwbHkuZWRpdGlvbl9ub25jZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wcmltYXJ5X3NhbGVfaGFwcGVuZWQsXG4gICAgICAgIGRhdGVUaW1lOiBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShvdXRwdXQub2ZmY2hhaW4uY3JlYXRlZF9hdCkhLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTWVtbywgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRUbyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNaW50IHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBNaW50VG8sXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICBoaXN0b3J5Lm1pbnQgPSBvdXRwdXQucGFyc2VkLmluZm8ubWludDtcbiAgICAgIGhpc3RvcnkubWludEF1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50QXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkuYWNjb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby5hY2NvdW50IGFzIHN0cmluZztcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29sbGVjdGlvbkRldGFpbHMgYXMgTWV0YXBsZXhDb2xsZWN0aW9uRGV0YWlscyB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IENvbGxlY3Rpb25EZXRhaWxzLCBPcHRpb24gfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIENvbGxlY3Rpb25EZXRhaWxzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXIgPSAoXG4gICAgICBvdXRwdXQ6IE9wdGlvbjxNZXRhcGxleENvbGxlY3Rpb25EZXRhaWxzPixcbiAgICApOiBDb2xsZWN0aW9uRGV0YWlscyB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAoIW91dHB1dCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBfX2tpbmQ6IG91dHB1dC5fX2tpbmQsXG4gICAgICAgIHNpemU6IHBhcnNlSW50KG91dHB1dC5zaXplLnRvU3RyaW5nKDEwKSksXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBEYXRhVjIgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtdG9rZW4tbWV0YWRhdGEnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVG9rZW5NZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dFRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogRGF0YVYyID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVG9rZW5NZXRhZGF0YSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW50OiBvdXRwdXQub25jaGFpbi5taW50LnRvU3RyaW5nKCksXG4gICAgICAgIHJveWFsdHk6IG91dHB1dC5vbmNoYWluLmRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIG5hbWU6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5zeW1ib2wpLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBjcmVhdG9yczogX0NyZWF0b3JzLkNyZWF0b3JzLmludG9Vc2VyKG91dHB1dC5vbmNoYWluLmRhdGEuY3JlYXRvcnMpLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgICAvLyBkZWxldGUgTlVMTCgweDAwKSBzdHJpbmdzIGZ1bmN0aW9uXG4gICAgZXhwb3J0IGNvbnN0IGRlbGV0ZU51bGxTdHJpbmdzID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXFwwL2csICcnKTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb25EZXRhaWxzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWRldGFpbHMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW4gfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhLCBSZWd1bGFyTmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXRhZGF0YUFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFJlZ3VsYXJOZnRNZXRhZGF0YSB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICAgdXJpOiBzdHJpbmcsXG4gICAgICBzZWxsZXJGZWVCYXNpc1BvaW50czogbnVtYmVyLFxuICAgICk6IERhdGFWMiA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgICBzeW1ib2w6IGlucHV0LnN5bWJvbCxcbiAgICAgICAgdXJpLFxuICAgICAgICBzZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgY3JlYXRvcnM6IENyZWF0b3JzLkNyZWF0b3JzLmludG9JbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogTWV0YWRhdGFBbmRPZmZjaGFpbixcbiAgICApOiBSZWd1bGFyTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEubmFtZSksXG4gICAgICAgIHN5bWJvbDogVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCxcbiAgICAgICAgKSxcbiAgICAgICAgdXJpOiBUb2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgaXNNdXRhYmxlOiBvdXRwdXQub25jaGFpbi5pc011dGFibGUsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnByaW1hcnlTYWxlSGFwcGVuZWQsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5kYXRhLmNyZWF0b3JzKSxcbiAgICAgICAgZWRpdGlvbk5vbmNlOiBvdXRwdXQub25jaGFpbi5lZGl0aW9uTm9uY2UsXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uKSxcbiAgICAgICAgY29sbGVjdGlvbkRldGFpbHM6IENvbGxlY3Rpb25EZXRhaWxzLkNvbGxlY3Rpb25EZXRhaWxzLmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmNvbGxlY3Rpb25EZXRhaWxzLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBVc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgb3ZlcndyaXRlT2JqZWN0LCBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHt9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgRmlsZVR5cGUsIFByb3BlcnRpZXMsIFN0b3JhZ2VUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSBhc3luYyAoXG4gICAgICBpbnB1dDogUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8UHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIFByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlckNoZWNrZWQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlciB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXIsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyB2YWxpZGF0aW9uIGNoZWNrXG4gICAgICBpZiAoIW91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbiB8fCAhb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXQucGFyc2VkLmluZm8uc291cmNlO1xuICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbjtcbiAgICAgIGhpc3Rvcnkuc29sID0gb3V0cHV0LnBhcnNlZC5pbmZvLmxhbXBvcnRzPy50b1NvbCgpLnRvU3RyaW5nKCk7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbXByZXNzZWROZnRNZXRhZGF0YSB9IGZyb20gJy4vY29tcHJlc3NlZC1uZnQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uUmVndWxhck5mdE1ldGFkYXRhLFxuICAuLi5Qcm9wZXJ0aWVzLFxuICAuLi5Sb3lhbHR5LFxuICAuLi5Ub2tlbk1ldGFkYXRhLFxuICAuLi5UcmFuc2ZlckNoZWNrZWQsXG4gIC4uLlRyYW5zZmVyLFxuICAuLi5Vc2VzLFxufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ34vY29udmVydGVyJztcbmltcG9ydCB7IERldGFpbHMsIExpbWl0IH0gZnJvbSAnfi90eXBlcy92YWxpZGF0b3InO1xuaW1wb3J0IHsgSW5wdXROZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuaW1wb3J0IHsgT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgRGF0YVYyIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5yb3lhbHR5KSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzUm95YWx0eShtZXRhZGF0YS5yb3lhbHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTZWxsZXJGZWVCYXNpc1BvaW50cyhtZXRhZGF0YS5zZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJGZWVCYXNpc1BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyRmVlQmFzaXNQb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgICBpZiAobWV0YWRhdGEubmFtZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc05hbWUobWV0YWRhdGEubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzeW1ib2wnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnN5bWJvbCkge1xuICAgICAgICAgICAgICByZXMgPSBpc1N5bWJvbChtZXRhZGF0YS5zeW1ib2wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuaXNFcnIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goLi4ucmVzLmVycm9yLmRldGFpbHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ0NhdWdodCBpbiB0aGUgdmFsaWRhdGlvbiBlcnJvcnMuIHNlZSBpbmZvcm1hdGlvbiBlLmc6IGVycjxWYWxpZGF0b3JFcnJvcj4uZGV0YWlscyc7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCByZXN1bHRzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZSA9IFBpY2s8XG4gICAgT2ZmY2hhaW4sXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAnaW1hZ2UnIHwgJ3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJ1xuICA+O1xuICB0eXBlIFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggPSBQaWNrPFxuICAgIElucHV0TmZ0TWV0YWRhdGEsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAncm95YWx0eScgfCAnZmlsZVBhdGgnXG4gID47XG4gIHR5cGUgUGlja01ldGFwbGV4ID0gUGljazxcbiAgICBEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJy4uL2FjY291bnQnO1xuXG5leHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcbiAgTWVtbyA9ICdtZW1vJyxcbiAgTWludCA9ICdtaW50JyxcbiAgT25seU1lbW8gPSAnb25seS1tZW1vJyxcbiAgVHJhbnNmZXIgPSAndHJhbnNmZXInLFxufVxuXG5leHBvcnQgZW51bSBNb2R1bGVOYW1lIHtcbiAgU29sTmF0aXZlID0gJ3N5c3RlbScsXG4gIFNwbFRva2VuID0gJ3NwbC10b2tlbicsXG59XG5cbmV4cG9ydCBjb25zdCBGaWx0ZXJPcHRpb25zID0ge1xuICBUcmFuc2Zlcjoge1xuICAgIHByb2dyYW06IFsnc3lzdGVtJywgJ3NwbC10b2tlbiddLFxuICAgIGFjdGlvbjogWyd0cmFuc2ZlcicsICd0cmFuc2ZlckNoZWNrZWQnXSxcbiAgfSxcbiAgTWVtbzoge1xuICAgIHByb2dyYW06IFsnc3BsLW1lbW8nXSxcbiAgICBhY3Rpb246IFsnKiddLFxuICB9LFxuICBNaW50OiB7XG4gICAgcHJvZ3JhbTogWydzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsnbWludFRvJywgJ21pbnRUb0NoZWNrZWQnXSxcbiAgfSxcbn07XG5cbmV4cG9ydCB0eXBlIFBvc3RUb2tlbkFjY291bnQgPSB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgb3duZXI6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFdpdGhNZW1vID0ge1xuICBzaWc6IHN0cmluZ1tdO1xuICBtZW1vOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUcmFuc2ZlciA9IHtcbiAgcGFyc2VkOiB7XG4gICAgaW5mbzoge1xuICAgICAgZGVzdGluYXRpb246IFB1YmtleTtcbiAgICAgIHNvdXJjZTogUHVia2V5O1xuICAgICAgbGFtcG9ydHM6IG51bWJlcjtcbiAgICB9O1xuICAgIHR5cGU6IHN0cmluZztcbiAgfTtcbiAgcHJvZ3JhbTogc3RyaW5nO1xuICBwcm9ncmFtSWQ/OiBQdWJsaWNLZXk7XG59O1xuXG5leHBvcnQgdHlwZSBNaW50VG8gPSB7XG4gIHBhcnNlZDoge1xuICAgIGluZm86IHtcbiAgICAgIGFjY291bnQ6IFB1YmtleTtcbiAgICAgIG1pbnQ6IFB1YmtleTtcbiAgICAgIG1pbnRBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmc7XG4gICAgfTtcbiAgICB0eXBlOiBzdHJpbmc7XG4gIH07XG4gIHByb2dyYW06IHN0cmluZztcbiAgcHJvZ3JhbUlkPzogUHVibGljS2V5O1xufTtcblxuZXhwb3J0IHR5cGUgTWludFRvQ2hlY2tlZCA9IE1pbnRUbztcblxuZXhwb3J0IHR5cGUgVHJhbnNmZXJDaGVja2VkID0ge1xuICBwYXJzZWQ6IHtcbiAgICBpbmZvOiB7XG4gICAgICBkZXN0aW5hdGlvbjogUHVia2V5O1xuICAgICAgbWludDogUHVia2V5O1xuICAgICAgbXVsdGlzaWdBdXRob3JpdHk6IFB1YmtleTtcbiAgICAgIHNpZ25lcnM6IFB1YmtleVtdO1xuICAgICAgc291cmNlOiBQdWJrZXk7XG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nO1xuICAgIH07XG4gICAgdHlwZTogc3RyaW5nO1xuICB9O1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZD86IFB1YmxpY0tleTtcbn07XG5cbmV4cG9ydCB0eXBlIE1lbW8gPSB7XG4gIHBhcnNlZDogc3RyaW5nO1xuICBwcm9ncmFtOiBzdHJpbmc7XG4gIHByb2dyYW1JZDogUHVibGljS2V5O1xufTtcbiIsICJpbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IExheW91dE9iamVjdCB9IGZyb20gJ0Bzb2xhbmEvYnVmZmVyLWxheW91dCc7XG5pbXBvcnQgeyBUT0tFTl9QUk9HUkFNX0lEIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE11bHRpc2lnSW5zdHJ1Y3Rpb24gfSBmcm9tICcuL2NyZWF0ZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWcge1xuICBleHBvcnQgY29uc3QgZ2V0SW5mbyA9IGFzeW5jIChcbiAgICBtdWx0aXNpZzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxMYXlvdXRPYmplY3QsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldEFjY291bnRJbmZvKFxuICAgICAgICBtdWx0aXNpZy50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGlmIChpbmZvID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdGYWlsZWQgdG8gZmluZCBtdWx0aXNpZycpO1xuICAgICAgfVxuICAgICAgaWYgKCFpbmZvLm93bmVyLmVxdWFscyhUT0tFTl9QUk9HUkFNX0lEKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBtdWx0aXNpZyBvd25lcicpO1xuICAgICAgfVxuICAgICAgaWYgKGluZm8uZGF0YS5sZW5ndGggIT09IE11bHRpc2lnSW5zdHJ1Y3Rpb24uTGF5b3V0LnNwYW4pIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgbXVsdGlzaWcgc2l6ZScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gQnVmZmVyLmZyb20oaW5mby5kYXRhKTtcbiAgICAgIGNvbnN0IG11bHRpc2lnSW5mbyA9IE11bHRpc2lnSW5zdHJ1Y3Rpb24uTGF5b3V0LmRlY29kZShkYXRhKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyMSk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyMiA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjIpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjMgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXIzKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI0ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNCk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyNSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjUpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjYgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI2KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXI3ID0gbmV3IFB1YmxpY0tleShtdWx0aXNpZ0luZm8uc2lnbmVyNyk7XG4gICAgICBtdWx0aXNpZ0luZm8uc2lnbmVyOCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjgpO1xuICAgICAgbXVsdGlzaWdJbmZvLnNpZ25lcjkgPSBuZXcgUHVibGljS2V5KG11bHRpc2lnSW5mby5zaWduZXI5KTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxMCA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjEwKTtcbiAgICAgIG11bHRpc2lnSW5mby5zaWduZXIxMSA9IG5ldyBQdWJsaWNLZXkobXVsdGlzaWdJbmZvLnNpZ25lcjExKTtcbiAgICAgIHJldHVybiBtdWx0aXNpZ0luZm87XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTXVsdGlzaWcgYXMgX0dldCB9IGZyb20gJy4vZ2V0LWluZm8nO1xuXG5leHBvcnQgbmFtZXNwYWNlIE11bHRpc2lnIHtcbiAgZXhwb3J0IGNvbnN0IGlzQWRkcmVzcyA9IGFzeW5jIChcbiAgICBtdWx0aXNpZzogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxib29sZWFuLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBfR2V0LmdldEluZm8obXVsdGlzaWcpO1xuICAgICAgaWYgKGluZm8uaXNFcnIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsaUJBQUFBO0FBQUEsRUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUFBQztBQUFBLEVBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxJQUFBQyxnQkFNTztBQUNQLDJCQUFpQztBQUNqQyxJQUFBQyxvQkFBaUM7OztBQ1JqQyxrQkFBc0M7QUFDdEMsa0JBQTZCO0FBRTdCLElBQUksU0FBUyxZQUFBQztBQUVOLElBQVU7QUFBQSxDQUFWLENBQVVDLGVBQVY7QUFDRSxNQUFVO0FBQVYsSUFBVUMscUJBQVY7QUFDTCxVQUFNLGFBQWE7QUFDbkIsUUFBSSxZQUFZO0FBQ1QsSUFBTUEsaUJBQUEsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTzVCLElBQU1BLGlCQUFBLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRcEIsSUFBTUEsaUJBQUEsdUJBQXVCLE1BQWU7QUFDakQsWUFBTSxjQUFjLEtBQUssT0FBTztBQUNoQyxZQUFNLGNBQWMsSUFBSTtBQUN4QixVQUFJLENBQUMsYUFBYSxjQUFjLGFBQWE7QUFDM0Msb0JBQVk7QUFDWixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsS0ExQmUsa0JBQUFELFdBQUEsb0JBQUFBLFdBQUE7QUFBQSxHQURGO0FBQUEsQ0ErQlYsQ0FBVUEsZUFBVjtBQUNFLEVBQU1BLFdBQUEsaUJBQWlCLE9BQU8sUUFBUTtBQUN0QyxFQUFNQSxXQUFBLG1CQUFtQixPQUFPLFFBQVE7QUFDeEMsRUFBTUEsV0FBQSxjQUFjLE9BQU87QUFDM0IsRUFBTUEsV0FBQSxt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S0FBSyxLQUFLLElBQUk7QUFDbEMsWUFBTSxlQUFlLG9CQUFvQixPQUFPLE9BQU8sSUFBSTtBQUMzRCxtQkFBYSxVQUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsVUFBVSxJQUFJLHdCQUFVLGFBQWEsT0FBTztBQUN6RCxtQkFBYSxVQUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsVUFBVSxJQUFJLHdCQUFVLGFBQWEsT0FBTztBQUN6RCxtQkFBYSxVQUFVLElBQUksd0JBQVUsYUFBYSxPQUFPO0FBQ3pELG1CQUFhLFVBQVUsSUFBSSx3QkFBVSxhQUFhLE9BQU87QUFDekQsbUJBQWEsVUFBVSxJQUFJLHdCQUFVLGFBQWEsT0FBTztBQUN6RCxtQkFBYSxXQUFXLElBQUksd0JBQVUsYUFBYSxRQUFRO0FBQzNELG1CQUFhLFdBQVcsSUFBSSx3QkFBVSxhQUFhLFFBQVE7QUFDM0QsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQWpDZUEsMEJBQUE7OztBQ0pWLElBQVVDO0FBQUEsQ0FBVixDQUFVQSxjQUFWO0FBQ0UsRUFBTUEsVUFBQSxZQUFZLE9BQ3ZCLGFBQ29DO0FBQ3BDLFdBQU8sSUFBSSxZQUFZO0FBQ3JCLFlBQU0sT0FBTyxNQUFNQSxVQUFLLFFBQVEsUUFBUTtBQUN4QyxVQUFJLEtBQUssT0FBTztBQUNkLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxHQVhlQSwwQkFBQTs7O0FuQ0VWLElBQU1DLFlBQVcsRUFBRSxHQUFHLFVBQVEsR0FBR0EsV0FBUyxHQUFHQSxVQUFVOyIsCiAgIm5hbWVzIjogWyJBY2NvdW50IiwgIk11bHRpc2lnIiwgImltcG9ydF93ZWIzIiwgImltcG9ydF9zcGxfdG9rZW4iLCAiU29sYW5hSnNvbkNvbmZpZyIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tbW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJFeHBsb3JlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIlBkYSIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb25EZXRhaWxzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJSZWd1bGFyTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlByb3BlcnRpZXMiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyQ2hlY2tlZCIsICJDb252ZXJ0ZXIiLCAiVHJhbnNmZXIiLCAiQ29udmVydGVyIiwgIlZhbGlkYXRvciIsICJNZXNzYWdlIiwgIkNvbnZlcnRlciIsICJGaWx0ZXJUeXBlIiwgIk1vZHVsZU5hbWUiLCAiTXVsdGlzaWciLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIk11bHRpc2lnSW5zdHJ1Y3Rpb24iLCAiaW1wb3J0X3NwbF90b2tlbiIsICJpbXBvcnRfd2ViMyIsICJNdWx0aXNpZyIsICJNdWx0aXNpZyIsICJNdWx0aXNpZyJdCn0K