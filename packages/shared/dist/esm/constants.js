import { PublicKey } from '@solana/web3.js';
import Config from './solana-suite.json';
import './global';
export var Constants;
(function (Constants) {
    let Cluster;
    (function (Cluster) {
        Cluster["prd"] = "mainnet-beta";
        Cluster["prd2"] = "mainnet-beta-sereum";
        Cluster["prdrr"] = "mainnet-beta-round-robin";
        Cluster["dev"] = "devnet";
        Cluster["test"] = "testnet";
        Cluster["localhost"] = "localhost-devnet";
        Cluster["custom"] = "custom";
    })(Cluster = Constants.Cluster || (Constants.Cluster = {}));
    Constants.currentCluster = Config.cluster.type;
    Constants.customUrl = Config.cluster.customUrl;
    Constants.isDebugging = Config.debugging;
    Constants.nftStorageApiKey = Config.nftstorage.apikey;
})(Constants || (Constants = {}));
export var ConstantsFunc;
(function (ConstantsFunc) {
    ConstantsFunc.switchCluster = (env, customUrl = Constants.customUrl) => {
        switch (env) {
            case Constants.Cluster.prd:
                return 'https://api.mainnet-beta.solana.com';
            case Constants.Cluster.prd2:
                return 'https://solana-api.projectserum.com';
            case Constants.Cluster.test:
                return 'https://api.testnet.solana.com';
            case Constants.Cluster.dev:
                return 'https://api.devnet.solana.com';
            case Constants.Cluster.prdrr:
                // don't require rigor, as it can be repeated alternately
                const index = Date.now() % 4;
                const clusters = [
                    'https://api.mainnet-beta.solana.com',
                    'https://solana-api.projectserum.com',
                    'https://api.mainnet-beta.solana.com',
                    'https://solana-api.projectserum.com',
                ];
                return clusters[index];
            case Constants.Cluster.custom:
                return customUrl;
            default:
                return 'http://api.devnet.solana.com';
        }
    };
    ConstantsFunc.switchBundlr = (env) => {
        switch (env) {
            case Constants.Cluster.dev:
            case Constants.Cluster.test:
            case Constants.Cluster.localhost:
                return 'https://devnet.bundlr.network';
            default:
                const index = Date.now() % 2;
                const clusters = [
                    'https://node1.bundlr.network',
                    'https://node2.bundlr.network',
                ];
                return clusters[index];
        }
    };
})(ConstantsFunc || (ConstantsFunc = {}));
(function (Constants) {
    String.prototype.toPublicKey = function () {
        return new PublicKey(this);
    };
    Constants.WRAPPED_TOKEN_PROGRAM_ID = 'So11111111111111111111111111111111111111112'.toPublicKey();
    Constants.MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPublicKey();
    Constants.METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPublicKey();
    Constants.COMMITMENT = 'confirmed';
    Constants.NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
    Constants.NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
    Constants.BUNDLR_NETWORK_URL = ConstantsFunc.switchBundlr(Config.cluster.type);
})(Constants || (Constants = {}));
