// src/add.ts
import { createMintToCheckedInstruction } from "@solana/spl-token";

// ../shared/src/constants.ts
import { PublicKey } from "@solana/web3.js";
import Config from "@solana-suite/config";
var Constants;
((Constants2) => {
  Constants2.currentCluster = Config.cluster.type;
  Constants2.customClusterUrl = Config.cluster.customClusterUrl;
  Constants2.isDebugging = Config.debugging;
  Constants2.nftStorageApiKey = Config.nftstorage.apikey;
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
      case "devnet" /* dev */:
      case "testnet" /* test */:
      case "localhost-devnet" /* localhost */:
        return "https://devnet.irys.xyz";
      default: {
        const index = Date.now() % 2;
        const clusters = ["https://node1.irys.xyz", "https://node2.irys.xyz"];
        return clusters[index];
      }
    }
  };
  Constants2.WRAPPED_TOKEN_PROGRAM_ID = new PublicKey(
    "So11111111111111111111111111111111111111112"
  );
  Constants2.MEMO_PROGRAM_ID = new PublicKey(
    "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo"
  );
  Constants2.METAPLEX_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  Constants2.COMMITMENT = "confirmed";
  Constants2.NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE";
  Constants2.NFT_STORAGE_GATEWAY_URL = "https://ipfs.io/ipfs";
  Constants2.IRYS_GATEWAY_URL = "https://gateway.irys.xyz";
  Constants2.BUNDLR_NETWORK_URL = (0, Constants2.switchBundlr)(Config.cluster.type);
})(Constants || (Constants = {}));

// ../shared/src/result.ts
var AbstractResult = class {
  // unified-signatures. into line 10
  // unwrap<U>(ok: (value: T) => U, err: (error: E) => U): U;
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
  /// submit (alias Instruction.submit) ////
  async submit() {
    try {
      const instruction = this.unwrap();
      if (instruction.instructions && instruction.signers) {
        return await instruction.submit();
      }
      return Result.err(Error("Only Instruction object"));
    } catch (err) {
      return Result.err(err);
    }
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
((Result16) => {
  function ok(value) {
    return new InternalOk(value);
  }
  Result16.ok = ok;
  function err(error) {
    return new InternalErr(error || Error());
  }
  Result16.err = err;
  function all(obj) {
    if (Array.isArray(obj)) {
      const resArr = [];
      for (const item of obj) {
        if (item.isErr) {
          return item;
        }
        resArr.push(item.value);
      }
      return Result16.ok(resArr);
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
    return Result16.ok(res);
  }
  Result16.all = all;
})(Result || (Result = {}));

// ../shared/src/shared.ts
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

// ../node/src/index.ts
import { Connection } from "@solana/web3.js";
var Node;
((Node2) => {
  const setted = {
    clusterUrl: "",
    commitment: Constants.COMMITMENT,
    customClusterUrl: []
  };
  Node2.getConnection = () => {
    debugLog("# [Before] setted:", setted);
    debugLog(
      "# [Before] Constants.customClusterUrl:",
      Constants.customClusterUrl
    );
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
    debugLog("# [After] setted:", setted);
    return new Connection(setted.clusterUrl, setted.commitment);
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

// ../instruction/src/instruction/index.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction2,
  Transaction as Transaction2
} from "@solana/web3.js";

// ../instruction/src/instruction/define.ts
var MAX_RETRIES = 3;

// ../instruction/src/instruction/batch-submit.ts
import {
  sendAndConfirmTransaction,
  Transaction
} from "@solana/web3.js";
var Instruction = class {
  static batchSubmit = async (arr) => {
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
    const transaction = new Transaction();
    let finalSigners = signers;
    if (feePayer) {
      transaction.feePayer = feePayer.publicKey;
      finalSigners = [feePayer, ...signers];
    }
    instructions.map((inst) => transaction.add(inst));
    const options = {
      maxRetries: MAX_RETRIES
    };
    return await sendAndConfirmTransaction(
      Node.getConnection(),
      transaction,
      finalSigners,
      options
    );
  };
};
Array.prototype.submit = async function() {
  const instructions = [];
  return Try(async () => {
    let i = 0;
    for (const obj of this) {
      if (obj.isErr) {
        const errorMess = obj.error.message;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (obj.isOk) {
        instructions.push(obj.value);
      } else {
        instructions.push(obj);
      }
      i++;
    }
    return Instruction.batchSubmit(instructions);
  });
};

// ../instruction/src/instruction/index.ts
var Instruction2 = class _Instruction {
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
      if (!(this instanceof _Instruction)) {
        throw Error("only Instruction object that can use this");
      }
      const transaction = new Transaction2();
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
      return await sendAndConfirmTransaction2(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
};
Array.prototype.submit = async function() {
  const instructions = [];
  return Try(async () => {
    let i = 0;
    for (const obj of this) {
      if (obj.isErr) {
        const errorMess = obj.error.message;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (obj.isOk) {
        instructions.push(obj.value);
      } else {
        instructions.push(obj);
      }
      i++;
    }
    return Instruction.batchSubmit(instructions);
  });
};

// ../instruction/src/mint-instruction.ts
import {
  sendAndConfirmTransaction as sendAndConfirmTransaction3,
  Transaction as Transaction3
} from "@solana/web3.js";
var MintInstruction = class _MintInstruction extends Instruction2 {
  constructor(instructions, signers, feePayer, data) {
    super(instructions, signers, feePayer, data);
  }
  submit = async () => {
    return Try(async () => {
      if (!(this instanceof _MintInstruction)) {
        throw Error("only MintInstruction object that can use this");
      }
      const transaction = new Transaction3();
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
      return await sendAndConfirmTransaction3(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
};

// ../instruction/src/multisig-instruction.ts
import {
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction as TransactionInstruction3
} from "@solana/web3.js";
import { blob, struct, u8 } from "@solana/buffer-layout";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
var MultisigInstruction;
((MultisigInstruction2) => {
  const createLayoutPubKey = (property) => {
    return blob(32, property);
  };
  MultisigInstruction2.Layout = struct([
    u8("m"),
    u8("n"),
    u8("is_initialized"),
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
    return SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      lamports: balanceNeeded,
      space: MultisigInstruction2.Layout.span,
      programId: TOKEN_PROGRAM_ID
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
        pubkey: SYSVAR_RENT_PUBKEY,
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
    const dataLayout = struct([
      u8("instruction"),
      u8("m")
    ]);
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2,
        m
      },
      data
    );
    return new TransactionInstruction3({
      keys,
      programId: TOKEN_PROGRAM_ID,
      data
    });
  };
})(MultisigInstruction || (MultisigInstruction = {}));

// ../instruction/src/partial-signInstruction.ts
import {
  Transaction as Transaction4
} from "@solana/web3.js";
var PartialSignInstruction = class _PartialSignInstruction {
  hexInstruction;
  data;
  constructor(instructions, mint) {
    this.hexInstruction = instructions;
    this.data = mint;
  }
  submit = async (feePayer) => {
    return Try(async () => {
      if (!(this instanceof _PartialSignInstruction)) {
        throw Error("only PartialSignInstruction object that can use this");
      }
      const decode = Buffer.from(this.hexInstruction, "hex");
      const transactionFromJson = Transaction4.from(decode);
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
};

// ../global/src/index.ts
import { Keypair as Keypair4, LAMPORTS_PER_SOL, PublicKey as PublicKey3 } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import bs from "bs58";
String.prototype.toExplorerUrl = function(explorer = "solscan" /* Solscan */) {
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
  if (KeypairAccount.isPubkey(addressOrSignature)) {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `https://solana.fm/address/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/account/${addressOrSignature}?cluster=${cluster}`;
    }
  } else {
    if (explorer === "solanafm" /* SolanaFM */) {
      url = `https://solana.fm/tx/${addressOrSignature}?cluster=${cluster}`;
    } else {
      url = `https://solscan.io/tx/${addressOrSignature}?cluster=${cluster}`;
    }
  }
  return url;
};
String.prototype.toPublicKey = function() {
  if (!KeypairAccount.isPubkey(this.toString())) {
    throw Error(`No match KeyPair.PubKey: ${this.toString()}`);
  }
  return new PublicKey3(this.toString());
};
String.prototype.toKeypair = function() {
  if (!KeypairAccount.isSecret(this.toString())) {
    throw Error(`No match KeyPair.Secret: ${this.toString()}`);
  }
  const decoded = bs.decode(this.toString());
  return Keypair4.fromSecretKey(decoded);
};
Number.prototype.toSol = function() {
  return BigNumber(this).div(LAMPORTS_PER_SOL).toNumber();
};
Number.prototype.toLamports = function() {
  return BigNumber(this).times(LAMPORTS_PER_SOL).toNumber();
};

// ../account/src/associated-account.ts
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID2,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError
} from "@solana/spl-token";

// ../account/src/keypair-account.ts
import { Keypair as Keypair5, PublicKey as PublicKey4 } from "@solana/web3.js";
import bs2 from "bs58";
var KeypairAccount = class _KeypairAccount {
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
    return new PublicKey4(this.pubkey);
  }
  toKeypair() {
    const decoded = bs2.decode(this.secret);
    return Keypair5.fromSecretKey(decoded);
  }
  static isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
  static isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
  static create = () => {
    const keypair = Keypair5.generate();
    return new _KeypairAccount({
      pubkey: keypair.publicKey.toString(),
      secret: bs2.encode(keypair.secretKey)
    });
  };
  static toKeyPair = (keypair) => {
    return new _KeypairAccount({
      pubkey: keypair.publicKey.toString(),
      secret: bs2.encode(keypair.secretKey)
    });
  };
};

// ../account/src/associated-account.ts
var AssociatedAccount;
((AssociatedAccount2) => {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  const get = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
    const res = await (0, AssociatedAccount2.makeOrCreateInstruction)(
      mint,
      owner,
      new KeypairAccount({ secret: feePayer }).pubkey,
      allowOwnerOffCurve
    );
    if (!res.inst) {
      return res.tokenAccount;
    }
    return new Instruction2(
      [res.inst],
      [],
      feePayer.toKeypair(),
      res.tokenAccount
    );
  };
  AssociatedAccount2.retryGetOrCreate = async (mint, owner, feePayer) => {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = await get(mint, owner, feePayer, true);
        if (inst && typeof inst === "string") {
          debugLog("# associatedTokenAccount: ", inst);
          return inst;
        } else if (inst instanceof Instruction2) {
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
  AssociatedAccount2.makeOrCreateInstruction = async (mint, owner, feePayer, allowOwnerOffCurve = false) => {
    const associatedTokenAccount = getAssociatedTokenAddressSync(
      mint.toPublicKey(),
      owner.toPublicKey(),
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID2,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    debugLog("# associatedTokenAccount: ", associatedTokenAccount.toString());
    try {
      await getAccount(
        Node.getConnection(),
        associatedTokenAccount,
        Node.getConnection().commitment,
        TOKEN_PROGRAM_ID2
      );
      return {
        tokenAccount: associatedTokenAccount.toString(),
        inst: void 0
      };
    } catch (error) {
      if (!(error instanceof TokenAccountNotFoundError) && !(error instanceof TokenInvalidAccountOwnerError)) {
        throw Error("Unexpected error");
      }
      const payer = !feePayer ? owner : feePayer;
      const inst = createAssociatedTokenAccountInstruction(
        payer.toPublicKey(),
        associatedTokenAccount,
        owner.toPublicKey(),
        mint.toPublicKey(),
        TOKEN_PROGRAM_ID2,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );
      return {
        tokenAccount: associatedTokenAccount.toString(),
        inst
      };
    }
  };
})(AssociatedAccount || (AssociatedAccount = {}));

// ../account/src/pda.ts
import { PublicKey as PublicKey5 } from "@solana/web3.js";
import { PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
var Pda;
((Pda2) => {
  Pda2.getMetadata = (mint) => {
    const [publicKey] = PublicKey5.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer()
      ],
      PROGRAM_ID
    );
    return publicKey;
  };
  Pda2.getMasterEdition = (mint) => {
    const [publicKey] = PublicKey5.findProgramAddressSync(
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

// ../converter/src/collection.ts
var Converter;
((Converter13) => {
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
  })(Collection = Converter13.Collection || (Converter13.Collection = {}));
})(Converter || (Converter = {}));

// ../converter/src/creators.ts
var Converter2;
((Converter13) => {
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
  })(Creators = Converter13.Creators || (Converter13.Creators = {}));
})(Converter2 || (Converter2 = {}));

// ../converter/src/memo.ts
var Converter3;
((Converter13) => {
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
  })(Memo = Converter13.Memo || (Converter13.Memo = {}));
})(Converter3 || (Converter3 = {}));

// ../converter/src/mint.ts
var Converter4;
((Converter13) => {
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
  })(Mint = Converter13.Mint || (Converter13.Mint = {}));
})(Converter4 || (Converter4 = {}));

// ../converter/src/uses.ts
var Converter5;
((Converter13) => {
  let Uses;
  ((Uses2) => {
    Uses2.intoUserSide = (output) => {
      if (!output) {
        return void 0;
      }
      return output;
    };
  })(Uses = Converter13.Uses || (Converter13.Uses = {}));
})(Converter5 || (Converter5 = {}));

// ../converter/src/token-metadata.ts
var Converter6;
((Converter13) => {
  let TokenMetadata;
  ((TokenMetadata2) => {
    TokenMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfraSide(input.creators),
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
        creators: Converter2.Creators.intoUserSide(output.onchain.data.creators),
        uses: Converter5.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
    TokenMetadata2.deleteNullStrings = (str) => {
      return str.replace(/\0/g, "");
    };
  })(TokenMetadata = Converter13.TokenMetadata || (Converter13.TokenMetadata = {}));
})(Converter6 || (Converter6 = {}));

// ../converter/src/nft-metadata.ts
var Converter7;
((Converter13) => {
  let NftMetadata;
  ((NftMetadata2) => {
    NftMetadata2.intoInfraSide = (input, uri, sellerFeeBasisPoints) => {
      return {
        name: input.name,
        symbol: input.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: Converter2.Creators.intoInfraSide(input.creators),
        collection: Converter.Collection.intoInfraSide(input.collection),
        uses: input.uses || null
      };
    };
    NftMetadata2.intoUserSide = (output, tokenAmount) => {
      return {
        mint: output.onchain.mint.toString(),
        updateAuthority: output.onchain.updateAuthority.toString(),
        royalty: output.onchain.data.sellerFeeBasisPoints,
        name: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.name),
        symbol: Converter6.TokenMetadata.deleteNullStrings(
          output.onchain.data.symbol
        ),
        tokenAmount,
        uri: Converter6.TokenMetadata.deleteNullStrings(output.onchain.data.uri),
        isMutable: output.onchain.isMutable,
        primarySaleHappened: output.onchain.primarySaleHappened,
        creators: Converter2.Creators.intoUserSide(output.onchain.data.creators),
        editionNonce: output.onchain.editionNonce,
        collection: Converter.Collection.intoUserSide(
          output.onchain.collection
        ),
        uses: Converter5.Uses.intoUserSide(output.onchain.uses),
        dateTime: convertTimestampToDateTime(output.offchain.created_at),
        offchain: output.offchain
      };
    };
  })(NftMetadata = Converter13.NftMetadata || (Converter13.NftMetadata = {}));
})(Converter7 || (Converter7 = {}));

// ../converter/src/properties.ts
var Converter8;
((Converter13) => {
  let Properties;
  ((Properties2) => {
    Properties2.intoInfraSide = async (input, callbackFunc, storageType, feePayer) => {
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
  })(Properties = Converter13.Properties || (Converter13.Properties = {}));
})(Converter8 || (Converter8 = {}));

// ../converter/src/royalty.ts
var Converter9;
((Converter13) => {
  let Royalty;
  ((Royalty2) => {
    Royalty2.THRESHOLD = 100;
    Royalty2.intoInfraSide = (percentage) => {
      return percentage * Royalty2.THRESHOLD;
    };
  })(Royalty = Converter13.Royalty || (Converter13.Royalty = {}));
})(Converter9 || (Converter9 = {}));

// ../converter/src/transfer-checked.ts
var Converter10;
((Converter13) => {
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
  })(TransferChecked = Converter13.TransferChecked || (Converter13.TransferChecked = {}));
})(Converter10 || (Converter10 = {}));

// ../converter/src/transfer.ts
var Converter11;
((Converter13) => {
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
  })(Transfer = Converter13.Transfer || (Converter13.Transfer = {}));
})(Converter11 || (Converter11 = {}));

// ../converter/src/index.ts
var Converter12 = {
  ...Converter,
  ...Converter2,
  ...Converter3,
  ...Converter4,
  ...Converter7,
  ...Converter8,
  ...Converter9,
  ...Converter6,
  ...Converter10,
  ...Converter11,
  ...Converter5
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
      } else if (royalty > Validator2.ROYALTY_MAX * Converter12.Royalty.THRESHOLD) {
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
  details;
  constructor(message, details) {
    super(message);
    this.details = details;
  }
};

// ../types/src/transaction-filter/index.ts
var FilterType = /* @__PURE__ */ ((FilterType3) => {
  FilterType3["Memo"] = "memo";
  FilterType3["Mint"] = "mint";
  FilterType3["OnlyMemo"] = "only-memo";
  FilterType3["Transfer"] = "transfer";
  return FilterType3;
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

// src/calculate-amount.ts
var SplToken;
((SplToken12) => {
  SplToken12.calculateAmount = (amount, mintDecimal) => {
    return amount * 10 ** mintDecimal;
  };
})(SplToken || (SplToken = {}));

// src/add.ts
var SplToken2;
((SplToken12) => {
  SplToken12.add = async (token, owner, signers, totalAmount, mintDecimal, feePayer) => {
    return Try(async () => {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());
      const tokenAssociated = await AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        payer
      );
      const inst = createMintToCheckedInstruction(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new Instruction2([inst], keypairs, payer.toKeypair(), token);
    });
  };
})(SplToken2 || (SplToken2 = {}));

// src/burn.ts
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync2
} from "@solana/spl-token";
var SplToken3;
((SplToken12) => {
  SplToken12.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync2(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      const keypairs = signers.map((s) => s.toKeypair());
      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );
      return new Instruction2([inst], keypairs, payer);
    });
  };
})(SplToken3 || (SplToken3 = {}));

// ../types/src/converter/user-side/input.ts
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

// ../types/src/converter/common.ts
var Common;
((Common2) => {
  let UseMethod;
  ((UseMethod2) => {
    UseMethod2[UseMethod2["Burn"] = 0] = "Burn";
    UseMethod2[UseMethod2["Multiple"] = 1] = "Multiple";
    UseMethod2[UseMethod2["Single"] = 2] = "Single";
  })(UseMethod = Common2.UseMethod || (Common2.UseMethod = {}));
})(Common || (Common = {}));

// src/find.ts
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID3 } from "@solana/spl-token";
import fetch from "cross-fetch";
var SplToken4;
((SplToken12) => {
  const UNABLE_ERROR_REGEX = /Unable to find Metadata account/;
  const sortByUinixTimestamp = (sortable) => (a, b) => {
    if (!a.offchain.created_at) {
      a.offchain.created_at = 0;
    }
    if (!b.offchain.created_at) {
      b.offchain.created_at = 0;
    }
    if (sortable === "desc" /* Desc */) {
      return b.offchain.created_at - a.offchain.created_at;
    } else if (sortable === "asc" /* Asc */) {
      return a.offchain.created_at - b.offchain.created_at;
    } else {
      return b.offchain.created_at - a.offchain.created_at;
    }
  };
  const converter = (tokenStandard, metadata, json, tokenAmount) => {
    if (tokenStandard === UserSideInput.TokenStandard.Fungible) {
      return Converter12.TokenMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else if (tokenStandard === UserSideInput.TokenStandard.NonFungible) {
      return Converter12.NftMetadata.intoUserSide(
        {
          onchain: metadata,
          offchain: json
        },
        tokenAmount
      );
    } else {
      throw Error(`No match tokenStandard: ${tokenStandard}`);
    }
  };
  SplToken12.genericFindByOwner = async (owner, callback, tokenStandard, sortable, isHolder) => {
    try {
      let data = [];
      const connection = Node.getConnection();
      const info = await connection.getParsedTokenAccountsByOwner(
        owner.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID3
        }
      );
      info.value.length === 0 && callback(Result.ok([]));
      for await (const d of info.value) {
        if (isHolder && d.account.data.parsed.info.tokenAmount.uiAmount < 1) {
          debugLog(
            "# findByOwner no hold metadata: ",
            d.account.data.parsed.info
          );
          continue;
        }
        const mint = d.account.data.parsed.info.mint;
        const tokenAmount = d.account.data.parsed.info.tokenAmount.amount;
        try {
          const metadata = await Metadata.fromAccountAddress(
            connection,
            Pda.getMetadata(mint)
          );
          debugLog("# findByOwner metadata: ", metadata);
          if (metadata.tokenStandard !== tokenStandard) {
            continue;
          }
          fetch(metadata.data.uri).then((response) => {
            response.json().then((json) => {
              data.push(
                converter(tokenStandard, metadata, json, tokenAmount)
              );
              callback(Result.ok(data));
            }).catch((e) => {
              callback(Result.err(e));
            }).finally(() => {
              const descAlgo = sortByUinixTimestamp("desc" /* Desc */);
              const ascAlgo = sortByUinixTimestamp("asc" /* Asc */);
              if (sortable === "desc" /* Desc */) {
                data = data.sort(descAlgo);
              } else if (sortable === "asc" /* Asc */) {
                data = data.sort(ascAlgo);
              }
              callback(Result.ok(data));
            });
          }).catch((e) => {
            callback(Result.err(e));
          });
        } catch (e) {
          if (e instanceof Error && UNABLE_ERROR_REGEX.test(e.message)) {
            debugLog("# skip error for old SPL-TOKEN: ", mint);
            continue;
          }
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
  SplToken12.genericFindByMint = async (mint, tokenStandard) => {
    try {
      const connection = Node.getConnection();
      const metadata = await Metadata.fromAccountAddress(
        connection,
        Pda.getMetadata(mint)
      );
      debugLog("# findByMint metadata: ", metadata);
      if (metadata.tokenStandard !== tokenStandard) {
        throw Error("token standards are different");
      }
      const info = await connection.getParsedAccountInfo(mint.toPublicKey());
      const tokenAmount = (info.value?.data).parsed.info.supply;
      const response = await (await fetch(metadata.data.uri)).json();
      return Result.ok(
        converter(tokenStandard, metadata, response, tokenAmount)
      );
    } catch (e) {
      return Result.err(e);
    }
  };
  SplToken12.findByOwner = (owner, onOk, onErr, options) => {
    const sortable = !options?.sortable ? "desc" /* Desc */ : options?.sortable;
    const isHolder = !options?.isHolder ? true : false;
    (0, SplToken12.genericFindByOwner)(
      owner,
      (result) => {
        result.match((ok) => onOk(ok), onErr);
      },
      UserSideInput.TokenStandard.Fungible,
      sortable,
      isHolder
    );
  };
  SplToken12.findByMint = async (mint) => {
    return await (0, SplToken12.genericFindByMint)(
      mint,
      UserSideInput.TokenStandard.Fungible
    );
  };
})(SplToken4 || (SplToken4 = {}));

// src/freeze.ts
import {
  createFreezeAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync3
} from "@solana/spl-token";
var SplToken5;
((SplToken12) => {
  SplToken12.freeze = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync3(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createFreezeAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction2(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken5 || (SplToken5 = {}));

// src/fee-payer-partial-sign-transfer.ts
import { createTransferCheckedInstruction } from "@solana/spl-token";
import { Transaction as Transaction5 } from "@solana/web3.js";
var SplToken6;
((SplToken12) => {
  SplToken12.feePayerPartialSignTransfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        owner,
        feePayer
      );
      const destToken = await AssociatedAccount.makeOrCreateInstruction(
        mint,
        dest,
        feePayer
      );
      let inst2;
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction5({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey()
      });
      if (!destToken.inst) {
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs
        );
        tx.add(inst2);
      } else {
        inst2 = createTransferCheckedInstruction(
          sourceToken.tokenAccount.toPublicKey(),
          mint.toPublicKey(),
          destToken.tokenAccount.toPublicKey(),
          owner.toPublicKey(),
          SplToken.calculateAmount(amount, mintDecimal),
          mintDecimal,
          keypairs
        );
        tx.add(destToken.inst).add(inst2);
      }
      tx.recentBlockhash = blockhashObj.blockhash;
      keypairs.forEach((signer) => {
        tx.partialSign(signer);
      });
      const serializedTx = tx.serialize({
        requireAllSignatures: false
      });
      const hex = serializedTx.toString("hex");
      return new PartialSignInstruction(hex);
    });
  };
})(SplToken6 || (SplToken6 = {}));

// src/history.ts
import { TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID4 } from "@solana/spl-token";

// ../transaction-filter/src/signatures.ts
var Signatures;
((Signatures2) => {
  const parseForTransaction = async (signature) => {
    const res = await Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {};
    }
    return res;
  };
  Signatures2.getForAdress = async (pubkey, parser, callback, options, histories = []) => {
    try {
      debugLog("# options: ", options);
      const transactions = await Node.getConnection().getSignaturesForAddress(
        pubkey.toPublicKey(),
        {
          limit: options.narrowDown
        }
      );
      debugLog("# transactions count:", transactions.length);
      for (const transaction of transactions) {
        parseForTransaction(transaction.signature).then((signature) => {
          const history = parser(signature);
          if (history) {
            histories.push(history);
            callback(Result.ok(histories));
          }
        }).catch((e) => callback(Result.err(e)));
        await sleep(options.waitTime);
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
})(Signatures || (Signatures = {}));

// ../transaction-filter/src/transaction-filter.ts
var TransactionFilter;
((TransactionFilter2) => {
  const createPostTokenAccountList = (transaction) => {
    const postTokenAccount = [];
    if (Object.keys(transaction).length === 0) {
      return postTokenAccount;
    }
    const accountKeys = transaction.transaction.message.accountKeys.map(
      (t) => t.pubkey.toString()
    );
    transaction.meta?.postTokenBalances?.forEach((t) => {
      if (accountKeys[t.accountIndex] && t.owner) {
        const v = {
          account: accountKeys[t.accountIndex],
          owner: t.owner
        };
        postTokenAccount.push(v);
      }
    });
    return postTokenAccount;
  };
  TransactionFilter2.isParsedInstruction = (arg) => {
    return arg !== null && typeof arg === "object" && "parsed" in arg;
  };
  TransactionFilter2.parse = (filterType, moduleName) => (txMeta) => {
    let history;
    if (filterType === "mint" /* Mint */ && moduleName === "system" /* SolNative */) {
      throw Error(
        "This filterType('FilterType.Mint') can not use from SolNative module"
      );
    }
    if (!txMeta || !txMeta.transaction) {
      return history;
    }
    const postTokenAccount = createPostTokenAccountList(txMeta);
    txMeta.transaction.message.instructions.forEach((instruction) => {
      if ((0, TransactionFilter2.isParsedInstruction)(instruction)) {
        switch (filterType) {
          case "memo" /* Memo */: {
            if (FilterOptions.Memo.program.includes(instruction.program)) {
              let instructionTransfer;
              txMeta.transaction.message.instructions.forEach(
                (instruction2) => {
                  if ((0, TransactionFilter2.isParsedInstruction)(instruction2) && FilterOptions.Transfer.program.includes(
                    instruction2.program
                  )) {
                    instructionTransfer = instruction2;
                  }
                }
              );
              if (instructionTransfer && moduleName !== instructionTransfer["program"]) {
                debugLog(
                  "# FilterType.Memo break instruction: ",
                  instructionTransfer
                );
                break;
              }
              history = Converter12.Memo.intoUserSide(
                instruction,
                txMeta,
                instructionTransfer,
                postTokenAccount
              );
            }
            break;
          }
          case "only-memo" /* OnlyMemo */: {
            if (FilterOptions.Memo.program.includes(instruction.program)) {
              let instructionTransfer;
              history = Converter12.Memo.intoUserSide(
                instruction,
                txMeta,
                instructionTransfer,
                postTokenAccount
              );
            }
            break;
          }
          case "mint" /* Mint */: {
            if (FilterOptions.Mint.program.includes(instruction.program) && FilterOptions.Mint.action.includes(
              instruction.parsed.type
            )) {
              history = Converter12.Mint.intoUserSide(instruction, txMeta);
            }
            break;
          }
          case "transfer" /* Transfer */:
            if (moduleName === instruction.program && FilterOptions.Transfer.action.includes(
              instruction.parsed.type
            )) {
              if (instruction.parsed.type === "transferChecked") {
                history = Converter12.TransferChecked.intoUserSide(
                  instruction,
                  txMeta,
                  postTokenAccount
                );
              } else {
                history = Converter12.Transfer.intoUserSide(
                  instruction,
                  txMeta
                );
              }
            }
        }
      }
    });
    return history;
  };
})(TransactionFilter || (TransactionFilter = {}));

// src/history.ts
var SplToken7;
((SplToken12) => {
  SplToken12.getHistory = async (target, filterType, onOk, onErr, options = {}) => {
    try {
      const defaultValues = {
        waitTime: 0.03,
        narrowDown: 100
      };
      const mergedOptions = { ...defaultValues, ...options };
      const tokenAccounts = await Node.getConnection().getParsedTokenAccountsByOwner(
        target.toPublicKey(),
        {
          programId: TOKEN_PROGRAM_ID4
        }
      );
      const storedHistories = [];
      debugLog("# tokenAccounts size: ", tokenAccounts.value.length);
      for (const account of tokenAccounts.value) {
        const parser = TransactionFilter.parse(filterType, "spl-token" /* SplToken */);
        await Signatures.getForAdress(
          account.pubkey.toString(),
          parser,
          (result) => result.match(onOk, onErr),
          mergedOptions,
          storedHistories
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
})(SplToken7 || (SplToken7 = {}));

// src/mint.ts
import {
  SystemProgram as SystemProgram2
} from "@solana/web3.js";
import {
  AuthorityType,
  createAssociatedTokenAccountInstruction as createAssociatedTokenAccountInstruction2,
  createInitializeMintInstruction,
  createMintToCheckedInstruction as createMintToCheckedInstruction2,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync4,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID as TOKEN_PROGRAM_ID5
} from "@solana/spl-token";
import {
  createCreateMetadataAccountV3Instruction
} from "@metaplex-foundation/mpl-token-metadata";

// ../storage/src/provenance-layer.ts
import Irys, { WebIrys } from "@irys/sdk";
var ProvenanceLayer;
((ProvenanceLayer2) => {
  const TOKEN = "solana";
  ProvenanceLayer2.uploadFile = async (uploadFile2, identity, tags) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    let receipt;
    if ((0, ProvenanceLayer2.isUploadable)(uploadFile2)) {
      receipt = await irys.uploadFile(uploadFile2, { tags });
    } else {
      throw Error("No match file type or enviroment");
    }
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };
  ProvenanceLayer2.uploadData = async (data, identity, tags) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const receipt = await irys.upload(data, { tags });
    return `${Constants.IRYS_GATEWAY_URL}/${receipt.id}`;
  };
  ProvenanceLayer2.isNodeable = (value) => {
    if (isNode()) {
      return typeof value === "string";
    }
    return false;
  };
  ProvenanceLayer2.isBrowserable = (value) => {
    if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };
  ProvenanceLayer2.isUploadable = (value) => {
    if (isNode()) {
      return typeof value === "string";
    } else if (isBrowser()) {
      return value instanceof File;
    }
    return false;
  };
  ProvenanceLayer2.fundArweave = async (uploadFile2, identity) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const byteLength = await (0, ProvenanceLayer2.toByteLength)(uploadFile2);
    const willPay = await calculateCost(byteLength, identity);
    const fundTx = await irys.fund(irys.utils.toAtomic(willPay));
    debugLog("# fundTx: ", fundTx);
  };
  ProvenanceLayer2.toByteLength = async (content) => {
    let length = 100;
    if ((0, ProvenanceLayer2.isNodeable)(content)) {
      length = (await import("fs")).readFileSync(content).length;
    } else if ((0, ProvenanceLayer2.isBrowserable)(content)) {
      length = content.size;
    } else {
      throw Error("No match content type");
    }
    return length;
  };
  ProvenanceLayer2.getIrys = async (identity) => {
    if (isNode()) {
      return await (0, ProvenanceLayer2.getNodeIrys)(identity);
    } else if (isBrowser()) {
      return await (0, ProvenanceLayer2.getBrowserIrys)(identity);
    } else {
      throw Error("Only Node.js or Browser");
    }
  };
  ProvenanceLayer2.getNodeIrys = async (secret) => {
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster
    });
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const key = secret;
    const irys = new Irys({
      url,
      token,
      key,
      config: { providerUrl: clusterUrl }
    });
    return irys;
  };
  ProvenanceLayer2.getBrowserIrys = async (provider) => {
    const clusterUrl = Constants.switchCluster({
      cluster: Constants.currentCluster
    });
    const url = Constants.BUNDLR_NETWORK_URL;
    const token = TOKEN;
    const wallet = { rpcUrl: clusterUrl, name: TOKEN, provider };
    const webIrys = new WebIrys({ url, token, wallet });
    await webIrys.ready();
    return webIrys;
  };
  const calculateCost = async (size, identity) => {
    const irys = await (0, ProvenanceLayer2.getIrys)(identity);
    const priceAtomic = await irys.getPrice(size);
    const priceConverted = irys.utils.fromAtomic(priceAtomic);
    debugLog("# size: ", size);
    debugLog(`# price: ${priceConverted}`);
    return priceConverted;
  };
})(ProvenanceLayer || (ProvenanceLayer = {}));

// ../storage/src/arweave.ts
var Arweave;
((Arweave2) => {
  Arweave2.uploadFile = (filePath, feePayer) => {
    return Try(async () => {
      debugLog("# upload file: ", filePath);
      await ProvenanceLayer.fundArweave(filePath, feePayer);
      return await ProvenanceLayer.uploadFile(filePath, feePayer);
    });
  };
  Arweave2.uploadData = (metadata, feePayer) => {
    return Try(async () => {
      debugLog("# upload meta data: ", metadata);
      return await ProvenanceLayer.uploadData(
        JSON.stringify(metadata),
        feePayer
      );
    });
  };
})(Arweave || (Arweave = {}));

// ../storage/src/nft-storage.ts
import { Blob, NFTStorage } from "nft.storage";
var NftStorage;
((NftStorage2) => {
  let isDisplayWarning = false;
  const getNftStorageApiKey = () => {
    if (!Constants.nftStorageApiKey) {
      if (!isDisplayWarning) {
        console.warn(
          `
        [Warning]
        --------------------------------------
        If will use @solana-suite/nft package
        your need to update nftStorage.apiKey define parameter in solana-suite.json.
        can get apiKey from https://nft.storage/
        --------------------------------------
        `
        );
        isDisplayWarning = true;
      }
      return Constants.NFT_STORAGE_API_KEY;
    } else {
      return Constants.nftStorageApiKey;
    }
  };
  const createGatewayUrl = (cid) => `${Constants.NFT_STORAGE_GATEWAY_URL}/${cid}`;
  const connect = () => new NFTStorage({ token: getNftStorageApiKey() });
  NftStorage2.uploadFile = async (fileType) => {
    return Try(async () => {
      debugLog("# upload content: ", fileType);
      let file;
      if (ProvenanceLayer.isNodeable(fileType)) {
        file = (await import("fs")).readFileSync(fileType);
      } else if (ProvenanceLayer.isBrowserable(fileType)) {
        file = Buffer.from(await fileType.arrayBuffer());
      } else {
        throw Error("Supported environment: only Node.js and Browser js");
      }
      const blobImage = new Blob([file]);
      const res = await connect().storeBlob(blobImage);
      return createGatewayUrl(res);
    });
  };
  NftStorage2.uploadData = async (storageData) => {
    return Try(async () => {
      debugLog("# upload metadata: ", storageData);
      const blobJson = new Blob([JSON.stringify(storageData)]);
      const res = await connect().storeBlob(blobJson);
      return createGatewayUrl(res);
    });
  };
})(NftStorage || (NftStorage = {}));

// ../storage/src/storage.ts
var Storage;
((Storage2) => {
  Storage2.toConvertOffchaindata = (input, sellerFeeBasisPoints) => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: "",
      options: input.options
    };
    return data;
  };
  Storage2.uploadFile = async (filePath, storageType, feePayer) => {
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      return await Arweave.uploadFile(filePath, feePayer);
    } else if (storageType === "nftStorage") {
      return await NftStorage.uploadFile(filePath);
    } else {
      throw Error("Not found storageType");
    }
  };
  Storage2.upload = async (input, filePath, storageType, feePayer) => {
    let storage;
    if (storageType === "arweave") {
      if (!feePayer) {
        throw Error("Arweave needs to have feepayer");
      }
      storage = await (await Arweave.uploadFile(filePath, feePayer)).unwrap(
        async (ok) => {
          input.image = ok;
          return await Arweave.uploadData(input, feePayer);
        },
        (err) => {
          throw err;
        }
      );
    } else if (storageType === "nftStorage") {
      storage = await (await NftStorage.uploadFile(filePath)).unwrap(
        async (ok) => {
          input.image = ok;
          return await NftStorage.uploadData(input);
        },
        (err) => {
          throw err;
        }
      );
    } else {
      throw Error("No match storageType");
    }
    if (!storage) {
      throw Error("Empty storage object");
    }
    return storage;
  };
})(Storage || (Storage = {}));

