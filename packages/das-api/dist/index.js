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
  DasApi: () => DasApi3
});
module.exports = __toCommonJS(src_exports);

// ../suite-utils/src/constants.ts
var import_web3 = require("@solana/web3.js");
var import_load = __toESM(require("@solana-suite/config/load"));
var Config = import_load.default;
var Constants;
((Constants2) => {
  let WarnningMessage;
  ((WarnningMessage2) => {
    const THRESHHOLD = 50;
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
    WarnningMessage2.ANNOUNCE = `
        [DEPRECATED]
        --------------------------------------
        Account, Node, toExplorer, Pubkey, Secret have been moved to 
        @solana-suite/utils 
        ------------------------------------- 
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
console.log(Constants.WarnningMessage.ANNOUNCE);

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

// ../global/src/index.ts
var import_web39 = require("@solana/web3.js");

// ../account/src/associated.ts
var import_spl_token = require("@solana/spl-token");

// ../account/src/keypair.ts
var import_web37 = require("@solana/web3.js");
var import_bs58 = __toESM(require("bs58"));
var Account;
((Account5) => {
  class Keypair4 {
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
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
    static toKeyPair = (keypair) => {
      return new Keypair4({
        pubkey: keypair.publicKey.toString(),
        secret: import_bs58.default.encode(keypair.secretKey)
      });
    };
  }
  Account5.Keypair = Keypair4;
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

// ../suite-utils/src/shared.ts
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

// ../suite-utils/src/result.ts
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
((Result9) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result9.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result9.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result9.ok(resArr);
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
    return Result9.ok(res);
  }
  Result9.all = all;
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

// ../converter/src/compressed-nft-metadata.ts
var import_mpl_bubblegum_instruction = require("mpl-bubblegum-instruction");
var Converter3;
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
  })(CompressedNftMetadata = Converter15.CompressedNftMetadata || (Converter15.CompressedNftMetadata = {}));
})(Converter3 || (Converter3 = {}));

// ../converter/src/royalty.ts
var Converter4;
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
})(Converter4 || (Converter4 = {}));

// ../converter/src/nft.ts
var Converter5;
((Converter15) => {
  let Nft;
  ((Nft2) => {
    Nft2.intoUser = (output) => {
      return {
        mint: output.onchain.id.toString(),
        collectionMint: Converter.CollectionMint.intoUser(
          output.onchain.grouping
        ),
        authorities: output.onchain.authorities,
        royalty: Converter4.Royalty.intoUser(output.onchain.royalty.percent),
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
  })(Nft = Converter15.Nft || (Converter15.Nft = {}));
})(Converter5 || (Converter5 = {}));

// ../converter/src/memo.ts
var Converter6;
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
})(Converter6 || (Converter6 = {}));

// ../converter/src/mint.ts
var Converter7;
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
})(Converter7 || (Converter7 = {}));

// ../converter/src/regular-nft-metadata.ts
var Converter8;
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
  })(RegularNftMetadata = Converter15.RegularNftMetadata || (Converter15.RegularNftMetadata = {}));
})(Converter8 || (Converter8 = {}));

// ../converter/src/properties.ts
var Converter9;
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
})(Converter9 || (Converter9 = {}));

// ../converter/src/uses.ts
var Converter10;
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
})(Converter10 || (Converter10 = {}));

// ../converter/src/token-metadata.ts
var Converter11;
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
        uses: Converter10.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter15.TokenMetadata || (Converter15.TokenMetadata = {}));
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
  ...Converter3,
  ...Converter,
  ...Converter2,
  ...Converter5,
  ...Converter6,
  ...Converter7,
  ...Converter8,
  ...Converter9,
  ...Converter4,
  ...Converter11,
  ...Converter12,
  ...Converter13,
  ...Converter10
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

// src/api.ts
var DasApi;
((DasApi4) => {
  const connect = async (method, params) => {
    Constants.WarnningMessage.calculateProbability() && console.warn(Constants.WarnningMessage.DAS_API_URL);
    debugLog("# das api url: ", Constants.DAS_API_URL);
    const response = await fetch(Constants.DAS_API_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method,
        id: "compression",
        params
      })
    });
    return (await response.json()).result;
  };
  DasApi4.getAssetProof = async (assetId) => {
    return Try(async () => {
      return await connect("getAssetProof", [assetId]);
    });
  };
  DasApi4.getAsset = async (assetId) => {
    return Try(async () => {
      return await connect("getAsset", [assetId]);
    });
  };
  DasApi4.getAssetsByOwner = async (ownerAddress, limit = 1e3, page = 1, sortBy, before, after) => {
    return Try(async () => {
      return await connect("getAssetsByOwner", [
        ownerAddress,
        sortBy,
        limit,
        page,
        before,
        after
      ]);
    });
  };
  DasApi4.getAssetsByGroup = async (groupKey, groupValue, limit = 1e3, page = 1, sortBy, before, after) => {
    return Try(async () => {
      return await connect("getAssetsByGroup", [
        groupKey,
        groupValue,
        sortBy,
        limit,
        page,
        before,
        after
      ]);
    });
  };
})(DasApi || (DasApi = {}));

// src/find.ts
var DasApi2;
((DasApi4) => {
  DasApi4.defaultSortBy = {
    sortBy: "recent_action" /* Recent */,
    sortDirection: "desc" /* Desc */
  };
  DasApi4.fetchOffchain = async (uri) => {
    const json = await (await fetch(uri)).json();
    return json;
  };
  DasApi4.findByMint = async (mint, isCompressed) => {
    const asset = await DasApi.getAsset(mint);
    if (asset.isErr) {
      throw asset.error;
    }
    if (asset.value.compression.compressed === isCompressed) {
      const offchain = await (0, DasApi4.fetchOffchain)(
        asset.value.content.json_uri
      );
      const merged = {
        onchain: asset.value,
        offchain
      };
      return Converter14.Nft.intoUser(merged);
    }
    return {};
  };
  DasApi4.findByOwner = async (owner, isCompressed, options = {}) => {
    const defaultOptions = {
      limit: 1e3,
      page: 1,
      sortBy: DasApi4.defaultSortBy
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options
    };
    const assets = await DasApi.getAssetsByOwner(
      owner,
      limit,
      page,
      sortBy,
      before,
      after
    );
    if (assets.isErr) {
      throw assets.error;
    }
    const items = assets.value.items;
    const metadatas = await Promise.all(
      items.filter((item) => item.compression.compressed === isCompressed).map(async (item) => {
        try {
          const offchain = await (0, DasApi4.fetchOffchain)(
            item.content.json_uri
          );
          const merged = {
            onchain: item,
            offchain
          };
          return Converter14.Nft.intoUser(merged);
        } catch (err) {
          debugLog("# Failed fetch offchain url: ", item.content.json_uri);
          return Converter14.Nft.intoUser({
            onchain: item,
            offchain: {}
          });
        }
      })
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas
    };
  };
  DasApi4.findByCollection = async (collectionMint, isCompressed, options = {}) => {
    const defaultOptions = {
      limit: 1e3,
      page: 1,
      sortBy: DasApi4.defaultSortBy
    };
    const { limit, page, sortBy, before, after } = {
      ...defaultOptions,
      ...options
    };
    const assets = await DasApi.getAssetsByGroup(
      "collection",
      collectionMint,
      limit,
      page,
      sortBy,
      before,
      after
    );
    if (assets.isErr) {
      throw assets.error;
    }
    const items = assets.value.items;
    const metadatas = await Promise.all(
      items.filter((item) => item.compression.compressed === isCompressed).map(async (item) => {
        const offchain = await (0, DasApi4.fetchOffchain)(item.content.json_uri);
        const merged = {
          onchain: item,
          offchain
        };
        return Converter14.Nft.intoUser(merged);
      })
    );
    return {
      page: assets.value.page,
      total: assets.value.total,
      limit: assets.value.limit,
      metadatas
    };
  };
})(DasApi2 || (DasApi2 = {}));

// src/index.ts
var DasApi3 = {
  ...DasApi,
  ...DasApi2
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DasApi
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9jb25zdGFudHMudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvYmF0Y2gudHMiLCAiLi4vLi4vbm9kZS9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvY29tbW9uLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL21pbnQudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tYnVpbGRlci9zcmMvcGFydGlhbC1zaWduLnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2NhbGN1bGF0ZS10eHNpemUudHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2tleXBhaXIudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMvcGRhLnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3RyYW5zYWN0aW9uLWJ1aWxkZXIvc3JjL2luZGV4LnRzIiwgIi4uLy4uL3N1aXRlLXV0aWxzL3NyYy9zaGFyZWQudHMiLCAiLi4vLi4vc3VpdGUtdXRpbHMvc3JjL3Jlc3VsdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbXByZXNzZWQtbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcm95YWx0eS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL25mdC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcmVndWxhci1uZnQtbWV0YWRhdGEudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9wcm9wZXJ0aWVzLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXItY2hlY2tlZC50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3RyYW5zZmVyLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvaW5kZXgudHMiLCAiLi4vLi4vdmFsaWRhdG9yL3NyYy9pbmRleC50cyIsICIuLi9zcmMvYXBpLnRzIiwgIi4uL3NyYy9maW5kLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBEYXNBcGkgYXMgQXBpIH0gZnJvbSAnLi9hcGknO1xuaW1wb3J0IHsgRGFzQXBpIGFzIEZpbmQgfSBmcm9tICcuL2ZpbmQnO1xuXG5leHBvcnQgY29uc3QgRGFzQXBpID0ge1xuICAuLi5BcGksXG4gIC4uLkZpbmQsXG59O1xuIiwgImltcG9ydCB7IENvbW1pdG1lbnQsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgU29sYW5hSnNvbkNvbmZpZyBmcm9tICdAc29sYW5hLXN1aXRlL2NvbmZpZy9sb2FkJztcblxubGV0IENvbmZpZyA9IFNvbGFuYUpzb25Db25maWc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBXYXJubmluZ01lc3NhZ2Uge1xuICAgIGNvbnN0IFRIUkVTSEhPTEQgPSA1MDtcbiAgICBsZXQgaXNEaXNwbGF5ID0gZmFsc2U7XG4gICAgZXhwb3J0IGNvbnN0IE5GVF9TVE9SQUdFX0FQSV9LRVkgPSBgXG4gICAgICAgIFtZT1UgSEFWRSBUTyBET11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIG5mdFN0b3JhZ2VBcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgQ2FuIGdldCBhcGkga2V5IGZyb20gaHR0cHM6Ly9uZnQuc3RvcmFnZS9cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYDtcbiAgICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBgXG4gICAgICAgIFtZT1UgSEFWRSBUTyBET11cbiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgWW91IG5lZWQgdG8gdXBkYXRlIGRhc0FwaVVybCBkZWZpbmUgcGFyYW1ldGVyIGluIHNvbGFuYS1zdWl0ZS5qc29uLlxuICAgICAgICBjYW4gZ2V0IGFwaSB1cmwgZnJvbSBodHRwczovL3d3dy5oZWxpdXMuZGV2L1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBcbiAgICAgICAgYDtcbiAgICBleHBvcnQgY29uc3QgQU5OT1VOQ0UgPSBgXG4gICAgICAgIFtERVBSRUNBVEVEXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBBY2NvdW50LCBOb2RlLCB0b0V4cGxvcmVyLCBQdWJrZXksIFNlY3JldCBoYXZlIGJlZW4gbW92ZWQgdG8gXG4gICAgICAgIEBzb2xhbmEtc3VpdGUvdXRpbHMgXG4gICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gXG4gICAgICAgIGA7XG5cbiAgICBleHBvcnQgY29uc3QgY2FsY3VsYXRlUHJvYmFiaWxpdHkgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCByYW5kb21WYWx1ZSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb25zdCBwcm9iYWJpbGl0eSA9IDEgLyBUSFJFU0hIT0xEO1xuICAgICAgaWYgKCFpc0Rpc3BsYXkgJiYgcmFuZG9tVmFsdWUgPCBwcm9iYWJpbGl0eSkge1xuICAgICAgICBpc0Rpc3BsYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29uc3RhbnRzIHtcbiAgZXhwb3J0IGNvbnN0IGN1cnJlbnRDbHVzdGVyID0gQ29uZmlnLmNsdXN0ZXIudHlwZTtcbiAgZXhwb3J0IGNvbnN0IGN1c3RvbUNsdXN0ZXJVcmwgPSBDb25maWcuY2x1c3Rlci5jdXN0b21DbHVzdGVyVXJsO1xuICBleHBvcnQgY29uc3QgaXNEZWJ1Z2dpbmcgPSBDb25maWcuZGVidWdnaW5nO1xuICBleHBvcnQgY29uc3QgbmZ0U3RvcmFnZUFwaUtleSA9IENvbmZpZy5uZnRTdG9yYWdlQXBpS2V5O1xuICBleHBvcnQgY29uc3QgZGFzQXBpVXJsID0gQ29uZmlnLmRhc0FwaVVybDtcblxuICBleHBvcnQgZW51bSBDbHVzdGVyIHtcbiAgICBwcmQgPSAnbWFpbm5ldC1iZXRhJyxcbiAgICBwcmRNZXRhcGxleCA9ICdtYWlubmV0LWJldGEtbWV0YXBsZXgnLFxuICAgIGRldiA9ICdkZXZuZXQnLFxuICAgIHRlc3QgPSAndGVzdG5ldCcsXG4gICAgbG9jYWxob3N0ID0gJ2xvY2FsaG9zdC1kZXZuZXQnLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRW5kUG9pbnRVcmwge1xuICAgIHByZCA9ICdodHRwczovL2FwaS5tYWlubmV0LWJldGEuc29sYW5hLmNvbScsXG4gICAgcHJkTWV0YXBsZXggPSAnaHR0cHM6Ly9hcGkubWV0YXBsZXguc29sYW5hLmNvbScsXG4gICAgZGV2ID0gJ2h0dHBzOi8vYXBpLmRldm5ldC5zb2xhbmEuY29tJyxcbiAgICB0ZXN0ID0gJ2h0dHBzOi8vYXBpLnRlc3RuZXQuc29sYW5hLmNvbScsXG4gICAgbG9jYWxob3N0ID0gJ2h0dHA6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gQnVuZGxyVXJsIHtcbiAgICBwcmQgPSAnaHR0cHM6Ly9ub2RlMS5pcnlzLnh5eixodHRwczovL25vZGUyLmlyeXMueHl6JyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaXJ5cy54eXonLFxuICB9XG5cbiAgZXhwb3J0IGVudW0gRGFzQXBpVXJsIHtcbiAgICBkZXYgPSAnaHR0cHM6Ly9kZXZuZXQuaGVsaXVzLXJwYy5jb20vP2FwaS1rZXk9MTUzMTliZjQtNWI0MC00OTU4LWFjOGQtNjMxM2FhNTVlYjkyLGh0dHBzOi8vcnBjLWRldm5ldC5oZWxpdXMueHl6P2FwaS1rZXk9OWY3MGE4NDMtMzI3NC00ZmZkLWEwYTktMzIzZjhiN2MwNjM5JyxcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5mdHN0b3JhZ2VBcGlLZXkge1xuICAgIGRldiA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKemRXSWlPaUprYVdRNlpYUm9jam93ZUVSR01qY3lOMlZrT0RaaFJHVTFSVE15WkRaRFpFSmxPRGMwWXpSRk5EbEVPRFkxT1dabU9FTWlMQ0pwYzNNaU9pSnVablF0YzNSdmNtRm5aU0lzSW1saGRDSTZNVFl5TURJMk5EazBNemN3Tml3aWJtRnRaU0k2SW1SbGJXOGlmUS5kNEo3MG1pa3hSQjhhNXZ3TnU2U081SERBOEphdWV1c2VBajdRX3l0TUNFJyxcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBsb2FkQ29uZmlnID0gYXN5bmMgKCkgPT4ge1xuICAgIENvbmZpZyA9IGF3YWl0IGltcG9ydCgnQHNvbGFuYS1zdWl0ZS9jb25maWcvbG9hZCcpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hDbHVzdGVyID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IHsgY2x1c3RlcjogZW52LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcblxuICAgIC8vIGlmIHNldHRlZCBjdXN0b20gdXJsLCBtb3N0IHByaW9yaXR5XG4gICAgaWYgKGN1c3RvbUNsdXN0ZXJVcmwgJiYgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSBjdXN0b21DbHVzdGVyVXJsLmxlbmd0aDtcbiAgICAgIHJldHVybiBjdXN0b21DbHVzdGVyVXJsW2luZGV4XTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkO1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmRNZXRhcGxleDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5wcmRNZXRhcGxleDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIudGVzdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0O1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FbmRQb2ludFVybC5sb2NhbGhvc3Q7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBzd2l0Y2hCdW5kbHIgPSAoZW52OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIHN3aXRjaCAoZW52KSB7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnByZDoge1xuICAgICAgICBjb25zdCB1cmxzID0gQ29uc3RhbnRzLkJ1bmRsclVybC5wcmQuc3BsaXQoJywnKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgdXJscy5sZW5ndGg7XG4gICAgICAgIHJldHVybiB1cmxzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgcmV0dXJuIENvbnN0YW50cy5CdW5kbHJVcmwuZGV2O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoRGFzQXBpID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ6IHtcbiAgICAgICAgaWYgKGRhc0FwaVVybC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5EQVNfQVBJX1VSTCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJscyA9IENvbnN0YW50cy5CdW5kbHJVcmwucHJkLnNwbGl0KCcsJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIHVybHMubGVuZ3RoO1xuICAgICAgICByZXR1cm4gdXJsc1tpbmRleF07XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IHVybHMgPSBDb25zdGFudHMuRGFzQXBpVXJsLmRldi5zcGxpdCgnLCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERhdGUubm93KCkgJSB1cmxzLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIHVybHNbaW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoTmZ0U3RvcmFnZSA9IChlbnY6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICBpZiAoIW5mdFN0b3JhZ2VBcGlLZXkpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihXYXJubmluZ01lc3NhZ2UuTkZUX1NUT1JBR0VfQVBJX0tFWSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5mdFN0b3JhZ2VBcGlLZXk7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuTmZ0c3RvcmFnZUFwaUtleS5kZXY7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBXUkFQUEVEX1RPS0VOX1BST0dSQU1fSUQgPSBuZXcgUHVibGljS2V5KFxuICAgICdTbzExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEyJyxcbiAgKTtcbiAgZXhwb3J0IGNvbnN0IE1FTU9fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ01lbW8xVWhrSlJmSHl2TE1jVnVjSnd4WGV1RDcyOEVxVkREd1FEeEZNTm8nLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVUQVBMRVhfUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ21ldGFxYnh4VWVyZHEyOGNqMVJiQVdrWVFtM3liempiNmE4YnQ1MTh4MXMnLFxuICApO1xuICBleHBvcnQgY29uc3QgQ09NTUlUTUVOVDogQ29tbWl0bWVudCA9ICdjb25maXJtZWQnO1xuICBleHBvcnQgY29uc3QgTkZUX1NUT1JBR0VfR0FURVdBWV9VUkwgPSAnaHR0cHM6Ly9pcGZzLmlvL2lwZnMnO1xuICBleHBvcnQgY29uc3QgSVJZU19HQVRFV0FZX1VSTCA9ICdodHRwczovL2dhdGV3YXkuaXJ5cy54eXonO1xuICBleHBvcnQgY29uc3QgQlVORExSX05FVFdPUktfVVJMID0gc3dpdGNoQnVuZGxyKENvbmZpZy5jbHVzdGVyLnR5cGUpO1xuICBleHBvcnQgY29uc3QgREFTX0FQSV9VUkwgPSBzd2l0Y2hEYXNBcGkoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID0gc3dpdGNoTmZ0U3RvcmFnZShDb25maWcuY2x1c3Rlci50eXBlKTtcbiAgZXhwb3J0IGNvbnN0IEVYUExPUkVSX1NPTFNDQU5fVVJMID0gJ2h0dHBzOi8vc29sc2Nhbi5pbyc7XG4gIGV4cG9ydCBjb25zdCBFWFBMT1JFUl9TT0xBTkFGTV9VUkwgPSAnaHR0cHM6Ly9zb2xhbmEuZm0nO1xuICBleHBvcnQgY29uc3QgRVhQTE9SRVJfWFJBWV9VUkwgPSAnaHR0cHM6Ly94cmF5LmhlbGl1cy54eXonO1xufVxuXG4vLyBEaXNwbGF5IEFsbCBBbm5vdW5jZVxuY29uc29sZS5sb2coQ29uc3RhbnRzLldhcm5uaW5nTWVzc2FnZS5BTk5PVU5DRSk7XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUywgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyeSwgUmVzdWx0IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIEJhdGNoIHtcbiAgICBzdWJtaXQgPSBhc3luYyAoXG4gICAgICBhcnI6IENvbW1vbi5Db21tb25bXSB8IE1pbnQuTWludFtdLFxuICAgICk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgYSBvZiBhcnIpIHtcbiAgICAgICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICBgb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIGJhdGNoU3VibWl0KCkuXG4gICAgICAgICAgICBJbmRleDogJHtpfSwgU2V0IHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KGEpfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBhcnIuZmxhdE1hcCgoYSkgPT4gYS5pbnN0cnVjdGlvbnMpO1xuICAgICAgICBjb25zdCBzaWduZXJzID0gYXJyLmZsYXRNYXAoKGEpID0+IGEuc2lnbmVycyk7XG4gICAgICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGxldCBmZWVQYXllciA9IHNpZ25lcnNbMF07XG4gICAgICAgIGlmIChmZWVQYXllcnMubGVuZ3RoID4gMCAmJiBmZWVQYXllcnNbMF0uZmVlUGF5ZXIpIHtcbiAgICAgICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgICAgICBpZiAoZmVlUGF5ZXIpIHtcbiAgICAgICAgICB0cmFuc2FjdGlvbi5mZWVQYXllciA9IGZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgICAgICB9XG4gICAgICAgIGluc3RydWN0aW9ucy5tYXAoKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlVHhzaXplLmlzTWF4VHJhbnNhY3Rpb25TaXplKHRyYW5zYWN0aW9uLCBmZWVQYXllci5wdWJsaWNLZXkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLFxuICAgICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbWl0bWVudCwgQ29ubmVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTm9kZSB7XG4gIGNvbnN0IHNldHRlZCA9IHtcbiAgICBjbHVzdGVyVXJsOiAnJyxcbiAgICBjb21taXRtZW50OiBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgICBjdXN0b21DbHVzdGVyVXJsOiBbXSBhcyBzdHJpbmdbXSxcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Q29ubmVjdGlvbiA9ICgpOiBDb25uZWN0aW9uID0+IHtcbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQ29ubmVjdGlvbihzZXR0ZWQuY2x1c3RlclVybCwgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBjaGFuZ2VDb25uZWN0aW9uID0gKHBhcmFtOiB7XG4gICAgY2x1c3Rlcj86IHN0cmluZztcbiAgICBjb21taXRtZW50PzogQ29tbWl0bWVudDtcbiAgICBjdXN0b21DbHVzdGVyVXJsPzogc3RyaW5nW107XG4gIH0pOiB2b2lkID0+IHtcbiAgICAvLyBpbml0aWFsaXplXG4gICAgc2V0dGVkLmNsdXN0ZXJVcmwgPSAnJztcbiAgICBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCA9IFtdO1xuICAgIHNldHRlZC5jb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQ7XG5cbiAgICBjb25zdCB7IGNsdXN0ZXIsIGNvbW1pdG1lbnQsIGN1c3RvbUNsdXN0ZXJVcmwgfSA9IHBhcmFtO1xuICAgIGlmIChjb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IGNvbW1pdG1lbnQ7XG4gICAgICBkZWJ1Z0xvZygnIyBOb2RlIGNoYW5nZSBjb21taXRtZW50OiAnLCBzZXR0ZWQuY29tbWl0bWVudCk7XG4gICAgfVxuXG4gICAgaWYgKGNsdXN0ZXIpIHtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjbHVzdGVyOiBjbHVzdGVyIH0pO1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY2x1c3RlclVybDogJywgc2V0dGVkLmNsdXN0ZXJVcmwpO1xuICAgIH1cblxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsKSB7XG4gICAgICBkZWJ1Z0xvZygnIyBjdXN0b21DbHVzdGVyVXJsOiAnLCBjdXN0b21DbHVzdGVyVXJsKTtcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoeyBjdXN0b21DbHVzdGVyVXJsIH0pO1xuICAgICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBjdXN0b21DbHVzdGVyVXJsO1xuICAgICAgZGVidWdMb2coXG4gICAgICAgICcjIE5vZGUgY2hhbmdlIGNsdXN0ZXIsIGN1c3RvbSBjbHVzdGVyIHVybDogJyxcbiAgICAgICAgc2V0dGVkLmNsdXN0ZXJVcmwsXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3QgY29uZmlybWVkU2lnID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICAgIGNvbW1pdG1lbnQ6IENvbW1pdG1lbnQgPSBDb25zdGFudHMuQ09NTUlUTUVOVCxcbiAgKSA9PiB7XG4gICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgIGNvbnN0IGxhdGVzdEJsb2NraGFzaCA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgcmV0dXJuIGF3YWl0IGNvbm5lY3Rpb25cbiAgICAgIC5jb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBibG9ja2hhc2g6IGxhdGVzdEJsb2NraGFzaC5ibG9ja2hhc2gsXG4gICAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGxhdGVzdEJsb2NraGFzaC5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgICBzaWduYXR1cmUsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbW1pdG1lbnQsXG4gICAgICApXG4gICAgICAudGhlbihSZXN1bHQub2spXG4gICAgICAuY2F0Y2goUmVzdWx0LmVycik7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgQ29tbW9uU3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcblxuZXhwb3J0IGNvbnN0IE1BWF9SRVRSSUVTID0gMztcblxuZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2FjdGlvbkJ1aWxkZXIge1xuICBleHBvcnQgY2xhc3MgQ29tbW9uPFQgPSB1bmRlZmluZWQ+IGltcGxlbWVudHMgQ29tbW9uU3RydWN0dXJlPFQ+IHtcbiAgICBzdGF0aWMgTUFYX1RSQU5TQUNUSU9OX1NJWkUgPSAxMjMyO1xuXG4gICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW107XG4gICAgc2lnbmVyczogS2V5cGFpcltdO1xuICAgIGZlZVBheWVyPzogS2V5cGFpcjtcbiAgICBkYXRhPzogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgICBkYXRhPzogVCxcbiAgICApIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5zaWduZXJzID0gc2lnbmVycztcbiAgICAgIHRoaXMuZmVlUGF5ZXIgPSBmZWVQYXllcjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgfVxuXG4gICAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tbW9uKSkge1xuICAgICAgICAgIHRocm93IEVycm9yKCdvbmx5IEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG4gICAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgICBsZXQgZmluYWxTaWduZXJzID0gdGhpcy5zaWduZXJzO1xuXG4gICAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgICBmaW5hbFNpZ25lcnMgPSBbdGhpcy5mZWVQYXllciwgLi4udGhpcy5zaWduZXJzXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIEtleXBhaXIsXG4gIHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24sXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgQ29uc3RhbnRzLCBkZWJ1Z0xvZywgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBNaW50U3RydWN0dXJlIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1idWlsZGVyJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIE1pbnQ8VCA9IFB1YmtleT4gaW1wbGVtZW50cyBNaW50U3RydWN0dXJlPFQ+IHtcbiAgICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgICBzaWduZXJzOiBLZXlwYWlyW107XG4gICAgZmVlUGF5ZXI6IEtleXBhaXI7XG4gICAgZGF0YTogVDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uW10sXG4gICAgICBzaWduZXJzOiBLZXlwYWlyW10sXG4gICAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICAgIGRhdGE6IFQsXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9ucyA9IGluc3RydWN0aW9ucztcbiAgICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jICgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiA9PiB7XG4gICAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1pbnQpKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoJ29ubHkgTWludEluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgICB0cmFuc2FjdGlvbi5sYXN0VmFsaWRCbG9ja0hlaWdodCA9IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodDtcbiAgICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgICBpZiAodGhpcy5mZWVQYXllcikge1xuICAgICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgICAgICAgIGRlYnVnTG9nKCcjIENoYW5nZSBtZXRhcGxleCBjbHVzdGVyIG9uIG1haW5uZXQtYmV0YScpO1xuICAgICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWFsU2lnblN0cnVjdHVyZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVHJhbnNhY3Rpb25CdWlsZGVyIHtcbiAgZXhwb3J0IGNsYXNzIFBhcnRpYWxTaWduIGltcGxlbWVudHMgUGFydGlhbFNpZ25TdHJ1Y3R1cmUge1xuICAgIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gICAgZGF0YT86IFB1YmtleTtcbiAgICBjYW5TdWJtaXQ/OiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXksIGNhblN1Ym1pdCA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgdGhpcy5kYXRhID0gbWludDtcbiAgICAgIHRoaXMuY2FuU3VibWl0ID0gY2FuU3VibWl0O1xuICAgIH1cblxuICAgIHN1Ym1pdCA9IGFzeW5jIChcbiAgICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJ0aWFsU2lnbikpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignb25seSBQYXJ0aWFsU2lnbkluc3RydWN0aW9uIG9iamVjdCB0aGF0IGNhbiB1c2UgdGhpcycpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVjb2RlID0gQnVmZmVyLmZyb20odGhpcy5oZXhJbnN0cnVjdGlvbiwgJ2hleCcpO1xuICAgICAgICBjb25zdCB0cmFuc2FjdGlvbkZyb21Kc29uID0gVHJhbnNhY3Rpb24uZnJvbShkZWNvZGUpO1xuICAgICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2lyZVRyYW5zYWN0aW9uID0gdHJhbnNhY3Rpb25Gcm9tSnNvbi5zZXJpYWxpemUoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLnNlbmRSYXdUcmFuc2FjdGlvbihcbiAgICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQdWJsaWNLZXksIFRyYW5zYWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuLy8gQGludGVybmFsXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uQnVpbGRlciB7XG4gIGNvbnN0IExPV19WQUxVRSA9IDEyNzsgLy8gMHg3ZlxuICBjb25zdCBISUdIX1ZBTFVFID0gMTYzODM7IC8vIDB4M2ZmZlxuICBjb25zdCBNQVhfVFJBTlNBQ1RJT05fU0laRSA9IDEyMzI7XG5cbiAgLyoqXG4gICAqIENvbXBhY3QgdTE2IGFycmF5IGhlYWRlciBzaXplXG4gICAqIEBwYXJhbSBuIGVsZW1lbnRzIGluIHRoZSBjb21wYWN0IGFycmF5XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXkgaGVhZGVyXG4gICAqL1xuICBjb25zdCBjb21wYWN0SGVhZGVyID0gKG46IG51bWJlcikgPT5cbiAgICBuIDw9IExPV19WQUxVRSA/IDEgOiBuIDw9IEhJR0hfVkFMVUUgPyAyIDogMztcblxuICAvKipcbiAgICogQ29tcGFjdCB1MTYgYXJyYXkgc2l6ZVxuICAgKiBAcGFyYW0gbiBlbGVtZW50cyBpbiB0aGUgY29tcGFjdCBhcnJheVxuICAgKiBAcGFyYW0gc2l6ZSBieXRlcyBwZXIgZWFjaCBlbGVtZW50XG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgYXJyYXlcbiAgICovXG4gIGNvbnN0IGNvbXBhY3RBcnJheVNpemUgPSAobjogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+XG4gICAgY29tcGFjdEhlYWRlcihuKSArIG4gKiBzaXplO1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdHhzaXplXG4gICAqIEBwYXJhbSB0cmFuc2FjdGlvbiBhIHNvbGFuYSB0cmFuc2FjdGlvblxuICAgKiBAcGFyYW0gZmVlUGF5ZXIgdGhlIHB1YmxpY0tleSBvZiB0aGUgc2lnbmVyXG4gICAqIEByZXR1cm5zIHNpemUgaW4gYnl0ZXMgb2YgdGhlIHRyYW5zYWN0aW9uXG4gICAqL1xuICBleHBvcnQgY29uc3QgY2FsY3VsYXRlVHhTaXplID0gKFxuICAgIHRyYW5zYWN0aW9uOiBUcmFuc2FjdGlvbixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICApOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IGZlZVBheWVyUGsgPSBbZmVlUGF5ZXIudG9CYXNlNTgoKV07XG5cbiAgICBjb25zdCBzaWduZXJzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuICAgIGNvbnN0IGFjY291bnRzID0gbmV3IFNldDxzdHJpbmc+KGZlZVBheWVyUGspO1xuXG4gICAgY29uc3QgaXhzU2l6ZSA9IHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5yZWR1Y2UoKGFjYywgaXgpID0+IHtcbiAgICAgIGl4LmtleXMuZm9yRWFjaCgoeyBwdWJrZXksIGlzU2lnbmVyIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGsgPSBwdWJrZXkudG9CYXNlNTgoKTtcbiAgICAgICAgaWYgKGlzU2lnbmVyKSBzaWduZXJzLmFkZChwayk7XG4gICAgICAgIGFjY291bnRzLmFkZChwayk7XG4gICAgICB9KTtcblxuICAgICAgYWNjb3VudHMuYWRkKGl4LnByb2dyYW1JZC50b0Jhc2U1OCgpKTtcblxuICAgICAgY29uc3QgbkluZGV4ZXMgPSBpeC5rZXlzLmxlbmd0aDtcbiAgICAgIGNvbnN0IG9wYXF1ZURhdGEgPSBpeC5kYXRhLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgYWNjICtcbiAgICAgICAgMSArIC8vIFBJRCBpbmRleFxuICAgICAgICBjb21wYWN0QXJyYXlTaXplKG5JbmRleGVzLCAxKSArXG4gICAgICAgIGNvbXBhY3RBcnJheVNpemUob3BhcXVlRGF0YSwgMSlcbiAgICAgICk7XG4gICAgfSwgMCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFjdEFycmF5U2l6ZShzaWduZXJzLnNpemUsIDY0KSArIC8vIHNpZ25hdHVyZXNcbiAgICAgIDMgKyAvLyBoZWFkZXJcbiAgICAgIGNvbXBhY3RBcnJheVNpemUoYWNjb3VudHMuc2l6ZSwgMzIpICsgLy8gYWNjb3VudHNcbiAgICAgIDMyICsgLy8gYmxvY2toYXNoXG4gICAgICBjb21wYWN0SGVhZGVyKHRyYW5zYWN0aW9uLmluc3RydWN0aW9ucy5sZW5ndGgpICsgLy8gaW5zdHJ1Y3Rpb25zXG4gICAgICBpeHNTaXplXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogSXMgbWF4IHRyYW5zYWN0aW9uIHNpemVcbiAgICogQHBhcmFtIHRyYW5zYWN0aW9uIGEgc29sYW5hIHRyYW5zYWN0aW9uXG4gICAqIEBwYXJhbSBmZWVQYXllciB0aGUgcHVibGljS2V5IG9mIHRoZSBzaWduZXJcbiAgICogQHJldHVybnMgc2l6ZSBpbiBieXRlcyBvZiB0aGUgdHJhbnNhY3Rpb25cbiAgICovXG4gIGV4cG9ydCBjb25zdCBpc092ZXJUcmFuc2FjdGlvblNpemUgPSAoXG4gICAgdHJhbnNhY3Rpb246IFRyYW5zYWN0aW9uLFxuICAgIGZlZVBheWVyOiBQdWJsaWNLZXksXG4gICk6IGJvb2xlYW4gPT4ge1xuICAgIHJldHVybiBjYWxjdWxhdGVUeFNpemUodHJhbnNhY3Rpb24sIGZlZVBheWVyKSA+IE1BWF9UUkFOU0FDVElPTl9TSVpFO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgQmlnTnVtYmVyIH0gZnJvbSAnYmlnbnVtYmVyLmpzJztcbmltcG9ydCB7IEV4cGxvcmVyLCBFeHBsb3Jlck9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4gIG9wdGlvbnM6IFBhcnRpYWw8RXhwbG9yZXJPcHRpb25zPiA9IHt9LFxuKSB7XG4gIGNvbnN0IGVuZFBvaW50VXJsID0gTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQ7XG4gIGRlYnVnTG9nKCcjIHRvRXhwbG9yZXJVcmwgcnBjRW5kcG9pbnQ6JywgZW5kUG9pbnRVcmwpO1xuICBsZXQgY2x1c3RlciA9ICcnO1xuICBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIucHJkO1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci50ZXN0O1xuICB9IGVsc2UgaWYgKGVuZFBvaW50VXJsID09PSBDb25zdGFudHMuRW5kUG9pbnRVcmwuZGV2KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLmRldjtcbiAgfSBlbHNlIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9XG5cbiAgY29uc3QgYWRkcmVzc09yU2lnbmF0dXJlOiBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gIGxldCB1cmwgPSAnJztcblxuICBpZiAob3B0aW9ucy5yZXBsYWNlUGF0aCkge1xuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuWHJheSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1hSQVlfVVJMfS8ke29wdGlvbnMucmVwbGFjZVBhdGh9LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9uZXR3b3JrPSR7Y2x1c3Rlcn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfU09MU0NBTl9VUkx9LyR7b3B0aW9ucy5yZXBsYWNlUGF0aH0vJHthZGRyZXNzT3JTaWduYXR1cmV9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBpZiAoQWNjb3VudC5LZXlwYWlyLmlzUHVia2V5KGFkZHJlc3NPclNpZ25hdHVyZSkpIHtcbiAgICAvLyBhZGRyZXNzXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTEFOQUZNX1VSTH0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L2FjY291bnQvJHthZGRyZXNzT3JTaWduYXR1cmV9P25ldHdvcms9JHtjbHVzdGVyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xTQ0FOX1VSTH0vYWNjb3VudC8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gc2lnbmF0dXJlXG4gICAgLy8gZm9yIEludmFsaWQgdHlwZSBcIm5ldmVyXCIgb2YgYWRkcmVzc09yU2lnbmF0dXJlLCBzbyBgYXMgc3RyaW5nYFxuICAgIGlmIChleHBsb3JlciA9PT0gRXhwbG9yZXIuU29sYW5hRk0pIHtcbiAgICAgIHVybCA9IGAke0NvbnN0YW50cy5FWFBMT1JFUl9TT0xBTkFGTV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2UgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5YcmF5KSB7XG4gICAgICB1cmwgPSBgJHtDb25zdGFudHMuRVhQTE9SRVJfWFJBWV9VUkx9L3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/bmV0d29yaz0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYCR7Q29uc3RhbnRzLkVYUExPUkVSX1NPTFNDQU5fVVJMfS90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUFjY291bnQuS2V5cGFpci5pc1B1YmtleSh0aGlzLnRvU3RyaW5nKCkpKSB7XG4gICAgdGhyb3cgRXJyb3IoYE5vIG1hdGNoIEtleVBhaXIuUHViS2V5OiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnRvU3RyaW5nKCkpO1xufTtcblxuLyoqXG4gKiBTZWNyZXQoQHNvbGFuYS1zdWl0ZSkgdG8gS2V5cGFpcihAc29sYW5hL3dlYjMuanMpXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgS2V5cGFpclxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvS2V5cGFpciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFBY2NvdW50LktleXBhaXIuaXNTZWNyZXQodGhpcy50b1N0cmluZygpKSkge1xuICAgIHRocm93IEVycm9yKGBObyBtYXRjaCBLZXlQYWlyLlNlY3JldDogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gIH1cbiAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnRvU3RyaW5nKCkpO1xuICByZXR1cm4gS2V5cGFpci5mcm9tU2VjcmV0S2V5KGRlY29kZWQpO1xufTtcblxuLyoqXG4gKiBMQU1QT1JUUyB0byBTT0xcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b1NvbCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIEJpZ051bWJlcih0aGlzIGFzIG51bWJlcilcbiAgICAuZGl2KExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuXG4vKipcbiAqIFNPTCB0byBMQU1QT1JUU1xuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIG51bWJlclxuICovXG5OdW1iZXIucHJvdG90eXBlLnRvTGFtcG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLnRpbWVzKExBTVBPUlRTX1BFUl9TT0wpXG4gICAgLnRvTnVtYmVyKCk7XG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgZGVidWdMb2csIHNsZWVwIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciB9IGZyb20gJ34vdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBDb21tb25TdHJ1Y3R1cmUgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7IEFjY291bnQgYXMgS2V5cGFpciB9IGZyb20gJy4va2V5cGFpcic7XG5cbi8qKlxuICogR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAqIGlmIG5vdCBjcmVhdGVkLCBjcmVhdGUgbmV3IHRva2VuIGFjY291aW50XG4gKlxuICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAqIEBwYXJhbSB7UHVia2V5fSBvd25lclxuICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFsbG93T3duZXJPZmZDdXJ2ZVxuICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj5cbiAqL1xuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBBc3NvY2lhdGVkIHtcbiAgICBjb25zdCBSRVRSWV9PVkVSX0xJTUlUID0gMTA7XG4gICAgY29uc3QgUkVUUllfU0xFRVBfVElNRSA9IDM7XG4gICAgLy9AaW50ZXJuYWxcbiAgICBjb25zdCBnZXQgPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICAgIGFsbG93T3duZXJPZmZDdXJ2ZSA9IGZhbHNlLFxuICAgICk6IFByb21pc2U8c3RyaW5nIHwgQ29tbW9uU3RydWN0dXJlPFB1YmtleT4+ID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgICBtaW50LFxuICAgICAgICBvd25lcixcbiAgICAgICAgbmV3IEtleXBhaXIuS2V5cGFpcih7IHNlY3JldDogZmVlUGF5ZXIgfSkucHVia2V5LFxuICAgICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICApO1xuXG4gICAgICBpZiAoIXJlcy5pbnN0KSB7XG4gICAgICAgIHJldHVybiByZXMudG9rZW5BY2NvdW50O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb248UHVia2V5PihcbiAgICAgICAgW3Jlcy5pbnN0XSxcbiAgICAgICAgW10sXG4gICAgICAgIGZlZVBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgICByZXMudG9rZW5BY2NvdW50ISxcbiAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldHJ5IGZ1bmN0aW9uIGlmIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAgICogQHJldHVybnMgUHJvbWlzZTxzdHJpbmc+XG4gICAgICovXG4gICAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgbGV0IGNvdW50ZXIgPSAxO1xuICAgICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgaW5zdCA9IGF3YWl0IGdldChtaW50LCBvd25lciwgZmVlUGF5ZXIsIHRydWUpO1xuXG4gICAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBpbnN0KTtcbiAgICAgICAgICAgIHJldHVybiBpbnN0O1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIFRyYW5zYWN0aW9uQnVpbGRlci5Db21tb24pIHtcbiAgICAgICAgICAgIChhd2FpdCBpbnN0LnN1Ym1pdCgpKS5tYXAoXG4gICAgICAgICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgTm9kZS5jb25maXJtZWRTaWcob2spO1xuICAgICAgICAgICAgICAgIHJldHVybiBpbnN0LmRhdGE7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc3VibWl0IHJldHJ5R2V0T3JDcmVhdGU6ICcsIGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBkZWJ1Z0xvZyhgIyByZXRyeTogJHtjb3VudGVyfSBjcmVhdGUgdG9rZW4gYWNjb3VudDogYCwgZSk7XG4gICAgICAgICAgZGVidWdMb2coYCMgbWludDogJHttaW50fSwgb3duZXI6ICR7b3duZXJ9LCBmZWVQYXllcjogJHtmZWVQYXllcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBzbGVlcChSRVRSWV9TTEVFUF9USU1FKTtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxuICAgICAgdGhyb3cgRXJyb3IoYHJldHJ5IGFjdGlvbiBpcyBvdmVyIGxpbWl0ICR7UkVUUllfT1ZFUl9MSU1JVH1gKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICAgKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgICAqXG4gICAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICAgKiBAcGFyYW0ge1B1YmtleX0gZmVlUGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICAgKi9cbiAgICBleHBvcnQgY29uc3QgbWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24gPSBhc3luYyAoXG4gICAgICBtaW50OiBQdWJrZXksXG4gICAgICBvd25lcjogUHVia2V5LFxuICAgICAgZmVlUGF5ZXI/OiBQdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgICApOiBQcm9taXNlPHtcbiAgICAgIHRva2VuQWNjb3VudDogc3RyaW5nO1xuICAgICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICB9PiA9PiB7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgYWxsb3dPd25lck9mZkN1cnZlLFxuICAgICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBEb250IHVzZSBSZXN1bHRcbiAgICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b2tlbkFjY291bnQ6IGFzc29jaWF0ZWRUb2tlbkFjY291bnQudG9TdHJpbmcoKSxcbiAgICAgICAgICBpbnN0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5ZXIgPSAhZmVlUGF5ZXIgPyBvd25lciA6IGZlZVBheWVyO1xuXG4gICAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgcGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LFxuICAgICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgICAgaW5zdCxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgS2V5cGFpciBhcyBPcmlnaW5hbCwgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCBicyBmcm9tICdiczU4JztcblxuZXhwb3J0IG5hbWVzcGFjZSBBY2NvdW50IHtcbiAgZXhwb3J0IGNsYXNzIEtleXBhaXIge1xuICAgIHNlY3JldDogU2VjcmV0O1xuICAgIHB1YmtleTogUHVia2V5O1xuXG4gICAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgICAgaWYgKCFwYXJhbXMucHVia2V5KSB7XG4gICAgICAgIGNvbnN0IGtleXBhaXIgPSBwYXJhbXMuc2VjcmV0LnRvS2V5cGFpcigpO1xuICAgICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnB1YmtleSA9IHBhcmFtcy5wdWJrZXk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlY3JldCA9IHBhcmFtcy5zZWNyZXQ7XG4gICAgfVxuXG4gICAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICAgIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMucHVia2V5KTtcbiAgICB9XG5cbiAgICB0b0tleXBhaXIoKTogT3JpZ2luYWwge1xuICAgICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgICByZXR1cm4gT3JpZ2luYWwuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNQdWJrZXkgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFB1YmtleSA9PlxuICAgICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICAgIHN0YXRpYyBpc1NlY3JldCA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgU2VjcmV0ID0+XG4gICAgICAvXlswLTlhLXpBLVpdezg3LDg4fSQvLnRlc3QodmFsdWUpO1xuXG4gICAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyID0+IHtcbiAgICAgIGNvbnN0IGtleXBhaXIgPSBPcmlnaW5hbC5nZW5lcmF0ZSgpO1xuICAgICAgcmV0dXJuIG5ldyBLZXlwYWlyKHtcbiAgICAgICAgcHVia2V5OiBrZXlwYWlyLnB1YmxpY0tleS50b1N0cmluZygpIGFzIFB1YmtleSxcbiAgICAgICAgc2VjcmV0OiBicy5lbmNvZGUoa2V5cGFpci5zZWNyZXRLZXkpIGFzIFNlY3JldCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzdGF0aWMgdG9LZXlQYWlyID0gKGtleXBhaXI6IE9yaWdpbmFsKTogS2V5cGFpciA9PiB7XG4gICAgICByZXR1cm4gbmV3IEtleXBhaXIoe1xuICAgICAgICBwdWJrZXk6IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCkgYXMgUHVia2V5LFxuICAgICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBNUExfQlVCQkxFR1VNX1BST0dSQU1fSUQgfSBmcm9tICdAbWV0YXBsZXgtZm91bmRhdGlvbi9tcGwtYnViYmxlZ3VtJztcbmltcG9ydCBCTiBmcm9tICdibi5qcyc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQWNjb3VudCB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgICBleHBvcnQgY29uc3QgZ2V0TWV0YWRhdGEgPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgIF0sXG4gICAgICAgIFBST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAoYWRkcmVzczogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtcbiAgICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgICBQUk9HUkFNX0lELnRvQnVmZmVyKCksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgICAgXSxcbiAgICAgICAgUFJPR1JBTV9JRCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcHVibGljS2V5O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgZ2V0VHJlZUF1dGhvcml0eSA9IChhZGRyZXNzOiBQdWJrZXkpOiBQdWJsaWNLZXkgPT4ge1xuICAgICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW2FkZHJlc3MudG9QdWJsaWNLZXkoKS50b0J1ZmZlcigpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEJndW1TaWduZXIgPSAoKTogUHVibGljS2V5ID0+IHtcbiAgICAgIGNvbnN0IFtwdWJsaWNLZXldID0gUHVibGljS2V5LmZpbmRQcm9ncmFtQWRkcmVzc1N5bmMoXG4gICAgICAgIFtCdWZmZXIuZnJvbSgnY29sbGVjdGlvbl9jcGknLCAndXRmOCcpXSxcbiAgICAgICAgTVBMX0JVQkJMRUdVTV9QUk9HUkFNX0lELnRvUHVibGljS2V5KCksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGdldEFzc2V0SWQgPSAoYWRkcmVzczogUHVia2V5LCBsZWFmSW5kZXg6IG51bWJlcik6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gbmV3IEJOLkJOKGxlYWZJbmRleCk7XG4gICAgICBjb25zdCBbYXNzZXRJZF0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgICAgW1xuICAgICAgICAgIEJ1ZmZlci5mcm9tKCdhc3NldCcsICd1dGY4JyksXG4gICAgICAgICAgYWRkcmVzcy50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICAgICAgVWludDhBcnJheS5mcm9tKG5vZGUudG9BcnJheSgnbGUnLCA4KSksXG4gICAgICAgIF0sXG4gICAgICAgIE1QTF9CVUJCTEVHVU1fUFJPR1JBTV9JRC50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhc3NldElkLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IEFjY291bnQgYXMgQXNzb2NpYXRlZCB9IGZyb20gJy4vYXNzb2NpYXRlZCc7XG5pbXBvcnQgeyBBY2NvdW50IGFzIEtleXBhaXIgfSBmcm9tICcuL2tleXBhaXInO1xuaW1wb3J0IHsgQWNjb3VudCBhcyBQZGEgfSBmcm9tICcuL3BkYSc7XG5cbmV4cG9ydCBjb25zdCBBY2NvdW50ID0ge1xuICAuLi5Bc3NvY2lhdGVkLFxuICAuLi5LZXlwYWlyLFxuICAuLi5QZGEsXG59O1xuIiwgImltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBCYXRjaCB9IGZyb20gJy4vYmF0Y2gnO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb25CdWlsZGVyIGFzIENvbW1vbiB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBQYXJ0aWFsU2lnbiB9IGZyb20gJy4vcGFydGlhbC1zaWduJztcbmltcG9ydCB7IFRyYW5zYWN0aW9uQnVpbGRlciBhcyBDYWxjdWxhdGVUeHNpemUgfSBmcm9tICcuL2NhbGN1bGF0ZS10eHNpemUnO1xuaW1wb3J0ICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgJ34vZ2xvYmFsJztcblxuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uQnVpbGRlciA9IHtcbiAgLi4uQmF0Y2gsXG4gIC4uLkNhbGN1bGF0ZVR4c2l6ZSxcbiAgLi4uTWludCxcbiAgLi4uQ29tbW9uLFxuICAuLi5QYXJ0aWFsU2lnbixcbn07XG4iLCAiaW1wb3J0IHsgQW55T2JqZWN0IH0gZnJvbSAnfi90eXBlcy91dGlscyc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogY29udmVydCBidWZmZXIgdG8gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyXG4gKiBAcmV0dXJucyBudW1iZXJbXVxuICovXG5leHBvcnQgY29uc3QgYnVmZmVyVG9BcnJheSA9IChidWZmZXI6IEJ1ZmZlcik6IG51bWJlcltdID0+IHtcbiAgY29uc3QgbnVtcyA9IFtdO1xuICBmb3IgKGNvbnN0IGJ5dGUgb2YgYnVmZmVyKSB7XG4gICAgbnVtcy5wdXNoKGJ1ZmZlcltieXRlXSk7XG4gIH1cbiAgcmV0dXJuIG51bXM7XG59O1xuXG4vKipcbiAqIE92ZXJ3cml0ZSBKUyBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9iamVjdFxuICogQHBhcmFtIHtPdmVyd3JpdGVPYmplY3RbXX0gdGFyZ2V0c1xuICogQHJldHVybnMgT2JqZWN0XG4gKi9cbmV4cG9ydCBjb25zdCBvdmVyd3JpdGVPYmplY3QgPSAoXG4gIG9iamVjdDogdW5rbm93bixcbiAgdGFyZ2V0czoge1xuICAgIGV4aXN0c0tleTogc3RyaW5nO1xuICAgIHdpbGw6IHsga2V5OiBzdHJpbmc7IHZhbHVlOiB1bmtub3duIH07XG4gIH1bXSxcbik6IHVua25vd24gPT4ge1xuICBjb25zdCB0aGF0OiBBbnlPYmplY3QgPSBvYmplY3QgYXMgQW55T2JqZWN0O1xuICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgIGRlbGV0ZSB0aGF0W3RhcmdldC5leGlzdHNLZXldO1xuICAgIHRoYXRbdGFyZ2V0LndpbGwua2V5XSA9IHRhcmdldC53aWxsLnZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHRoYXQ7XG59O1xuXG4vKipcbiAqIERpc3BsYXkgbG9nIGZvciBzb2xhbmEtc3VpdGUtY29uZmlnLmpzXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMVxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhMlxuICogQHBhcmFtIHt1bmtub3dufSBkYXRhM1xuICogQHBhcmFtIHt1bmtub3dufSBkYXRhNFxuICogQHJldHVybnMgdm9pZFxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAoXG4gIGRhdGExOiB1bmtub3duLFxuICBkYXRhMjogdW5rbm93biA9ICcnLFxuICBkYXRhMzogdW5rbm93biA9ICcnLFxuICBkYXRhNDogdW5rbm93biA9ICcnLFxuKTogdm9pZCA9PiB7XG4gIGlmIChDb25zdGFudHMuaXNEZWJ1Z2dpbmcgPT09ICd0cnVlJyB8fCBwcm9jZXNzLmVudi5ERUJVRyA9PT0gJ3RydWUnKSB7XG4gICAgY29uc29sZS5sb2coJ1tERUJVR10nLCBkYXRhMSwgZGF0YTIsIGRhdGEzLCBkYXRhNCk7XG4gIH1cbn07XG5cbi8qKlxuICogc2xlZXAgdGltZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gc2VjXG4gKiBAcmV0dXJucyBQcm9taXNlPG51bWJlcj5cbiAqL1xuZXhwb3J0IGNvbnN0IHNsZWVwID0gYXN5bmMgKHNlYzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIHNlYyAqIDEwMDApKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNCcm93c2VyID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59O1xuXG4vKipcbiAqIE5vZGUuanMgb3IgQnJvd3NlciBqc1xuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZSA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zICE9IG51bGwgJiZcbiAgICBwcm9jZXNzLnZlcnNpb25zLm5vZGUgIT0gbnVsbFxuICApO1xufTtcblxuLyoqXG4gKiBhcmd1bWVudCBpcyBwcm9taXNlIG9yIG90aGVyXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBvYmpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgcmV0dXJuIChcbiAgICAhIW9iaiAmJlxuICAgICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSAmJlxuICAgIHR5cGVvZiAob2JqIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufTtcblxuLyoqXG4gKiBUcnkgYXN5bmMgbW9uYWRcbiAqXG4gKiBAcmV0dXJucyBQcm9taXNlPFJlc3VsdDxULCBFPj5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBhc3luY2Jsb2NrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUHJvbWlzZTxSZXN1bHQ8VCwgRT4+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KGJsb2NrOiAoKSA9PiBUKTogUmVzdWx0PFQsIEU+O1xuZXhwb3J0IGZ1bmN0aW9uIFRyeTxULCBFIGV4dGVuZHMgRXJyb3I+KFxuICBpbnB1dDogKCkgPT4gUHJvbWlzZTxUPixcbiAgZmluYWxseUlucHV0PzogKCkgPT4gdm9pZCxcbik6IFJlc3VsdDxULCBFcnJvcj4gfCBQcm9taXNlPFJlc3VsdDxULCBFcnJvcj4+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB2ID0gaW5wdXQoKTtcbiAgICBpZiAoaXNQcm9taXNlKHYpKSB7XG4gICAgICByZXR1cm4gdi50aGVuKFxuICAgICAgICAoeDogVCkgPT4gUmVzdWx0Lm9rKHgpLFxuICAgICAgICAoZXJyOiBFKSA9PiBSZXN1bHQuZXJyKGVyciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUmVzdWx0Lm9rKHYpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIHJldHVybiBSZXN1bHQuZXJyKGUpO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0LmVycihFcnJvcihlIGFzIHN0cmluZykpO1xuICB9IGZpbmFsbHkge1xuICAgIGlmIChmaW5hbGx5SW5wdXQpIHtcbiAgICAgIGRlYnVnTG9nKCcjIGZpbmFsbHkgaW5wdXQ6JywgZmluYWxseUlucHV0KTtcbiAgICAgIGZpbmFsbHlJbnB1dCgpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcnx1bmRlZmluZWR9IGNyZWF0ZWRfYXRcbiAqIEByZXR1cm5zIERhdGUgfCB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lID0gKFxuICBjcmVhdGVkX2F0OiBudW1iZXIgfCB1bmRlZmluZWQsXG4pOiBEYXRlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKGNyZWF0ZWRfYXQpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoY3JlYXRlZF9hdCAqIDEwMDApO1xuICB9XG4gIHJldHVybjtcbn07XG5cbi8qKlxuICogR2V0IHVuaXggdGltZXN0YW1wXG4gKlxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbmV4cG9ydCBjb25zdCB1bml4VGltZXN0YW1wID0gKCk6IG51bWJlciA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG59O1xuIiwgIi8vIGZvcmtlZDogaHR0cHM6Ly9naXRodWIuY29tL2JhZHJhcC9yZXN1bHQsIHRoYW5rIHlvdSBhZHZpY2UgIEBqdmlpZGVcbmltcG9ydCB7IFRyYW5zYWN0aW9uU2lnbmF0dXJlIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7XG4gIENvbW1vblN0cnVjdHVyZSxcbiAgTWludFN0cnVjdHVyZSxcbiAgUGFydGlhbFNpZ25TdHJ1Y3R1cmUsXG59IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tYnVpbGRlcic7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQgeyBUcmFuc2FjdGlvbkJ1aWxkZXIgfSBmcm9tICd+L3RyYW5zYWN0aW9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgZGVidWdMb2cgfSBmcm9tICcuL3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcblxuYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RSZXN1bHQ8VCwgRSBleHRlbmRzIEVycm9yPiB7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+O1xuXG4gIHVud3JhcCgpOiBUO1xuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFU7XG4gIHVud3JhcDxVLCBWPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVik6IFUgfCBWO1xuICAvLyB1bmlmaWVkLXNpZ25hdHVyZXMuIGludG8gbGluZSAxMFxuICB1bndyYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IFUpOiBVO1xuICB1bndyYXAob2s/OiAodmFsdWU6IFQpID0+IHVua25vd24sIGVycj86IChlcnJvcjogRSkgPT4gdW5rbm93bik6IHVua25vd24ge1xuICAgIGNvbnN0IHIgPSB0aGlzLl9jaGFpbihcbiAgICAgICh2YWx1ZSkgPT4gUmVzdWx0Lm9rKG9rID8gb2sodmFsdWUpIDogdmFsdWUpLFxuICAgICAgKGVycm9yKSA9PiAoZXJyID8gUmVzdWx0Lm9rKGVycihlcnJvcikpIDogUmVzdWx0LmVycihlcnJvcikpLFxuICAgICk7XG4gICAgaWYgKHIuaXNFcnIpIHtcbiAgICAgIHRocm93IHIuZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiByLnZhbHVlO1xuICB9XG5cbiAgLy8vLyBtYXAgLy8vL1xuICBtYXA8VT4ob2s6ICh2YWx1ZTogVCkgPT4gVSk6IFJlc3VsdDxVLCBFPjtcbiAgbWFwPFUsIEYgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gVSxcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gRixcbiAgKTogUmVzdWx0PFUsIEY+O1xuICBtYXAob2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiBFcnJvcik6IFJlc3VsdDx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIgPyBlcnIoZXJyb3IpIDogZXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8vIGNoYWluIC8vLy9cbiAgY2hhaW48WD4ob2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIEU+KTogUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPjtcbiAgY2hhaW4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PHVua25vd24+LFxuICAgIGVycj86IChlcnJvcjogRSkgPT4gUmVzdWx0PHVua25vd24+LFxuICApOiBSZXN1bHQ8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbihvaywgZXJyIHx8ICgoZXJyb3IpID0+IFJlc3VsdC5lcnIoZXJyb3IpKSk7XG4gIH1cblxuICAvLy8vIG1hdGNoIC8vLy9cbiAgbWF0Y2g8VSwgRj4ob2s6ICh2YWx1ZTogVCkgPT4gVSwgZXJyOiAoZXJyb3I6IEUpID0+IEYpOiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcblxuICBtYXRjaChcbiAgICBvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiB1bmtub3duLFxuICApOiB2b2lkIHwgUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycihlcnJvcikgYXMgRXJyb3IpLFxuICAgICk7XG4gIH1cblxuICAvLy8gc2luZ2xlIFRyYW5zYWN0aW9uQnVpbGRlciAvLy8vXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgYXN5bmMgc3VibWl0KFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgY29uc3QgcmVzID0gdGhpcy5tYXAoXG4gICAgICBhc3luYyAob2spID0+IHtcbiAgICAgICAgZGVidWdMb2coJyMgcmVzdWx0IHNpbmdsZSBzdWJtaXQ6ICcsIG9rKTtcbiAgICAgICAgaWYgKGZlZVBheWVyKSB7XG4gICAgICAgICAgY29uc3Qgb2JqID0gb2sgYXMgUGFydGlhbFNpZ25TdHJ1Y3R1cmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9iai5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9iaiA9IG9rIGFzIENvbW1vblN0cnVjdHVyZSB8IE1pbnRTdHJ1Y3R1cmU7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IG9iai5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH0sXG4gICAgKTtcbiAgICBpZiAocmVzLmlzRXJyKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihyZXMuZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnZhbHVlO1xuICB9XG59XG5cbi8vLyBNdWx0aXBsZSBUcmFuc2FjdGlvbkJ1aWxkZXIgLy8vL1xuZGVjbGFyZSBnbG9iYWwge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbiAgaW50ZXJmYWNlIEFycmF5PFQ+IHtcbiAgICBzdWJtaXQoZmVlUGF5ZXI/OiBTZWNyZXQpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PjtcbiAgfVxufVxuXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKGZlZVBheWVyPzogU2VjcmV0KSB7XG4gIGlmIChmZWVQYXllcikge1xuICAgIGxldCBpID0gMTtcbiAgICBmb3IgYXdhaXQgKGNvbnN0IG9iaiBvZiB0aGlzKSB7XG4gICAgICBpZiAob2JqLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9IGVsc2UgaWYgKG9iai52YWx1ZS5jYW5TdWJtaXQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIGNhblN1Ym1pdCcpO1xuICAgICAgICBjb25zdCBzaWcgPSBhd2FpdCAob2JqIGFzIFBhcnRpYWxTaWduU3RydWN0dXJlKS5zdWJtaXQoZmVlUGF5ZXIpO1xuICAgICAgICBpZiAoc2lnLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHNpZztcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhzaWcudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWdMb2coJyMgUmVzdWx0IGJhdGNoIG90aGVyIHRoYW4gY2FuU3VibWl0Jyk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aCA9PSBpKSB7XG4gICAgICAgICAgLy8gbGFzdCBvYmplY3RcbiAgICAgICAgICByZXR1cm4gb2JqLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgb2JqLnN1Ym1pdChmZWVQYXllcik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGluc3RydWN0aW9uczogQ29tbW9uU3RydWN0dXJlIHwgTWludFN0cnVjdHVyZVtdID0gW107XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgQXJyYXkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgICAgfVxuICAgIH1cbiAgICBkZWJ1Z0xvZygnIyBSZXN1bHQgYmF0Y2ggc3VibWl0OiAnLCBpbnN0cnVjdGlvbnMpO1xuICAgIHJldHVybiBuZXcgVHJhbnNhY3Rpb25CdWlsZGVyLkJhdGNoKCkuc3VibWl0KGluc3RydWN0aW9ucyk7XG4gIH1cbn07XG5cbmNsYXNzIEludGVybmFsT2s8VCwgRSBleHRlbmRzIEVycm9yPiBleHRlbmRzIEFic3RyYWN0UmVzdWx0PFQsIEU+IHtcbiAgcmVhZG9ubHkgaXNPayA9IHRydWU7XG4gIHJlYWRvbmx5IGlzRXJyID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKHJlYWRvbmx5IHZhbHVlOiBUKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gUmVzdWx0PFgsIFU+LFxuICAgIF9lcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcbiAgfVxufVxuXG5jbGFzcyBJbnRlcm5hbEVycjxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gZmFsc2U7XG4gIHJlYWRvbmx5IGlzRXJyID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgZXJyb3I6IEUpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIF9vazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgZXJyOiAoZXJyb3I6IEUpID0+IFJlc3VsdDxYLCBVPixcbiAgKTogUmVzdWx0PFgsIFU+IHtcbiAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgUmVzdWx0IHtcbiAgZXhwb3J0IHR5cGUgT2s8VCwgRSBleHRlbmRzIEVycm9yPiA9IEludGVybmFsT2s8VCwgRT47XG4gIGV4cG9ydCB0eXBlIEVycjxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxFcnI8VCwgRT47XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9rPFQsIEUgZXh0ZW5kcyBFcnJvcj4odmFsdWU6IFQpOiBSZXN1bHQ8VCwgRT4ge1xuICAgIHJldHVybiBuZXcgSW50ZXJuYWxPayh2YWx1ZSk7XG4gIH1cbiAgZXhwb3J0IGZ1bmN0aW9uIGVycjxFIGV4dGVuZHMgRXJyb3IsIFQgPSBuZXZlcj4oZXJyb3I/OiBFKTogUmVzdWx0PFQsIEU+O1xuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcjogRSk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbEVycihlcnJvciB8fCBFcnJvcigpKTtcbiAgfVxuXG4gIHR5cGUgVSA9IFJlc3VsdDx1bmtub3duPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgICBSMTQgZXh0ZW5kcyBVLFxuICAgIFIxNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0LCBSMTVdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgICBPa1R5cGU8UjE1PixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICB8IFIwXG4gICAgICB8IFIxXG4gICAgICB8IFIyXG4gICAgICB8IFIzXG4gICAgICB8IFI0XG4gICAgICB8IFI1XG4gICAgICB8IFI2XG4gICAgICB8IFI3XG4gICAgICB8IFI4XG4gICAgICB8IFI5XG4gICAgICB8IFIxMFxuICAgICAgfCBSMTFcbiAgICAgIHwgUjEyXG4gICAgICB8IFIxM1xuICAgICAgfCBSMTRcbiAgICAgIHwgUjE1XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTIsIFIxMywgUjE0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICAgIE9rVHlwZTxSMTQ+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gICAgUjEzIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgICAgT2tUeXBlPFIxMj4sXG4gICAgICBPa1R5cGU8UjEzPixcbiAgICBdLFxuICAgIEVyclR5cGU8XG4gICAgICBSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMSB8IFIxMiB8IFIxM1xuICAgID5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgICBSMTEgZXh0ZW5kcyBVLFxuICAgIFIxMiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExLCBSMTJdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjksIFIxMCwgUjExXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICAgIE9rVHlwZTxSMTE+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMCB8IFIxMT5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gICAgUjEwIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwXSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgICBPa1R5cGU8UjEwPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgICBPa1R5cGU8Ujc+LFxuICAgICAgT2tUeXBlPFI4PixcbiAgICAgIE9rVHlwZTxSOT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjhdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjg+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjddLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjc+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2XSxcbiAgKTogUmVzdWx0PFxuICAgIFtcbiAgICAgIE9rVHlwZTxSMD4sXG4gICAgICBPa1R5cGU8UjE+LFxuICAgICAgT2tUeXBlPFIyPixcbiAgICAgIE9rVHlwZTxSMz4sXG4gICAgICBPa1R5cGU8UjQ+LFxuICAgICAgT2tUeXBlPFI1PixcbiAgICAgIE9rVHlwZTxSNj4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjVdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND4sIE9rVHlwZTxSNT5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1PlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0XSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+LCBPa1R5cGU8UjQ+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQ+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVLCBSMSBleHRlbmRzIFUsIFIyIGV4dGVuZHMgVSwgUjMgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSM10sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+XSwgRXJyVHlwZTxSMCB8IFIxIHwgUjI+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVT4oXG4gICAgb2JqOiBbUjAsIFIxXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+XSwgRXJyVHlwZTxSMCB8IFIxPj47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8UjAgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMF0sXG4gICk6IFJlc3VsdDxbT2tUeXBlPFIwPl0sIEVyclR5cGU8UjA+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IFtdKTogUmVzdWx0PFtdPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxUIGV4dGVuZHMgVVtdIHwgUmVjb3JkPHN0cmluZywgVT4+KFxuICAgIG9iajogVCxcbiAgKTogUmVzdWx0PFxuICAgIHsgW0sgaW4ga2V5b2YgVF06IFRbS10gZXh0ZW5kcyBSZXN1bHQ8aW5mZXIgST4gPyBJIDogbmV2ZXIgfSxcbiAgICB7XG4gICAgICBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPiA/IEUgOiBuZXZlcjtcbiAgICB9W2tleW9mIFRdXG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGwob2JqOiB1bmtub3duKTogdW5rbm93biB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgY29uc3QgcmVzQXJyID0gW107XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqKSB7XG4gICAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgICAgcmV0dXJuIGl0ZW0gYXMgdW5rbm93bjtcbiAgICAgICAgfVxuICAgICAgICByZXNBcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZXN1bHQub2socmVzQXJyKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXM6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPik7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgY29uc3QgaXRlbSA9IChvYmogYXMgUmVjb3JkPHN0cmluZywgVT4pW2tleV07XG4gICAgICBpZiAoaXRlbS5pc0Vycikge1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH1cbiAgICAgIHJlc1trZXldID0gaXRlbS52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIFJlc3VsdC5vayhyZXMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3IgPSBFcnJvcj4gPVxuICB8IFJlc3VsdC5PazxULCBFPlxuICB8IFJlc3VsdC5FcnI8VCwgRT47XG5cbnR5cGUgT2tUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDxpbmZlciBPPiA/IE8gOiBuZXZlcjtcbnR5cGUgRXJyVHlwZTxSIGV4dGVuZHMgUmVzdWx0PHVua25vd24+PiA9IFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93biwgaW5mZXIgRT5cbiAgPyBFXG4gIDogbmV2ZXI7XG4iLCAiaW1wb3J0IHsgSW50ZXJuYWxDb2xsZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgR3JvdXBpbmcgfSBmcm9tICd+L3R5cGVzL2Rhcy1hcGknO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbiBhcyBDb2xsZWN0aW9uVHlwZSxcbiAgSW5wdXRDb2xsZWN0aW9uLFxuICBPcHRpb24sXG59IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29sbGVjdGlvbiB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9JbmZyYSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248SW5wdXRDb2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW50ZXJuYWxDb2xsZWN0aW9uPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGlucHV0LnRvUHVibGljS2V5KCksXG4gICAgICAgIHZlcmlmaWVkOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEludGVybmFsQ29sbGVjdGlvbj4sXG4gICAgKTogQ29sbGVjdGlvblR5cGUgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogR3JvdXBpbmdbXSk6IFB1YmtleSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBvdXRwdXQuZmluZCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlLmdyb3VwX2tleSA9PT0gJ2NvbGxlY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlLmdyb3VwX3ZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMgPyByZXMuZ3JvdXBfdmFsdWUgOiAnJztcbiAgICB9O1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBDcmVhdG9ycywgSW5wdXRDcmVhdG9ycywgT3B0aW9uIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQgeyBJbnRlcm5hbENyZWF0b3JzIH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogT3B0aW9uPEludGVybmFsQ3JlYXRvcnNbXT4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Db21wcmVzc2VkTmZ0SW5mcmEgPSAoXG4gICAgICBpbnB1dDogT3B0aW9uPElucHV0Q3JlYXRvcnNbXT4gfCB1bmRlZmluZWQsXG4gICAgKTogSW50ZXJuYWxDcmVhdG9yc1tdID0+IHtcbiAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0IS5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBzaGFyZTogZGF0YS5zaGFyZSxcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW50ZXJuYWxDcmVhdG9yc1tdPixcbiAgICApOiBDcmVhdG9yc1tdIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmICghb3V0cHV0KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQubWFwKChkYXRhKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWRkcmVzczogZGF0YS5hZGRyZXNzLnRvU3RyaW5nKCksXG4gICAgICAgICAgc2hhcmU6IGRhdGEuc2hhcmUsXG4gICAgICAgICAgdmVyaWZpZWQ6IGRhdGEudmVyaWZpZWQsXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIGFzIENvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIENyZWF0b3JzIH0gZnJvbSAnLi9jcmVhdG9ycyc7XG5pbXBvcnQgeyBJbnB1dE5mdE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9yZWd1bGFyLW5mdCc7XG5pbXBvcnQge1xuICBNZXRhZGF0YUFyZ3MsXG4gIFRva2VuUHJvZ3JhbVZlcnNpb24sXG4gIFRva2VuU3RhbmRhcmQsXG59IGZyb20gJ21wbC1idWJibGVndW0taW5zdHJ1Y3Rpb24nO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0TmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogTWV0YWRhdGFBcmdzID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXG4gICAgICAgIHN5bWJvbDogaW5wdXQuc3ltYm9sLFxuICAgICAgICB1cmksXG4gICAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBjcmVhdG9yczogQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0NvbXByZXNzZWROZnRJbmZyYShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb24uQ29sbGVjdGlvbi5pbnRvSW5mcmEoaW5wdXQuY29sbGVjdGlvbiksXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogZmFsc2UsXG4gICAgICAgIGlzTXV0YWJsZTogaW5wdXQuaXNNdXRhYmxlID8/IGZhbHNlLFxuICAgICAgICBlZGl0aW9uTm9uY2U6IDAsXG4gICAgICAgIHRva2VuU3RhbmRhcmQ6IFRva2VuU3RhbmRhcmQuTm9uRnVuZ2libGUsXG4gICAgICAgIHRva2VuUHJvZ3JhbVZlcnNpb246IFRva2VuUHJvZ3JhbVZlcnNpb24uT3JpZ2luYWwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJleHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgUm95YWx0eSB7XG4gICAgZXhwb3J0IGNvbnN0IFRIUkVTSE9MRCA9IDEwMDtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlciA9IChwZXJjZW50YWdlOiBudW1iZXIpID0+IHtcbiAgICAgIHJldHVybiBwZXJjZW50YWdlICogVEhSRVNIT0xEO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBc3NldEFuZE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnfi90eXBlcy9uZnQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE5mdCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKG91dHB1dDogQXNzZXRBbmRPZmZjaGFpbik6IE1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLmlkLnRvU3RyaW5nKCksXG4gICAgICAgIGNvbGxlY3Rpb25NaW50OiBDb2xsZWN0aW9uLkNvbGxlY3Rpb25NaW50LmludG9Vc2VyKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmdyb3VwaW5nLFxuICAgICAgICApIGFzIFB1YmtleSxcbiAgICAgICAgYXV0aG9yaXRpZXM6IG91dHB1dC5vbmNoYWluLmF1dGhvcml0aWVzLFxuICAgICAgICByb3lhbHR5OiBSb3lhbHR5LlJveWFsdHkuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4ucm95YWx0eS5wZXJjZW50KSxcbiAgICAgICAgbmFtZTogb3V0cHV0Lm9uY2hhaW4uY29udGVudC5tZXRhZGF0YS5uYW1lLFxuICAgICAgICBzeW1ib2w6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQubWV0YWRhdGEuc3ltYm9sLFxuICAgICAgICB1cmk6IG91dHB1dC5vbmNoYWluLmNvbnRlbnQuanNvbl91cmksXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlcihvdXRwdXQub25jaGFpbi5jcmVhdG9ycykhLFxuICAgICAgICB0cmVlQWRkcmVzczogb3V0cHV0Lm9uY2hhaW4uY29tcHJlc3Npb24udHJlZSxcbiAgICAgICAgaXNDb21wcmVzc2VkOiBvdXRwdXQub25jaGFpbi5jb21wcmVzc2lvbi5jb21wcmVzc2VkLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLm11dGFibGUsXG4gICAgICAgIGlzQnVybjogb3V0cHV0Lm9uY2hhaW4uYnVybnQsXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uc3VwcGx5LmVkaXRpb25fbm9uY2UsXG4gICAgICAgIHByaW1hcnlTYWxlSGFwcGVuZWQ6IG91dHB1dC5vbmNoYWluLnJveWFsdHkucHJpbWFyeV9zYWxlX2hhcHBlbmVkLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpISxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgTWVtbywgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWVtbyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IFRyYW5zZmVyQ2hlY2tlZCxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIGNhc2U6IHRyYW5zZmVyIHdpdGggbWVtb1xuICAgICAgaWYgKG91dHB1dFRyYW5zZmVyICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gIT09ICcnKSB7XG4gICAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50ICYmIG91dHB1dFRyYW5zZmVyLnByb2dyYW0gPT09ICdzcGwtdG9rZW4nKSB7XG4gICAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBmb3VuZERlc3QgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8ubWludDtcbiAgICAgICAgICBmb3VuZFNvdXJjZSAmJiAoaGlzdG9yeS5zb3VyY2UgPSBmb3VuZFNvdXJjZS5vd25lcik7XG4gICAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLnNvdXJjZTtcbiAgICAgICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS5tZW1vID0gb3V0cHV0LnBhcnNlZDtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IE1pbnRUbyB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIE1pbnQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IE1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSZWd1bGFyTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmEgPSAoXG4gICAgICBpbnB1dDogSW5wdXROZnRNZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBDcmVhdG9ycy5DcmVhdG9ycy5pbnRvSW5mcmEoaW5wdXQuY3JlYXRvcnMpLFxuICAgICAgICBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhKGlucHV0LmNvbGxlY3Rpb24pLFxuICAgICAgICB1c2VzOiBpbnB1dC51c2VzIHx8IG51bGwsXG4gICAgICB9O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBvdmVyd3JpdGVPYmplY3QsIFJlc3VsdCB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7fSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IEZpbGVUeXBlLCBQcm9wZXJ0aWVzLCBTdG9yYWdlVHlwZSB9IGZyb20gJ34vdHlwZXMvc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBQcm9wZXJ0aWVzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFByb3BlcnRpZXMgfCB1bmRlZmluZWQsXG4gICAgICBjYWxsYmFja0Z1bmM6IChcbiAgICAgICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICAgKSA9PiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4sXG4gICAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICApOiBQcm9taXNlPFByb3BlcnRpZXM+ID0+IHtcbiAgICAgIGlmICghaW5wdXQgfHwgIWlucHV0LmZpbGVzKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgaW5wdXQuZmlsZXMubWFwKGFzeW5jIChmaWxlKSA9PiB7XG4gICAgICAgICAgaWYgKCFmaWxlLmZpbGVQYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNhbGxiYWNrRnVuYyhmaWxlLmZpbGVQYXRoLCBzdG9yYWdlVHlwZSwgZmVlUGF5ZXIpO1xuICAgICAgICAgIGlmIChyZXMuaXNFcnIpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKHJlcy5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG92ZXJ3cml0ZU9iamVjdChmaWxlLCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGV4aXN0c0tleTogJ2ZpbGVQYXRoJyxcbiAgICAgICAgICAgICAgd2lsbDogeyBrZXk6ICd1cmknLCB2YWx1ZTogcmVzLnZhbHVlIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgICByZXR1cm4geyAuLi5pbnB1dCwgZmlsZXMgfSBhcyBQcm9wZXJ0aWVzO1xuICAgIH07XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IE9wdGlvbiwgVXNlcyB9IGZyb20gJ34vdHlwZXMvcmVndWxhci1uZnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVXNlcyB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChvdXRwdXQ6IE9wdGlvbjxVc2VzPik6IFVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7IElucHV0VG9rZW5NZXRhZGF0YSwgVG9rZW5NZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvc3BsLXRva2VuJztcbmltcG9ydCB7IE1ldGFkYXRhQW5kT2ZmY2hhaW4gfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhID0gKFxuICAgICAgaW5wdXQ6IElucHV0VG9rZW5NZXRhZGF0YSxcbiAgICAgIHVyaTogc3RyaW5nLFxuICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgICApOiBEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhKGlucHV0LmNyZWF0b3JzKSxcbiAgICAgICAgY29sbGVjdGlvbjogbnVsbCxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyID0gKFxuICAgICAgb3V0cHV0OiBNZXRhZGF0YUFuZE9mZmNoYWluLFxuICAgICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgICApOiBUb2tlbk1ldGFkYXRhID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1pbnQ6IG91dHB1dC5vbmNoYWluLm1pbnQudG9TdHJpbmcoKSxcbiAgICAgICAgcm95YWx0eTogb3V0cHV0Lm9uY2hhaW4uZGF0YS5zZWxsZXJGZWVCYXNpc1BvaW50cyxcbiAgICAgICAgbmFtZTogZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS5uYW1lKSxcbiAgICAgICAgc3ltYm9sOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnN5bWJvbCksXG4gICAgICAgIHRva2VuQW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgdXJpOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLnVyaSksXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b1VzZXIob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IFBvc3RUb2tlbkFjY291bnQgfSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5Jztcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHsgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyQ2hlY2tlZCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogVHJhbnNmZXJDaGVja2VkLFxuICAgICAgbWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSxcbiAgICAgIG1hcHBpbmdUb2tlbkFjY291bnQ/OiBQb3N0VG9rZW5BY2NvdW50W10sXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGlmIChtYXBwaW5nVG9rZW5BY2NvdW50KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2UsXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZvdW5kRGVzdCA9IG1hcHBpbmdUb2tlbkFjY291bnQuZmluZChcbiAgICAgICAgICAobSkgPT4gbS5hY2NvdW50ID09PSBvdXRwdXQucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICk7XG4gICAgICAgIGZvdW5kU291cmNlICYmIChoaXN0b3J5LnNvdXJjZSA9IGZvdW5kU291cmNlLm93bmVyKTtcbiAgICAgICAgZm91bmREZXN0ICYmIChoaXN0b3J5LmRlc3RpbmF0aW9uID0gZm91bmREZXN0Lm93bmVyKTtcbiAgICAgIH1cblxuICAgICAgaGlzdG9yeS50b2tlbkFtb3VudCA9IG91dHB1dC5wYXJzZWQuaW5mby50b2tlbkFtb3VudDtcbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5tdWx0aXNpZ0F1dGhvcml0eSA9IG91dHB1dC5wYXJzZWQuaW5mby5tdWx0aXNpZ0F1dGhvcml0eTtcbiAgICAgIGhpc3Rvcnkuc2lnbmVycyA9IG91dHB1dC5wYXJzZWQuaW5mby5zaWduZXJzO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG5cbiAgICAgIC8vIGlubmVyIGluc3RydWN0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhpc3Rvcnk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG5pbXBvcnQgeyBUcmFuc2ZlciB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3N1aXRlLXV0aWxzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFRyYW5zZmVyIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBUcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29tcHJlc3NlZE5mdE1ldGFkYXRhIH0gZnJvbSAnLi9jb21wcmVzc2VkLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBOZnQgfSBmcm9tICcuL25mdCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWVtbyB9IGZyb20gJy4vbWVtbyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgTWludCB9IGZyb20gJy4vbWludCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUmVndWxhck5mdE1ldGFkYXRhIH0gZnJvbSAnLi9yZWd1bGFyLW5mdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUHJvcGVydGllcyB9IGZyb20gJy4vcHJvcGVydGllcyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgUm95YWx0eSB9IGZyb20gJy4vcm95YWx0eSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVG9rZW5NZXRhZGF0YSB9IGZyb20gJy4vdG9rZW4tbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFRyYW5zZmVyQ2hlY2tlZCB9IGZyb20gJy4vdHJhbnNmZXItY2hlY2tlZCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXIgfSBmcm9tICcuL3RyYW5zZmVyJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBVc2VzIH0gZnJvbSAnLi91c2VzJztcblxuZXhwb3J0IGNvbnN0IENvbnZlcnRlciA9IHtcbiAgLi4uQ29tcHJlc3NlZE5mdE1ldGFkYXRhLFxuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTmZ0LFxuICAuLi5NZW1vLFxuICAuLi5NaW50LFxuICAuLi5SZWd1bGFyTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBEZXRhaWxzLCBMaW1pdCB9IGZyb20gJ34vdHlwZXMvdmFsaWRhdG9yJztcbmltcG9ydCB7IElucHV0TmZ0TWV0YWRhdGEgfSBmcm9tICd+L3R5cGVzL3JlZ3VsYXItbmZ0JztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IERhdGFWMiB9IGZyb20gJ0BtZXRhcGxleC1mb3VuZGF0aW9uL21wbC10b2tlbi1tZXRhZGF0YSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgVmFsaWRhdG9yIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZXNzYWdlIHtcbiAgICBleHBvcnQgY29uc3QgU1VDQ0VTUyA9ICdzdWNjZXNzJztcbiAgICBleHBvcnQgY29uc3QgU01BTExfTlVNQkVSID0gJ3RvbyBzbWFsbCc7XG4gICAgZXhwb3J0IGNvbnN0IEJJR19OVU1CRVIgPSAndG9vIGJpZyc7XG4gICAgZXhwb3J0IGNvbnN0IExPTkdfTEVOR1RIID0gJ3RvbyBsb25nJztcbiAgICBleHBvcnQgY29uc3QgRU1QVFkgPSAnaW52YWxpZCBlbXB0eSB2YWx1ZSc7XG4gICAgZXhwb3J0IGNvbnN0IElOVkFMSURfVVJMID0gJ2ludmFsaWQgdXJsJztcbiAgICBleHBvcnQgY29uc3QgT05MWV9OT0RFX0pTID0gJ2BzdHJpbmdgIHR5cGUgaXMgb25seSBOb2RlLmpzJztcbiAgfVxuXG4gIGV4cG9ydCBjb25zdCBOQU1FX0xFTkdUSCA9IDMyO1xuICBleHBvcnQgY29uc3QgU1lNQk9MX0xFTkdUSCA9IDEwO1xuICBleHBvcnQgY29uc3QgVVJMX0xFTkdUSCA9IDIwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUFYID0gMTAwO1xuICBleHBvcnQgY29uc3QgU0VMTEVSX0ZFRV9CQVNJU19QT0lOVFNfTUFYID0gMTAwMDA7XG4gIGV4cG9ydCBjb25zdCBST1lBTFRZX01JTiA9IDA7XG5cbiAgZXhwb3J0IGNvbnN0IGlzUm95YWx0eSA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAncm95YWx0eSc7XG4gICAgICBpZiAocm95YWx0eSAhPT0gMCAmJiAhcm95YWx0eSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHJveWFsdHkpO1xuICAgICAgfVxuICAgICAgaWYgKHJveWFsdHkgPCBST1lBTFRZX01JTikge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuU01BTExfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBST1lBTFRZX01JTixcbiAgICAgICAgICBjb25kaXRpb246ICd1bmRlck1pbicsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChyb3lhbHR5ID4gUk9ZQUxUWV9NQVgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkJJR19OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUFYLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMgPSAoXG4gICAgcm95YWx0eTogbnVtYmVyLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3NlbGxlckZlZUJhc2lzUG9pbnRzL3NlbGxlcl9mZWVfYmFzaXNfcG9pbnRzJztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCAqIENvbnZlcnRlci5Sb3lhbHR5LlRIUkVTSE9MRCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogU0VMTEVSX0ZFRV9CQVNJU19QT0lOVFNfTUFYLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTmFtZSA9IChuYW1lOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ25hbWUnO1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChuYW1lKSA+IE5BTUVfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgbmFtZSwge1xuICAgICAgICAgIHRocmVzaG9sZDogTkFNRV9MRU5HVEgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTeW1ib2wgPSAoc3ltYm9sOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gJ3N5bWJvbCc7XG4gICAgICBpZiAoIXN5bWJvbCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIHN5bWJvbCk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChzeW1ib2wpID4gU1lNQk9MX0xFTkdUSCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuTE9OR19MRU5HVEgsIHN5bWJvbCwge1xuICAgICAgICAgIHRocmVzaG9sZDogU1lNQk9MX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc0ltYWdlVXJsID0gKGltYWdlOiBzdHJpbmcpOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT5cbiAgICBpc1VyaU9ySW1hZ2UoaW1hZ2UsICdpbWFnZScpO1xuXG4gIGV4cG9ydCBjb25zdCBjaGVja0FsbCA9IDxcbiAgICBUIGV4dGVuZHMgUGlja05mdFN0b3JhZ2UgfCBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4IHwgUGlja01ldGFwbGV4LFxuICA+KFxuICAgIG1ldGFkYXRhOiBULFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG1ldGFkYXRhKTtcbiAgICAgIGNvbnN0IHJlc3VsdHM6IERldGFpbHNbXSA9IFtdO1xuICAgICAga2V5cy5tYXAoKGtleSkgPT4ge1xuICAgICAgICBsZXQgcmVzITogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+O1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEuaW1hZ2UpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNJbWFnZVVybChtZXRhZGF0YS5pbWFnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdyb3lhbHR5JzpcbiAgICAgICAgICAgIGlmIChrZXkgaW4gbWV0YWRhdGEgJiYgbWV0YWRhdGEucm95YWx0eSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1JveWFsdHkobWV0YWRhdGEucm95YWx0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyRmVlQmFzaXNQb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNOYW1lKG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTeW1ib2wobWV0YWRhdGEuc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRXJyKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnJlcy5lcnJvci5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdDYXVnaHQgaW4gdGhlIHZhbGlkYXRpb24gZXJyb3JzLiBzZWUgaW5mb3JtYXRpb24gZS5nOiBlcnI8VmFsaWRhdG9yRXJyb3I+LmRldGFpbHMnO1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIHR5cGUgUGlja05mdFN0b3JhZ2UgPSBQaWNrPFxuICAgIE9mZmNoYWluLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ2ltYWdlJyB8ICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cydcbiAgPjtcbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4ID0gUGljazxcbiAgICBJbnB1dE5mdE1ldGFkYXRhLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3JveWFsdHknIHwgJ2ZpbGVQYXRoJ1xuICA+O1xuICB0eXBlIFBpY2tNZXRhcGxleCA9IFBpY2s8XG4gICAgRGF0YVYyLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3VyaScgfCAnc2VsbGVyRmVlQmFzaXNQb2ludHMnXG4gID47XG5cbiAgY29uc3QgYnl0ZUxlbmd0aCA9ICh2YWx1ZTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCB0ZXh0ID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgcmV0dXJuIHRleHQuZW5jb2RlKHZhbHVlKS5sZW5ndGg7XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlRXJyb3IgPSAoXG4gICAga2V5OiBzdHJpbmcsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGFjdHVhbDogc3RyaW5nIHwgbnVtYmVyLFxuICAgIGxpbWl0PzogTGltaXQsXG4gICk6IFZhbGlkYXRvckVycm9yID0+IHtcbiAgICBsZXQgZXJyb3I6IFZhbGlkYXRvckVycm9yO1xuICAgIGlmIChsaW1pdCkge1xuICAgICAgZXJyb3IgPSBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgW3sga2V5LCBtZXNzYWdlLCBhY3R1YWwsIGxpbWl0IH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IgPSBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgW3sga2V5LCBtZXNzYWdlLCBhY3R1YWwgfV0pO1xuICAgIH1cbiAgICByZXR1cm4gZXJyb3I7XG4gIH07XG5cbiAgY29uc3QgaXNVcmlPckltYWdlID0gKFxuICAgIGltYWdlT3JVcmk6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGlmICghaW1hZ2VPclVyaSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuRU1QVFksIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgaWYgKGJ5dGVMZW5ndGgoaW1hZ2VPclVyaSkgPiBVUkxfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgaW1hZ2VPclVyaSwge1xuICAgICAgICAgIHRocmVzaG9sZDogVVJMX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoIS9odHRwcz86XFwvXFwvWy1fLiF+KlxcXFwoKWEtekEtWjAtOTs/OiY9KywlI10rL2cudGVzdChpbWFnZU9yVXJpKSkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuSU5WQUxJRF9VUkwsIGltYWdlT3JVcmkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBkZXRhaWxzOiBEZXRhaWxzW107XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZGV0YWlsczogRGV0YWlsc1tdKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zdWl0ZS11dGlscyc7XG5pbXBvcnQgeyBBc3NldCwgQXNzZXRQcm9vZiwgQXNzZXRzIH0gZnJvbSAnfi90eXBlcy9kYXMtYXBpJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcblxuZXhwb3J0IG5hbWVzcGFjZSBEYXNBcGkge1xuICBjb25zdCBjb25uZWN0ID0gYXN5bmMgKFxuICAgIG1ldGhvZDogc3RyaW5nLFxuICAgIHBhcmFtczogKHN0cmluZyB8IFB1YmtleSB8IFNvcnRhYmxlIHwgbnVtYmVyIHwgdW5kZWZpbmVkKVtdLFxuICApID0+IHtcbiAgICBDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLmNhbGN1bGF0ZVByb2JhYmlsaXR5KCkgJiZcbiAgICAgIGNvbnNvbGUud2FybihDb25zdGFudHMuV2Fybm5pbmdNZXNzYWdlLkRBU19BUElfVVJMKTtcbiAgICBkZWJ1Z0xvZygnIyBkYXMgYXBpIHVybDogJywgQ29uc3RhbnRzLkRBU19BUElfVVJMKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKENvbnN0YW50cy5EQVNfQVBJX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAganNvbnJwYzogJzIuMCcsXG4gICAgICAgIG1ldGhvZCxcbiAgICAgICAgaWQ6ICdjb21wcmVzc2lvbicsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIHJldHVybiAoYXdhaXQgcmVzcG9uc2UuanNvbigpKS5yZXN1bHQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldEFzc2V0UHJvb2YgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldFByb29mLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiBhd2FpdCBjb25uZWN0KCdnZXRBc3NldFByb29mJywgW2Fzc2V0SWRdKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0QXNzZXQgPSBhc3luYyAoXG4gICAgYXNzZXRJZDogUHVia2V5LFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldCwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gYXdhaXQgY29ubmVjdCgnZ2V0QXNzZXQnLCBbYXNzZXRJZF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldHNCeU93bmVyID0gYXN5bmMgKFxuICAgIG93bmVyQWRkcmVzczogUHVia2V5LFxuICAgIGxpbWl0OiBudW1iZXIgPSAxMDAwLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgc29ydEJ5PzogU29ydGFibGUsXG4gICAgYmVmb3JlPzogc3RyaW5nLFxuICAgIGFmdGVyPzogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldHMsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0c0J5T3duZXInLCBbXG4gICAgICAgIG93bmVyQWRkcmVzcyxcbiAgICAgICAgc29ydEJ5LFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcGFnZSxcbiAgICAgICAgYmVmb3JlLFxuICAgICAgICBhZnRlcixcbiAgICAgIF0pO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRBc3NldHNCeUdyb3VwID0gYXN5bmMgKFxuICAgIGdyb3VwS2V5OiBzdHJpbmcsXG4gICAgZ3JvdXBWYWx1ZTogUHVia2V5LFxuICAgIGxpbWl0OiBudW1iZXIgPSAxMDAwLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgc29ydEJ5PzogU29ydGFibGUsXG4gICAgYmVmb3JlPzogc3RyaW5nLFxuICAgIGFmdGVyPzogc3RyaW5nLFxuICApOiBQcm9taXNlPFJlc3VsdDxBc3NldHMsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIGF3YWl0IGNvbm5lY3QoJ2dldEFzc2V0c0J5R3JvdXAnLCBbXG4gICAgICAgIGdyb3VwS2V5LFxuICAgICAgICBncm91cFZhbHVlLFxuICAgICAgICBzb3J0QnksXG4gICAgICAgIGxpbWl0LFxuICAgICAgICBwYWdlLFxuICAgICAgICBiZWZvcmUsXG4gICAgICAgIGFmdGVyLFxuICAgICAgXSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhLCBOZnRNZXRhZGF0YSB9IGZyb20gJ34vdHlwZXMvbmZ0JztcbmltcG9ydCB7IE9mZmNoYWluIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IEZpbmRPcHRpb25zLCBTb3J0YWJsZSwgU29ydEJ5LCBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnfi90eXBlcy9maW5kJztcbmltcG9ydCB7IERhc0FwaSBhcyBBcGkgfSBmcm9tICcuL2FwaSc7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc3VpdGUtdXRpbHMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIERhc0FwaSB7XG4gIC8vQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBkZWZhdWx0U29ydEJ5OiBTb3J0YWJsZSA9IHtcbiAgICBzb3J0Qnk6IFNvcnRCeS5SZWNlbnQsXG4gICAgc29ydERpcmVjdGlvbjogU29ydERpcmVjdGlvbi5EZXNjLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBmZXRjaE9mZmNoYWluID0gYXN5bmMgKHVyaTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IChhd2FpdCBmZXRjaCh1cmkpKS5qc29uKCk7XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQ29tcHJlc3NlZFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5TWludCA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgaXNDb21wcmVzc2VkOiBib29sZWFuLFxuICApOiBQcm9taXNlPFBhcnRpYWw8TWV0YWRhdGE+PiA9PiB7XG4gICAgY29uc3QgYXNzZXQgPSBhd2FpdCBBcGkuZ2V0QXNzZXQobWludCk7XG4gICAgaWYgKGFzc2V0LmlzRXJyKSB7XG4gICAgICB0aHJvdyBhc3NldC5lcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoYXNzZXQudmFsdWUuY29tcHJlc3Npb24uY29tcHJlc3NlZCA9PT0gaXNDb21wcmVzc2VkKSB7XG4gICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICBhc3NldC52YWx1ZS5jb250ZW50Lmpzb25fdXJpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1lcmdlZCA9IHtcbiAgICAgICAgb25jaGFpbjogYXNzZXQudmFsdWUsXG4gICAgICAgIG9mZmNoYWluOiBvZmZjaGFpbixcbiAgICAgIH07XG4gICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcihtZXJnZWQpO1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgbmZ0IGJ5IG93bmVyIGFkZHJlc3NcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkXG4gICAqIEBwYXJhbSB7UGFydGlhbDxGaW5kT3B0aW9ucz59IG9wdGlvbnNcbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxDb21wcmVzc2VkTmZ0TWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IGFzeW5jIChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5T3duZXIoXG4gICAgICBvd25lcixcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvZmZjaGFpbjogT2ZmY2hhaW4gPSBhd2FpdCBmZXRjaE9mZmNoYWluKFxuICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQuanNvbl91cmksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgbWVyZ2VkID0ge1xuICAgICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgICBvZmZjaGFpbjogb2ZmY2hhaW4sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIEZhaWxlZCBmZXRjaCBvZmZjaGFpbiB1cmw6ICcsIGl0ZW0uY29udGVudC5qc29uX3VyaSk7XG4gICAgICAgICAgICByZXR1cm4gQ29udmVydGVyLk5mdC5pbnRvVXNlcih7XG4gICAgICAgICAgICAgIG9uY2hhaW46IGl0ZW0sXG4gICAgICAgICAgICAgIG9mZmNoYWluOiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xuXG4gIC8qKlxuICAgKiBGaW5kIG5mdCBieSBjb2xsZWN0aW9uIG1pbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IGNvbGxlY3Rpb25NaW50XG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDb21wcmVzc2VkLFxuICAgKiBAcGFyYW0ge1BhcnRpYWw8RmluZE9wdGlvbnM+fSBvcHRpb25zXG4gICAqIEByZXR1cm4gUHJvbWlzZTxSZXN1bHQ8Q29tcHJlc3NlZE5mdE1ldGFkYXRhLCBFcnJvcj4+XG4gICAqL1xuICBleHBvcnQgY29uc3QgZmluZEJ5Q29sbGVjdGlvbiA9IGFzeW5jIChcbiAgICBjb2xsZWN0aW9uTWludDogUHVia2V5LFxuICAgIGlzQ29tcHJlc3NlZDogYm9vbGVhbixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEZpbmRPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPE5mdE1ldGFkYXRhPiA9PiB7XG4gICAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICBsaW1pdDogMTAwMCxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBzb3J0Qnk6IGRlZmF1bHRTb3J0QnksXG4gICAgfTtcbiAgICBjb25zdCB7IGxpbWl0LCBwYWdlLCBzb3J0QnksIGJlZm9yZSwgYWZ0ZXIgfSA9IHtcbiAgICAgIC4uLmRlZmF1bHRPcHRpb25zLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9O1xuXG4gICAgY29uc3QgYXNzZXRzID0gYXdhaXQgQXBpLmdldEFzc2V0c0J5R3JvdXAoXG4gICAgICAnY29sbGVjdGlvbicsXG4gICAgICBjb2xsZWN0aW9uTWludCxcbiAgICAgIGxpbWl0LFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRCeSxcbiAgICAgIGJlZm9yZSxcbiAgICAgIGFmdGVyLFxuICAgICk7XG4gICAgaWYgKGFzc2V0cy5pc0Vycikge1xuICAgICAgdGhyb3cgYXNzZXRzLmVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID0gYXNzZXRzLnZhbHVlLml0ZW1zO1xuXG4gICAgY29uc3QgbWV0YWRhdGFzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBpdGVtc1xuICAgICAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvbXByZXNzaW9uLmNvbXByZXNzZWQgPT09IGlzQ29tcHJlc3NlZClcbiAgICAgICAgLm1hcChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG9mZmNoYWluOiBPZmZjaGFpbiA9IGF3YWl0IGZldGNoT2ZmY2hhaW4oaXRlbS5jb250ZW50Lmpzb25fdXJpKTtcbiAgICAgICAgICBjb25zdCBtZXJnZWQgPSB7XG4gICAgICAgICAgICBvbmNoYWluOiBpdGVtLFxuICAgICAgICAgICAgb2ZmY2hhaW46IG9mZmNoYWluLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnQuaW50b1VzZXIobWVyZ2VkKTtcbiAgICAgICAgfSksXG4gICAgKTtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogYXNzZXRzLnZhbHVlLnBhZ2UsXG4gICAgICB0b3RhbDogYXNzZXRzLnZhbHVlLnRvdGFsLFxuICAgICAgbGltaXQ6IGFzc2V0cy52YWx1ZS5saW1pdCxcbiAgICAgIG1ldGFkYXRhcyxcbiAgICB9O1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBLGdCQUFBQTtBQUFBO0FBQUE7OztBQ0FBLGtCQUFzQztBQUN0QyxrQkFBNkI7QUFFN0IsSUFBSSxTQUFTLFlBQUFDO0FBRU4sSUFBVTtBQUFBLENBQVYsQ0FBVUMsZUFBVjtBQUNFLE1BQVU7QUFBVixJQUFVQyxxQkFBVjtBQUNMLFVBQU0sYUFBYTtBQUNuQixRQUFJLFlBQVk7QUFDVCxJQUFNQSxpQkFBQSxzQkFBc0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPNUIsSUFBTUEsaUJBQUEsY0FBYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9wQixJQUFNQSxpQkFBQSxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7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QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxRQUFJLE9BQU8sT0FBTztBQUNoQixZQUFNLE9BQU87QUFBQSxJQUNmO0FBRUEsVUFBTSxRQUFRLE9BQU8sTUFBTTtBQUUzQixVQUFNLFlBQVksTUFBTSxRQUFRO0FBQUEsTUFDOUIsTUFDRyxPQUFPLENBQUMsU0FBUyxLQUFLLFlBQVksZUFBZSxZQUFZLEVBQzdELElBQUksT0FBTyxTQUFTO0FBQ25CLGNBQU0sV0FBcUIsVUFBTUEsUUFBQSxlQUFjLEtBQUssUUFBUSxRQUFRO0FBQ3BFLGNBQU0sU0FBUztBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQ0EsZUFBT0MsWUFBVSxJQUFJLFNBQVMsTUFBTTtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNMO0FBQ0EsV0FBTztBQUFBLE1BQ0wsTUFBTSxPQUFPLE1BQU07QUFBQSxNQUNuQixPQUFPLE9BQU8sTUFBTTtBQUFBLE1BQ3BCLE9BQU8sT0FBTyxNQUFNO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEdBcEtlRCxzQkFBQTs7O0FoQ0xWLElBQU1FLFVBQVM7QUFBQSxFQUNwQixHQUFHO0FBQUEsRUFDSCxHQUFHQTtBQUNMOyIsCiAgIm5hbWVzIjogWyJEYXNBcGkiLCAiU29sYW5hSnNvbkNvbmZpZyIsICJDb25zdGFudHMiLCAiV2Fybm5pbmdNZXNzYWdlIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiQnVuZGxyVXJsIiwgIkRhc0FwaVVybCIsICJOZnRzdG9yYWdlQXBpS2V5IiwgImN1c3RvbUNsdXN0ZXJVcmwiLCAiaW1wb3J0X3dlYjMiLCAiaW1wb3J0X3dlYjMiLCAiTm9kZSIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiQ29tbW9uIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJUcmFuc2FjdGlvbkJ1aWxkZXIiLCAiaW1wb3J0X3dlYjMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIktleXBhaXIiLCAiYnMiLCAiT3JpZ2luYWwiLCAiQWNjb3VudCIsICJBc3NvY2lhdGVkIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJpbXBvcnRfd2ViMyIsICJBY2NvdW50IiwgIlBkYSIsICJCTiIsICJBY2NvdW50IiwgImltcG9ydF9iczU4IiwgIkFjY291bnQiLCAiYnMiLCAiVHJhbnNhY3Rpb25CdWlsZGVyIiwgIlRyYW5zYWN0aW9uQnVpbGRlciIsICJSZXN1bHQiLCAiQ29udmVydGVyIiwgIkNvbGxlY3Rpb24iLCAiQ29sbGVjdGlvbk1pbnQiLCAiQ29udmVydGVyIiwgIkNyZWF0b3JzIiwgIkNvbnZlcnRlciIsICJDb21wcmVzc2VkTmZ0TWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIlJveWFsdHkiLCAiQ29udmVydGVyIiwgIk5mdCIsICJDb252ZXJ0ZXIiLCAiTWVtbyIsICJDb252ZXJ0ZXIiLCAiTWludCIsICJDb252ZXJ0ZXIiLCAiUmVndWxhck5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJQcm9wZXJ0aWVzIiwgIkNvbnZlcnRlciIsICJVc2VzIiwgIkNvbnZlcnRlciIsICJUb2tlbk1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlckNoZWNrZWQiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyIiwgIkNvbnZlcnRlciIsICJWYWxpZGF0b3IiLCAiTWVzc2FnZSIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIiwgIkRhc0FwaSIsICJDb252ZXJ0ZXIiLCAiRGFzQXBpIl0KfQo=