// src/mint.ts
var SplToken8;
((SplToken12) => {
  SplToken12.createFreezeAuthority = (mint2, owner, freezeAuthority) => {
    return createSetAuthorityInstruction(
      mint2,
      owner,
      AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };
  SplToken12.createMintInstructions = async (mint2, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Pda.getMetadata(mint2.toString());
    const tokenAssociated = getAssociatedTokenAddressSync4(mint2, owner);
    const inst1 = SystemProgram2.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint2,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID5
    });
    const inst2 = createInitializeMintInstruction(
      mint2,
      mintDecimal,
      owner,
      owner,
      TOKEN_PROGRAM_ID5
    );
    const inst3 = createAssociatedTokenAccountInstruction2(
      feePayer,
      tokenAssociated,
      owner,
      mint2
    );
    const inst4 = createMintToCheckedInstruction2(
      mint2,
      tokenAssociated,
      owner,
      SplToken.calculateAmount(totalAmount, mintDecimal),
      mintDecimal
    );
    const inst5 = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPda,
        mint: mint2,
        mintAuthority: owner,
        payer: feePayer,
        updateAuthority: owner
      },
      {
        createMetadataAccountArgsV3: {
          data: tokenMetadata,
          isMutable,
          collectionDetails: null
        }
      }
    );
    return [inst1, inst2, inst3, inst4, inst5];
  };
  SplToken12.mint = async (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => {
    return Try(async () => {
      const valid = Validator.checkAll(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input,
        input.royalty
      );
      const createdAt = Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3);
      tokenStorageMetadata.created_at = createdAt;
      let uri;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          tokenStorageMetadata,
          input.filePath,
          input.storageType,
          payer
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error("Must set 'storageType + filePath' or 'uri'");
      }
      const isMutable = true;
      const datav2 = Converter12.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints
      );
      debugLog("# datav2: ", datav2);
      debugLog("# upload content url: ", uri);
      const mint2 = KeypairAccount.create();
      const insts = await (0, SplToken12.createMintInstructions)(
        mint2.toPublicKey(),
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      if (freezeAuthority) {
        insts.push(
          (0, SplToken12.createFreezeAuthority)(
            mint2.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }
      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint2.toKeypair()],
        payer.toKeypair(),
        mint2.pubkey
      );
    });
  };
})(SplToken8 || (SplToken8 = {}));

// src/thaw.ts
import {
  createThawAccountInstruction,
  getAssociatedTokenAddressSync as getAssociatedTokenAddressSync5
} from "@solana/spl-token";
var SplToken9;
((SplToken12) => {
  SplToken12.thaw = (mint, owner, freezeAuthority, feePayer) => {
    const payer = feePayer ? feePayer : freezeAuthority;
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync5(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const inst = createThawAccountInstruction(
        tokenAccount,
        mint.toPublicKey(),
        new KeypairAccount({ secret: freezeAuthority }).toPublicKey()
      );
      return new Instruction2(
        [inst],
        [freezeAuthority.toKeypair()],
        payer.toKeypair()
      );
    });
  };
})(SplToken9 || (SplToken9 = {}));

// src/transfer.ts
import { createTransferCheckedInstruction as createTransferCheckedInstruction2 } from "@solana/spl-token";
var SplToken10;
((SplToken12) => {
  SplToken12.transfer = async (mint, owner, dest, signers, amount, mintDecimal, feePayer) => {
    return Try(async () => {
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        payer
      );
      const destToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        dest,
        payer
      );
      const inst = createTransferCheckedInstruction2(
        sourceToken.toPublicKey(),
        mint.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        SplToken.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs
      );
      return new Instruction2([inst], keypairs, payer.toKeypair());
    });
  };
})(SplToken10 || (SplToken10 = {}));

// src/index.ts
var SplToken11 = {
  ...SplToken2,
  ...SplToken3,
  ...SplToken4,
  ...SplToken5,
  ...SplToken6,
  ...SplToken7,
  ...SplToken8,
  ...SplToken9,
  ...SplToken10
};
export {
  AssociatedAccount,
  FilterOptions,
  FilterType,
  KeypairAccount,
  ModuleName,
  Node,
  Pda,
  SplToken11 as SplToken,
  Validator,
  ValidatorError
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2FkZC50cyIsICIuLi8uLi9zaGFyZWQvc3JjL2NvbnN0YW50cy50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3Jlc3VsdC50cyIsICIuLi8uLi9zaGFyZWQvc3JjL3NoYXJlZC50cyIsICIuLi8uLi9ub2RlL3NyYy9pbmRleC50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvaW5zdHJ1Y3Rpb24vaW5kZXgudHMiLCAiLi4vLi4vaW5zdHJ1Y3Rpb24vc3JjL2luc3RydWN0aW9uL2RlZmluZS50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvaW5zdHJ1Y3Rpb24vYmF0Y2gtc3VibWl0LnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9taW50LWluc3RydWN0aW9uLnRzIiwgIi4uLy4uL2luc3RydWN0aW9uL3NyYy9tdWx0aXNpZy1pbnN0cnVjdGlvbi50cyIsICIuLi8uLi9pbnN0cnVjdGlvbi9zcmMvcGFydGlhbC1zaWduSW5zdHJ1Y3Rpb24udHMiLCAiLi4vLi4vZ2xvYmFsL3NyYy9pbmRleC50cyIsICIuLi8uLi9hY2NvdW50L3NyYy9hc3NvY2lhdGVkLWFjY291bnQudHMiLCAiLi4vLi4vYWNjb3VudC9zcmMva2V5cGFpci1hY2NvdW50LnRzIiwgIi4uLy4uL2FjY291bnQvc3JjL3BkYS50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL2NvbGxlY3Rpb24udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9jcmVhdG9ycy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL21lbW8udHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9taW50LnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdXNlcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3Rva2VuLW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvbmZ0LW1ldGFkYXRhLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvcHJvcGVydGllcy50cyIsICIuLi8uLi9jb252ZXJ0ZXIvc3JjL3JveWFsdHkudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy90cmFuc2Zlci1jaGVja2VkLnRzIiwgIi4uLy4uL2NvbnZlcnRlci9zcmMvdHJhbnNmZXIudHMiLCAiLi4vLi4vY29udmVydGVyL3NyYy9pbmRleC50cyIsICIuLi8uLi92YWxpZGF0b3Ivc3JjL2luZGV4LnRzIiwgIi4uLy4uL3R5cGVzL3NyYy90cmFuc2FjdGlvbi1maWx0ZXIvaW5kZXgudHMiLCAiLi4vc3JjL2NhbGN1bGF0ZS1hbW91bnQudHMiLCAiLi4vc3JjL2J1cm4udHMiLCAiLi4vLi4vdHlwZXMvc3JjL2NvbnZlcnRlci91c2VyLXNpZGUvaW5wdXQudHMiLCAiLi4vLi4vdHlwZXMvc3JjL2NvbnZlcnRlci9jb21tb24udHMiLCAiLi4vc3JjL2ZpbmQudHMiLCAiLi4vc3JjL2ZyZWV6ZS50cyIsICIuLi9zcmMvZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlci50cyIsICIuLi9zcmMvaGlzdG9yeS50cyIsICIuLi8uLi90cmFuc2FjdGlvbi1maWx0ZXIvc3JjL3NpZ25hdHVyZXMudHMiLCAiLi4vLi4vdHJhbnNhY3Rpb24tZmlsdGVyL3NyYy90cmFuc2FjdGlvbi1maWx0ZXIudHMiLCAiLi4vc3JjL21pbnQudHMiLCAiLi4vLi4vc3RvcmFnZS9zcmMvcHJvdmVuYW5jZS1sYXllci50cyIsICIuLi8uLi9zdG9yYWdlL3NyYy9hcndlYXZlLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL25mdC1zdG9yYWdlLnRzIiwgIi4uLy4uL3N0b3JhZ2Uvc3JjL3N0b3JhZ2UudHMiLCAiLi4vc3JjL3RoYXcudHMiLCAiLi4vc3JjL3RyYW5zZmVyLnRzIiwgIi4uL3NyYy9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQdWJrZXksIFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0ZSB9IGZyb20gJy4vY2FsY3VsYXRlLWFtb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBleHBvcnQgY29uc3QgYWRkID0gYXN5bmMgKFxuICAgIHRva2VuOiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXJzOiBTZWNyZXRbXSxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHBheWVyID0gIWZlZVBheWVyID8gc2lnbmVyc1swXSA6IGZlZVBheWVyO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IHRva2VuQXNzb2NpYXRlZCA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIHRva2VuLFxuICAgICAgICBvd25lcixcbiAgICAgICAgcGF5ZXIsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpbnN0ID0gY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b2tlbkFzc29jaWF0ZWQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQodG90YWxBbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllci50b0tleXBhaXIoKSwgdG9rZW4pO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IENvbW1pdG1lbnQsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJ0Bzb2xhbmEtc3VpdGUvY29uZmlnJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb25zdGFudHMge1xuICBleHBvcnQgY29uc3QgY3VycmVudENsdXN0ZXIgPSBDb25maWcuY2x1c3Rlci50eXBlO1xuICBleHBvcnQgY29uc3QgY3VzdG9tQ2x1c3RlclVybCA9IENvbmZpZy5jbHVzdGVyLmN1c3RvbUNsdXN0ZXJVcmw7XG4gIGV4cG9ydCBjb25zdCBpc0RlYnVnZ2luZyA9IENvbmZpZy5kZWJ1Z2dpbmc7XG4gIGV4cG9ydCBjb25zdCBuZnRTdG9yYWdlQXBpS2V5ID0gQ29uZmlnLm5mdHN0b3JhZ2UuYXBpa2V5O1xuXG4gIGV4cG9ydCBlbnVtIENsdXN0ZXIge1xuICAgIHByZCA9ICdtYWlubmV0LWJldGEnLFxuICAgIHByZE1ldGFwbGV4ID0gJ21haW5uZXQtYmV0YS1tZXRhcGxleCcsXG4gICAgZGV2ID0gJ2Rldm5ldCcsXG4gICAgdGVzdCA9ICd0ZXN0bmV0JyxcbiAgICBsb2NhbGhvc3QgPSAnbG9jYWxob3N0LWRldm5ldCcsXG4gIH1cblxuICBleHBvcnQgZW51bSBFbmRQb2ludFVybCB7XG4gICAgcHJkID0gJ2h0dHBzOi8vYXBpLm1haW5uZXQtYmV0YS5zb2xhbmEuY29tJyxcbiAgICBwcmRNZXRhcGxleCA9ICdodHRwczovL2FwaS5tZXRhcGxleC5zb2xhbmEuY29tJyxcbiAgICBkZXYgPSAnaHR0cHM6Ly9hcGkuZGV2bmV0LnNvbGFuYS5jb20nLFxuICAgIHRlc3QgPSAnaHR0cHM6Ly9hcGkudGVzdG5ldC5zb2xhbmEuY29tJyxcbiAgICBsb2NhbGhvc3QgPSAnaHR0cDovL2FwaS5kZXZuZXQuc29sYW5hLmNvbScsXG4gIH1cblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQ2x1c3RlciA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogc3RyaW5nID0+IHtcbiAgICBjb25zdCB7IGNsdXN0ZXI6IGVudiwgY3VzdG9tQ2x1c3RlclVybCB9ID0gcGFyYW07XG5cbiAgICAvLyBpZiBzZXR0ZWQgY3VzdG9tIHVybCwgbW9zdCBwcmlvcml0eVxuICAgIGlmIChjdXN0b21DbHVzdGVyVXJsICYmIGN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgaW5kZXggPSBEYXRlLm5vdygpICUgY3VzdG9tQ2x1c3RlclVybC5sZW5ndGg7XG4gICAgICByZXR1cm4gY3VzdG9tQ2x1c3RlclVybFtpbmRleF07XG4gICAgfVxuXG4gICAgc3dpdGNoIChlbnYpIHtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkOlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIucHJkTWV0YXBsZXg6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwucHJkTWV0YXBsZXg7XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwudGVzdDtcbiAgICAgIGNhc2UgQ29uc3RhbnRzLkNsdXN0ZXIuZGV2OlxuICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVuZFBvaW50VXJsLmRldjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBDb25zdGFudHMuRW5kUG9pbnRVcmwubG9jYWxob3N0O1xuICAgIH1cbiAgfTtcblxuICBleHBvcnQgY29uc3Qgc3dpdGNoQnVuZGxyID0gKGVudjogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBzd2l0Y2ggKGVudikge1xuICAgICAgY2FzZSBDb25zdGFudHMuQ2x1c3Rlci5kZXY6XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLnRlc3Q6XG4gICAgICBjYXNlIENvbnN0YW50cy5DbHVzdGVyLmxvY2FsaG9zdDpcbiAgICAgICAgcmV0dXJuICdodHRwczovL2Rldm5ldC5pcnlzLnh5eic7XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gRGF0ZS5ub3coKSAlIDI7XG4gICAgICAgIGNvbnN0IGNsdXN0ZXJzID0gWydodHRwczovL25vZGUxLmlyeXMueHl6JywgJ2h0dHBzOi8vbm9kZTIuaXJ5cy54eXonXTtcbiAgICAgICAgcmV0dXJuIGNsdXN0ZXJzW2luZGV4XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IFdSQVBQRURfVE9LRU5fUFJPR1JBTV9JRCA9IG5ldyBQdWJsaWNLZXkoXG4gICAgJ1NvMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTInLFxuICApO1xuICBleHBvcnQgY29uc3QgTUVNT19QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnTWVtbzFVaGtKUmZIeXZMTWNWdWNKd3hYZXVENzI4RXFWRER3UUR4Rk1ObycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBNRVRBUExFWF9QUk9HUkFNX0lEID0gbmV3IFB1YmxpY0tleShcbiAgICAnbWV0YXFieHhVZXJkcTI4Y2oxUmJBV2tZUW0zeWJ6amI2YThidDUxOHgxcycsXG4gICk7XG4gIGV4cG9ydCBjb25zdCBDT01NSVRNRU5UOiBDb21taXRtZW50ID0gJ2NvbmZpcm1lZCc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9BUElfS0VZID1cbiAgICAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWFJvY2pvd2VFUkdNamN5TjJWa09EWmhSR1UxUlRNeVpEWkRaRUpsT0RjMFl6UkZORGxFT0RZMU9XWm1PRU1pTENKcGMzTWlPaUp1Wm5RdGMzUnZjbUZuWlNJc0ltbGhkQ0k2TVRZeU1ESTJORGswTXpjd05pd2libUZ0WlNJNkltUmxiVzhpZlEuZDRKNzBtaWt4UkI4YTV2d051NlNPNUhEQThKYXVldXNlQWo3UV95dE1DRSc7XG4gIGV4cG9ydCBjb25zdCBORlRfU1RPUkFHRV9HQVRFV0FZX1VSTCA9ICdodHRwczovL2lwZnMuaW8vaXBmcyc7XG4gIGV4cG9ydCBjb25zdCBJUllTX0dBVEVXQVlfVVJMID0gJ2h0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5eic7XG4gIGV4cG9ydCBjb25zdCBCVU5ETFJfTkVUV09SS19VUkwgPSBzd2l0Y2hCdW5kbHIoQ29uZmlnLmNsdXN0ZXIudHlwZSk7XG59XG4iLCAiLy8gZm9ya2VkOiBodHRwczovL2dpdGh1Yi5jb20vYmFkcmFwL3Jlc3VsdCwgdGhhbmsgeW91IGFkdmljZSAgQGp2aWlkZVxuaW1wb3J0IHsgVHJhbnNhY3Rpb25TaWduYXR1cmUgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5hYnN0cmFjdCBjbGFzcyBBYnN0cmFjdFJlc3VsdDxULCBFIGV4dGVuZHMgRXJyb3I+IHtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IF9jaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG5cbiAgdW53cmFwKCk6IFQ7XG4gIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogVTtcbiAgdW53cmFwPFUsIFY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBWKTogVSB8IFY7XG4gIC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDEwXG4gIC8vIHVud3JhcDxVPihvazogKHZhbHVlOiBUKSA9PiBVLCBlcnI6IChlcnJvcjogRSkgPT4gVSk6IFU7XG4gIHVud3JhcChvaz86ICh2YWx1ZTogVCkgPT4gdW5rbm93biwgZXJyPzogKGVycm9yOiBFKSA9PiB1bmtub3duKTogdW5rbm93biB7XG4gICAgY29uc3QgciA9IHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sgPyBvayh2YWx1ZSkgOiB2YWx1ZSksXG4gICAgICAoZXJyb3IpID0+IChlcnIgPyBSZXN1bHQub2soZXJyKGVycm9yKSkgOiBSZXN1bHQuZXJyKGVycm9yKSksXG4gICAgKTtcbiAgICBpZiAoci5pc0Vycikge1xuICAgICAgdGhyb3cgci5lcnJvcjtcbiAgICB9XG4gICAgcmV0dXJuIHIudmFsdWU7XG4gIH1cblxuICAvLy8vIG1hcCAvLy8vXG4gIG1hcDxVPihvazogKHZhbHVlOiBUKSA9PiBVKTogUmVzdWx0PFUsIEU+O1xuICBtYXA8VSwgRiBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBVLFxuICAgIGVycjogKGVycm9yOiBFKSA9PiBGLFxuICApOiBSZXN1bHQ8VSwgRj47XG4gIG1hcChvazogKHZhbHVlOiBUKSA9PiB1bmtub3duLCBlcnI/OiAoZXJyb3I6IEUpID0+IEVycm9yKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4oXG4gICAgICAodmFsdWUpID0+IFJlc3VsdC5vayhvayh2YWx1ZSkpLFxuICAgICAgKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVyciA/IGVycihlcnJvcikgOiBlcnJvciksXG4gICAgKTtcbiAgfVxuXG4gIC8vLy8gY2hhaW4gLy8vL1xuICBjaGFpbjxYPihvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgRT4pOiBSZXN1bHQ8WCwgRT47XG4gIGNoYWluPFg+KG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBFPik6IC8vIHVuaWZpZWQtc2lnbmF0dXJlcy4gaW50byBsaW5lIDM3XG4gIC8vIGVycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgRT5cbiAgUmVzdWx0PFgsIEU+O1xuICBjaGFpbjxYLCBVIGV4dGVuZHMgRXJyb3I+KFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT47XG4gIGNoYWluKFxuICAgIG9rOiAodmFsdWU6IFQpID0+IFJlc3VsdDx1bmtub3duPixcbiAgICBlcnI/OiAoZXJyb3I6IEUpID0+IFJlc3VsdDx1bmtub3duPixcbiAgKTogUmVzdWx0PHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hhaW4ob2ssIGVyciB8fCAoKGVycm9yKSA9PiBSZXN1bHQuZXJyKGVycm9yKSkpO1xuICB9XG5cbiAgLy8vLyBtYXRjaCAvLy8vXG4gIG1hdGNoPFUsIEY+KG9rOiAodmFsdWU6IFQpID0+IFUsIGVycjogKGVycm9yOiBFKSA9PiBGKTogdm9pZCB8IFByb21pc2U8dm9pZD47XG5cbiAgbWF0Y2goXG4gICAgb2s6ICh2YWx1ZTogVCkgPT4gdW5rbm93bixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gdW5rbm93bixcbiAgKTogdm9pZCB8IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX2NoYWluKFxuICAgICAgKHZhbHVlKSA9PiBSZXN1bHQub2sob2sodmFsdWUpKSxcbiAgICAgIChlcnJvcikgPT4gUmVzdWx0LmVycihlcnIoZXJyb3IpIGFzIEVycm9yKSxcbiAgICApO1xuICB9XG5cbiAgLy8vIHN1Ym1pdCAoYWxpYXMgSW5zdHJ1Y3Rpb24uc3VibWl0KSAvLy8vXG4gIGFzeW5jIHN1Ym1pdCgpOiBQcm9taXNlPFJlc3VsdDxUcmFuc2FjdGlvblNpZ25hdHVyZSwgRXJyb3I+PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgIGNvbnN0IGluc3RydWN0aW9uID0gdGhpcy51bndyYXAoKSBhcyBhbnk7XG4gICAgICBpZiAoaW5zdHJ1Y3Rpb24uaW5zdHJ1Y3Rpb25zICYmIGluc3RydWN0aW9uLnNpZ25lcnMpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGluc3RydWN0aW9uLnN1Ym1pdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoRXJyb3IoJ09ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0JykpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZXJyIGFzIEVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuY2xhc3MgSW50ZXJuYWxPazxULCBFIGV4dGVuZHMgRXJyb3I+IGV4dGVuZHMgQWJzdHJhY3RSZXN1bHQ8VCwgRT4ge1xuICByZWFkb25seSBpc09rID0gdHJ1ZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSBmYWxzZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgdmFsdWU6IFQpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzICovXG4gIHByb3RlY3RlZCBfY2hhaW48WCwgVSBleHRlbmRzIEVycm9yPihcbiAgICBvazogKHZhbHVlOiBUKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICAgX2VycjogKGVycm9yOiBFKSA9PiBSZXN1bHQ8WCwgVT4sXG4gICk6IFJlc3VsdDxYLCBVPiB7XG4gICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xuICB9XG59XG5cbmNsYXNzIEludGVybmFsRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gZXh0ZW5kcyBBYnN0cmFjdFJlc3VsdDxULCBFPiB7XG4gIHJlYWRvbmx5IGlzT2sgPSBmYWxzZTtcbiAgcmVhZG9ubHkgaXNFcnIgPSB0cnVlO1xuICBjb25zdHJ1Y3RvcihyZWFkb25seSBlcnJvcjogRSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NoYWluPFgsIFUgZXh0ZW5kcyBFcnJvcj4oXG4gICAgX29rOiAodmFsdWU6IFQpID0+IFJlc3VsdDxYLCBVPixcbiAgICBlcnI6IChlcnJvcjogRSkgPT4gUmVzdWx0PFgsIFU+LFxuICApOiBSZXN1bHQ8WCwgVT4ge1xuICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBSZXN1bHQge1xuICBleHBvcnQgdHlwZSBPazxULCBFIGV4dGVuZHMgRXJyb3I+ID0gSW50ZXJuYWxPazxULCBFPjtcbiAgZXhwb3J0IHR5cGUgRXJyPFQsIEUgZXh0ZW5kcyBFcnJvcj4gPSBJbnRlcm5hbEVycjxULCBFPjtcblxuICBleHBvcnQgZnVuY3Rpb24gb2s8VCwgRSBleHRlbmRzIEVycm9yPih2YWx1ZTogVCk6IFJlc3VsdDxULCBFPiB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcm5hbE9rKHZhbHVlKTtcbiAgfVxuICBleHBvcnQgZnVuY3Rpb24gZXJyPEUgZXh0ZW5kcyBFcnJvciwgVCA9IG5ldmVyPihlcnJvcj86IEUpOiBSZXN1bHQ8VCwgRT47XG4gIGV4cG9ydCBmdW5jdGlvbiBlcnI8RSBleHRlbmRzIEVycm9yLCBUID0gbmV2ZXI+KGVycm9yOiBFKTogUmVzdWx0PFQsIEU+IHtcbiAgICByZXR1cm4gbmV3IEludGVybmFsRXJyKGVycm9yIHx8IEVycm9yKCkpO1xuICB9XG5cbiAgdHlwZSBVID0gUmVzdWx0PHVua25vd24+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICAgIFIxNCBleHRlbmRzIFUsXG4gICAgUjE1IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTQsIFIxNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICAgIE9rVHlwZTxSMTI+LFxuICAgICAgT2tUeXBlPFIxMz4sXG4gICAgICBPa1R5cGU8UjE0PixcbiAgICAgIE9rVHlwZTxSMTU+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIHwgUjBcbiAgICAgIHwgUjFcbiAgICAgIHwgUjJcbiAgICAgIHwgUjNcbiAgICAgIHwgUjRcbiAgICAgIHwgUjVcbiAgICAgIHwgUjZcbiAgICAgIHwgUjdcbiAgICAgIHwgUjhcbiAgICAgIHwgUjlcbiAgICAgIHwgUjEwXG4gICAgICB8IFIxMVxuICAgICAgfCBSMTJcbiAgICAgIHwgUjEzXG4gICAgICB8IFIxNFxuICAgICAgfCBSMTVcbiAgICA+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgICBSMTIgZXh0ZW5kcyBVLFxuICAgIFIxMyBleHRlbmRzIFUsXG4gICAgUjE0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMiwgUjEzLCBSMTRdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgICAgT2tUeXBlPFIxND4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFxuICAgICAgfCBSMFxuICAgICAgfCBSMVxuICAgICAgfCBSMlxuICAgICAgfCBSM1xuICAgICAgfCBSNFxuICAgICAgfCBSNVxuICAgICAgfCBSNlxuICAgICAgfCBSN1xuICAgICAgfCBSOFxuICAgICAgfCBSOVxuICAgICAgfCBSMTBcbiAgICAgIHwgUjExXG4gICAgICB8IFIxMlxuICAgICAgfCBSMTNcbiAgICAgIHwgUjE0XG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgICBSMTMgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTAsIFIxMSwgUjEyLCBSMTNdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgICBPa1R5cGU8UjEyPixcbiAgICAgIE9rVHlwZTxSMTM+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxcbiAgICAgIFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExIHwgUjEyIHwgUjEzXG4gICAgPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICAgIFIxMSBleHRlbmRzIFUsXG4gICAgUjEyIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTEsIFIxMl0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgICBPa1R5cGU8Ujk+LFxuICAgICAgT2tUeXBlPFIxMD4sXG4gICAgICBPa1R5cGU8UjExPixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjkgfCBSMTAgfCBSMTE+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gICAgUjkgZXh0ZW5kcyBVLFxuICAgIFIxMCBleHRlbmRzIFUsXG4gICAgUjExIGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjQsIFI1LCBSNiwgUjcsIFI4LCBSOSwgUjEwLCBSMTFdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgICAgT2tUeXBlPFIxMT4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOCB8IFI5IHwgUjEwIHwgUjExPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFxuICAgIFIwIGV4dGVuZHMgVSxcbiAgICBSMSBleHRlbmRzIFUsXG4gICAgUjIgZXh0ZW5kcyBVLFxuICAgIFIzIGV4dGVuZHMgVSxcbiAgICBSNCBleHRlbmRzIFUsXG4gICAgUjUgZXh0ZW5kcyBVLFxuICAgIFI2IGV4dGVuZHMgVSxcbiAgICBSNyBleHRlbmRzIFUsXG4gICAgUjggZXh0ZW5kcyBVLFxuICAgIFI5IGV4dGVuZHMgVSxcbiAgICBSMTAgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSNywgUjgsIFI5LCBSMTBdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICAgIE9rVHlwZTxSMTA+LFxuICAgIF0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjUgfCBSNiB8IFI3IHwgUjggfCBSOSB8IFIxMD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICAgIFI4IGV4dGVuZHMgVSxcbiAgICBSOSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOCwgUjldLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICAgIE9rVHlwZTxSNz4sXG4gICAgICBPa1R5cGU8Ujg+LFxuICAgICAgT2tUeXBlPFI5PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNyB8IFI4IHwgUjk+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gICAgUjYgZXh0ZW5kcyBVLFxuICAgIFI3IGV4dGVuZHMgVSxcbiAgICBSOCBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjYsIFI3LCBSOF0sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICAgIE9rVHlwZTxSOD4sXG4gICAgXSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzIHwgUjQgfCBSNSB8IFI2IHwgUjcgfCBSOD5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gICAgUjcgZXh0ZW5kcyBVLFxuICA+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzLCBSNCwgUjUsIFI2LCBSN10sXG4gICk6IFJlc3VsdDxcbiAgICBbXG4gICAgICBPa1R5cGU8UjA+LFxuICAgICAgT2tUeXBlPFIxPixcbiAgICAgIE9rVHlwZTxSMj4sXG4gICAgICBPa1R5cGU8UjM+LFxuICAgICAgT2tUeXBlPFI0PixcbiAgICAgIE9rVHlwZTxSNT4sXG4gICAgICBPa1R5cGU8UjY+LFxuICAgICAgT2tUeXBlPFI3PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjYgfCBSNz5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxcbiAgICBSMCBleHRlbmRzIFUsXG4gICAgUjEgZXh0ZW5kcyBVLFxuICAgIFIyIGV4dGVuZHMgVSxcbiAgICBSMyBleHRlbmRzIFUsXG4gICAgUjQgZXh0ZW5kcyBVLFxuICAgIFI1IGV4dGVuZHMgVSxcbiAgICBSNiBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNSwgUjZdLFxuICApOiBSZXN1bHQ8XG4gICAgW1xuICAgICAgT2tUeXBlPFIwPixcbiAgICAgIE9rVHlwZTxSMT4sXG4gICAgICBPa1R5cGU8UjI+LFxuICAgICAgT2tUeXBlPFIzPixcbiAgICAgIE9rVHlwZTxSND4sXG4gICAgICBPa1R5cGU8UjU+LFxuICAgICAgT2tUeXBlPFI2PixcbiAgICBdLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSNCB8IFI1IHwgUjY+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgICBSNSBleHRlbmRzIFUsXG4gID4oXG4gICAgb2JqOiBbUjAsIFIxLCBSMiwgUjMsIFI0LCBSNV0sXG4gICk6IFJlc3VsdDxcbiAgICBbT2tUeXBlPFIwPiwgT2tUeXBlPFIxPiwgT2tUeXBlPFIyPiwgT2tUeXBlPFIzPiwgT2tUeXBlPFI0PiwgT2tUeXBlPFI1Pl0sXG4gICAgRXJyVHlwZTxSMCB8IFIxIHwgUjIgfCBSMyB8IFI0IHwgUjU+XG4gID47XG4gIGV4cG9ydCBmdW5jdGlvbiBhbGw8XG4gICAgUjAgZXh0ZW5kcyBVLFxuICAgIFIxIGV4dGVuZHMgVSxcbiAgICBSMiBleHRlbmRzIFUsXG4gICAgUjMgZXh0ZW5kcyBVLFxuICAgIFI0IGV4dGVuZHMgVSxcbiAgPihcbiAgICBvYmo6IFtSMCwgUjEsIFIyLCBSMywgUjRdLFxuICApOiBSZXN1bHQ8XG4gICAgW09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj4sIE9rVHlwZTxSMz4sIE9rVHlwZTxSND5dLFxuICAgIEVyclR5cGU8UjAgfCBSMSB8IFIyIHwgUjMgfCBSND5cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFUsIFIxIGV4dGVuZHMgVSwgUjIgZXh0ZW5kcyBVLCBSMyBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjIsIFIzXSxcbiAgKTogUmVzdWx0PFxuICAgIFtPa1R5cGU8UjA+LCBPa1R5cGU8UjE+LCBPa1R5cGU8UjI+LCBPa1R5cGU8UjM+XSxcbiAgICBFcnJUeXBlPFIwIHwgUjEgfCBSMiB8IFIzPlxuICA+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVLCBSMiBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwLCBSMSwgUjJdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT4sIE9rVHlwZTxSMj5dLCBFcnJUeXBlPFIwIHwgUjEgfCBSMj4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFIwIGV4dGVuZHMgVSwgUjEgZXh0ZW5kcyBVPihcbiAgICBvYmo6IFtSMCwgUjFdLFxuICApOiBSZXN1bHQ8W09rVHlwZTxSMD4sIE9rVHlwZTxSMT5dLCBFcnJUeXBlPFIwIHwgUjE+PjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbDxSMCBleHRlbmRzIFU+KFxuICAgIG9iajogW1IwXSxcbiAgKTogUmVzdWx0PFtPa1R5cGU8UjA+XSwgRXJyVHlwZTxSMD4+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsKG9iajogW10pOiBSZXN1bHQ8W10+O1xuICBleHBvcnQgZnVuY3Rpb24gYWxsPFQgZXh0ZW5kcyBVW10gfCBSZWNvcmQ8c3RyaW5nLCBVPj4oXG4gICAgb2JqOiBULFxuICApOiBSZXN1bHQ8XG4gICAgeyBbSyBpbiBrZXlvZiBUXTogVFtLXSBleHRlbmRzIFJlc3VsdDxpbmZlciBJPiA/IEkgOiBuZXZlciB9LFxuICAgIHtcbiAgICAgIFtLIGluIGtleW9mIFRdOiBUW0tdIGV4dGVuZHMgUmVzdWx0PHVua25vd24sIGluZmVyIEU+ID8gRSA6IG5ldmVyO1xuICAgIH1ba2V5b2YgVF1cbiAgPjtcbiAgZXhwb3J0IGZ1bmN0aW9uIGFsbChvYmo6IHVua25vd24pOiB1bmtub3duIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICBjb25zdCByZXNBcnIgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBvYmopIHtcbiAgICAgICAgaWYgKGl0ZW0uaXNFcnIpIHtcbiAgICAgICAgICByZXR1cm4gaXRlbSBhcyB1bmtub3duO1xuICAgICAgICB9XG4gICAgICAgIHJlc0Fyci5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlc3VsdC5vayhyZXNBcnIpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fTtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqIGFzIFJlY29yZDxzdHJpbmcsIFU+KTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICBjb25zdCBpdGVtID0gKG9iaiBhcyBSZWNvcmQ8c3RyaW5nLCBVPilba2V5XTtcbiAgICAgIGlmIChpdGVtLmlzRXJyKSB7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgfVxuICAgICAgcmVzW2tleV0gPSBpdGVtLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gUmVzdWx0Lm9rKHJlcyk7XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgUmVzdWx0PFQsIEUgZXh0ZW5kcyBFcnJvciA9IEVycm9yPiA9XG4gIHwgUmVzdWx0Lk9rPFQsIEU+XG4gIHwgUmVzdWx0LkVycjxULCBFPjtcblxudHlwZSBPa1R5cGU8UiBleHRlbmRzIFJlc3VsdDx1bmtub3duPj4gPSBSIGV4dGVuZHMgUmVzdWx0PGluZmVyIE8+ID8gTyA6IG5ldmVyO1xudHlwZSBFcnJUeXBlPFIgZXh0ZW5kcyBSZXN1bHQ8dW5rbm93bj4+ID0gUiBleHRlbmRzIFJlc3VsdDx1bmtub3duLCBpbmZlciBFPlxuICA/IEVcbiAgOiBuZXZlcjtcbiIsICJpbXBvcnQgeyBBbnlPYmplY3QgfSBmcm9tICd+L3R5cGVzL3NoYXJlZCc7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBSZXN1bHQgfSBmcm9tICcuL3Jlc3VsdCc7XG5cbi8qKlxuICogT3ZlcndyaXRlIEpTIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7dW5rbm93bn0gb2JqZWN0XG4gKiBAcGFyYW0ge092ZXJ3cml0ZU9iamVjdFtdfSB0YXJnZXRzXG4gKiBAcmV0dXJucyBPYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IG92ZXJ3cml0ZU9iamVjdCA9IChcbiAgb2JqZWN0OiB1bmtub3duLFxuICB0YXJnZXRzOiB7XG4gICAgZXhpc3RzS2V5OiBzdHJpbmc7XG4gICAgd2lsbDogeyBrZXk6IHN0cmluZzsgdmFsdWU6IHVua25vd24gfTtcbiAgfVtdLFxuKTogdW5rbm93biA9PiB7XG4gIGNvbnN0IHRoYXQ6IEFueU9iamVjdCA9IG9iamVjdCBhcyBBbnlPYmplY3Q7XG4gIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgZGVsZXRlIHRoYXRbdGFyZ2V0LmV4aXN0c0tleV07XG4gICAgdGhhdFt0YXJnZXQud2lsbC5rZXldID0gdGFyZ2V0LndpbGwudmFsdWU7XG4gIH0pO1xuICByZXR1cm4gdGhhdDtcbn07XG5cbi8qKlxuICogRGlzcGxheSBsb2cgZm9yIHNvbGFuYS1zdWl0ZS1jb25maWcuanNcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGExXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEyXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGEzXG4gKiBAcGFyYW0ge3Vua25vd259IGRhdGE0XG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChcbiAgZGF0YTE6IHVua25vd24sXG4gIGRhdGEyOiB1bmtub3duID0gJycsXG4gIGRhdGEzOiB1bmtub3duID0gJycsXG4gIGRhdGE0OiB1bmtub3duID0gJycsXG4pOiB2b2lkID0+IHtcbiAgaWYgKENvbnN0YW50cy5pc0RlYnVnZ2luZyA9PT0gJ3RydWUnIHx8IHByb2Nlc3MuZW52LkRFQlVHID09PSAndHJ1ZScpIHtcbiAgICBjb25zb2xlLmxvZygnW0RFQlVHXScsIGRhdGExLCBkYXRhMiwgZGF0YTMsIGRhdGE0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBzbGVlcCB0aW1lclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBzZWNcbiAqIEByZXR1cm5zIFByb21pc2U8bnVtYmVyPlxuICovXG5leHBvcnQgY29uc3Qgc2xlZXAgPSBhc3luYyAoc2VjOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgc2VjICogMTAwMCkpO1xufTtcblxuLyoqXG4gKiBOb2RlLmpzIG9yIEJyb3dzZXIganNcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Jyb3dzZXIgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn07XG5cbi8qKlxuICogTm9kZS5qcyBvciBCcm93c2VyIGpzXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMgIT0gbnVsbCAmJlxuICAgIHByb2Nlc3MudmVyc2lvbnMubm9kZSAhPSBudWxsXG4gICk7XG59O1xuXG4vKipcbiAqIGFyZ3VtZW50IGlzIHByb21pc2Ugb3Igb3RoZXJcbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IG9ialxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAob2JqOiB1bmtub3duKTogb2JqIGlzIFByb21pc2U8dW5rbm93bj4gPT4ge1xuICByZXR1cm4gKFxuICAgICEhb2JqICYmXG4gICAgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnIHx8IHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicpICYmXG4gICAgdHlwZW9mIChvYmogYXMgYW55KS50aGVuID09PSAnZnVuY3Rpb24nXG4gICk7XG59O1xuXG4vKipcbiAqIFRyeSBhc3luYyBtb25hZFxuICpcbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PFQsIEU+PlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGFzeW5jYmxvY2s6ICgpID0+IFByb21pc2U8VD4sXG4gIGZpbmFsbHlJbnB1dD86ICgpID0+IHZvaWQsXG4pOiBQcm9taXNlPFJlc3VsdDxULCBFPj47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oYmxvY2s6ICgpID0+IFQpOiBSZXN1bHQ8VCwgRT47XG5leHBvcnQgZnVuY3Rpb24gVHJ5PFQsIEUgZXh0ZW5kcyBFcnJvcj4oXG4gIGlucHV0OiAoKSA9PiBQcm9taXNlPFQ+LFxuICBmaW5hbGx5SW5wdXQ/OiAoKSA9PiB2b2lkLFxuKTogUmVzdWx0PFQsIEVycm9yPiB8IFByb21pc2U8UmVzdWx0PFQsIEVycm9yPj4ge1xuICB0cnkge1xuICAgIGNvbnN0IHYgPSBpbnB1dCgpO1xuICAgIGlmIChpc1Byb21pc2UodikpIHtcbiAgICAgIHJldHVybiB2LnRoZW4oXG4gICAgICAgICh4OiBUKSA9PiBSZXN1bHQub2soeCksXG4gICAgICAgIChlcnI6IEUpID0+IFJlc3VsdC5lcnIoZXJyKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHQub2sodik7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgcmV0dXJuIFJlc3VsdC5lcnIoZSk7XG4gICAgfVxuICAgIHJldHVybiBSZXN1bHQuZXJyKEVycm9yKGUgYXMgc3RyaW5nKSk7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKGZpbmFsbHlJbnB1dCkge1xuICAgICAgZGVidWdMb2coJyMgZmluYWxseSBpbnB1dDonLCBmaW5hbGx5SW5wdXQpO1xuICAgICAgZmluYWxseUlucHV0KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYXJndW1lbnQgaXMgcHJvbWlzZSBvciBvdGhlclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHVuZGVmaW5lZH0gY3JlYXRlZF9hdFxuICogQHJldHVybnMgRGF0ZSB8IHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgPSAoXG4gIGNyZWF0ZWRfYXQ6IG51bWJlciB8IHVuZGVmaW5lZCxcbik6IERhdGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAoY3JlYXRlZF9hdCkge1xuICAgIHJldHVybiBuZXcgRGF0ZShjcmVhdGVkX2F0ICogMTAwMCk7XG4gIH1cbiAgcmV0dXJuO1xufTtcbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIFJlc3VsdCwgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBDb21taXRtZW50LCBDb25uZWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuZXhwb3J0IG5hbWVzcGFjZSBOb2RlIHtcbiAgY29uc3Qgc2V0dGVkID0ge1xuICAgIGNsdXN0ZXJVcmw6ICcnLFxuICAgIGNvbW1pdG1lbnQ6IENvbnN0YW50cy5DT01NSVRNRU5ULFxuICAgIGN1c3RvbUNsdXN0ZXJVcmw6IFtdIGFzIHN0cmluZ1tdLFxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZXRDb25uZWN0aW9uID0gKCk6IENvbm5lY3Rpb24gPT4ge1xuICAgIGRlYnVnTG9nKCcjIFtCZWZvcmVdIHNldHRlZDonLCBzZXR0ZWQpO1xuICAgIGRlYnVnTG9nKFxuICAgICAgJyMgW0JlZm9yZV0gQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmw6JyxcbiAgICAgIENvbnN0YW50cy5jdXN0b21DbHVzdGVyVXJsLFxuICAgICk7XG5cbiAgICBpZiAoc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBzZXR0ZWQuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoQ29uc3RhbnRzLmN1c3RvbUNsdXN0ZXJVcmwubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3VzdG9tIGNsdXN0ZXIgYnkganNvbiBjb25maWdcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjdXN0b21DbHVzdGVyVXJsOiBDb25zdGFudHMuY3VzdG9tQ2x1c3RlclVybCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIXNldHRlZC5jbHVzdGVyVXJsKSB7XG4gICAgICAvLyBkZWZhdWx0IGNsdXN0ZXJcbiAgICAgIHNldHRlZC5jbHVzdGVyVXJsID0gQ29uc3RhbnRzLnN3aXRjaENsdXN0ZXIoe1xuICAgICAgICBjbHVzdGVyOiBDb25zdGFudHMuY3VycmVudENsdXN0ZXIsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNldHRlZC5jb21taXRtZW50KSB7XG4gICAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuICAgIH1cblxuICAgIGRlYnVnTG9nKCcjIFtBZnRlcl0gc2V0dGVkOicsIHNldHRlZCk7XG5cbiAgICByZXR1cm4gbmV3IENvbm5lY3Rpb24oc2V0dGVkLmNsdXN0ZXJVcmwsIHNldHRlZC5jb21taXRtZW50KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgY2hhbmdlQ29ubmVjdGlvbiA9IChwYXJhbToge1xuICAgIGNsdXN0ZXI/OiBzdHJpbmc7XG4gICAgY29tbWl0bWVudD86IENvbW1pdG1lbnQ7XG4gICAgY3VzdG9tQ2x1c3RlclVybD86IHN0cmluZ1tdO1xuICB9KTogdm9pZCA9PiB7XG4gICAgLy8gaW5pdGlhbGl6ZVxuICAgIHNldHRlZC5jbHVzdGVyVXJsID0gJyc7XG4gICAgc2V0dGVkLmN1c3RvbUNsdXN0ZXJVcmwgPSBbXTtcbiAgICBzZXR0ZWQuY29tbWl0bWVudCA9IENvbnN0YW50cy5DT01NSVRNRU5UO1xuXG4gICAgY29uc3QgeyBjbHVzdGVyLCBjb21taXRtZW50LCBjdXN0b21DbHVzdGVyVXJsIH0gPSBwYXJhbTtcbiAgICBpZiAoY29tbWl0bWVudCkge1xuICAgICAgc2V0dGVkLmNvbW1pdG1lbnQgPSBjb21taXRtZW50O1xuICAgICAgZGVidWdMb2coJyMgTm9kZSBjaGFuZ2UgY29tbWl0bWVudDogJywgc2V0dGVkLmNvbW1pdG1lbnQpO1xuICAgIH1cblxuICAgIGlmIChjbHVzdGVyKSB7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY2x1c3RlcjogY2x1c3RlciB9KTtcbiAgICAgIGRlYnVnTG9nKCcjIE5vZGUgY2hhbmdlIGNsdXN0ZXJVcmw6ICcsIHNldHRlZC5jbHVzdGVyVXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY3VzdG9tQ2x1c3RlclVybCkge1xuICAgICAgZGVidWdMb2coJyMgY3VzdG9tQ2x1c3RlclVybDogJywgY3VzdG9tQ2x1c3RlclVybCk7XG4gICAgICBzZXR0ZWQuY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHsgY3VzdG9tQ2x1c3RlclVybCB9KTtcbiAgICAgIHNldHRlZC5jdXN0b21DbHVzdGVyVXJsID0gY3VzdG9tQ2x1c3RlclVybDtcbiAgICAgIGRlYnVnTG9nKFxuICAgICAgICAnIyBOb2RlIGNoYW5nZSBjbHVzdGVyLCBjdXN0b20gY2x1c3RlciB1cmw6ICcsXG4gICAgICAgIHNldHRlZC5jbHVzdGVyVXJsLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNvbmZpcm1lZFNpZyA9IGFzeW5jIChcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgICBjb21taXRtZW50OiBDb21taXRtZW50ID0gQ29uc3RhbnRzLkNPTU1JVE1FTlQsXG4gICkgPT4ge1xuICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcbiAgICBjb25zdCBsYXRlc3RCbG9ja2hhc2ggPSBhd2FpdCBjb25uZWN0aW9uLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgIHJldHVybiBhd2FpdCBjb25uZWN0aW9uXG4gICAgICAuY29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICB7XG4gICAgICAgICAgYmxvY2toYXNoOiBsYXRlc3RCbG9ja2hhc2guYmxvY2toYXNoLFxuICAgICAgICAgIGxhc3RWYWxpZEJsb2NrSGVpZ2h0OiBsYXRlc3RCbG9ja2hhc2gubGFzdFZhbGlkQmxvY2tIZWlnaHQsXG4gICAgICAgICAgc2lnbmF0dXJlLFxuICAgICAgICB9LFxuICAgICAgICBjb21taXRtZW50LFxuICAgICAgKVxuICAgICAgLnRoZW4oUmVzdWx0Lm9rKVxuICAgICAgLmNhdGNoKFJlc3VsdC5lcnIpO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIGFzIEJhdGNoIH0gZnJvbSAnLi9iYXRjaC1zdWJtaXQnO1xuXG5leHBvcnQgY2xhc3MgSW5zdHJ1Y3Rpb24ge1xuICBpbnN0cnVjdGlvbnM6IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb25bXTtcbiAgc2lnbmVyczogS2V5cGFpcltdO1xuICBmZWVQYXllcj86IEtleXBhaXI7XG4gIGRhdGE/OiB1bmtub3duO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHRoaXMuaW5zdHJ1Y3Rpb25zID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuc2lnbmVycyA9IHNpZ25lcnM7XG4gICAgdGhpcy5mZWVQYXllciA9IGZlZVBheWVyO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSkge1xuICAgICAgICB0aHJvdyBFcnJvcignb25seSBJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG5cbiAgICAgIGNvbnN0IGJsb2NraGFzaE9iaiA9IGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldExhdGVzdEJsb2NraGFzaCgpO1xuICAgICAgdHJhbnNhY3Rpb24ubGFzdFZhbGlkQmxvY2tIZWlnaHQgPSBibG9ja2hhc2hPYmoubGFzdFZhbGlkQmxvY2tIZWlnaHQ7XG4gICAgICB0cmFuc2FjdGlvbi5yZWNlbnRCbG9ja2hhc2ggPSBibG9ja2hhc2hPYmouYmxvY2toYXNoO1xuICAgICAgbGV0IGZpbmFsU2lnbmVycyA9IHRoaXMuc2lnbmVycztcblxuICAgICAgaWYgKHRoaXMuZmVlUGF5ZXIpIHtcbiAgICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSB0aGlzLmZlZVBheWVyLnB1YmxpY0tleTtcbiAgICAgICAgZmluYWxTaWduZXJzID0gW3RoaXMuZmVlUGF5ZXIsIC4uLnRoaXMuc2lnbmVyc107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25zLmZvckVhY2goKGluc3QpID0+IHRyYW5zYWN0aW9uLmFkZChpbnN0KSk7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnM6IENvbmZpcm1PcHRpb25zID0ge1xuICAgICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBhd2FpdCBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uKFxuICAgICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgICAgdHJhbnNhY3Rpb24sXG4gICAgICAgIGZpbmFsU2lnbmVycyxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG5cbi8qKlxuICogc2VuVHJhbnNhY3Rpb24oKSBUcmFuc2FjdGlvbkluc3RydWN0aW9uXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+XG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBAdHMtaWdub3JlICovXG5BcnJheS5wcm90b3R5cGUuc3VibWl0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0cnVjdGlvbnM6IEluc3RydWN0aW9uW10gPSBbXTtcbiAgLy8gZG9udCB1c2UgZm9yRWFjaFxuICAvLyBJdCBpcyBub3QgcG9zc2libGUgdG8gc3RvcCB0aGUgcHJvY2VzcyBieSBSRVRVUk4gaW4gdGhlIG1pZGRsZSBvZiB0aGUgcHJvY2Vzcy5cbiAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqIG9mIHRoaXMpIHtcbiAgICAgIGlmIChvYmouaXNFcnIpIHtcbiAgICAgICAgY29uc3QgZXJyb3JNZXNzOiBzdHJpbmcgPSBvYmouZXJyb3IubWVzc2FnZSBhcyBzdHJpbmc7XG4gICAgICAgIHRocm93IEVycm9yKGBbQXJyYXkgaW5kZXggb2YgY2F1Z2h0ICdSZXN1bHQuZXJyJzogJHtpfV0ke2Vycm9yTWVzc31gKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqLmlzT2spIHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zLnB1c2gob2JqLnZhbHVlIGFzIEluc3RydWN0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBJbnN0cnVjdGlvbik7XG4gICAgICB9XG4gICAgICBpKys7XG4gICAgfVxuICAgIHJldHVybiBCYXRjaC5iYXRjaFN1Ym1pdChpbnN0cnVjdGlvbnMpO1xuICB9KTtcbn07XG4iLCAiLy9AaW50ZXJuYWxzXG5leHBvcnQgY29uc3QgTUFYX1JFVFJJRVMgPSAzO1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTUFYX1JFVFJJRVMgfSBmcm9tICcuL2RlZmluZSc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiBhcyBfSW5kZXggfSBmcm9tICcuLyc7XG5cbmV4cG9ydCBjbGFzcyBJbnN0cnVjdGlvbiB7XG4gIHN0YXRpYyBiYXRjaFN1Ym1pdCA9IGFzeW5jIChhcnI6IF9JbmRleFtdKTogUHJvbWlzZTxUcmFuc2FjdGlvblNpZ25hdHVyZT4gPT4ge1xuICAgIGxldCBpID0gMDtcbiAgICBmb3IgKGNvbnN0IGEgb2YgYXJyKSB7XG4gICAgICBpZiAoIWEuaW5zdHJ1Y3Rpb25zICYmICFhLnNpZ25lcnMpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgYG9ubHkgSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSBiYXRjaFN1Ym1pdCgpLlxuICAgICAgICAgICAgSW5kZXg6ICR7aX0sIFNldCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShhKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLmluc3RydWN0aW9ucyk7XG4gICAgY29uc3Qgc2lnbmVycyA9IGFyci5mbGF0TWFwKChhKSA9PiBhLnNpZ25lcnMpO1xuICAgIGNvbnN0IGZlZVBheWVycyA9IGFyci5maWx0ZXIoKGEpID0+IGEuZmVlUGF5ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgbGV0IGZlZVBheWVyID0gc2lnbmVyc1swXTtcbiAgICBpZiAoZmVlUGF5ZXJzLmxlbmd0aCA+IDAgJiYgZmVlUGF5ZXJzWzBdLmZlZVBheWVyKSB7XG4gICAgICBmZWVQYXllciA9IGZlZVBheWVyc1swXS5mZWVQYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvbiA9IG5ldyBUcmFuc2FjdGlvbigpO1xuICAgIGxldCBmaW5hbFNpZ25lcnMgPSBzaWduZXJzO1xuICAgIGlmIChmZWVQYXllcikge1xuICAgICAgdHJhbnNhY3Rpb24uZmVlUGF5ZXIgPSBmZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICBmaW5hbFNpZ25lcnMgPSBbZmVlUGF5ZXIsIC4uLnNpZ25lcnNdO1xuICAgIH1cbiAgICBpbnN0cnVjdGlvbnMubWFwKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICBtYXhSZXRyaWVzOiBNQVhfUkVUUklFUyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGF3YWl0IHNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24oXG4gICAgICBOb2RlLmdldENvbm5lY3Rpb24oKSxcbiAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgZmluYWxTaWduZXJzLFxuICAgICAgb3B0aW9ucyxcbiAgICApO1xuICB9O1xufVxuXG4vKipcbiAqIHNlblRyYW5zYWN0aW9uKCkgVHJhbnNhY3Rpb25JbnN0cnVjdGlvblxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogQHRzLWlnbm9yZSAqL1xuQXJyYXkucHJvdG90eXBlLnN1Ym1pdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgaW5zdHJ1Y3Rpb25zOiBfSW5kZXhbXSA9IFtdO1xuICAvLyBkb250IHVzZSBmb3JFYWNoXG4gIC8vIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBzdG9wIHRoZSBwcm9jZXNzIGJ5IFJFVFVSTiBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwcm9jZXNzLlxuICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgZm9yIChjb25zdCBvYmogb2YgdGhpcykge1xuICAgICAgaWYgKG9iai5pc0Vycikge1xuICAgICAgICBjb25zdCBlcnJvck1lc3M6IHN0cmluZyA9IG9iai5lcnJvci5tZXNzYWdlIGFzIHN0cmluZztcbiAgICAgICAgdGhyb3cgRXJyb3IoYFtBcnJheSBpbmRleCBvZiBjYXVnaHQgJ1Jlc3VsdC5lcnInOiAke2l9XSR7ZXJyb3JNZXNzfWApO1xuICAgICAgfSBlbHNlIGlmIChvYmouaXNPaykge1xuICAgICAgICBpbnN0cnVjdGlvbnMucHVzaChvYmoudmFsdWUgYXMgX0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluc3RydWN0aW9ucy5wdXNoKG9iaiBhcyBfSW5kZXgpO1xuICAgICAgfVxuICAgICAgaSsrO1xuICAgIH1cbiAgICByZXR1cm4gSW5zdHJ1Y3Rpb24uYmF0Y2hTdWJtaXQoaW5zdHJ1Y3Rpb25zKTtcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7XG4gIENvbmZpcm1PcHRpb25zLFxuICBLZXlwYWlyLFxuICBzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvbixcbiAgVHJhbnNhY3Rpb25JbnN0cnVjdGlvbixcbiAgVHJhbnNhY3Rpb25TaWduYXR1cmUsXG59IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5cbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBNQVhfUkVUUklFUyB9IGZyb20gJy4vaW5zdHJ1Y3Rpb24vZGVmaW5lJztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnLi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBjbGFzcyBNaW50SW5zdHJ1Y3Rpb24gZXh0ZW5kcyBJbnN0cnVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGluc3RydWN0aW9uczogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbltdLFxuICAgIHNpZ25lcnM6IEtleXBhaXJbXSxcbiAgICBmZWVQYXllcj86IEtleXBhaXIsXG4gICAgZGF0YT86IHVua25vd24sXG4gICkge1xuICAgIHN1cGVyKGluc3RydWN0aW9ucywgc2lnbmVycywgZmVlUGF5ZXIsIGRhdGEpO1xuICB9XG5cbiAgc3VibWl0ID0gYXN5bmMgKCk6IFByb21pc2U8UmVzdWx0PFRyYW5zYWN0aW9uU2lnbmF0dXJlLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNaW50SW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IE1pbnRJbnN0cnVjdGlvbiBvYmplY3QgdGhhdCBjYW4gdXNlIHRoaXMnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKCk7XG4gICAgICBjb25zdCBibG9ja2hhc2hPYmogPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRMYXRlc3RCbG9ja2hhc2goKTtcbiAgICAgIHRyYW5zYWN0aW9uLmxhc3RWYWxpZEJsb2NrSGVpZ2h0ID0gYmxvY2toYXNoT2JqLmxhc3RWYWxpZEJsb2NrSGVpZ2h0O1xuICAgICAgdHJhbnNhY3Rpb24ucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGxldCBmaW5hbFNpZ25lcnMgPSB0aGlzLnNpZ25lcnM7XG5cbiAgICAgIGlmICh0aGlzLmZlZVBheWVyKSB7XG4gICAgICAgIHRyYW5zYWN0aW9uLmZlZVBheWVyID0gdGhpcy5mZWVQYXllci5wdWJsaWNLZXk7XG4gICAgICAgIGZpbmFsU2lnbmVycyA9IFt0aGlzLmZlZVBheWVyLCAuLi50aGlzLnNpZ25lcnNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0KSA9PiB0cmFuc2FjdGlvbi5hZGQoaW5zdCkpO1xuXG4gICAgICBjb25zdCBvcHRpb25zOiBDb25maXJtT3B0aW9ucyA9IHtcbiAgICAgICAgbWF4UmV0cmllczogTUFYX1JFVFJJRVMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoTm9kZS5nZXRDb25uZWN0aW9uKCkucnBjRW5kcG9pbnQgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5wcmQpIHtcbiAgICAgICAgZGVidWdMb2coJyMgQ2hhbmdlIG1ldGFwbGV4IGNsdXN0ZXIgb24gbWFpbm5ldC1iZXRhJyk7XG4gICAgICAgIE5vZGUuY2hhbmdlQ29ubmVjdGlvbih7IGNsdXN0ZXI6IENvbnN0YW50cy5DbHVzdGVyLnByZE1ldGFwbGV4IH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXdhaXQgc2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbihcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIHRyYW5zYWN0aW9uLFxuICAgICAgICBmaW5hbFNpZ25lcnMsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7XG4gIEtleXBhaXIsXG4gIFB1YmxpY0tleSxcbiAgU3lzdGVtUHJvZ3JhbSxcbiAgU1lTVkFSX1JFTlRfUFVCS0VZLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuXG5pbXBvcnQgeyBibG9iLCBzdHJ1Y3QsIHU4IH0gZnJvbSAnQHNvbGFuYS9idWZmZXItbGF5b3V0JztcbmltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgTXVsdGlzaWdJbnN0cnVjdGlvbiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgY29uc3QgY3JlYXRlTGF5b3V0UHViS2V5ID0gKHByb3BlcnR5OiBzdHJpbmcpOiBhbnkgPT4ge1xuICAgIHJldHVybiBibG9iKDMyLCBwcm9wZXJ0eSk7XG4gIH07XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1hcmd1bWVudCAqL1xuICBleHBvcnQgY29uc3QgTGF5b3V0ID0gc3RydWN0PHtcbiAgICBtOiBudW1iZXI7XG4gICAgbjogbnVtYmVyO1xuICAgIGlzX2luaXRpYWxpemVkOiBudW1iZXI7XG4gICAgc2lnbmVyMTogUHVibGljS2V5O1xuICAgIHNpZ25lcjI6IFB1YmxpY0tleTtcbiAgICBzaWduZXIzOiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNDogUHVibGljS2V5O1xuICAgIHNpZ25lcjU6IFB1YmxpY0tleTtcbiAgICBzaWduZXI2OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyNzogUHVibGljS2V5O1xuICAgIHNpZ25lcjg6IFB1YmxpY0tleTtcbiAgICBzaWduZXI5OiBQdWJsaWNLZXk7XG4gICAgc2lnbmVyMTA6IFB1YmxpY0tleTtcbiAgICBzaWduZXIxMTogUHVibGljS2V5O1xuICB9PihbXG4gICAgdTgoJ20nKSxcbiAgICB1OCgnbicpLFxuICAgIHU4KCdpc19pbml0aWFsaXplZCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNicpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyNycpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOCcpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyOScpLFxuICAgIGNyZWF0ZUxheW91dFB1YktleSgnc2lnbmVyMTAnKSxcbiAgICBjcmVhdGVMYXlvdXRQdWJLZXkoJ3NpZ25lcjExJyksXG4gIF0pO1xuXG4gIGV4cG9ydCBjb25zdCBhY2NvdW50ID0gKFxuICAgIG5ld0FjY291bnQ6IEtleXBhaXIsXG4gICAgZmVlUGF5ZXI6IEtleXBhaXIsXG4gICAgYmFsYW5jZU5lZWRlZDogbnVtYmVyLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICByZXR1cm4gU3lzdGVtUHJvZ3JhbS5jcmVhdGVBY2NvdW50KHtcbiAgICAgIGZyb21QdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgIG5ld0FjY291bnRQdWJrZXk6IG5ld0FjY291bnQucHVibGljS2V5LFxuICAgICAgbGFtcG9ydHM6IGJhbGFuY2VOZWVkZWQsXG4gICAgICBzcGFjZTogTGF5b3V0LnNwYW4sXG4gICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IG11bHRpc2lnID0gKFxuICAgIG06IG51bWJlcixcbiAgICBmZWVQYXllcjogS2V5cGFpcixcbiAgICBzaWduZXJQdWJrZXk6IFB1YmxpY0tleVtdLFxuICApOiBUcmFuc2FjdGlvbkluc3RydWN0aW9uID0+IHtcbiAgICBjb25zdCBrZXlzID0gW1xuICAgICAge1xuICAgICAgICBwdWJrZXk6IGZlZVBheWVyLnB1YmxpY0tleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcHVia2V5OiBTWVNWQVJfUkVOVF9QVUJLRVksXG4gICAgICAgIGlzU2lnbmVyOiBmYWxzZSxcbiAgICAgICAgaXNXcml0YWJsZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF07XG4gICAgc2lnbmVyUHVia2V5LmZvckVhY2goKHB1YmtleSkgPT5cbiAgICAgIGtleXMucHVzaCh7XG4gICAgICAgIHB1YmtleSxcbiAgICAgICAgaXNTaWduZXI6IGZhbHNlLFxuICAgICAgICBpc1dyaXRhYmxlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBjb25zdCBkYXRhTGF5b3V0ID0gc3RydWN0PHsgaW5zdHJ1Y3Rpb246IG51bWJlcjsgbTogbnVtYmVyIH0+KFtcbiAgICAgIHU4KCdpbnN0cnVjdGlvbicpLFxuICAgICAgdTgoJ20nKSxcbiAgICBdKTtcblxuICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YUxheW91dC5zcGFuKTtcblxuICAgIGRhdGFMYXlvdXQuZW5jb2RlKFxuICAgICAge1xuICAgICAgICBpbnN0cnVjdGlvbjogMixcbiAgICAgICAgbSxcbiAgICAgIH0sXG4gICAgICBkYXRhLFxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24oe1xuICAgICAga2V5cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgQ29uZmlybU9wdGlvbnMsXG4gIFRyYW5zYWN0aW9uLFxuICBUcmFuc2FjdGlvblNpZ25hdHVyZSxcbn0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcblxuaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE1BWF9SRVRSSUVTIH0gZnJvbSAnLi9pbnN0cnVjdGlvbi9kZWZpbmUnO1xuXG5leHBvcnQgY2xhc3MgUGFydGlhbFNpZ25JbnN0cnVjdGlvbiB7XG4gIGhleEluc3RydWN0aW9uOiBzdHJpbmc7XG4gIGRhdGE/OiBQdWJrZXk7XG5cbiAgY29uc3RydWN0b3IoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcsIG1pbnQ/OiBQdWJrZXkpIHtcbiAgICB0aGlzLmhleEluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zO1xuICAgIHRoaXMuZGF0YSA9IG1pbnQ7XG4gIH1cblxuICBzdWJtaXQgPSBhc3luYyAoXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VHJhbnNhY3Rpb25TaWduYXR1cmUsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24pKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdvbmx5IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gb2JqZWN0IHRoYXQgY2FuIHVzZSB0aGlzJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlY29kZSA9IEJ1ZmZlci5mcm9tKHRoaXMuaGV4SW5zdHJ1Y3Rpb24sICdoZXgnKTtcbiAgICAgIGNvbnN0IHRyYW5zYWN0aW9uRnJvbUpzb24gPSBUcmFuc2FjdGlvbi5mcm9tKGRlY29kZSk7XG4gICAgICB0cmFuc2FjdGlvbkZyb21Kc29uLnBhcnRpYWxTaWduKGZlZVBheWVyLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgb3B0aW9uczogQ29uZmlybU9wdGlvbnMgPSB7XG4gICAgICAgIG1heFJldHJpZXM6IE1BWF9SRVRSSUVTLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHdpcmVUcmFuc2FjdGlvbiA9IHRyYW5zYWN0aW9uRnJvbUpzb24uc2VyaWFsaXplKCk7XG4gICAgICByZXR1cm4gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuc2VuZFJhd1RyYW5zYWN0aW9uKFxuICAgICAgICB3aXJlVHJhbnNhY3Rpb24sXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXIsIExBTVBPUlRTX1BFUl9TT0wsIFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2cgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBLZXlwYWlyQWNjb3VudCB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBCaWdOdW1iZXIgfSBmcm9tICdiaWdudW1iZXIuanMnO1xuaW1wb3J0IHsgRXhwbG9yZXIgfSBmcm9tICd+L3R5cGVzL2dsb2JhbCc7XG5pbXBvcnQgYnMgZnJvbSAnYnM1OCc7XG5cbi8qKlxuICogQ3JlYXRlIGV4cGxvcmVyIHVybCBmb3IgYWNjb3VudCBhZGRyZXNzIG9yIHNpZ25hdHVyZVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5TdHJpbmcucHJvdG90eXBlLnRvRXhwbG9yZXJVcmwgPSBmdW5jdGlvbiAoXG4gIGV4cGxvcmVyOiBFeHBsb3JlciA9IEV4cGxvcmVyLlNvbHNjYW4sXG4pIHtcbiAgY29uc3QgZW5kUG9pbnRVcmwgPSBOb2RlLmdldENvbm5lY3Rpb24oKS5ycGNFbmRwb2ludDtcbiAgZGVidWdMb2coJyMgdG9FeHBsb3JlclVybCBycGNFbmRwb2ludDonLCBlbmRQb2ludFVybCk7XG4gIGxldCBjbHVzdGVyID0gJyc7XG4gIGlmIChlbmRQb2ludFVybCA9PT0gQ29uc3RhbnRzLkVuZFBvaW50VXJsLnByZCkge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5wcmQ7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC50ZXN0KSB7XG4gICAgY2x1c3RlciA9IENvbnN0YW50cy5DbHVzdGVyLnRlc3Q7XG4gIH0gZWxzZSBpZiAoZW5kUG9pbnRVcmwgPT09IENvbnN0YW50cy5FbmRQb2ludFVybC5kZXYpIHtcbiAgICBjbHVzdGVyID0gQ29uc3RhbnRzLkNsdXN0ZXIuZGV2O1xuICB9IGVsc2Uge1xuICAgIGNsdXN0ZXIgPSBDb25zdGFudHMuQ2x1c3Rlci5kZXY7XG4gIH1cblxuICBjb25zdCBhZGRyZXNzT3JTaWduYXR1cmU6IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKTtcbiAgbGV0IHVybCA9ICcnO1xuICBpZiAoS2V5cGFpckFjY291bnQuaXNQdWJrZXkoYWRkcmVzc09yU2lnbmF0dXJlKSkge1xuICAgIC8vIGFkZHJlc3NcbiAgICBpZiAoZXhwbG9yZXIgPT09IEV4cGxvcmVyLlNvbGFuYUZNKSB7XG4gICAgICB1cmwgPSBgaHR0cHM6Ly9zb2xhbmEuZm0vYWRkcmVzcy8ke2FkZHJlc3NPclNpZ25hdHVyZX0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby9hY2NvdW50LyR7YWRkcmVzc09yU2lnbmF0dXJlfT9jbHVzdGVyPSR7Y2x1c3Rlcn1gO1xuICAgIH1cbiAgICAvLyBzaWduYXR1cmVcbiAgfSBlbHNlIHtcbiAgICAvLyBmb3IgSW52YWxpZCB0eXBlIFwibmV2ZXJcIiBvZiBhZGRyZXNzT3JTaWduYXR1cmUsIHNvIGBhcyBzdHJpbmdgXG4gICAgaWYgKGV4cGxvcmVyID09PSBFeHBsb3Jlci5Tb2xhbmFGTSkge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sYW5hLmZtL3R4LyR7XG4gICAgICAgIGFkZHJlc3NPclNpZ25hdHVyZSBhcyBzdHJpbmdcbiAgICAgIH0/Y2x1c3Rlcj0ke2NsdXN0ZXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsID0gYGh0dHBzOi8vc29sc2Nhbi5pby90eC8ke1xuICAgICAgICBhZGRyZXNzT3JTaWduYXR1cmUgYXMgc3RyaW5nXG4gICAgICB9P2NsdXN0ZXI9JHtjbHVzdGVyfWA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFB1YktleShAc29sYW5hLXN1aXRlKSB0byBQdWJsaWNLZXkoQHNvbGFuYS93ZWIzLmpzKVxuICpcbiAqIEBzZWUge0BsaW5rIHR5cGVzL2dsb2JhbC50c31cbiAqIEByZXR1cm5zIFB1YmxpY0tleVxuICovXG5TdHJpbmcucHJvdG90eXBlLnRvUHVibGljS2V5ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzUHVia2V5KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5QdWJLZXk6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIHJldHVybiBuZXcgUHVibGljS2V5KHRoaXMudG9TdHJpbmcoKSk7XG59O1xuXG4vKipcbiAqIFNlY3JldChAc29sYW5hLXN1aXRlKSB0byBLZXlwYWlyKEBzb2xhbmEvd2ViMy5qcylcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBLZXlwYWlyXG4gKi9cblN0cmluZy5wcm90b3R5cGUudG9LZXlwYWlyID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIUtleXBhaXJBY2NvdW50LmlzU2VjcmV0KHRoaXMudG9TdHJpbmcoKSkpIHtcbiAgICB0aHJvdyBFcnJvcihgTm8gbWF0Y2ggS2V5UGFpci5TZWNyZXQ6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICB9XG4gIGNvbnN0IGRlY29kZWQgPSBicy5kZWNvZGUodGhpcy50b1N0cmluZygpKTtcbiAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbn07XG5cbi8qKlxuICogTEFNUE9SVFMgdG8gU09MXG4gKlxuICogQHNlZSB7QGxpbmsgdHlwZXMvZ2xvYmFsLnRzfVxuICogQHJldHVybnMgbnVtYmVyXG4gKi9cbk51bWJlci5wcm90b3R5cGUudG9Tb2wgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBCaWdOdW1iZXIodGhpcyBhcyBudW1iZXIpXG4gICAgLmRpdihMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcblxuLyoqXG4gKiBTT0wgdG8gTEFNUE9SVFNcbiAqXG4gKiBAc2VlIHtAbGluayB0eXBlcy9nbG9iYWwudHN9XG4gKiBAcmV0dXJucyBudW1iZXJcbiAqL1xuTnVtYmVyLnByb3RvdHlwZS50b0xhbXBvcnRzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gQmlnTnVtYmVyKHRoaXMgYXMgbnVtYmVyKVxuICAgIC50aW1lcyhMQU1QT1JUU19QRVJfU09MKVxuICAgIC50b051bWJlcigpO1xufTtcbiIsICJpbXBvcnQgeyBUcmFuc2FjdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCB7IGRlYnVnTG9nLCBzbGVlcCB9IGZyb20gJ34vc2hhcmVkJztcblxuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuXG5pbXBvcnQge1xuICBBU1NPQ0lBVEVEX1RPS0VOX1BST0dSQU1fSUQsXG4gIGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QWNjb3VudCxcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG4gIFRPS0VOX1BST0dSQU1fSUQsXG4gIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IsXG4gIFRva2VuSW52YWxpZEFjY291bnRPd25lckVycm9yLFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7IEtleXBhaXJBY2NvdW50IH0gZnJvbSAnLi9rZXlwYWlyLWFjY291bnQnO1xuXG4vKipcbiAqIEdldCBBc3NvY2lhdGVkIHRva2VuIEFjY291bnQuXG4gKiBpZiBub3QgY3JlYXRlZCwgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICpcbiAqIEBwYXJhbSB7UHVia2V5fSBtaW50XG4gKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllclxuICogQHBhcmFtIHtib29sZWFufSBhbGxvd093bmVyT2ZmQ3VydmVcbiAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nIHwgSW5zdHJ1Y3Rpb24+XG4gKi9cbmV4cG9ydCBuYW1lc3BhY2UgQXNzb2NpYXRlZEFjY291bnQge1xuICBjb25zdCBSRVRSWV9PVkVSX0xJTUlUID0gMTA7XG4gIGNvbnN0IFJFVFJZX1NMRUVQX1RJTUUgPSAzO1xuICBjb25zdCBnZXQgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTxzdHJpbmcgfCBJbnN0cnVjdGlvbj4gPT4ge1xuICAgIGNvbnN0IHJlcyA9IGF3YWl0IG1ha2VPckNyZWF0ZUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmZWVQYXllciB9KS5wdWJrZXksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgKTtcblxuICAgIGlmICghcmVzLmluc3QpIHtcbiAgICAgIHJldHVybiByZXMudG9rZW5BY2NvdW50O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICBbcmVzLmluc3RdLFxuICAgICAgW10sXG4gICAgICBmZWVQYXllci50b0tleXBhaXIoKSxcbiAgICAgIHJlcy50b2tlbkFjY291bnQsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0cnkgZnVuY3Rpb24gaWYgY3JlYXRlIG5ldyB0b2tlbiBhY2NvdWludFxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcGFyYW0ge1B1YmtleX0gb3duZXJcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyXG4gICAqIEByZXR1cm5zIFByb21pc2U8c3RyaW5nPlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IHJldHJ5R2V0T3JDcmVhdGUgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICBsZXQgY291bnRlciA9IDE7XG4gICAgd2hpbGUgKGNvdW50ZXIgPCBSRVRSWV9PVkVSX0xJTUlUKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbnN0ID0gYXdhaXQgZ2V0KG1pbnQsIG93bmVyLCBmZWVQYXllciwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKGluc3QgJiYgdHlwZW9mIGluc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGVidWdMb2coJyMgYXNzb2NpYXRlZFRva2VuQWNjb3VudDogJywgaW5zdCk7XG4gICAgICAgICAgcmV0dXJuIGluc3Q7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zdCBpbnN0YW5jZW9mIEluc3RydWN0aW9uKSB7XG4gICAgICAgICAgKGF3YWl0IGluc3Quc3VibWl0KCkpLm1hcChcbiAgICAgICAgICAgIGFzeW5jIChvaykgPT4ge1xuICAgICAgICAgICAgICBhd2FpdCBOb2RlLmNvbmZpcm1lZFNpZyhvayk7XG4gICAgICAgICAgICAgIHJldHVybiBpbnN0LmRhdGEgYXMgc3RyaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgZGVidWdMb2coJyMgRXJyb3Igc3VibWl0IHJldHJ5R2V0T3JDcmVhdGU6ICcsIGVycik7XG4gICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBkZWJ1Z0xvZyhgIyByZXRyeTogJHtjb3VudGVyfSBjcmVhdGUgdG9rZW4gYWNjb3VudDogYCwgZSk7XG4gICAgICAgIGRlYnVnTG9nKGAjIG1pbnQ6ICR7bWludH0sIG93bmVyOiAke293bmVyfSwgZmVlUGF5ZXI6ICR7ZmVlUGF5ZXJ9YCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzbGVlcChSRVRSWV9TTEVFUF9USU1FKTtcbiAgICAgIGNvdW50ZXIrKztcbiAgICB9XG4gICAgdGhyb3cgRXJyb3IoYHJldHJ5IGFjdGlvbiBpcyBvdmVyIGxpbWl0ICR7UkVUUllfT1ZFUl9MSU1JVH1gKTtcbiAgfTtcblxuICAvKipcbiAgICogW01haW4gbG9naWNdR2V0IEFzc29jaWF0ZWQgdG9rZW4gQWNjb3VudC5cbiAgICogaWYgbm90IGNyZWF0ZWQsIGNyZWF0ZSBuZXcgdG9rZW4gYWNjb3VpbnRcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG1pbnRcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7UHVia2V5fSBmZWVQYXllclxuICAgKiBAcmV0dXJucyBQcm9taXNlPHN0cmluZz5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBtYWtlT3JDcmVhdGVJbnN0cnVjdGlvbiA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBmZWVQYXllcj86IFB1YmtleSxcbiAgICBhbGxvd093bmVyT2ZmQ3VydmUgPSBmYWxzZSxcbiAgKTogUHJvbWlzZTx7XG4gICAgdG9rZW5BY2NvdW50OiBzdHJpbmc7XG4gICAgaW5zdDogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiB8IHVuZGVmaW5lZDtcbiAgfT4gPT4ge1xuICAgIGNvbnN0IGFzc29jaWF0ZWRUb2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICBhbGxvd093bmVyT2ZmQ3VydmUsXG4gICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICk7XG5cbiAgICBkZWJ1Z0xvZygnIyBhc3NvY2lhdGVkVG9rZW5BY2NvdW50OiAnLCBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIERvbnQgdXNlIFJlc3VsdFxuICAgICAgYXdhaXQgZ2V0QWNjb3VudChcbiAgICAgICAgTm9kZS5nZXRDb25uZWN0aW9uKCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIE5vZGUuZ2V0Q29ubmVjdGlvbigpLmNvbW1pdG1lbnQsXG4gICAgICAgIFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3Q6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGlmIChcbiAgICAgICAgIShlcnJvciBpbnN0YW5jZW9mIFRva2VuQWNjb3VudE5vdEZvdW5kRXJyb3IpICYmXG4gICAgICAgICEoZXJyb3IgaW5zdGFuY2VvZiBUb2tlbkludmFsaWRBY2NvdW50T3duZXJFcnJvcilcbiAgICAgICkge1xuICAgICAgICB0aHJvdyBFcnJvcignVW5leHBlY3RlZCBlcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXllciA9ICFmZWVQYXllciA/IG93bmVyIDogZmVlUGF5ZXI7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHBheWVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIGFzc29jaWF0ZWRUb2tlbkFjY291bnQsXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgQVNTT0NJQVRFRF9UT0tFTl9QUk9HUkFNX0lELFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW5BY2NvdW50OiBhc3NvY2lhdGVkVG9rZW5BY2NvdW50LnRvU3RyaW5nKCksXG4gICAgICAgIGluc3QsXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBLZXlwYWlyLCBQdWJsaWNLZXkgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IGJzIGZyb20gJ2JzNTgnO1xuXG5leHBvcnQgY2xhc3MgS2V5cGFpckFjY291bnQge1xuICBzZWNyZXQ6IFNlY3JldDtcbiAgcHVia2V5OiBQdWJrZXk7XG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7IHB1YmtleT86IFB1YmtleTsgc2VjcmV0OiBTZWNyZXQgfSkge1xuICAgIGlmICghcGFyYW1zLnB1YmtleSkge1xuICAgICAgY29uc3Qga2V5cGFpciA9IHBhcmFtcy5zZWNyZXQudG9LZXlwYWlyKCk7XG4gICAgICB0aGlzLnB1YmtleSA9IGtleXBhaXIucHVibGljS2V5LnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVia2V5ID0gcGFyYW1zLnB1YmtleTtcbiAgICB9XG4gICAgdGhpcy5zZWNyZXQgPSBwYXJhbXMuc2VjcmV0O1xuICB9XG5cbiAgdG9QdWJsaWNLZXkoKTogUHVibGljS2V5IHtcbiAgICByZXR1cm4gbmV3IFB1YmxpY0tleSh0aGlzLnB1YmtleSk7XG4gIH1cblxuICB0b0tleXBhaXIoKTogS2V5cGFpciB7XG4gICAgY29uc3QgZGVjb2RlZCA9IGJzLmRlY29kZSh0aGlzLnNlY3JldCk7XG4gICAgcmV0dXJuIEtleXBhaXIuZnJvbVNlY3JldEtleShkZWNvZGVkKTtcbiAgfVxuXG4gIHN0YXRpYyBpc1B1YmtleSA9ICh2YWx1ZTogc3RyaW5nKTogdmFsdWUgaXMgUHVia2V5ID0+XG4gICAgL15bMC05YS16QS1aXXszMiw0NH0kLy50ZXN0KHZhbHVlKTtcblxuICBzdGF0aWMgaXNTZWNyZXQgPSAodmFsdWU6IHN0cmluZyk6IHZhbHVlIGlzIFNlY3JldCA9PlxuICAgIC9eWzAtOWEtekEtWl17ODcsODh9JC8udGVzdCh2YWx1ZSk7XG5cbiAgc3RhdGljIGNyZWF0ZSA9ICgpOiBLZXlwYWlyQWNjb3VudCA9PiB7XG4gICAgY29uc3Qga2V5cGFpciA9IEtleXBhaXIuZ2VuZXJhdGUoKTtcbiAgICByZXR1cm4gbmV3IEtleXBhaXJBY2NvdW50KHtcbiAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgIH0pO1xuICB9O1xuXG4gIHN0YXRpYyB0b0tleVBhaXIgPSAoa2V5cGFpcjogS2V5cGFpcik6IEtleXBhaXJBY2NvdW50ID0+IHtcbiAgICByZXR1cm4gbmV3IEtleXBhaXJBY2NvdW50KHtcbiAgICAgIHB1YmtleToga2V5cGFpci5wdWJsaWNLZXkudG9TdHJpbmcoKSBhcyBQdWJrZXksXG4gICAgICBzZWNyZXQ6IGJzLmVuY29kZShrZXlwYWlyLnNlY3JldEtleSkgYXMgU2VjcmV0LFxuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFB1YmxpY0tleSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBQUk9HUkFNX0lEIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgUGRhIHtcbiAgZXhwb3J0IGNvbnN0IGdldE1ldGFkYXRhID0gKG1pbnQ6IFB1YmtleSk6IFB1YmxpY0tleSA9PiB7XG4gICAgY29uc3QgW3B1YmxpY0tleV0gPSBQdWJsaWNLZXkuZmluZFByb2dyYW1BZGRyZXNzU3luYyhcbiAgICAgIFtcbiAgICAgICAgQnVmZmVyLmZyb20oJ21ldGFkYXRhJyksXG4gICAgICAgIFBST0dSQU1fSUQudG9CdWZmZXIoKSxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLnRvQnVmZmVyKCksXG4gICAgICBdLFxuICAgICAgUFJPR1JBTV9JRCxcbiAgICApO1xuICAgIHJldHVybiBwdWJsaWNLZXk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdldE1hc3RlckVkaXRpb24gPSAobWludDogUHVia2V5KTogUHVibGljS2V5ID0+IHtcbiAgICBjb25zdCBbcHVibGljS2V5XSA9IFB1YmxpY0tleS5maW5kUHJvZ3JhbUFkZHJlc3NTeW5jKFxuICAgICAgW1xuICAgICAgICBCdWZmZXIuZnJvbSgnbWV0YWRhdGEnKSxcbiAgICAgICAgUFJPR1JBTV9JRC50b0J1ZmZlcigpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCkudG9CdWZmZXIoKSxcbiAgICAgICAgQnVmZmVyLmZyb20oJ2VkaXRpb24nKSxcbiAgICAgIF0sXG4gICAgICBQUk9HUkFNX0lELFxuICAgICk7XG4gICAgcmV0dXJuIHB1YmxpY0tleTtcbiAgfTtcbn1cbiIsICJpbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBPcHRpb24sXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBDb2xsZWN0aW9uIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBPcHRpb248VXNlclNpZGVJbnB1dC5Db2xsZWN0aW9uPiB8IHVuZGVmaW5lZCxcbiAgICApOiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ29sbGVjdGlvbj4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBpbnB1dC50b1B1YmxpY0tleSgpLFxuICAgICAgICB2ZXJpZmllZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LkNvbGxlY3Rpb24+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LkNvbGxlY3Rpb24gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkcmVzczogb3V0cHV0LmtleS50b1N0cmluZygpLFxuICAgICAgICB2ZXJpZmllZDogb3V0cHV0LnZlcmlmaWVkLFxuICAgICAgfTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgSW5mcmFTaWRlSW5wdXQsXG4gIEluZnJhU2lkZU91dHB1dCxcbiAgT3B0aW9uLFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgQ3JlYXRvcnMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IE9wdGlvbjxVc2VyU2lkZUlucHV0LkNyZWF0b3JzW10+IHwgdW5kZWZpbmVkLFxuICAgICk6IE9wdGlvbjxJbmZyYVNpZGVJbnB1dC5DcmVhdG9yc1tdPiA9PiB7XG4gICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGlucHV0Lm1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBsZXQgbW9kaWZ5OiBPcHRpb248SW5mcmFTaWRlSW5wdXQuQ3JlYXRvcnM+ID0gbnVsbDtcbiAgICAgICAgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogT3B0aW9uPEluZnJhU2lkZU91dHB1dC5DcmVhdG9yW10+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LkNyZWF0b3JzW10gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgbW9kaWZ5ID0ge1xuICAgICAgICAgIGFkZHJlc3M6IGRhdGEuYWRkcmVzcy50b1N0cmluZygpLFxuICAgICAgICAgIHNoYXJlOiBkYXRhLnNoYXJlLFxuICAgICAgICAgIHZlcmlmaWVkOiBkYXRhLnZlcmlmaWVkLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbW9kaWZ5O1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBQb3N0VG9rZW5BY2NvdW50IH0gZnJvbSAnfi90eXBlcy90cmFuc2FjdGlvbi1maWx0ZXInO1xuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gJ34vdHlwZXMvaGlzdG9yeSc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBNZW1vIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBJbmZyYVNpZGVPdXRwdXQuTWVtbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgICBvdXRwdXRUcmFuc2Zlcj86IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtYXBwaW5nVG9rZW5BY2NvdW50PzogUG9zdFRva2VuQWNjb3VudFtdLFxuICAgICk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3QgaGlzdG9yeTogSGlzdG9yeSA9IHt9O1xuXG4gICAgICAvLyBjYXNlOiB0cmFuc2ZlciB3aXRoIG1lbW9cbiAgICAgIGlmIChvdXRwdXRUcmFuc2ZlciAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtICE9PSAnJykge1xuICAgICAgICBpZiAobWFwcGluZ1Rva2VuQWNjb3VudCAmJiBvdXRwdXRUcmFuc2Zlci5wcm9ncmFtID09PSAnc3BsLXRva2VuJykge1xuICAgICAgICAgIGNvbnN0IGZvdW5kU291cmNlID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uc291cmNlLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0VHJhbnNmZXIucGFyc2VkLmluZm8uZGVzdGluYXRpb24sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICAgIGZvdW5kRGVzdCAmJiAoaGlzdG9yeS5kZXN0aW5hdGlvbiA9IGZvdW5kRGVzdC5vd25lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGlzdG9yeS5zb3VyY2UgPSBvdXRwdXRUcmFuc2Zlci5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICAgICAgaGlzdG9yeS5kZXN0aW5hdGlvbiA9IG91dHB1dFRyYW5zZmVyLnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGhpc3RvcnkubWVtbyA9IG91dHB1dC5wYXJzZWQ7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgaWYgKFxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zICYmXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTWludCB7XG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk1pbnRUbyxcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIGhpc3RvcnkubWludCA9IG91dHB1dC5wYXJzZWQuaW5mby5taW50O1xuICAgICAgaGlzdG9yeS5taW50QXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnRBdXRob3JpdHk7XG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5hY2NvdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLmFjY291bnQgYXMgc3RyaW5nO1xuICAgICAgaGlzdG9yeS50eXBlID0gb3V0cHV0LnByb2dyYW07XG4gICAgICBoaXN0b3J5LmRhdGVUaW1lID0gY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUobWV0YS5ibG9ja1RpbWUgYXMgbnVtYmVyKTtcbiAgICAgIGhpc3Rvcnkuc2lnID0gbWV0YS50cmFuc2FjdGlvbi5zaWduYXR1cmVzWzBdO1xuICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgICAgaGlzdG9yeS5pbm5lckluc3RydWN0aW9uID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQsIE9wdGlvbiwgVXNlclNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBVc2VzIHtcbiAgICBleHBvcnQgY29uc3QgaW50b1VzZXJTaWRlID0gKFxuICAgICAgb3V0cHV0OiBPcHRpb248SW5mcmFTaWRlT3V0cHV0LlVzZXM+LFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LlVzZXMgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKCFvdXRwdXQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IENvbnZlcnRlciBhcyBfQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVXNlcyB9IGZyb20gJy4vdXNlcyc7XG5pbXBvcnQge1xuICBJbmZyYVNpZGVJbnB1dCxcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuXG5pbXBvcnQgeyBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZSB9IGZyb20gJ34vc2hhcmVkJztcbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUb2tlbk1ldGFkYXRhIHtcbiAgICBleHBvcnQgY29uc3QgaW50b0luZnJhU2lkZSA9IChcbiAgICAgIGlucHV0OiBVc2VyU2lkZUlucHV0LlRva2VuTWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhU2lkZShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IG51bGwsXG4gICAgICAgIHVzZXM6IGlucHV0LnVzZXMgfHwgbnVsbCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5PbmNoYWluQW5kT2ZmY2hhaW4sXG4gICAgICB0b2tlbkFtb3VudDogc3RyaW5nLFxuICAgICk6IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBkZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sKSxcbiAgICAgICAgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICB1cmk6IGRlbGV0ZU51bGxTdHJpbmdzKG91dHB1dC5vbmNoYWluLmRhdGEudXJpKSxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIHVzZXM6IF9Vc2VzLlVzZXMuaW50b1VzZXJTaWRlKG91dHB1dC5vbmNoYWluLnVzZXMpLFxuICAgICAgICBkYXRlVGltZTogY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUob3V0cHV0Lm9mZmNoYWluLmNyZWF0ZWRfYXQpLFxuICAgICAgICBvZmZjaGFpbjogb3V0cHV0Lm9mZmNoYWluLFxuICAgICAgfTtcbiAgICB9O1xuICAgIC8vIGRlbGV0ZSBOVUxMKDB4MDApIHN0cmluZ3MgZnVuY3Rpb25cbiAgICBleHBvcnQgY29uc3QgZGVsZXRlTnVsbFN0cmluZ3MgPSAoc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXDAvZywgJycpO1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgX0NvbGxlY3Rpb24gfSBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9DcmVhdG9ycyB9IGZyb20gJy4vY3JlYXRvcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIF9Vc2VzIH0gZnJvbSAnLi91c2VzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBfVG9rZW4gfSBmcm9tICcuL3Rva2VuLW1ldGFkYXRhJztcbmltcG9ydCB7XG4gIEluZnJhU2lkZUlucHV0LFxuICBJbmZyYVNpZGVPdXRwdXQsXG4gIFVzZXJTaWRlSW5wdXQsXG4gIFVzZXJTaWRlT3V0cHV0LFxufSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5cbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgTmZ0TWV0YWRhdGEge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgICB1cmk6IHN0cmluZyxcbiAgICAgIHNlbGxlckZlZUJhc2lzUG9pbnRzOiBudW1iZXIsXG4gICAgKTogSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogaW5wdXQubmFtZSxcbiAgICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICAgIGNyZWF0b3JzOiBfQ3JlYXRvcnMuQ3JlYXRvcnMuaW50b0luZnJhU2lkZShpbnB1dC5jcmVhdG9ycyksXG4gICAgICAgIGNvbGxlY3Rpb246IF9Db2xsZWN0aW9uLkNvbGxlY3Rpb24uaW50b0luZnJhU2lkZShpbnB1dC5jb2xsZWN0aW9uKSxcbiAgICAgICAgdXNlczogaW5wdXQudXNlcyB8fCBudWxsLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZXhwb3J0IGNvbnN0IGludG9Vc2VyU2lkZSA9IChcbiAgICAgIG91dHB1dDogSW5mcmFTaWRlT3V0cHV0Lk9uY2hhaW5BbmRPZmZjaGFpbixcbiAgICAgIHRva2VuQW1vdW50OiBzdHJpbmcsXG4gICAgKTogVXNlclNpZGVPdXRwdXQuTmZ0TWV0YWRhdGEgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWludDogb3V0cHV0Lm9uY2hhaW4ubWludC50b1N0cmluZygpLFxuICAgICAgICB1cGRhdGVBdXRob3JpdHk6IG91dHB1dC5vbmNoYWluLnVwZGF0ZUF1dGhvcml0eS50b1N0cmluZygpLFxuICAgICAgICByb3lhbHR5OiBvdXRwdXQub25jaGFpbi5kYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzLFxuICAgICAgICBuYW1lOiBfVG9rZW4uVG9rZW5NZXRhZGF0YS5kZWxldGVOdWxsU3RyaW5ncyhvdXRwdXQub25jaGFpbi5kYXRhLm5hbWUpLFxuICAgICAgICBzeW1ib2w6IF9Ub2tlbi5Ub2tlbk1ldGFkYXRhLmRlbGV0ZU51bGxTdHJpbmdzKFxuICAgICAgICAgIG91dHB1dC5vbmNoYWluLmRhdGEuc3ltYm9sLFxuICAgICAgICApLFxuICAgICAgICB0b2tlbkFtb3VudDogdG9rZW5BbW91bnQsXG4gICAgICAgIHVyaTogX1Rva2VuLlRva2VuTWV0YWRhdGEuZGVsZXRlTnVsbFN0cmluZ3Mob3V0cHV0Lm9uY2hhaW4uZGF0YS51cmkpLFxuICAgICAgICBpc011dGFibGU6IG91dHB1dC5vbmNoYWluLmlzTXV0YWJsZSxcbiAgICAgICAgcHJpbWFyeVNhbGVIYXBwZW5lZDogb3V0cHV0Lm9uY2hhaW4ucHJpbWFyeVNhbGVIYXBwZW5lZCxcbiAgICAgICAgY3JlYXRvcnM6IF9DcmVhdG9ycy5DcmVhdG9ycy5pbnRvVXNlclNpZGUob3V0cHV0Lm9uY2hhaW4uZGF0YS5jcmVhdG9ycyksXG4gICAgICAgIGVkaXRpb25Ob25jZTogb3V0cHV0Lm9uY2hhaW4uZWRpdGlvbk5vbmNlLFxuICAgICAgICBjb2xsZWN0aW9uOiBfQ29sbGVjdGlvbi5Db2xsZWN0aW9uLmludG9Vc2VyU2lkZShcbiAgICAgICAgICBvdXRwdXQub25jaGFpbi5jb2xsZWN0aW9uLFxuICAgICAgICApLFxuICAgICAgICB1c2VzOiBfVXNlcy5Vc2VzLmludG9Vc2VyU2lkZShvdXRwdXQub25jaGFpbi51c2VzKSxcbiAgICAgICAgZGF0ZVRpbWU6IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG91dHB1dC5vZmZjaGFpbi5jcmVhdGVkX2F0KSxcbiAgICAgICAgb2ZmY2hhaW46IG91dHB1dC5vZmZjaGFpbixcbiAgICAgIH07XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IG92ZXJ3cml0ZU9iamVjdCwgUmVzdWx0IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0LCBVc2VyU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUsIEZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBDb252ZXJ0ZXIge1xuICBleHBvcnQgbmFtZXNwYWNlIFByb3BlcnRpZXMge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gYXN5bmMgKFxuICAgICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuUHJvcGVydGllcyB8IHVuZGVmaW5lZCxcbiAgICAgIGNhbGxiYWNrRnVuYzogKFxuICAgICAgICBmaWxlUGF0aDogRmlsZVR5cGUsXG4gICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICAgICApID0+IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PixcbiAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICAgICk6IFByb21pc2U8SW5mcmFTaWRlSW5wdXQuUHJvcGVydGllcz4gPT4ge1xuICAgICAgaWYgKCFpbnB1dCB8fCAhaW5wdXQuZmlsZXMpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWxlcyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBpbnB1dC5maWxlcy5tYXAoYXN5bmMgKGZpbGUpID0+IHtcbiAgICAgICAgICBpZiAoIWZpbGUuZmlsZVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgY2FsbGJhY2tGdW5jKGZpbGUuZmlsZVBhdGgsIHN0b3JhZ2VUeXBlLCBmZWVQYXllcik7XG4gICAgICAgICAgaWYgKHJlcy5pc0Vycikge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IocmVzLmVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb3ZlcndyaXRlT2JqZWN0KGZpbGUsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXhpc3RzS2V5OiAnZmlsZVBhdGgnLFxuICAgICAgICAgICAgICB3aWxsOiB7IGtleTogJ3VyaScsIHZhbHVlOiByZXMudmFsdWUgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSk7XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICAgIHJldHVybiB7IC4uLmlucHV0LCBmaWxlcyB9IGFzIEluZnJhU2lkZUlucHV0LlByb3BlcnRpZXM7XG4gICAgfTtcbiAgfVxufVxuIiwgImV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBSb3lhbHR5IHtcbiAgICBleHBvcnQgY29uc3QgVEhSRVNIT0xEID0gMTAwO1xuICAgIGV4cG9ydCBjb25zdCBpbnRvSW5mcmFTaWRlID0gKHBlcmNlbnRhZ2U6IG51bWJlcikgPT4ge1xuICAgICAgcmV0dXJuIHBlcmNlbnRhZ2UgKiBUSFJFU0hPTEQ7XG4gICAgfTtcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEgfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgSW5mcmFTaWRlT3V0cHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUG9zdFRva2VuQWNjb3VudCB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgY29udmVydFRpbWVzdGFtcFRvRGF0ZVRpbWUgfSBmcm9tICd+L3NoYXJlZCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29udmVydGVyIHtcbiAgZXhwb3J0IG5hbWVzcGFjZSBUcmFuc2ZlckNoZWNrZWQge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlckNoZWNrZWQsXG4gICAgICBtZXRhOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhLFxuICAgICAgbWFwcGluZ1Rva2VuQWNjb3VudD86IFBvc3RUb2tlbkFjY291bnRbXSxcbiAgICApOiBIaXN0b3J5IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IGhpc3Rvcnk6IEhpc3RvcnkgPSB7fTtcblxuICAgICAgaWYgKG1hcHBpbmdUb2tlbkFjY291bnQpIHtcbiAgICAgICAgY29uc3QgZm91bmRTb3VyY2UgPSBtYXBwaW5nVG9rZW5BY2NvdW50LmZpbmQoXG4gICAgICAgICAgKG0pID0+IG0uYWNjb3VudCA9PT0gb3V0cHV0LnBhcnNlZC5pbmZvLnNvdXJjZSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm91bmREZXN0ID0gbWFwcGluZ1Rva2VuQWNjb3VudC5maW5kKFxuICAgICAgICAgIChtKSA9PiBtLmFjY291bnQgPT09IG91dHB1dC5wYXJzZWQuaW5mby5kZXN0aW5hdGlvbixcbiAgICAgICAgKTtcbiAgICAgICAgZm91bmRTb3VyY2UgJiYgKGhpc3Rvcnkuc291cmNlID0gZm91bmRTb3VyY2Uub3duZXIpO1xuICAgICAgICBmb3VuZERlc3QgJiYgKGhpc3RvcnkuZGVzdGluYXRpb24gPSBmb3VuZERlc3Qub3duZXIpO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnRva2VuQW1vdW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLnRva2VuQW1vdW50O1xuICAgICAgaGlzdG9yeS5taW50ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm1pbnQ7XG4gICAgICBoaXN0b3J5Lm11bHRpc2lnQXV0aG9yaXR5ID0gb3V0cHV0LnBhcnNlZC5pbmZvLm11bHRpc2lnQXV0aG9yaXR5O1xuICAgICAgaGlzdG9yeS5zaWduZXJzID0gb3V0cHV0LnBhcnNlZC5pbmZvLnNpZ25lcnM7XG4gICAgICBoaXN0b3J5LnR5cGUgPSBvdXRwdXQucHJvZ3JhbTtcbiAgICAgIGhpc3RvcnkuZGF0ZVRpbWUgPSBjb252ZXJ0VGltZXN0YW1wVG9EYXRlVGltZShtZXRhLmJsb2NrVGltZSBhcyBudW1iZXIpO1xuICAgICAgaGlzdG9yeS5zaWcgPSBtZXRhLnRyYW5zYWN0aW9uLnNpZ25hdHVyZXNbMF07XG4gICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSBmYWxzZTtcblxuICAgICAgLy8gaW5uZXIgaW5zdHJ1Y3Rpb25zXG4gICAgICBpZiAoXG4gICAgICAgIG1ldGEubWV0YT8uaW5uZXJJbnN0cnVjdGlvbnMgJiZcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucy5sZW5ndGggIT09IDBcbiAgICAgICkge1xuICAgICAgICBoaXN0b3J5LmlubmVySW5zdHJ1Y3Rpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGlzdG9yeTtcbiAgICB9O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBJbmZyYVNpZGVPdXRwdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIENvbnZlcnRlciB7XG4gIGV4cG9ydCBuYW1lc3BhY2UgVHJhbnNmZXIge1xuICAgIGV4cG9ydCBjb25zdCBpbnRvVXNlclNpZGUgPSAoXG4gICAgICBvdXRwdXQ6IEluZnJhU2lkZU91dHB1dC5UcmFuc2ZlcixcbiAgICAgIG1ldGE6IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICAgKTogSGlzdG9yeSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCBoaXN0b3J5OiBIaXN0b3J5ID0ge307XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gY2hlY2tcbiAgICAgIGlmICghb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uIHx8ICFvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBoaXN0b3J5LnNvdXJjZSA9IG91dHB1dC5wYXJzZWQuaW5mby5zb3VyY2U7XG4gICAgICBoaXN0b3J5LmRlc3RpbmF0aW9uID0gb3V0cHV0LnBhcnNlZC5pbmZvLmRlc3RpbmF0aW9uO1xuICAgICAgaGlzdG9yeS5zb2wgPSBvdXRwdXQucGFyc2VkLmluZm8ubGFtcG9ydHM/LnRvU29sKCkudG9TdHJpbmcoKTtcbiAgICAgIGhpc3RvcnkudHlwZSA9IG91dHB1dC5wcm9ncmFtO1xuICAgICAgaGlzdG9yeS5kYXRlVGltZSA9IGNvbnZlcnRUaW1lc3RhbXBUb0RhdGVUaW1lKG1ldGEuYmxvY2tUaW1lIGFzIG51bWJlcik7XG4gICAgICBoaXN0b3J5LnNpZyA9IG1ldGEudHJhbnNhY3Rpb24uc2lnbmF0dXJlc1swXTtcbiAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAvLyBpbm5lciBpbnN0cnVjdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgbWV0YS5tZXRhPy5pbm5lckluc3RydWN0aW9ucyAmJlxuICAgICAgICBtZXRhLm1ldGE/LmlubmVySW5zdHJ1Y3Rpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGhpc3RvcnkuaW5uZXJJbnN0cnVjdGlvbiA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ29sbGVjdGlvbiB9IGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgQ3JlYXRvcnMgfSBmcm9tICcuL2NyZWF0b3JzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNZW1vIH0gZnJvbSAnLi9tZW1vJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBNaW50IH0gZnJvbSAnLi9taW50JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBOZnRNZXRhZGF0YSB9IGZyb20gJy4vbmZ0LW1ldGFkYXRhJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBQcm9wZXJ0aWVzIH0gZnJvbSAnLi9wcm9wZXJ0aWVzJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBSb3lhbHR5IH0gZnJvbSAnLi9yb3lhbHR5JztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUb2tlbk1ldGFkYXRhIH0gZnJvbSAnLi90b2tlbi1tZXRhZGF0YSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgYXMgVHJhbnNmZXJDaGVja2VkIH0gZnJvbSAnLi90cmFuc2Zlci1jaGVja2VkJztcbmltcG9ydCB7IENvbnZlcnRlciBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIGFzIFVzZXMgfSBmcm9tICcuL3VzZXMnO1xuXG5leHBvcnQgY29uc3QgQ29udmVydGVyID0ge1xuICAuLi5Db2xsZWN0aW9uLFxuICAuLi5DcmVhdG9ycyxcbiAgLi4uTWVtbyxcbiAgLi4uTWludCxcbiAgLi4uTmZ0TWV0YWRhdGEsXG4gIC4uLlByb3BlcnRpZXMsXG4gIC4uLlJveWFsdHksXG4gIC4uLlRva2VuTWV0YWRhdGEsXG4gIC4uLlRyYW5zZmVyQ2hlY2tlZCxcbiAgLi4uVHJhbnNmZXIsXG4gIC4uLlVzZXMsXG59O1xuIiwgImltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgSW5mcmFTaWRlSW5wdXQsIFVzZXJTaWRlSW5wdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBEZXRhaWxzLCBMaW1pdCB9IGZyb20gJ34vdHlwZXMvdmFsaWRhdG9yJztcblxuZXhwb3J0IG5hbWVzcGFjZSBWYWxpZGF0b3Ige1xuICBleHBvcnQgbmFtZXNwYWNlIE1lc3NhZ2Uge1xuICAgIGV4cG9ydCBjb25zdCBTVUNDRVNTID0gJ3N1Y2Nlc3MnO1xuICAgIGV4cG9ydCBjb25zdCBTTUFMTF9OVU1CRVIgPSAndG9vIHNtYWxsJztcbiAgICBleHBvcnQgY29uc3QgQklHX05VTUJFUiA9ICd0b28gYmlnJztcbiAgICBleHBvcnQgY29uc3QgTE9OR19MRU5HVEggPSAndG9vIGxvbmcnO1xuICAgIGV4cG9ydCBjb25zdCBFTVBUWSA9ICdpbnZhbGlkIGVtcHR5IHZhbHVlJztcbiAgICBleHBvcnQgY29uc3QgSU5WQUxJRF9VUkwgPSAnaW52YWxpZCB1cmwnO1xuICAgIGV4cG9ydCBjb25zdCBPTkxZX05PREVfSlMgPSAnYHN0cmluZ2AgdHlwZSBpcyBvbmx5IE5vZGUuanMnO1xuICB9XG5cbiAgZXhwb3J0IGNvbnN0IE5BTUVfTEVOR1RIID0gMzI7XG4gIGV4cG9ydCBjb25zdCBTWU1CT0xfTEVOR1RIID0gMTA7XG4gIGV4cG9ydCBjb25zdCBVUkxfTEVOR1RIID0gMjAwO1xuICBleHBvcnQgY29uc3QgUk9ZQUxUWV9NQVggPSAxMDA7XG4gIGV4cG9ydCBjb25zdCBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVggPSAxMDAwMDtcbiAgZXhwb3J0IGNvbnN0IFJPWUFMVFlfTUlOID0gMDtcblxuICBleHBvcnQgY29uc3QgaXNSb3lhbHR5ID0gKFxuICAgIHJveWFsdHk6IG51bWJlcixcbiAgKTogUmVzdWx0PHN0cmluZywgVmFsaWRhdG9yRXJyb3I+ID0+IHtcbiAgICByZXR1cm4gVHJ5KCgpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9ICdyb3lhbHR5JztcbiAgICAgIGlmIChyb3lhbHR5ICE9PSAwICYmICFyb3lhbHR5KSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgcm95YWx0eSk7XG4gICAgICB9XG4gICAgICBpZiAocm95YWx0eSA8IFJPWUFMVFlfTUlOKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5TTUFMTF9OVU1CRVIsIHJveWFsdHksIHtcbiAgICAgICAgICB0aHJlc2hvbGQ6IFJPWUFMVFlfTUlOLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ3VuZGVyTWluJyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJveWFsdHkgPiBST1lBTFRZX01BWCkge1xuICAgICAgICB0aHJvdyBjcmVhdGVFcnJvcihrZXksIE1lc3NhZ2UuQklHX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNTZWxsZXJGZWVCYXNpc1BvaW50cyA9IChcbiAgICByb3lhbHR5OiBudW1iZXIsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc2VsbGVyRmVlQmFzaXNQb2ludHMvc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMnO1xuICAgICAgaWYgKHJveWFsdHkgIT09IDAgJiYgIXJveWFsdHkpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCByb3lhbHR5KTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3lhbHR5IDwgUk9ZQUxUWV9NSU4pIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLlNNQUxMX05VTUJFUiwgcm95YWx0eSwge1xuICAgICAgICAgIHRocmVzaG9sZDogUk9ZQUxUWV9NSU4sXG4gICAgICAgICAgY29uZGl0aW9uOiAndW5kZXJNaW4nLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocm95YWx0eSA+IFJPWUFMVFlfTUFYICogQ29udmVydGVyLlJveWFsdHkuVEhSRVNIT0xEKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5CSUdfTlVNQkVSLCByb3lhbHR5LCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTRUxMRVJfRkVFX0JBU0lTX1BPSU5UU19NQVgsXG4gICAgICAgICAgY29uZGl0aW9uOiAnb3Zlck1heCcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE1lc3NhZ2UuU1VDQ0VTUztcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNOYW1lID0gKG5hbWU6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnbmFtZSc7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkVNUFRZLCBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKG5hbWUpID4gTkFNRV9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBuYW1lLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBOQU1FX0xFTkdUSCxcbiAgICAgICAgICBjb25kaXRpb246ICdvdmVyTWF4JyxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1N5bWJvbCA9IChzeW1ib2w6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSAnc3ltYm9sJztcbiAgICAgIGlmICghc3ltYm9sKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgc3ltYm9sKTtcbiAgICAgIH1cbiAgICAgIGlmIChieXRlTGVuZ3RoKHN5bWJvbCkgPiBTWU1CT0xfTEVOR1RIKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5MT05HX0xFTkdUSCwgc3ltYm9sLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBTWU1CT0xfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBNZXNzYWdlLlNVQ0NFU1M7XG4gICAgfSk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzSW1hZ2VVcmwgPSAoaW1hZ2U6IHN0cmluZyk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PlxuICAgIGlzVXJpT3JJbWFnZShpbWFnZSwgJ2ltYWdlJyk7XG5cbiAgZXhwb3J0IGNvbnN0IGNoZWNrQWxsID0gPFxuICAgIFQgZXh0ZW5kcyBQaWNrTmZ0U3RvcmFnZSB8IFBpY2tOZnRTdG9yYWdlTWV0YXBsZXggfCBQaWNrTWV0YXBsZXgsXG4gID4oXG4gICAgbWV0YWRhdGE6IFQsXG4gICk6IFJlc3VsdDxzdHJpbmcsIFZhbGlkYXRvckVycm9yPiA9PiB7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpO1xuICAgICAgY29uc3QgcmVzdWx0czogRGV0YWlsc1tdID0gW107XG4gICAgICBrZXlzLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCByZXMhOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj47XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSAmJiBtZXRhZGF0YS5pbWFnZSkge1xuICAgICAgICAgICAgICByZXMgPSBpc0ltYWdlVXJsKG1ldGFkYXRhLmltYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JveWFsdHknOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1JveWFsdHkobWV0YWRhdGEucm95YWx0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cyc6XG4gICAgICAgICAgICBpZiAoa2V5IGluIG1ldGFkYXRhICYmIG1ldGFkYXRhLnNlbGxlcl9mZWVfYmFzaXNfcG9pbnRzKSB7XG4gICAgICAgICAgICAgIHJlcyA9IGlzU2VsbGVyRmVlQmFzaXNQb2ludHMobWV0YWRhdGEuc2VsbGVyX2ZlZV9iYXNpc19wb2ludHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VsbGVyRmVlQmFzaXNQb2ludHMnOlxuICAgICAgICAgICAgaWYgKGtleSBpbiBtZXRhZGF0YSkge1xuICAgICAgICAgICAgICByZXMgPSBpc1NlbGxlckZlZUJhc2lzUG9pbnRzKG1ldGFkYXRhLnNlbGxlckZlZUJhc2lzUG9pbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLm5hbWUpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNOYW1lKG1ldGFkYXRhLm5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc3ltYm9sJzpcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5zeW1ib2wpIHtcbiAgICAgICAgICAgICAgcmVzID0gaXNTeW1ib2wobWV0YWRhdGEuc3ltYm9sKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXMgJiYgcmVzLmlzRXJyKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLnJlcy5lcnJvci5kZXRhaWxzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdDYXVnaHQgaW4gdGhlIHZhbGlkYXRpb24gZXJyb3JzLiBzZWUgaW5mb3JtYXRpb24gZS5nOiBlcnI8VmFsaWRhdG9yRXJyb3I+LmRldGFpbHMnO1xuICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdG9yRXJyb3IobWVzc2FnZSwgcmVzdWx0cyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xuXG4gIHR5cGUgUGlja05mdFN0b3JhZ2UgPSBQaWNrPFxuICAgIEluZnJhU2lkZUlucHV0Lk9mZmNoYWluLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ2ltYWdlJyB8ICdzZWxsZXJfZmVlX2Jhc2lzX3BvaW50cydcbiAgPjtcbiAgdHlwZSBQaWNrTmZ0U3RvcmFnZU1ldGFwbGV4ID0gUGljazxcbiAgICBVc2VyU2lkZUlucHV0Lk5mdE1ldGFkYXRhLFxuICAgICduYW1lJyB8ICdzeW1ib2wnIHwgJ3JveWFsdHknIHwgJ2ZpbGVQYXRoJ1xuICA+O1xuICB0eXBlIFBpY2tNZXRhcGxleCA9IFBpY2s8XG4gICAgSW5mcmFTaWRlSW5wdXQuTWV0YXBsZXhEYXRhVjIsXG4gICAgJ25hbWUnIHwgJ3N5bWJvbCcgfCAndXJpJyB8ICdzZWxsZXJGZWVCYXNpc1BvaW50cydcbiAgPjtcblxuICBjb25zdCBieXRlTGVuZ3RoID0gKHZhbHVlOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIGNvbnN0IHRleHQgPSBuZXcgVGV4dEVuY29kZXIoKTtcbiAgICByZXR1cm4gdGV4dC5lbmNvZGUodmFsdWUpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVFcnJvciA9IChcbiAgICBrZXk6IHN0cmluZyxcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgYWN0dWFsOiBzdHJpbmcgfCBudW1iZXIsXG4gICAgbGltaXQ/OiBMaW1pdCxcbiAgKTogVmFsaWRhdG9yRXJyb3IgPT4ge1xuICAgIGxldCBlcnJvcjogVmFsaWRhdG9yRXJyb3I7XG4gICAgaWYgKGxpbWl0KSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCwgbGltaXQgfV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JFcnJvcihtZXNzYWdlLCBbeyBrZXksIG1lc3NhZ2UsIGFjdHVhbCB9XSk7XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfTtcblxuICBjb25zdCBpc1VyaU9ySW1hZ2UgPSAoXG4gICAgaW1hZ2VPclVyaTogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICApOiBSZXN1bHQ8c3RyaW5nLCBWYWxpZGF0b3JFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgaWYgKCFpbWFnZU9yVXJpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5FTVBUWSwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICBpZiAoYnl0ZUxlbmd0aChpbWFnZU9yVXJpKSA+IFVSTF9MRU5HVEgpIHtcbiAgICAgICAgdGhyb3cgY3JlYXRlRXJyb3Ioa2V5LCBNZXNzYWdlLkxPTkdfTEVOR1RILCBpbWFnZU9yVXJpLCB7XG4gICAgICAgICAgdGhyZXNob2xkOiBVUkxfTEVOR1RILFxuICAgICAgICAgIGNvbmRpdGlvbjogJ292ZXJNYXgnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICghL2h0dHBzPzpcXC9cXC9bLV8uIX4qXFxcXCgpYS16QS1aMC05Oz86Jj0rLCUjXSsvZy50ZXN0KGltYWdlT3JVcmkpKSB7XG4gICAgICAgIHRocm93IGNyZWF0ZUVycm9yKGtleSwgTWVzc2FnZS5JTlZBTElEX1VSTCwgaW1hZ2VPclVyaSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gTWVzc2FnZS5TVUNDRVNTO1xuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGRldGFpbHM6IERldGFpbHNbXTtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBkZXRhaWxzOiBEZXRhaWxzW10pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xuICB9XG59XG4iLCAiZXhwb3J0IGVudW0gRmlsdGVyVHlwZSB7XG4gIE1lbW8gPSAnbWVtbycsXG4gIE1pbnQgPSAnbWludCcsXG4gIE9ubHlNZW1vID0gJ29ubHktbWVtbycsXG4gIFRyYW5zZmVyID0gJ3RyYW5zZmVyJyxcbn1cblxuZXhwb3J0IGVudW0gTW9kdWxlTmFtZSB7XG4gIFNvbE5hdGl2ZSA9ICdzeXN0ZW0nLFxuICBTcGxUb2tlbiA9ICdzcGwtdG9rZW4nLFxufVxuXG5leHBvcnQgY29uc3QgRmlsdGVyT3B0aW9ucyA9IHtcbiAgVHJhbnNmZXI6IHtcbiAgICBwcm9ncmFtOiBbJ3N5c3RlbScsICdzcGwtdG9rZW4nXSxcbiAgICBhY3Rpb246IFsndHJhbnNmZXInLCAndHJhbnNmZXJDaGVja2VkJ10sXG4gIH0sXG4gIE1lbW86IHtcbiAgICBwcm9ncmFtOiBbJ3NwbC1tZW1vJ10sXG4gICAgYWN0aW9uOiBbJyonXSxcbiAgfSxcbiAgTWludDoge1xuICAgIHByb2dyYW06IFsnc3BsLXRva2VuJ10sXG4gICAgYWN0aW9uOiBbJ21pbnRUbycsICdtaW50VG9DaGVja2VkJ10sXG4gIH0sXG59O1xuXG5leHBvcnQgdHlwZSBQb3N0VG9rZW5BY2NvdW50ID0ge1xuICBhY2NvdW50OiBzdHJpbmc7XG4gIG93bmVyOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBXaXRoTWVtbyA9IHtcbiAgc2lnOiBzdHJpbmdbXTtcbiAgbWVtbzogc3RyaW5nO1xufTtcbiIsICIvL0BpbnRlcm5hbFxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbW91bnQgPSAoXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gYW1vdW50ICogMTAgKiogbWludERlY2ltYWw7XG4gIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgY3JlYXRlQnVybkNoZWNrZWRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdGUgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGJ1cm4gPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYnVybkFtb3VudDogbnVtYmVyLFxuICAgIHRva2VuRGVjaW1hbHM6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUmVzdWx0PEluc3RydWN0aW9uLCBFcnJvcj4gPT4ge1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIudG9LZXlwYWlyKCkgOiBzaWduZXJzWzBdLnRvS2V5cGFpcigpO1xuICAgICAgY29uc3Qga2V5cGFpcnMgPSBzaWduZXJzLm1hcCgocykgPT4gcy50b0tleXBhaXIoKSk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVCdXJuQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgX0NhbGN1bGF0ZS5jYWxjdWxhdGVBbW91bnQoYnVybkFtb3VudCwgdG9rZW5EZWNpbWFscyksXG4gICAgICAgIHRva2VuRGVjaW1hbHMsXG4gICAgICAgIGtleXBhaXJzLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihbaW5zdF0sIGtleXBhaXJzLCBwYXllcik7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuLi8uLi9zdG9yYWdlJztcbmltcG9ydCB7IGJpZ251bSwgQ29tbW9uIH0gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCB7IFB1YmtleSB9IGZyb20gJy4uLy4uL2FjY291bnQnO1xuaW1wb3J0IHsgRmlsZVR5cGUgfSBmcm9tICcuLi8uLi9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBVc2VyU2lkZUlucHV0IHtcbiAgZXhwb3J0IHR5cGUgQ29sbGVjdGlvbiA9IFB1YmtleTtcblxuICBleHBvcnQgdHlwZSBDcmVhdG9ycyA9IHtcbiAgICBhZGRyZXNzOiBQdWJrZXk7XG4gICAgc2hhcmU6IG51bWJlcjtcbiAgICB2ZXJpZmllZDogYm9vbGVhbjtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBQcm9wZXJ0aWVzID0gQ29tbW9uLlByb3BlcnRpZXM7XG5cbiAgZXhwb3J0IGVudW0gVG9rZW5TdGFuZGFyZCB7XG4gICAgTm9uRnVuZ2libGUgPSAwLFxuICAgIEZ1bmdpYmxlQXNzZXQgPSAxLFxuICAgIEZ1bmdpYmxlID0gMixcbiAgICBOb25GdW5naWJsZUVkaXRpb24gPSAzLFxuICAgIFByb2dyYW1tYWJsZU5vbkZ1bmdpYmxlID0gNCxcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIE5mdE1ldGFkYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzeW1ib2w6IHN0cmluZztcbiAgICByb3lhbHR5OiBudW1iZXI7XG4gICAgc3RvcmFnZVR5cGU/OiBTdG9yYWdlVHlwZTtcbiAgICBmaWxlUGF0aD86IEZpbGVUeXBlO1xuICAgIHVyaT86IHN0cmluZztcbiAgICBpc011dGFibGU/OiBib29sZWFuO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIGV4dGVybmFsX3VybD86IHN0cmluZztcbiAgICBhdHRyaWJ1dGVzPzogQ29tbW9uLkF0dHJpYnV0ZVtdO1xuICAgIHByb3BlcnRpZXM/OiBQcm9wZXJ0aWVzO1xuICAgIG1heFN1cHBseT86IGJpZ251bTtcbiAgICBjcmVhdG9ycz86IENyZWF0b3JzW107XG4gICAgdXNlcz86IENvbW1vbi5Vc2VzO1xuICAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uO1xuICAgIG9wdGlvbnM/OiBDb21tb24uT3B0aW9ucztcbiAgfTtcblxuICBleHBvcnQgdHlwZSBUb2tlbk1ldGFkYXRhID0ge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzeW1ib2w6IHN0cmluZztcbiAgICBmaWxlUGF0aD86IEZpbGVUeXBlO1xuICAgIHVyaT86IHN0cmluZztcbiAgICBzdG9yYWdlVHlwZT86IFN0b3JhZ2VUeXBlO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHJveWFsdHk/OiBudW1iZXI7XG4gICAgdXNlcz86IENvbW1vbi5Vc2VzO1xuICAgIGNyZWF0b3JzPzogQ3JlYXRvcnNbXTtcbiAgICBhdHRyaWJ1dGVzPzogQ29tbW9uLkF0dHJpYnV0ZVtdO1xuICAgIG9wdGlvbnM/OiBDb21tb24uT3B0aW9ucztcbiAgfTtcbn1cbiIsICJpbXBvcnQgQk4gZnJvbSAnYm4uanMnO1xuaW1wb3J0IHtGaWxlVHlwZX0gZnJvbSAnLi4vc3RvcmFnZSc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbjxUPiA9IFQgfCBudWxsO1xuZXhwb3J0IHR5cGUgYmlnbnVtID0gbnVtYmVyIHwgQk47XG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29tbW9uIHtcbiAgZXhwb3J0IHR5cGUgUHJvcGVydGllcyA9IHtcbiAgICBjcmVhdG9ycz86IHtcbiAgICAgIGFkZHJlc3M/OiBzdHJpbmc7XG4gICAgICBzaGFyZT86IG51bWJlcjtcbiAgICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gICAgfVtdO1xuICAgIGZpbGVzPzoge1xuICAgICAgdHlwZT86IHN0cmluZztcbiAgICAgIGZpbGVQYXRoPzogRmlsZVR5cGU7XG4gICAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICAgIH1bXTtcbiAgICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xuICB9O1xuXG4gIGV4cG9ydCB0eXBlIEF0dHJpYnV0ZSA9IHtcbiAgICB0cmFpdF90eXBlPzogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XG4gIH07XG5cbiAgZXhwb3J0IGVudW0gVXNlTWV0aG9kIHtcbiAgICBCdXJuID0gMCxcbiAgICBNdWx0aXBsZSA9IDEsXG4gICAgU2luZ2xlID0gMixcbiAgfVxuXG4gIGV4cG9ydCB0eXBlIFVzZXMgPSB7XG4gICAgdXNlTWV0aG9kOiBVc2VNZXRob2Q7XG4gICAgcmVtYWluaW5nOiBiaWdudW07XG4gICAgdG90YWw6IGJpZ251bTtcbiAgfTtcblxuICBleHBvcnQgdHlwZSBPcHRpb25zID0geyBba2V5OiBzdHJpbmddOiB1bmtub3duIH07XG59XG4iLCAiaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBQdWJrZXkgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNvcnRhYmxlIH0gZnJvbSAnfi90eXBlcy9maW5kJztcbmltcG9ydCB7IE9uRXJyLCBPbk9rIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHtcbiAgSW5mcmFTaWRlT3V0cHV0LFxuICBVc2VyU2lkZUlucHV0LFxuICBVc2VyU2lkZU91dHB1dCxcbn0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnfi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgUGRhIH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE1ldGFkYXRhIH0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgVE9LRU5fUFJPR1JBTV9JRCB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFBhcnNlZEFjY291bnREYXRhIH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJztcbmltcG9ydCBmZXRjaCBmcm9tICdjcm9zcy1mZXRjaCc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3BsVG9rZW4ge1xuICBjb25zdCBVTkFCTEVfRVJST1JfUkVHRVggPSAvVW5hYmxlIHRvIGZpbmQgTWV0YWRhdGEgYWNjb3VudC87XG5cbiAgLy8gU29ydCBieSBsYXRlc3Qgd2l0aCB1bml4dGltZXN0YW1wIGZ1bmN0aW9uXG4gIGNvbnN0IHNvcnRCeVVpbml4VGltZXN0YW1wID1cbiAgICA8VCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YT4oXG4gICAgICBzb3J0YWJsZTogU29ydGFibGUsXG4gICAgKSA9PlxuICAgIChhOiBULCBiOiBUKTogbnVtYmVyID0+IHtcbiAgICAgIGlmICghYS5vZmZjaGFpbi5jcmVhdGVkX2F0KSB7XG4gICAgICAgIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAoIWIub2ZmY2hhaW4uY3JlYXRlZF9hdCkge1xuICAgICAgICBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5EZXNjKSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5Bc2MpIHtcbiAgICAgICAgcmV0dXJuIGEub2ZmY2hhaW4uY3JlYXRlZF9hdCAtIGIub2ZmY2hhaW4uY3JlYXRlZF9hdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBiLm9mZmNoYWluLmNyZWF0ZWRfYXQgLSBhLm9mZmNoYWluLmNyZWF0ZWRfYXQ7XG4gICAgICB9XG4gICAgfTtcblxuICBjb25zdCBjb252ZXJ0ZXIgPSA8VD4oXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICAgIG1ldGFkYXRhOiBNZXRhZGF0YSxcbiAgICBqc29uOiBJbmZyYVNpZGVPdXRwdXQuT2ZmY2hhaW4sXG4gICAgdG9rZW5BbW91bnQ6IHN0cmluZyxcbiAgKTogVCA9PiB7XG4gICAgaWYgKHRva2VuU3RhbmRhcmQgPT09IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5Ub2tlbk1ldGFkYXRhLmludG9Vc2VyU2lkZShcbiAgICAgICAge1xuICAgICAgICAgIG9uY2hhaW46IG1ldGFkYXRhLFxuICAgICAgICAgIG9mZmNoYWluOiBqc29uLFxuICAgICAgICB9LFxuICAgICAgICB0b2tlbkFtb3VudCxcbiAgICAgICkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKHRva2VuU3RhbmRhcmQgPT09IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5Ob25GdW5naWJsZSkge1xuICAgICAgcmV0dXJuIENvbnZlcnRlci5OZnRNZXRhZGF0YS5pbnRvVXNlclNpZGUoXG4gICAgICAgIHtcbiAgICAgICAgICBvbmNoYWluOiBtZXRhZGF0YSxcbiAgICAgICAgICBvZmZjaGFpbjoganNvbixcbiAgICAgICAgfSxcbiAgICAgICAgdG9rZW5BbW91bnQsXG4gICAgICApIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKGBObyBtYXRjaCB0b2tlblN0YW5kYXJkOiAke3Rva2VuU3RhbmRhcmR9YCk7XG4gICAgfVxuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBnZW5lcmljRmluZEJ5T3duZXIgPSBhc3luYyA8XG4gICAgVCBleHRlbmRzIFVzZXJTaWRlT3V0cHV0Lk5mdE1ldGFkYXRhIHwgVXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSxcbiAgPihcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGNhbGxiYWNrOiAocmVzdWx0OiBSZXN1bHQ8VFtdLCBFcnJvcj4pID0+IHZvaWQsXG4gICAgdG9rZW5TdGFuZGFyZDogVXNlclNpZGVJbnB1dC5Ub2tlblN0YW5kYXJkLFxuICAgIHNvcnRhYmxlPzogU29ydGFibGUsXG4gICAgaXNIb2xkZXI/OiBib29sZWFuLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IGRhdGE6IFRbXSA9IFtdO1xuICAgICAgY29uc3QgY29ubmVjdGlvbiA9IE5vZGUuZ2V0Q29ubmVjdGlvbigpO1xuICAgICAgY29uc3QgaW5mbyA9IGF3YWl0IGNvbm5lY3Rpb24uZ2V0UGFyc2VkVG9rZW5BY2NvdW50c0J5T3duZXIoXG4gICAgICAgIG93bmVyLnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBwcm9ncmFtSWQ6IFRPS0VOX1BST0dSQU1fSUQsXG4gICAgICAgIH0sXG4gICAgICApO1xuXG4gICAgICBpbmZvLnZhbHVlLmxlbmd0aCA9PT0gMCAmJiBjYWxsYmFjayhSZXN1bHQub2soW10pKTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBkIG9mIGluZm8udmFsdWUpIHtcbiAgICAgICAgaWYgKGlzSG9sZGVyICYmIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50LnVpQW1vdW50IDwgMSkge1xuICAgICAgICAgIGRlYnVnTG9nKFxuICAgICAgICAgICAgJyMgZmluZEJ5T3duZXIgbm8gaG9sZCBtZXRhZGF0YTogJyxcbiAgICAgICAgICAgIGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWludCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLm1pbnQgYXMgUHVia2V5O1xuICAgICAgICBjb25zdCB0b2tlbkFtb3VudCA9IGQuYWNjb3VudC5kYXRhLnBhcnNlZC5pbmZvLnRva2VuQW1vdW50XG4gICAgICAgICAgLmFtb3VudCBhcyBzdHJpbmc7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IGF3YWl0IE1ldGFkYXRhLmZyb21BY2NvdW50QWRkcmVzcyhcbiAgICAgICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgICAgICBQZGEuZ2V0TWV0YWRhdGEobWludCksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlPd25lciBtZXRhZGF0YTogJywgbWV0YWRhdGEpO1xuICAgICAgICAgIC8vIHRva2VuU3RhbmRhcmQ6IDAoTkZUKSBvciAyIChTUEwtVE9LRU4pXG4gICAgICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmZXRjaChtZXRhZGF0YS5kYXRhLnVyaSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICByZXNwb25zZVxuICAgICAgICAgICAgICAgIC5qc29uKClcbiAgICAgICAgICAgICAgICAudGhlbigoanNvbjogSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluKSA9PiB7XG4gICAgICAgICAgICAgICAgICBkYXRhLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGNvbnZlcnRlcjxUPih0b2tlblN0YW5kYXJkLCBtZXRhZGF0YSwganNvbiwgdG9rZW5BbW91bnQpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7IC8vIG5lZWQgdGhpcyBjYWxsID9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0LmVycihlKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkRlc2MpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYXNjQWxnbyA9IHNvcnRCeVVpbml4VGltZXN0YW1wPFQ+KFNvcnRhYmxlLkFzYyk7XG4gICAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgPT09IFNvcnRhYmxlLkRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChkZXNjQWxnbyk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvcnRhYmxlID09PSBTb3J0YWJsZS5Bc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEuc29ydChhc2NBbGdvKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5vayhkYXRhKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yICYmIFVOQUJMRV9FUlJPUl9SRUdFWC50ZXN0KGUubWVzc2FnZSkpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nKCcjIHNraXAgZXJyb3IgZm9yIG9sZCBTUEwtVE9LRU46ICcsIG1pbnQpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGdlbmVyaWNGaW5kQnlNaW50ID0gYXN5bmMgPFxuICAgIFQgZXh0ZW5kcyBVc2VyU2lkZU91dHB1dC5OZnRNZXRhZGF0YSB8IFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsXG4gID4oXG4gICAgbWludDogUHVia2V5LFxuICAgIHRva2VuU3RhbmRhcmQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VCwgRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBOb2RlLmdldENvbm5lY3Rpb24oKTtcblxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBNZXRhZGF0YS5mcm9tQWNjb3VudEFkZHJlc3MoXG4gICAgICAgIGNvbm5lY3Rpb24sXG4gICAgICAgIFBkYS5nZXRNZXRhZGF0YShtaW50KSxcbiAgICAgICk7XG4gICAgICBkZWJ1Z0xvZygnIyBmaW5kQnlNaW50IG1ldGFkYXRhOiAnLCBtZXRhZGF0YSk7XG4gICAgICAvLyB0b2tlblN0YW5kYXJkOiAwKE5GVCkgb3IgMiAoU1BMLVRPS0VOKVxuICAgICAgaWYgKG1ldGFkYXRhLnRva2VuU3RhbmRhcmQgIT09IHRva2VuU3RhbmRhcmQpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ3Rva2VuIHN0YW5kYXJkcyBhcmUgZGlmZmVyZW50Jyk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmZvID0gYXdhaXQgY29ubmVjdGlvbi5nZXRQYXJzZWRBY2NvdW50SW5mbyhtaW50LnRvUHVibGljS2V5KCkpO1xuICAgICAgY29uc3QgdG9rZW5BbW91bnQgPSAoaW5mby52YWx1ZT8uZGF0YSBhcyBQYXJzZWRBY2NvdW50RGF0YSkucGFyc2VkLmluZm9cbiAgICAgICAgLnN1cHBseSBhcyBzdHJpbmc7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IChcbiAgICAgICAgYXdhaXQgZmV0Y2gobWV0YWRhdGEuZGF0YS51cmkpXG4gICAgICApLmpzb24oKSkgYXMgSW5mcmFTaWRlT3V0cHV0Lk9mZmNoYWluO1xuICAgICAgcmV0dXJuIFJlc3VsdC5vayhcbiAgICAgICAgY29udmVydGVyPFQ+KHRva2VuU3RhbmRhcmQsIG1ldGFkYXRhLCByZXNwb25zZSwgdG9rZW5BbW91bnQpLFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gUmVzdWx0LmVycihlIGFzIEVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZldGNoIG1pbnRlZCBtZXRhZGF0YSBieSBvd25lciBQdWJrZXlcbiAgICpcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyXG4gICAqIEBwYXJhbSB7T25Pa30gb25PayBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09uRXJyfSBvbkVyciBjYWxsYmFjayBmdW5jdGlvblxuICAgKiBAcGFyYW0ge3tzb3J0YWJsZT86IFNvcnRhYmxlLCBpc0hvbGRlcj86IGJvb2xlYW59fSBvcHRpb25zP1xuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlPd25lciA9IChcbiAgICBvd25lcjogUHVia2V5LFxuICAgIG9uT2s6IE9uT2s8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YT4sXG4gICAgb25FcnI6IE9uRXJyLFxuICAgIG9wdGlvbnM/OiB7IHNvcnRhYmxlPzogU29ydGFibGU7IGlzSG9sZGVyPzogYm9vbGVhbiB9LFxuICApOiB2b2lkID0+IHtcbiAgICBjb25zdCBzb3J0YWJsZSA9ICFvcHRpb25zPy5zb3J0YWJsZSA/IFNvcnRhYmxlLkRlc2MgOiBvcHRpb25zPy5zb3J0YWJsZTtcbiAgICBjb25zdCBpc0hvbGRlciA9ICFvcHRpb25zPy5pc0hvbGRlciA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1mbG9hdGluZy1wcm9taXNlcyAqL1xuICAgIGdlbmVyaWNGaW5kQnlPd25lcjxVc2VyU2lkZU91dHB1dC5Ub2tlbk1ldGFkYXRhPihcbiAgICAgIG93bmVyLFxuICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICByZXN1bHQubWF0Y2goKG9rKSA9PiBvbk9rKG9rKSwgb25FcnIpO1xuICAgICAgfSxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgaXNIb2xkZXIsXG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogRmV0Y2ggbWludGVkIG1ldGFkYXRhIGJ5IG1pbnQgYWRkcmVzc1xuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludFxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGEsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCBmaW5kQnlNaW50ID0gYXN5bmMgKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8VXNlclNpZGVPdXRwdXQuVG9rZW5NZXRhZGF0YSwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyaWNGaW5kQnlNaW50PFVzZXJTaWRlT3V0cHV0LlRva2VuTWV0YWRhdGE+KFxuICAgICAgbWludCxcbiAgICAgIFVzZXJTaWRlSW5wdXQuVG9rZW5TdGFuZGFyZC5GdW5naWJsZSxcbiAgICApO1xuICB9O1xufVxuIiwgImltcG9ydCB7IEtleXBhaXJBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSAnfi9pbnN0cnVjdGlvbic7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuaW1wb3J0IHtcbiAgY3JlYXRlRnJlZXplQWNjb3VudEluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbn0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgLyoqXG4gICAqIEZyZWV6aW5nIGEgdGFyZ2V0IG5mdFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCBmcmVlemUgPSAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZnJlZXplQXV0aG9yaXR5OiBTZWNyZXQsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFJlc3VsdDxJbnN0cnVjdGlvbiwgRXJyb3I+ID0+IHtcbiAgICBjb25zdCBwYXllciA9IGZlZVBheWVyID8gZmVlUGF5ZXIgOiBmcmVlemVBdXRob3JpdHk7XG4gICAgcmV0dXJuIFRyeSgoKSA9PiB7XG4gICAgICBjb25zdCB0b2tlbkFjY291bnQgPSBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVGcmVlemVBY2NvdW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIHRva2VuQWNjb3VudCxcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBuZXcgS2V5cGFpckFjY291bnQoeyBzZWNyZXQ6IGZyZWV6ZUF1dGhvcml0eSB9KS50b1B1YmxpY0tleSgpLFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBJbnN0cnVjdGlvbihcbiAgICAgICAgW2luc3RdLFxuICAgICAgICBbZnJlZXplQXV0aG9yaXR5LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uIH0gZnJvbSAnQHNvbGFuYS9zcGwtdG9rZW4nO1xuaW1wb3J0IHsgVHJhbnNhY3Rpb24gfSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHsgTm9kZSB9IGZyb20gJ34vbm9kZSc7XG5pbXBvcnQgeyBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFBhcnRpYWxTaWduSW5zdHJ1Y3Rpb24gfSBmcm9tICd+L2luc3RydWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIF9DYWxjdWxhdG9yIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IEFzc29jaWF0ZWRBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCBmZWVQYXllclBhcnRpYWxTaWduVHJhbnNmZXIgPSBhc3luYyAoXG4gICAgbWludDogUHVia2V5LFxuICAgIG93bmVyOiBQdWJrZXksXG4gICAgZGVzdDogUHVia2V5LFxuICAgIHNpZ25lcnM6IFNlY3JldFtdLFxuICAgIGFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgZmVlUGF5ZXI6IFB1YmtleSxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8UGFydGlhbFNpZ25JbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlwYWlycyA9IHNpZ25lcnMubWFwKChzKSA9PiBzLnRvS2V5cGFpcigpKTtcblxuICAgICAgY29uc3Qgc291cmNlVG9rZW4gPSBhd2FpdCBBc3NvY2lhdGVkQWNjb3VudC5tYWtlT3JDcmVhdGVJbnN0cnVjdGlvbihcbiAgICAgICAgbWludCxcbiAgICAgICAgb3duZXIsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGVzdFRva2VuID0gYXdhaXQgQXNzb2NpYXRlZEFjY291bnQubWFrZU9yQ3JlYXRlSW5zdHJ1Y3Rpb24oXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIGZlZVBheWVyLFxuICAgICAgKTtcblxuICAgICAgbGV0IGluc3QyO1xuICAgICAgY29uc3QgYmxvY2toYXNoT2JqID0gYXdhaXQgTm9kZS5nZXRDb25uZWN0aW9uKCkuZ2V0TGF0ZXN0QmxvY2toYXNoKCk7XG5cbiAgICAgIGNvbnN0IHR4ID0gbmV3IFRyYW5zYWN0aW9uKHtcbiAgICAgICAgbGFzdFZhbGlkQmxvY2tIZWlnaHQ6IGJsb2NraGFzaE9iai5sYXN0VmFsaWRCbG9ja0hlaWdodCxcbiAgICAgICAgYmxvY2toYXNoOiBibG9ja2hhc2hPYmouYmxvY2toYXNoLFxuICAgICAgICBmZWVQYXllcjogZmVlUGF5ZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXR1cm4gYXNzb2NpYXRlZCB0b2tlbiBhY2NvdW50XG4gICAgICBpZiAoIWRlc3RUb2tlbi5pbnN0KSB7XG4gICAgICAgIGluc3QyID0gY3JlYXRlVHJhbnNmZXJDaGVja2VkSW5zdHJ1Y3Rpb24oXG4gICAgICAgICAgc291cmNlVG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIGRlc3RUb2tlbi50b2tlbkFjY291bnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIF9DYWxjdWxhdG9yLmNhbGN1bGF0ZUFtb3VudChhbW91bnQsIG1pbnREZWNpbWFsKSxcbiAgICAgICAgICBtaW50RGVjaW1hbCxcbiAgICAgICAgICBrZXlwYWlycyxcbiAgICAgICAgKTtcbiAgICAgICAgdHguYWRkKGluc3QyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJldHVybiBpbnN0cnVjdGlvbiBhbmQgdW5kZWNpZGVkIGFzc29jaWF0ZWQgdG9rZW4gYWNjb3VudFxuICAgICAgICBpbnN0MiA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICAgIHNvdXJjZVRva2VuLnRva2VuQWNjb3VudC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBkZXN0VG9rZW4udG9rZW5BY2NvdW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgICAga2V5cGFpcnMsXG4gICAgICAgICk7XG4gICAgICAgIHR4LmFkZChkZXN0VG9rZW4uaW5zdCkuYWRkKGluc3QyKTtcbiAgICAgIH1cblxuICAgICAgdHgucmVjZW50QmxvY2toYXNoID0gYmxvY2toYXNoT2JqLmJsb2NraGFzaDtcbiAgICAgIGtleXBhaXJzLmZvckVhY2goKHNpZ25lcikgPT4ge1xuICAgICAgICB0eC5wYXJ0aWFsU2lnbihzaWduZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlcmlhbGl6ZWRUeCA9IHR4LnNlcmlhbGl6ZSh7XG4gICAgICAgIHJlcXVpcmVBbGxTaWduYXR1cmVzOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgaGV4ID0gc2VyaWFsaXplZFR4LnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIHJldHVybiBuZXcgUGFydGlhbFNpZ25JbnN0cnVjdGlvbihoZXgpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFRPS0VOX1BST0dSQU1fSUQgfSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5pbXBvcnQgeyBkZWJ1Z0xvZyB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IE5vZGUgfSBmcm9tICd+L25vZGUnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IE9uRXJyLCBPbk9rIH0gZnJvbSAnfi90eXBlcy9zaGFyZWQnO1xuaW1wb3J0IHsgSGlzdG9yeSwgSGlzdG9yeU9wdGlvbnMgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuaW1wb3J0IHsgRmlsdGVyVHlwZSwgTW9kdWxlTmFtZSB9IGZyb20gJ34vdHlwZXMvdHJhbnNhY3Rpb24tZmlsdGVyJztcbmltcG9ydCB7IFNpZ25hdHVyZXMsIFRyYW5zYWN0aW9uRmlsdGVyIH0gZnJvbSAnfi90cmFuc2FjdGlvbi1maWx0ZXInO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGdldEhpc3RvcnkgPSBhc3luYyAoXG4gICAgdGFyZ2V0OiBQdWJrZXksXG4gICAgZmlsdGVyVHlwZTogRmlsdGVyVHlwZSxcbiAgICBvbk9rOiBPbk9rPEhpc3Rvcnk+LFxuICAgIG9uRXJyOiBPbkVycixcbiAgICBvcHRpb25zOiBQYXJ0aWFsPEhpc3RvcnlPcHRpb25zPiA9IHt9LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGVmYXVsdFZhbHVlczogSGlzdG9yeU9wdGlvbnMgPSB7XG4gICAgICAgIHdhaXRUaW1lOiAwLjAzLFxuICAgICAgICBuYXJyb3dEb3duOiAxMDAsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVyZ2VkT3B0aW9ucyA9IHsgLi4uZGVmYXVsdFZhbHVlcywgLi4ub3B0aW9ucyB9O1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50cyA9XG4gICAgICAgIGF3YWl0IE5vZGUuZ2V0Q29ubmVjdGlvbigpLmdldFBhcnNlZFRva2VuQWNjb3VudHNCeU93bmVyKFxuICAgICAgICAgIHRhcmdldC50b1B1YmxpY0tleSgpLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgY29uc3Qgc3RvcmVkSGlzdG9yaWVzOiBIaXN0b3J5W10gPSBbXTtcbiAgICAgIGRlYnVnTG9nKCcjIHRva2VuQWNjb3VudHMgc2l6ZTogJywgdG9rZW5BY2NvdW50cy52YWx1ZS5sZW5ndGgpO1xuICAgICAgZm9yIChjb25zdCBhY2NvdW50IG9mIHRva2VuQWNjb3VudHMudmFsdWUpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gVHJhbnNhY3Rpb25GaWx0ZXIucGFyc2UoZmlsdGVyVHlwZSwgTW9kdWxlTmFtZS5TcGxUb2tlbik7XG4gICAgICAgIGF3YWl0IFNpZ25hdHVyZXMuZ2V0Rm9yQWRyZXNzKFxuICAgICAgICAgIGFjY291bnQucHVia2V5LnRvU3RyaW5nKCksXG4gICAgICAgICAgcGFyc2VyLFxuICAgICAgICAgIChyZXN1bHQpID0+IHJlc3VsdC5tYXRjaChvbk9rLCBvbkVyciksXG4gICAgICAgICAgbWVyZ2VkT3B0aW9ucyxcbiAgICAgICAgICBzdG9yZWRIaXN0b3JpZXMsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBvbkVycihlKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIHNsZWVwIH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHVia2V5IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcbmltcG9ydCB7IEhpc3RvcnkgfSBmcm9tICd+L3R5cGVzL2hpc3RvcnknO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNpZ25hdHVyZXMge1xuICBjb25zdCBwYXJzZUZvclRyYW5zYWN0aW9uID0gYXN5bmMgKFxuICAgIHNpZ25hdHVyZTogc3RyaW5nLFxuICApOiBQcm9taXNlPFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGE+ID0+IHtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRQYXJzZWRUcmFuc2FjdGlvbihzaWduYXR1cmUpO1xuICAgIGlmICghcmVzKSB7XG4gICAgICByZXR1cm4ge30gYXMgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcblxuICBleHBvcnQgY29uc3QgZ2V0Rm9yQWRyZXNzID0gYXN5bmMgKFxuICAgIHB1YmtleTogUHVia2V5LFxuICAgIHBhcnNlcjogKHRyYW5zYWN0aW9uOiBQYXJzZWRUcmFuc2FjdGlvbldpdGhNZXRhKSA9PiBIaXN0b3J5IHwgdW5kZWZpbmVkLFxuICAgIGNhbGxiYWNrOiAoaGlzdG9yeTogUmVzdWx0PEhpc3RvcnlbXSwgRXJyb3I+KSA9PiB2b2lkLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHdhaXRUaW1lOiBudW1iZXI7XG4gICAgICBuYXJyb3dEb3duOiBudW1iZXI7XG4gICAgfSxcbiAgICBoaXN0b3JpZXM6IEhpc3RvcnlbXSA9IFtdLFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgZGVidWdMb2coJyMgb3B0aW9uczogJywgb3B0aW9ucyk7XG4gICAgICBjb25zdCB0cmFuc2FjdGlvbnMgPSBhd2FpdCBOb2RlLmdldENvbm5lY3Rpb24oKS5nZXRTaWduYXR1cmVzRm9yQWRkcmVzcyhcbiAgICAgICAgcHVia2V5LnRvUHVibGljS2V5KCksXG4gICAgICAgIHtcbiAgICAgICAgICBsaW1pdDogb3B0aW9ucy5uYXJyb3dEb3duLFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgZGVidWdMb2coJyMgdHJhbnNhY3Rpb25zIGNvdW50OicsIHRyYW5zYWN0aW9ucy5sZW5ndGgpO1xuXG4gICAgICBmb3IgKGNvbnN0IHRyYW5zYWN0aW9uIG9mIHRyYW5zYWN0aW9ucykge1xuICAgICAgICBwYXJzZUZvclRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uLnNpZ25hdHVyZSlcbiAgICAgICAgICAudGhlbigoc2lnbmF0dXJlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBoaXN0b3J5ID0gcGFyc2VyKHNpZ25hdHVyZSk7XG4gICAgICAgICAgICBpZiAoaGlzdG9yeSkge1xuICAgICAgICAgICAgICBoaXN0b3JpZXMucHVzaChoaXN0b3J5KTtcbiAgICAgICAgICAgICAgY2FsbGJhY2soUmVzdWx0Lm9rKGhpc3RvcmllcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlKSA9PiBjYWxsYmFjayhSZXN1bHQuZXJyKGUpKSk7XG4gICAgICAgIGF3YWl0IHNsZWVwKG9wdGlvbnMud2FpdFRpbWUpOyAvLyBhdm9pZCA0MjkgZXJyb3JcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIGNhbGxiYWNrKFJlc3VsdC5lcnIoZSkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBQYXJzZWRJbnN0cnVjdGlvbiwgUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSB9IGZyb20gJ0Bzb2xhbmEvd2ViMy5qcyc7XG5pbXBvcnQge1xuICBGaWx0ZXJPcHRpb25zLFxuICBGaWx0ZXJUeXBlLFxuICBNb2R1bGVOYW1lLFxuICBQb3N0VG9rZW5BY2NvdW50LFxufSBmcm9tICd+L3R5cGVzL3RyYW5zYWN0aW9uLWZpbHRlcic7XG5pbXBvcnQgeyBIaXN0b3J5IH0gZnJvbSAnfi90eXBlcy9oaXN0b3J5JztcbmltcG9ydCB7IGRlYnVnTG9nIH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFRyYW5zYWN0aW9uRmlsdGVyIHtcbiAgY29uc3QgY3JlYXRlUG9zdFRva2VuQWNjb3VudExpc3QgPSAoXG4gICAgdHJhbnNhY3Rpb246IFBhcnNlZFRyYW5zYWN0aW9uV2l0aE1ldGEsXG4gICk6IFBvc3RUb2tlbkFjY291bnRbXSA9PiB7XG4gICAgY29uc3QgcG9zdFRva2VuQWNjb3VudDogUG9zdFRva2VuQWNjb3VudFtdID0gW107XG5cbiAgICBpZiAoT2JqZWN0LmtleXModHJhbnNhY3Rpb24pLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHBvc3RUb2tlbkFjY291bnQ7XG4gICAgfVxuICAgIGNvbnN0IGFjY291bnRLZXlzID0gdHJhbnNhY3Rpb24udHJhbnNhY3Rpb24ubWVzc2FnZS5hY2NvdW50S2V5cy5tYXAoKHQpID0+XG4gICAgICB0LnB1YmtleS50b1N0cmluZygpLFxuICAgICk7XG5cbiAgICB0cmFuc2FjdGlvbi5tZXRhPy5wb3N0VG9rZW5CYWxhbmNlcz8uZm9yRWFjaCgodCkgPT4ge1xuICAgICAgaWYgKGFjY291bnRLZXlzW3QuYWNjb3VudEluZGV4XSAmJiB0Lm93bmVyKSB7XG4gICAgICAgIGNvbnN0IHYgPSB7XG4gICAgICAgICAgYWNjb3VudDogYWNjb3VudEtleXNbdC5hY2NvdW50SW5kZXhdLFxuICAgICAgICAgIG93bmVyOiB0Lm93bmVyLFxuICAgICAgICB9O1xuICAgICAgICBwb3N0VG9rZW5BY2NvdW50LnB1c2godik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc3RUb2tlbkFjY291bnQ7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzUGFyc2VkSW5zdHJ1Y3Rpb24gPSAoXG4gICAgYXJnOiB1bmtub3duLFxuICApOiBhcmcgaXMgUGFyc2VkSW5zdHJ1Y3Rpb24gPT4ge1xuICAgIHJldHVybiBhcmcgIT09IG51bGwgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgJ3BhcnNlZCcgaW4gYXJnO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBwYXJzZSA9XG4gICAgKGZpbHRlclR5cGU6IEZpbHRlclR5cGUsIG1vZHVsZU5hbWU6IE1vZHVsZU5hbWUpID0+XG4gICAgKHR4TWV0YTogUGFyc2VkVHJhbnNhY3Rpb25XaXRoTWV0YSk6IEhpc3RvcnkgfCB1bmRlZmluZWQgPT4ge1xuICAgICAgbGV0IGhpc3Rvcnk6IEhpc3RvcnkgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZmlsdGVyVHlwZSA9PT0gRmlsdGVyVHlwZS5NaW50ICYmXG4gICAgICAgIG1vZHVsZU5hbWUgPT09IE1vZHVsZU5hbWUuU29sTmF0aXZlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJUaGlzIGZpbHRlclR5cGUoJ0ZpbHRlclR5cGUuTWludCcpIGNhbiBub3QgdXNlIGZyb20gU29sTmF0aXZlIG1vZHVsZVwiLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXR4TWV0YSB8fCAhdHhNZXRhLnRyYW5zYWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwb3N0VG9rZW5BY2NvdW50ID0gY3JlYXRlUG9zdFRva2VuQWNjb3VudExpc3QodHhNZXRhKTtcbiAgICAgIHR4TWV0YS50cmFuc2FjdGlvbi5tZXNzYWdlLmluc3RydWN0aW9ucy5mb3JFYWNoKChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICBpZiAoaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikpIHtcbiAgICAgICAgICBzd2l0Y2ggKGZpbHRlclR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgRmlsdGVyVHlwZS5NZW1vOiB7XG4gICAgICAgICAgICAgIGlmIChGaWx0ZXJPcHRpb25zLk1lbW8ucHJvZ3JhbS5pbmNsdWRlcyhpbnN0cnVjdGlvbi5wcm9ncmFtKSkge1xuICAgICAgICAgICAgICAgIGxldCBpbnN0cnVjdGlvblRyYW5zZmVyO1xuXG4gICAgICAgICAgICAgICAgLy8gZmV0Y2ggIHRyYW5zZmVyIHRyYW5zYWN0aW9uIGZvciByZWxhdGlvbmFsIG1lbW9cbiAgICAgICAgICAgICAgICB0eE1ldGEudHJhbnNhY3Rpb24ubWVzc2FnZS5pbnN0cnVjdGlvbnMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAgIChpbnN0cnVjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgaXNQYXJzZWRJbnN0cnVjdGlvbihpbnN0cnVjdGlvbikgJiZcbiAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJPcHRpb25zLlRyYW5zZmVyLnByb2dyYW0uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5wcm9ncmFtLFxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlciA9IGluc3RydWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAvLyBzcGwtdG9rZW4gb3Igc3lzdGVtXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25UcmFuc2ZlciAmJlxuICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZSAhPT0gaW5zdHJ1Y3Rpb25UcmFuc2ZlclsncHJvZ3JhbSddXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgICAgICAgICAgICAgJyMgRmlsdGVyVHlwZS5NZW1vIGJyZWFrIGluc3RydWN0aW9uOiAnLFxuICAgICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGZldGNoIG1lbW8gb25seSB0cmFuc2FjdGlvblxuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBDb252ZXJ0ZXIuTWVtby5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbixcbiAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uVHJhbnNmZXIsXG4gICAgICAgICAgICAgICAgICBwb3N0VG9rZW5BY2NvdW50LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEZpbHRlclR5cGUuT25seU1lbW86IHtcbiAgICAgICAgICAgICAgaWYgKEZpbHRlck9wdGlvbnMuTWVtby5wcm9ncmFtLmluY2x1ZGVzKGluc3RydWN0aW9uLnByb2dyYW0pKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluc3RydWN0aW9uVHJhbnNmZXI7XG5cbiAgICAgICAgICAgICAgICBoaXN0b3J5ID0gQ29udmVydGVyLk1lbW8uaW50b1VzZXJTaWRlKFxuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvblRyYW5zZmVyLFxuICAgICAgICAgICAgICAgICAgcG9zdFRva2VuQWNjb3VudCxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBGaWx0ZXJUeXBlLk1pbnQ6IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIEZpbHRlck9wdGlvbnMuTWludC5wcm9ncmFtLmluY2x1ZGVzKGluc3RydWN0aW9uLnByb2dyYW0pICYmXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5NaW50LmFjdGlvbi5pbmNsdWRlcyhcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLnBhcnNlZC50eXBlIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGhpc3RvcnkgPSBDb252ZXJ0ZXIuTWludC5pbnRvVXNlclNpZGUoaW5zdHJ1Y3Rpb24sIHR4TWV0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIEZpbHRlclR5cGUuVHJhbnNmZXI6XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBtb2R1bGVOYW1lID09PSBpbnN0cnVjdGlvbi5wcm9ncmFtICYmXG4gICAgICAgICAgICAgICAgRmlsdGVyT3B0aW9ucy5UcmFuc2Zlci5hY3Rpb24uaW5jbHVkZXMoXG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbi5wYXJzZWQudHlwZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdHJ1Y3Rpb24ucGFyc2VkLnR5cGUgPT09ICd0cmFuc2ZlckNoZWNrZWQnKSB7XG4gICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gQ29udmVydGVyLlRyYW5zZmVyQ2hlY2tlZC5pbnRvVXNlclNpZGUoXG4gICAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eE1ldGEsXG4gICAgICAgICAgICAgICAgICAgIHBvc3RUb2tlbkFjY291bnQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBoaXN0b3J5ID0gQ29udmVydGVyLlRyYW5zZmVyLmludG9Vc2VyU2lkZShcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIHR4TWV0YSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaXN0b3J5O1xuICAgIH07XG59XG4iLCAiaW1wb3J0IHtcbiAgUHVibGljS2V5LFxuICBTeXN0ZW1Qcm9ncmFtLFxuICBUcmFuc2FjdGlvbkluc3RydWN0aW9uLFxufSBmcm9tICdAc29sYW5hL3dlYjMuanMnO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXR5VHlwZSxcbiAgY3JlYXRlQXNzb2NpYXRlZFRva2VuQWNjb3VudEluc3RydWN0aW9uLFxuICBjcmVhdGVJbml0aWFsaXplTWludEluc3RydWN0aW9uLFxuICBjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24sXG4gIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uLFxuICBnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyxcbiAgZ2V0TWluaW11bUJhbGFuY2VGb3JSZW50RXhlbXB0TWludCxcbiAgTUlOVF9TSVpFLFxuICBUT0tFTl9QUk9HUkFNX0lELFxufSBmcm9tICdAc29sYW5hL3NwbC10b2tlbic7XG5cbmltcG9ydCB7XG4gIGNyZWF0ZUNyZWF0ZU1ldGFkYXRhQWNjb3VudFYzSW5zdHJ1Y3Rpb24sXG4gIERhdGFWMixcbn0gZnJvbSAnQG1ldGFwbGV4LWZvdW5kYXRpb24vbXBsLXRva2VuLW1ldGFkYXRhJztcblxuaW1wb3J0IHsgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuXG5pbXBvcnQgeyBOb2RlIH0gZnJvbSAnfi9ub2RlJztcbmltcG9ydCB7IEtleXBhaXJBY2NvdW50IH0gZnJvbSAnfi9hY2NvdW50JztcbmltcG9ydCB7IE1pbnRJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgVXNlclNpZGVJbnB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IFBkYSB9IGZyb20gJ34vYWNjb3VudCc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICd+L2NvbnZlcnRlcic7XG5pbXBvcnQgeyBWYWxpZGF0b3IgfSBmcm9tICd+L3ZhbGlkYXRvcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBfQ2FsY3VsYXRlIH0gZnJvbSAnLi9jYWxjdWxhdGUtYW1vdW50JztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICd+L3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFNwbFRva2VuIHtcbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZUZyZWV6ZUF1dGhvcml0eSA9IChcbiAgICBtaW50OiBQdWJsaWNLZXksXG4gICAgb3duZXI6IFB1YmxpY0tleSxcbiAgICBmcmVlemVBdXRob3JpdHk6IFB1YmxpY0tleSxcbiAgKTogVHJhbnNhY3Rpb25JbnN0cnVjdGlvbiA9PiB7XG4gICAgcmV0dXJuIGNyZWF0ZVNldEF1dGhvcml0eUluc3RydWN0aW9uKFxuICAgICAgbWludCxcbiAgICAgIG93bmVyLFxuICAgICAgQXV0aG9yaXR5VHlwZS5GcmVlemVBY2NvdW50LFxuICAgICAgZnJlZXplQXV0aG9yaXR5LFxuICAgICk7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGNyZWF0ZU1pbnRJbnN0cnVjdGlvbnMgPSBhc3luYyAoXG4gICAgbWludDogUHVibGljS2V5LFxuICAgIG93bmVyOiBQdWJsaWNLZXksXG4gICAgdG90YWxBbW91bnQ6IG51bWJlcixcbiAgICBtaW50RGVjaW1hbDogbnVtYmVyLFxuICAgIHRva2VuTWV0YWRhdGE6IERhdGFWMixcbiAgICBmZWVQYXllcjogUHVibGljS2V5LFxuICAgIGlzTXV0YWJsZTogYm9vbGVhbixcbiAgKTogUHJvbWlzZTxUcmFuc2FjdGlvbkluc3RydWN0aW9uW10+ID0+IHtcbiAgICBjb25zdCBjb25uZWN0aW9uID0gTm9kZS5nZXRDb25uZWN0aW9uKCk7XG4gICAgY29uc3QgbGFtcG9ydHMgPSBhd2FpdCBnZXRNaW5pbXVtQmFsYW5jZUZvclJlbnRFeGVtcHRNaW50KGNvbm5lY3Rpb24pO1xuICAgIGNvbnN0IG1ldGFkYXRhUGRhID0gUGRhLmdldE1ldGFkYXRhKG1pbnQudG9TdHJpbmcoKSk7XG4gICAgY29uc3QgdG9rZW5Bc3NvY2lhdGVkID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMobWludCwgb3duZXIpO1xuXG4gICAgY29uc3QgaW5zdDEgPSBTeXN0ZW1Qcm9ncmFtLmNyZWF0ZUFjY291bnQoe1xuICAgICAgZnJvbVB1YmtleTogZmVlUGF5ZXIsXG4gICAgICBuZXdBY2NvdW50UHVia2V5OiBtaW50LFxuICAgICAgc3BhY2U6IE1JTlRfU0laRSxcbiAgICAgIGxhbXBvcnRzOiBsYW1wb3J0cyxcbiAgICAgIHByb2dyYW1JZDogVE9LRU5fUFJPR1JBTV9JRCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGluc3QyID0gY3JlYXRlSW5pdGlhbGl6ZU1pbnRJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICBtaW50RGVjaW1hbCxcbiAgICAgIG93bmVyLFxuICAgICAgb3duZXIsXG4gICAgICBUT0tFTl9QUk9HUkFNX0lELFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0MyA9IGNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbihcbiAgICAgIGZlZVBheWVyLFxuICAgICAgdG9rZW5Bc3NvY2lhdGVkLFxuICAgICAgb3duZXIsXG4gICAgICBtaW50LFxuICAgICk7XG5cbiAgICBjb25zdCBpbnN0NCA9IGNyZWF0ZU1pbnRUb0NoZWNrZWRJbnN0cnVjdGlvbihcbiAgICAgIG1pbnQsXG4gICAgICB0b2tlbkFzc29jaWF0ZWQsXG4gICAgICBvd25lcixcbiAgICAgIF9DYWxjdWxhdGUuY2FsY3VsYXRlQW1vdW50KHRvdGFsQW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICBtaW50RGVjaW1hbCxcbiAgICApO1xuXG4gICAgY29uc3QgaW5zdDUgPSBjcmVhdGVDcmVhdGVNZXRhZGF0YUFjY291bnRWM0luc3RydWN0aW9uKFxuICAgICAge1xuICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGFQZGEsXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG1pbnRBdXRob3JpdHk6IG93bmVyLFxuICAgICAgICBwYXllcjogZmVlUGF5ZXIsXG4gICAgICAgIHVwZGF0ZUF1dGhvcml0eTogb3duZXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjcmVhdGVNZXRhZGF0YUFjY291bnRBcmdzVjM6IHtcbiAgICAgICAgICBkYXRhOiB0b2tlbk1ldGFkYXRhLFxuICAgICAgICAgIGlzTXV0YWJsZSxcbiAgICAgICAgICBjb2xsZWN0aW9uRGV0YWlsczogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgICByZXR1cm4gW2luc3QxLCBpbnN0MiwgaW5zdDMsIGluc3Q0LCBpbnN0NV07XG4gIH07XG5cbiAgLyoqXG4gICAqIFNQTC1UT0tFTiBtaW50XG4gICAqXG4gICAqIEBwYXJhbSB7UHVia2V5fSBvd25lciAgICAgICAvLyB0b2tlbiBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gc2lnbmVyICAgICAgLy8gdG9rZW4gb3duZXIgU2VjcmV0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3RhbEFtb3VudCAvLyB0b3RhbCBudW1iZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbnREZWNpbWFsIC8vIHRva2VuIGRlY2ltYWxcbiAgICogQHBhcmFtIHtQdWJrZXl9IGlucHV0ICAgICAgIC8vIHRva2VuIG1ldGFkYXRhXG4gICAqIEBwYXJhbSB7U2VjcmV0fSBmZWVQYXllcj8gICAvLyBmZWUgcGF5ZXJcbiAgICogQHBhcmFtIHtQdWJrZXl9IGZyZWV6ZUF1dGhvcml0eT8gLy8gZnJlZXplIGF1dGhvcml0eVxuICAgKiBAcmV0dXJuIFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PlxuICAgKi9cbiAgZXhwb3J0IGNvbnN0IG1pbnQgPSBhc3luYyAoXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBzaWduZXI6IFNlY3JldCxcbiAgICB0b3RhbEFtb3VudDogbnVtYmVyLFxuICAgIG1pbnREZWNpbWFsOiBudW1iZXIsXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuVG9rZW5NZXRhZGF0YSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgICBmcmVlemVBdXRob3JpdHk/OiBQdWJrZXksXG4gICk6IFByb21pc2U8UmVzdWx0PE1pbnRJbnN0cnVjdGlvbiwgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZCA9IFZhbGlkYXRvci5jaGVja0FsbDxVc2VyU2lkZUlucHV0LlRva2VuTWV0YWRhdGE+KGlucHV0KTtcbiAgICAgIGlmICh2YWxpZC5pc0Vycikge1xuICAgICAgICB0aHJvdyB2YWxpZC5lcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyO1xuICAgICAgaW5wdXQucm95YWx0eSA9IDA7XG4gICAgICBjb25zdCBzZWxsZXJGZWVCYXNpc1BvaW50cyA9IDA7XG5cbiAgICAgIGNvbnN0IHRva2VuU3RvcmFnZU1ldGFkYXRhID0gU3RvcmFnZS50b0NvbnZlcnRPZmZjaGFpbmRhdGEoXG4gICAgICAgIGlucHV0IGFzIFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgICAgIGlucHV0LnJveWFsdHksXG4gICAgICApO1xuXG4gICAgICAvLyBjcmVhdGVkIGF0IGJ5IHVuaXggdGltZXN0YW1wXG4gICAgICBjb25zdCBjcmVhdGVkQXQgPSBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgICB0b2tlblN0b3JhZ2VNZXRhZGF0YS5jcmVhdGVkX2F0ID0gY3JlYXRlZEF0O1xuXG4gICAgICBsZXQgdXJpITogc3RyaW5nO1xuICAgICAgaWYgKGlucHV0LmZpbGVQYXRoICYmIGlucHV0LnN0b3JhZ2VUeXBlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZGVkID0gYXdhaXQgU3RvcmFnZS51cGxvYWQoXG4gICAgICAgICAgdG9rZW5TdG9yYWdlTWV0YWRhdGEsXG4gICAgICAgICAgaW5wdXQuZmlsZVBhdGgsXG4gICAgICAgICAgaW5wdXQuc3RvcmFnZVR5cGUsXG4gICAgICAgICAgcGF5ZXIsXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHVwbG9hZGVkLmlzRXJyKSB7XG4gICAgICAgICAgdGhyb3cgdXBsb2FkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdXJpID0gdXBsb2FkZWQudmFsdWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0LnVyaSkge1xuICAgICAgICB1cmkgPSBpbnB1dC51cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBFcnJvcihcIk11c3Qgc2V0ICdzdG9yYWdlVHlwZSArIGZpbGVQYXRoJyBvciAndXJpJ1wiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNNdXRhYmxlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgZGF0YXYyID0gQ29udmVydGVyLlRva2VuTWV0YWRhdGEuaW50b0luZnJhU2lkZShcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIHVyaSxcbiAgICAgICAgc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICApO1xuXG4gICAgICBkZWJ1Z0xvZygnIyBkYXRhdjI6ICcsIGRhdGF2Mik7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgY29udGVudCB1cmw6ICcsIHVyaSk7XG5cbiAgICAgIGNvbnN0IG1pbnQgPSBLZXlwYWlyQWNjb3VudC5jcmVhdGUoKTtcbiAgICAgIGNvbnN0IGluc3RzID0gYXdhaXQgY3JlYXRlTWludEluc3RydWN0aW9ucyhcbiAgICAgICAgbWludC50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICB0b3RhbEFtb3VudCxcbiAgICAgICAgbWludERlY2ltYWwsXG4gICAgICAgIGRhdGF2MixcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCkucHVibGljS2V5LFxuICAgICAgICBpc011dGFibGUsXG4gICAgICApO1xuXG4gICAgICAvLyBmcmVlemVBdXRob3JpdHlcbiAgICAgIGlmIChmcmVlemVBdXRob3JpdHkpIHtcbiAgICAgICAgaW5zdHMucHVzaChcbiAgICAgICAgICBjcmVhdGVGcmVlemVBdXRob3JpdHkoXG4gICAgICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICAgICAgZnJlZXplQXV0aG9yaXR5LnRvUHVibGljS2V5KCksXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBNaW50SW5zdHJ1Y3Rpb24oXG4gICAgICAgIGluc3RzLFxuICAgICAgICBbc2lnbmVyLnRvS2V5cGFpcigpLCBtaW50LnRvS2V5cGFpcigpXSxcbiAgICAgICAgcGF5ZXIudG9LZXlwYWlyKCksXG4gICAgICAgIG1pbnQucHVia2V5LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBDb25zdGFudHMsIGRlYnVnTG9nLCBpc0Jyb3dzZXIsIGlzTm9kZSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IEZpbGVUeXBlLCBJZGVudGl0eSwgVGFncywgVXBsb2FkYWJsZUZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcbmltcG9ydCB7IFBoYW50b21Qcm92aWRlciB9IGZyb20gJ34vdHlwZXMvcGhhbnRvbSc7XG5pbXBvcnQgSXJ5cywgeyBXZWJJcnlzIH0gZnJvbSAnQGlyeXMvc2RrJztcbmltcG9ydCB7IFVwbG9hZFJlc3BvbnNlIH0gZnJvbSAnQGlyeXMvc2RrL2J1aWxkL2VzbS9jb21tb24vdHlwZXMnO1xuXG5leHBvcnQgbmFtZXNwYWNlIFByb3ZlbmFuY2VMYXllciB7XG4gIGNvbnN0IFRPS0VOID0gJ3NvbGFuYSc7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBsZXQgcmVjZWlwdCE6IFVwbG9hZFJlc3BvbnNlO1xuICAgIGlmIChpc1VwbG9hZGFibGUodXBsb2FkRmlsZSkpIHtcbiAgICAgIHJlY2VpcHQgPSBhd2FpdCBpcnlzLnVwbG9hZEZpbGUodXBsb2FkRmlsZSwgeyB0YWdzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggZmlsZSB0eXBlIG9yIGVudmlyb21lbnQnKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke0NvbnN0YW50cy5JUllTX0dBVEVXQVlfVVJMfS8ke3JlY2VpcHQuaWR9YDtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IGFzeW5jIChcbiAgICBkYXRhOiBzdHJpbmcsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICAgIHRhZ3M/OiBUYWdzLFxuICApOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGNvbnN0IGlyeXMgPSBhd2FpdCBnZXRJcnlzKGlkZW50aXR5KTtcbiAgICBjb25zdCByZWNlaXB0ID0gYXdhaXQgaXJ5cy51cGxvYWQoZGF0YSwgeyB0YWdzIH0pO1xuICAgIHJldHVybiBgJHtDb25zdGFudHMuSVJZU19HQVRFV0FZX1VSTH0vJHtyZWNlaXB0LmlkfWA7XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IGlzTm9kZWFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBzdHJpbmcgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgaXNCcm93c2VyYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEZpbGUgPT4ge1xuICAgIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCBpc1VwbG9hZGFibGUgPSAodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBVcGxvYWRhYmxlRmlsZVR5cGUgPT4ge1xuICAgIGlmIChpc05vZGUoKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gICAgfSBlbHNlIGlmIChpc0Jyb3dzZXIoKSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRmlsZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZnVuZEFyd2VhdmUgPSBhc3luYyAoXG4gICAgdXBsb2FkRmlsZTogRmlsZVR5cGUsXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGF3YWl0IHRvQnl0ZUxlbmd0aCh1cGxvYWRGaWxlKTtcbiAgICBjb25zdCB3aWxsUGF5ID0gYXdhaXQgY2FsY3VsYXRlQ29zdChieXRlTGVuZ3RoLCBpZGVudGl0eSk7XG4gICAgY29uc3QgZnVuZFR4ID0gYXdhaXQgaXJ5cy5mdW5kKGlyeXMudXRpbHMudG9BdG9taWMod2lsbFBheSkpO1xuICAgIGRlYnVnTG9nKCcjIGZ1bmRUeDogJywgZnVuZFR4KTtcbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IHRvQnl0ZUxlbmd0aCA9IGFzeW5jIChjb250ZW50OiBGaWxlVHlwZSk6IFByb21pc2U8bnVtYmVyPiA9PiB7XG4gICAgbGV0IGxlbmd0aDogbnVtYmVyID0gMTAwO1xuICAgIGlmIChpc05vZGVhYmxlKGNvbnRlbnQpKSB7XG4gICAgICBsZW5ndGggPSAoYXdhaXQgaW1wb3J0KCdmcycpKS5yZWFkRmlsZVN5bmMoY29udGVudCkubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaXNCcm93c2VyYWJsZShjb250ZW50KSkge1xuICAgICAgbGVuZ3RoID0gY29udGVudC5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBFcnJvcignTm8gbWF0Y2ggY29udGVudCB0eXBlJyk7XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG4gIH07XG5cbiAgLy8gQGludGVybmFsXG4gIGV4cG9ydCBjb25zdCBnZXRJcnlzID0gYXN5bmMgPFQgZXh0ZW5kcyBJcnlzIHwgV2ViSXJ5cz4oXG4gICAgaWRlbnRpdHk6IElkZW50aXR5LFxuICApID0+IHtcbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgZ2V0Tm9kZUlyeXMoaWRlbnRpdHkgYXMgU2VjcmV0KSkgYXMgVDtcbiAgICB9IGVsc2UgaWYgKGlzQnJvd3NlcigpKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IGdldEJyb3dzZXJJcnlzKGlkZW50aXR5IGFzIFBoYW50b21Qcm92aWRlcikpIGFzIFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdPbmx5IE5vZGUuanMgb3IgQnJvd3NlcicpO1xuICAgIH1cbiAgfTtcblxuICAvLyBAaW50ZXJuYWxcbiAgZXhwb3J0IGNvbnN0IGdldE5vZGVJcnlzID0gYXN5bmMgKHNlY3JldDogU2VjcmV0KSA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qga2V5ID0gc2VjcmV0O1xuICAgIGNvbnN0IGlyeXMgPSBuZXcgSXJ5cyh7XG4gICAgICB1cmwsXG4gICAgICB0b2tlbixcbiAgICAgIGtleSxcbiAgICAgIGNvbmZpZzogeyBwcm92aWRlclVybDogY2x1c3RlclVybCB9LFxuICAgIH0pO1xuICAgIHJldHVybiBpcnlzO1xuICB9O1xuXG4gIC8vIEBpbnRlcm5hbFxuICBleHBvcnQgY29uc3QgZ2V0QnJvd3NlcklyeXMgPSBhc3luYyAoXG4gICAgcHJvdmlkZXI6IFBoYW50b21Qcm92aWRlcixcbiAgKTogUHJvbWlzZTxXZWJJcnlzPiA9PiB7XG4gICAgY29uc3QgY2x1c3RlclVybCA9IENvbnN0YW50cy5zd2l0Y2hDbHVzdGVyKHtcbiAgICAgIGNsdXN0ZXI6IENvbnN0YW50cy5jdXJyZW50Q2x1c3RlcixcbiAgICB9KTtcbiAgICBjb25zdCB1cmwgPSBDb25zdGFudHMuQlVORExSX05FVFdPUktfVVJMO1xuICAgIGNvbnN0IHRva2VuID0gVE9LRU47XG4gICAgY29uc3Qgd2FsbGV0ID0geyBycGNVcmw6IGNsdXN0ZXJVcmwsIG5hbWU6IFRPS0VOLCBwcm92aWRlcjogcHJvdmlkZXIgfTtcbiAgICBjb25zdCB3ZWJJcnlzID0gbmV3IFdlYklyeXMoeyB1cmwsIHRva2VuLCB3YWxsZXQgfSk7XG4gICAgYXdhaXQgd2ViSXJ5cy5yZWFkeSgpO1xuICAgIHJldHVybiB3ZWJJcnlzO1xuICB9O1xuXG4gIGNvbnN0IGNhbGN1bGF0ZUNvc3QgPSBhc3luYyAoc2l6ZTogbnVtYmVyLCBpZGVudGl0eTogSWRlbnRpdHkpID0+IHtcbiAgICBjb25zdCBpcnlzID0gYXdhaXQgZ2V0SXJ5cyhpZGVudGl0eSk7XG4gICAgY29uc3QgcHJpY2VBdG9taWMgPSBhd2FpdCBpcnlzLmdldFByaWNlKHNpemUpO1xuICAgIGNvbnN0IHByaWNlQ29udmVydGVkID0gaXJ5cy51dGlscy5mcm9tQXRvbWljKHByaWNlQXRvbWljKTtcbiAgICBkZWJ1Z0xvZygnIyBzaXplOiAnLCBzaXplKTtcbiAgICBkZWJ1Z0xvZyhgIyBwcmljZTogJHtwcmljZUNvbnZlcnRlZH1gKTtcbiAgICByZXR1cm4gcHJpY2VDb252ZXJ0ZWQ7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IGRlYnVnTG9nLCBSZXN1bHQsIFRyeSB9IGZyb20gJ34vc2hhcmVkJztcbmltcG9ydCB7IFNlY3JldCB9IGZyb20gJ34vdHlwZXMvYWNjb3VudCc7XG5pbXBvcnQgeyBJbmZyYVNpZGVJbnB1dCB9IGZyb20gJ34vdHlwZXMvY29udmVydGVyJztcbmltcG9ydCB7IEZpbGVUeXBlIH0gZnJvbSAnfi90eXBlcy9zdG9yYWdlJztcblxuZXhwb3J0IG5hbWVzcGFjZSBBcndlYXZlIHtcbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSAoXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIGZlZVBheWVyOiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgcmV0dXJuIFRyeShhc3luYyAoKSA9PiB7XG4gICAgICBkZWJ1Z0xvZygnIyB1cGxvYWQgZmlsZTogJywgZmlsZVBhdGgpO1xuICAgICAgYXdhaXQgUHJvdmVuYW5jZUxheWVyLmZ1bmRBcndlYXZlKGZpbGVQYXRoLCBmZWVQYXllcik7XG4gICAgICByZXR1cm4gYXdhaXQgUHJvdmVuYW5jZUxheWVyLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKTtcbiAgICB9KTtcbiAgfTtcblxuICBleHBvcnQgY29uc3QgdXBsb2FkRGF0YSA9IChcbiAgICBtZXRhZGF0YTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmVlUGF5ZXI6IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhIGRhdGE6ICcsIG1ldGFkYXRhKTtcbiAgICAgIHJldHVybiBhd2FpdCBQcm92ZW5hbmNlTGF5ZXIudXBsb2FkRGF0YShcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpLFxuICAgICAgICBmZWVQYXllcixcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgQmxvYiwgTkZUU3RvcmFnZSB9IGZyb20gJ25mdC5zdG9yYWdlJztcbmltcG9ydCB7IENvbnN0YW50cywgZGVidWdMb2csIFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgUHJvdmVuYW5jZUxheWVyIH0gZnJvbSAnLi9wcm92ZW5hbmNlLWxheWVyJztcbmltcG9ydCB7IEluZnJhU2lkZUlucHV0IH0gZnJvbSAnfi90eXBlcy9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgRmlsZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuXG5leHBvcnQgbmFtZXNwYWNlIE5mdFN0b3JhZ2Uge1xuICBsZXQgaXNEaXNwbGF5V2FybmluZyA9IGZhbHNlO1xuICBjb25zdCBnZXROZnRTdG9yYWdlQXBpS2V5ID0gKCk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFDb25zdGFudHMubmZ0U3RvcmFnZUFwaUtleSkge1xuICAgICAgaWYgKCFpc0Rpc3BsYXlXYXJuaW5nKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgXG4gICAgICAgIFtXYXJuaW5nXVxuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBJZiB3aWxsIHVzZSBAc29sYW5hLXN1aXRlL25mdCBwYWNrYWdlXG4gICAgICAgIHlvdXIgbmVlZCB0byB1cGRhdGUgbmZ0U3RvcmFnZS5hcGlLZXkgZGVmaW5lIHBhcmFtZXRlciBpbiBzb2xhbmEtc3VpdGUuanNvbi5cbiAgICAgICAgY2FuIGdldCBhcGlLZXkgZnJvbSBodHRwczovL25mdC5zdG9yYWdlL1xuICAgICAgICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBgLFxuICAgICAgICApO1xuICAgICAgICBpc0Rpc3BsYXlXYXJuaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBDb25zdGFudHMuTkZUX1NUT1JBR0VfQVBJX0tFWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIENvbnN0YW50cy5uZnRTdG9yYWdlQXBpS2V5O1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBjcmVhdGVHYXRld2F5VXJsID0gKGNpZDogc3RyaW5nKTogc3RyaW5nID0+XG4gICAgYCR7Q29uc3RhbnRzLk5GVF9TVE9SQUdFX0dBVEVXQVlfVVJMfS8ke2NpZH1gO1xuXG4gIGNvbnN0IGNvbm5lY3QgPSAoKSA9PiBuZXcgTkZUU3RvcmFnZSh7IHRva2VuOiBnZXROZnRTdG9yYWdlQXBpS2V5KCkgfSk7XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoXG4gICAgZmlsZVR5cGU6IEZpbGVUeXBlLFxuICApOiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgZGVidWdMb2coJyMgdXBsb2FkIGNvbnRlbnQ6ICcsIGZpbGVUeXBlKTtcbiAgICAgIGxldCBmaWxlITogQnVmZmVyO1xuICAgICAgaWYgKFByb3ZlbmFuY2VMYXllci5pc05vZGVhYmxlKGZpbGVUeXBlKSkge1xuICAgICAgICBmaWxlID0gKGF3YWl0IGltcG9ydCgnZnMnKSkucmVhZEZpbGVTeW5jKGZpbGVUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoUHJvdmVuYW5jZUxheWVyLmlzQnJvd3NlcmFibGUoZmlsZVR5cGUpKSB7XG4gICAgICAgIGZpbGUgPSBCdWZmZXIuZnJvbShhd2FpdCBmaWxlVHlwZS5hcnJheUJ1ZmZlcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IEVycm9yKCdTdXBwb3J0ZWQgZW52aXJvbm1lbnQ6IG9ubHkgTm9kZS5qcyBhbmQgQnJvd3NlciBqcycpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBibG9iSW1hZ2UgPSBuZXcgQmxvYihbZmlsZV0pO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgY29ubmVjdCgpLnN0b3JlQmxvYihibG9iSW1hZ2UpO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRlbnRcbiAgICpcbiAgICogQHBhcmFtIHtTdG9yYWdlRGF0YX0gc3RvcmFnZURhdGFcbiAgICoge1xuICAgKiAgIG5hbWU/OiB7c3RyaW5nfSAgICAgICAgICAgICAgICAgICAgICAvLyBuZnQgY29udGVudCBuYW1lXG4gICAqICAgc3ltYm9sPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgIC8vIG5mdCB0aWNrZXIgc3ltYm9sXG4gICAqICAgZGVzY3JpcHRpb24/OiB7c3RyaW5nfSAgICAgICAgICAgICAgIC8vIG5mdCBjb250ZW50IGRlc2NyaXB0aW9uXG4gICAqICAgc2VsbGVyRmVlQmFzaXNQb2ludHM/OiBudW1iZXIgICAgICAgIC8vIHJveWFsdHkgcGVyY2VudGFnZVxuICAgKiAgIGltYWdlPzoge3N0cmluZ30gICAgICAgICAgICAgICAgICAgICAvLyB1cGxvYWRlZCB1cmkgb2Ygb3JpZ2luYWwgY29udGVudFxuICAgKiAgIGV4dGVybmFsX3VybD86IHtzdHJpbmd9ICAgICAgICAgICAgICAvLyBsYW5kaW5nIHBhZ2UsIGhvbWUgcGFnZSB1cmksIHJlbGF0ZWQgdXJsXG4gICAqICAgYXR0cmlidXRlcz86IHtKc29uTWV0YWRhdGFBdHRyaWJ1dGVbXX0gICAgIC8vIGdhbWUgY2hhcmFjdGVyIHBhcmFtZXRlciwgcGVyc29uYWxpdHksIGNoYXJhY3RlcmlzdGljc1xuICAgKiAgIHByb3BlcnRpZXM/OiB7SnNvbk1ldGFkYXRhUHJvcGVydGllczxVcmk+fSAvLyBpbmNsdWRlZCBmaWxlIG5hbWUsIHVyaSwgc3VwcG9ydGVkIGZpbGUgdHlwZVxuICAgKiAgIGNvbGxlY3Rpb24/OiBDb2xsZWN0aW9uICAgICAgICAgICAgICAvLyBjb2xsZWN0aW9ucyBvZiBkaWZmZXJlbnQgY29sb3JzLCBzaGFwZXMsIGV0Yy5cbiAgICogICBba2V5OiBzdHJpbmddOiB7dW5rbm93bn0gICAgICAgICAgICAgLy8gb3B0aW9uYWwgcGFyYW0sIFVzdWFsbHkgbm90IHVzZWQuXG4gICAqIH1cbiAgICogQHJldHVybiBQcm9taXNlPFJlc3VsdDxzdHJpbmcsIEVycm9yPj5cbiAgICovXG4gIGV4cG9ydCBjb25zdCB1cGxvYWREYXRhID0gYXN5bmMgKFxuICAgIHN0b3JhZ2VEYXRhOiBJbmZyYVNpZGVJbnB1dC5PZmZjaGFpbixcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICByZXR1cm4gVHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGRlYnVnTG9nKCcjIHVwbG9hZCBtZXRhZGF0YTogJywgc3RvcmFnZURhdGEpO1xuXG4gICAgICBjb25zdCBibG9iSnNvbiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShzdG9yYWdlRGF0YSldKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNvbm5lY3QoKS5zdG9yZUJsb2IoYmxvYkpzb24pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUdhdGV3YXlVcmwocmVzKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBSZXN1bHQgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgSW5mcmFTaWRlSW5wdXQsIFVzZXJTaWRlSW5wdXQgfSBmcm9tICd+L3R5cGVzL2NvbnZlcnRlcic7XG5pbXBvcnQgeyBGaWxlVHlwZSwgU3RvcmFnZVR5cGUgfSBmcm9tICd+L3R5cGVzL3N0b3JhZ2UnO1xuaW1wb3J0IHsgQXJ3ZWF2ZSB9IGZyb20gJy4vYXJ3ZWF2ZSc7XG5pbXBvcnQgeyBOZnRTdG9yYWdlIH0gZnJvbSAnLi9uZnQtc3RvcmFnZSc7XG5cbmV4cG9ydCBuYW1lc3BhY2UgU3RvcmFnZSB7XG4gIGV4cG9ydCBjb25zdCB0b0NvbnZlcnRPZmZjaGFpbmRhdGEgPSAoXG4gICAgaW5wdXQ6IFVzZXJTaWRlSW5wdXQuTmZ0TWV0YWRhdGEsXG4gICAgc2VsbGVyRmVlQmFzaXNQb2ludHM6IG51bWJlcixcbiAgKTogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4gPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBuYW1lOiBpbnB1dC5uYW1lLFxuICAgICAgc3ltYm9sOiBpbnB1dC5zeW1ib2wsXG4gICAgICBkZXNjcmlwdGlvbjogaW5wdXQuZGVzY3JpcHRpb24sXG4gICAgICBzZWxsZXJfZmVlX2Jhc2lzX3BvaW50czogc2VsbGVyRmVlQmFzaXNQb2ludHMsXG4gICAgICBleHRlcm5hbF91cmw6IGlucHV0LmV4dGVybmFsX3VybCxcbiAgICAgIGF0dHJpYnV0ZXM6IGlucHV0LmF0dHJpYnV0ZXMsXG4gICAgICBwcm9wZXJ0aWVzOiBpbnB1dC5wcm9wZXJ0aWVzLFxuICAgICAgaW1hZ2U6ICcnLFxuICAgICAgb3B0aW9uczogaW5wdXQub3B0aW9ucyxcbiAgICB9O1xuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIGV4cG9ydCBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKFxuICAgIGZpbGVQYXRoOiBGaWxlVHlwZSxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUsXG4gICAgZmVlUGF5ZXI/OiBTZWNyZXQsXG4gICk6IFByb21pc2U8UmVzdWx0PHN0cmluZywgRXJyb3I+PiA9PiB7XG4gICAgaWYgKHN0b3JhZ2VUeXBlID09PSAnYXJ3ZWF2ZScpIHtcbiAgICAgIGlmICghZmVlUGF5ZXIpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0Fyd2VhdmUgbmVlZHMgdG8gaGF2ZSBmZWVwYXllcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGF3YWl0IEFyd2VhdmUudXBsb2FkRmlsZShmaWxlUGF0aCwgZmVlUGF5ZXIpO1xuICAgIH0gZWxzZSBpZiAoc3RvcmFnZVR5cGUgPT09ICduZnRTdG9yYWdlJykge1xuICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IEVycm9yKCdOb3QgZm91bmQgc3RvcmFnZVR5cGUnKTtcbiAgICB9XG4gIH07XG5cbiAgZXhwb3J0IGNvbnN0IHVwbG9hZCA9IGFzeW5jIChcbiAgICBpbnB1dDogSW5mcmFTaWRlSW5wdXQuT2ZmY2hhaW4sXG4gICAgZmlsZVBhdGg6IEZpbGVUeXBlLFxuICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSxcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8c3RyaW5nLCBFcnJvcj4+ID0+IHtcbiAgICBsZXQgc3RvcmFnZTtcbiAgICBpZiAoc3RvcmFnZVR5cGUgPT09ICdhcndlYXZlJykge1xuICAgICAgaWYgKCFmZWVQYXllcikge1xuICAgICAgICB0aHJvdyBFcnJvcignQXJ3ZWF2ZSBuZWVkcyB0byBoYXZlIGZlZXBheWVyJyk7XG4gICAgICB9XG4gICAgICBzdG9yYWdlID0gYXdhaXQgKFxuICAgICAgICBhd2FpdCBBcndlYXZlLnVwbG9hZEZpbGUoZmlsZVBhdGgsIGZlZVBheWVyKVxuICAgICAgKS51bndyYXAoXG4gICAgICAgIGFzeW5jIChvazogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaW5wdXQuaW1hZ2UgPSBvaztcbiAgICAgICAgICByZXR1cm4gYXdhaXQgQXJ3ZWF2ZS51cGxvYWREYXRhKGlucHV0LCBmZWVQYXllcik7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0b3JhZ2VUeXBlID09PSAnbmZ0U3RvcmFnZScpIHtcbiAgICAgIHN0b3JhZ2UgPSBhd2FpdCAoXG4gICAgICAgIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRmlsZShmaWxlUGF0aClcbiAgICAgICkudW53cmFwKFxuICAgICAgICBhc3luYyAob2s6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlucHV0LmltYWdlID0gb2s7XG4gICAgICAgICAgcmV0dXJuIGF3YWl0IE5mdFN0b3JhZ2UudXBsb2FkRGF0YShpbnB1dCk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ05vIG1hdGNoIHN0b3JhZ2VUeXBlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFzdG9yYWdlKSB7XG4gICAgICB0aHJvdyBFcnJvcignRW1wdHkgc3RvcmFnZSBvYmplY3QnKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0b3JhZ2U7XG4gIH07XG59XG4iLCAiaW1wb3J0IHsgUmVzdWx0LCBUcnkgfSBmcm9tICd+L3NoYXJlZCc7XG5pbXBvcnQgeyBJbnN0cnVjdGlvbiB9IGZyb20gJ34vaW5zdHJ1Y3Rpb24nO1xuaW1wb3J0IHsgUHVia2V5LCBTZWNyZXQgfSBmcm9tICd+L3R5cGVzL2FjY291bnQnO1xuaW1wb3J0IHsgS2V5cGFpckFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVGhhd0FjY291bnRJbnN0cnVjdGlvbixcbiAgZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMsXG59IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIC8qKlxuICAgKiBUaGF3aW5nIGEgdGFyZ2V0IE5GVFxuICAgKiBpdCBzaG91bGQgc2V0IHRvIGZyZWV6ZUF1dGhvcml0eSB3aGVuIG1pbnQoKVxuICAgKlxuICAgKiBAcGFyYW0ge1B1YmtleX0gbWludCAgICAgICAgICAgICAvLyBtaW50IGFkZHJlc3NcbiAgICogQHBhcmFtIHtQdWJrZXl9IG93bmVyICAgICAgICAgICAgLy8gY3VycmVudCBvd25lclxuICAgKiBAcGFyYW0ge1NlY3JldH0gZnJlZXplQXV0aG9yaXR5ICAvLyBzZXR0ZWQgZnJlZXplIGF1dGhvcml0eSBvZiBuZnRcbiAgICogQHBhcmFtIHtTZWNyZXR9IGZlZVBheWVyPyAgICAgICAvLyBmZWUgcGF5ZXJcbiAgICovXG4gIGV4cG9ydCBjb25zdCB0aGF3ID0gKFxuICAgIG1pbnQ6IFB1YmtleSxcbiAgICBvd25lcjogUHVia2V5LFxuICAgIGZyZWV6ZUF1dGhvcml0eTogU2VjcmV0LFxuICAgIGZlZVBheWVyPzogU2VjcmV0LFxuICApOiBSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPiA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogZnJlZXplQXV0aG9yaXR5O1xuICAgIHJldHVybiBUcnkoKCkgPT4ge1xuICAgICAgY29uc3QgdG9rZW5BY2NvdW50ID0gZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMoXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgb3duZXIudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluc3QgPSBjcmVhdGVUaGF3QWNjb3VudEluc3RydWN0aW9uKFxuICAgICAgICB0b2tlbkFjY291bnQsXG4gICAgICAgIG1pbnQudG9QdWJsaWNLZXkoKSxcbiAgICAgICAgbmV3IEtleXBhaXJBY2NvdW50KHsgc2VjcmV0OiBmcmVlemVBdXRob3JpdHkgfSkudG9QdWJsaWNLZXkoKSxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oXG4gICAgICAgIFtpbnN0XSxcbiAgICAgICAgW2ZyZWV6ZUF1dGhvcml0eS50b0tleXBhaXIoKV0sXG4gICAgICAgIHBheWVyLnRvS2V5cGFpcigpLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyBjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiB9IGZyb20gJ0Bzb2xhbmEvc3BsLXRva2VuJztcbmltcG9ydCB7IFJlc3VsdCwgVHJ5IH0gZnJvbSAnfi9zaGFyZWQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgX0NhbGN1bGF0b3IgfSBmcm9tICcuL2NhbGN1bGF0ZS1hbW91bnQnO1xuaW1wb3J0IHsgQXNzb2NpYXRlZEFjY291bnQgfSBmcm9tICd+L2FjY291bnQnO1xuaW1wb3J0IHsgSW5zdHJ1Y3Rpb24gfSBmcm9tICd+L2luc3RydWN0aW9uJztcbmltcG9ydCB7IFB1YmtleSwgU2VjcmV0IH0gZnJvbSAnfi90eXBlcy9hY2NvdW50JztcblxuZXhwb3J0IG5hbWVzcGFjZSBTcGxUb2tlbiB7XG4gIGV4cG9ydCBjb25zdCB0cmFuc2ZlciA9IGFzeW5jIChcbiAgICBtaW50OiBQdWJrZXksXG4gICAgb3duZXI6IFB1YmtleSxcbiAgICBkZXN0OiBQdWJrZXksXG4gICAgc2lnbmVyczogU2VjcmV0W10sXG4gICAgYW1vdW50OiBudW1iZXIsXG4gICAgbWludERlY2ltYWw6IG51bWJlcixcbiAgICBmZWVQYXllcj86IFNlY3JldCxcbiAgKTogUHJvbWlzZTxSZXN1bHQ8SW5zdHJ1Y3Rpb24sIEVycm9yPj4gPT4ge1xuICAgIHJldHVybiBUcnkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcGF5ZXIgPSBmZWVQYXllciA/IGZlZVBheWVyIDogc2lnbmVyc1swXTtcbiAgICAgIGNvbnN0IGtleXBhaXJzID0gc2lnbmVycy5tYXAoKHMpID0+IHMudG9LZXlwYWlyKCkpO1xuXG4gICAgICBjb25zdCBzb3VyY2VUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIG93bmVyLFxuICAgICAgICBwYXllcixcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlc3RUb2tlbiA9IGF3YWl0IEFzc29jaWF0ZWRBY2NvdW50LnJldHJ5R2V0T3JDcmVhdGUoXG4gICAgICAgIG1pbnQsXG4gICAgICAgIGRlc3QsXG4gICAgICAgIHBheWVyLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgaW5zdCA9IGNyZWF0ZVRyYW5zZmVyQ2hlY2tlZEluc3RydWN0aW9uKFxuICAgICAgICBzb3VyY2VUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBtaW50LnRvUHVibGljS2V5KCksXG4gICAgICAgIGRlc3RUb2tlbi50b1B1YmxpY0tleSgpLFxuICAgICAgICBvd25lci50b1B1YmxpY0tleSgpLFxuICAgICAgICBfQ2FsY3VsYXRvci5jYWxjdWxhdGVBbW91bnQoYW1vdW50LCBtaW50RGVjaW1hbCksXG4gICAgICAgIG1pbnREZWNpbWFsLFxuICAgICAgICBrZXlwYWlycyxcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBuZXcgSW5zdHJ1Y3Rpb24oW2luc3RdLCBrZXlwYWlycywgcGF5ZXIudG9LZXlwYWlyKCkpO1xuICAgIH0pO1xuICB9O1xufVxuIiwgImltcG9ydCB7IFNwbFRva2VuIGFzIEFkZCB9IGZyb20gJy4vYWRkJztcbmltcG9ydCB7IFNwbFRva2VuIGFzIEJ1cm4gfSBmcm9tICcuL2J1cm4nO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgRmluZCB9IGZyb20gJy4vZmluZCc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGcmVlemUgfSBmcm9tICcuL2ZyZWV6ZSc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBGZWVQYXllciB9IGZyb20gJy4vZmVlLXBheWVyLXBhcnRpYWwtc2lnbi10cmFuc2Zlcic7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBIaXN0b3J5IH0gZnJvbSAnLi9oaXN0b3J5JztcbmltcG9ydCB7IFNwbFRva2VuIGFzIE1pbnQgfSBmcm9tICcuL21pbnQnO1xuaW1wb3J0IHsgU3BsVG9rZW4gYXMgVGhhdyB9IGZyb20gJy4vdGhhdyc7XG5pbXBvcnQgeyBTcGxUb2tlbiBhcyBUcmFuc2ZlciB9IGZyb20gJy4vdHJhbnNmZXInO1xuaW1wb3J0ICd+L3R5cGVzL2luc3RydWN0aW9uJztcbmltcG9ydCAnfi9pbnN0cnVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBTcGxUb2tlbiA9IHtcbiAgLi4uQWRkLFxuICAuLi5CdXJuLFxuICAuLi5GaW5kLFxuICAuLi5GcmVlemUsXG4gIC4uLkZlZVBheWVyLFxuICAuLi5IaXN0b3J5LFxuICAuLi5NaW50LFxuICAuLi5UaGF3LFxuICAuLi5UcmFuc2Zlcixcbn07XG5cbmV4cG9ydCAqIGZyb20gJ34vc2hhcmVkL2V4cG9ydHMnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsc0NBQXNDOzs7QUNBL0MsU0FBcUIsaUJBQWlCO0FBQ3RDLE9BQU8sWUFBWTtBQUVaLElBQVU7QUFBQSxDQUFWLENBQVVBLGVBQVY7QUFDRSxF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QUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFBQSxFQUNILEdBQUdBO0FBQUEsRUFDSCxHQUFHQTtBQUFBLEVBQ0gsR0FBR0E7QUFDTDsiLAogICJuYW1lcyI6IFsiQ29uc3RhbnRzIiwgIkNsdXN0ZXIiLCAiRW5kUG9pbnRVcmwiLCAiY3VzdG9tQ2x1c3RlclVybCIsICJSZXN1bHQiLCAiTm9kZSIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIkluc3RydWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgInNlbmRBbmRDb25maXJtVHJhbnNhY3Rpb24iLCAic2VuZEFuZENvbmZpcm1UcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJJbnN0cnVjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJzZW5kQW5kQ29uZmlybVRyYW5zYWN0aW9uIiwgIlRyYW5zYWN0aW9uSW5zdHJ1Y3Rpb24iLCAiTXVsdGlzaWdJbnN0cnVjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJUcmFuc2FjdGlvbiIsICJLZXlwYWlyIiwgIlB1YmxpY0tleSIsICJQdWJsaWNLZXkiLCAiS2V5cGFpciIsICJUT0tFTl9QUk9HUkFNX0lEIiwgIktleXBhaXIiLCAiUHVibGljS2V5IiwgImJzIiwgIkFzc29jaWF0ZWRBY2NvdW50IiwgIkluc3RydWN0aW9uIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiUHVibGljS2V5IiwgIlBkYSIsICJDb252ZXJ0ZXIiLCAiQ29sbGVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiQ3JlYXRvcnMiLCAiQ29udmVydGVyIiwgIk1lbW8iLCAiQ29udmVydGVyIiwgIk1pbnQiLCAiQ29udmVydGVyIiwgIlVzZXMiLCAiQ29udmVydGVyIiwgIlRva2VuTWV0YWRhdGEiLCAiQ29udmVydGVyIiwgIk5mdE1ldGFkYXRhIiwgIkNvbnZlcnRlciIsICJQcm9wZXJ0aWVzIiwgIkNvbnZlcnRlciIsICJSb3lhbHR5IiwgIkNvbnZlcnRlciIsICJUcmFuc2ZlckNoZWNrZWQiLCAiQ29udmVydGVyIiwgIlRyYW5zZmVyIiwgIkNvbnZlcnRlciIsICJWYWxpZGF0b3IiLCAiTWVzc2FnZSIsICJDb252ZXJ0ZXIiLCAiRmlsdGVyVHlwZSIsICJNb2R1bGVOYW1lIiwgIlNwbFRva2VuIiwgIlNwbFRva2VuIiwgIkluc3RydWN0aW9uIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIkluc3RydWN0aW9uIiwgIlVzZXJTaWRlSW5wdXQiLCAiVG9rZW5TdGFuZGFyZCIsICJDb21tb24iLCAiVXNlTWV0aG9kIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiU3BsVG9rZW4iLCAiQ29udmVydGVyIiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlNwbFRva2VuIiwgIkluc3RydWN0aW9uIiwgIlRyYW5zYWN0aW9uIiwgIlNwbFRva2VuIiwgIlRyYW5zYWN0aW9uIiwgIlRPS0VOX1BST0dSQU1fSUQiLCAiU2lnbmF0dXJlcyIsICJUcmFuc2FjdGlvbkZpbHRlciIsICJpbnN0cnVjdGlvbiIsICJDb252ZXJ0ZXIiLCAiU3BsVG9rZW4iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJTeXN0ZW1Qcm9ncmFtIiwgImNyZWF0ZUFzc29jaWF0ZWRUb2tlbkFjY291bnRJbnN0cnVjdGlvbiIsICJjcmVhdGVNaW50VG9DaGVja2VkSW5zdHJ1Y3Rpb24iLCAiZ2V0QXNzb2NpYXRlZFRva2VuQWRkcmVzc1N5bmMiLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJQcm92ZW5hbmNlTGF5ZXIiLCAidXBsb2FkRmlsZSIsICJBcndlYXZlIiwgIk5mdFN0b3JhZ2UiLCAiU3RvcmFnZSIsICJTcGxUb2tlbiIsICJtaW50IiwgImdldEFzc29jaWF0ZWRUb2tlbkFkZHJlc3NTeW5jIiwgIlN5c3RlbVByb2dyYW0iLCAiVE9LRU5fUFJPR1JBTV9JRCIsICJjcmVhdGVBc3NvY2lhdGVkVG9rZW5BY2NvdW50SW5zdHJ1Y3Rpb24iLCAiY3JlYXRlTWludFRvQ2hlY2tlZEluc3RydWN0aW9uIiwgIkNvbnZlcnRlciIsICJnZXRBc3NvY2lhdGVkVG9rZW5BZGRyZXNzU3luYyIsICJTcGxUb2tlbiIsICJJbnN0cnVjdGlvbiIsICJjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiIsICJTcGxUb2tlbiIsICJjcmVhdGVUcmFuc2ZlckNoZWNrZWRJbnN0cnVjdGlvbiIsICJJbnN0cnVjdGlvbiIsICJTcGxUb2tlbiJdCn0K