// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

const name = "My App Name";
const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

export default function Web3AuthConnectorInstance(chains, loginProvider) {
    const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x" + chains[0].id.toString(16),
        rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
        displayName: chains[0].name,
        tickerName: chains[0].nativeCurrency?.name,
        ticker: chains[0].nativeCurrency?.symbol,
        blockExplorer: chains[0].blockExplorers?.default.url[0],
    };

    const web3AuthInstance = new Web3AuthNoModal({
        clientId: "BBwi_QuQ0kSmu7D6sl-dtg-lixMQAhCC_2qjJnukOlvnsbkezdP8JGydWdx-moHyn9Y_8Rv-bJlwNNclmN2Uj8g",
        chainConfig,
        web3AuthNetwork: "sapphire_devnet",
    });

    const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
    });

    // Add openlogin adapter for customisations
    const openloginAdapterInstance = new OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
            network: "testnet",
            uxMode: "popup",
            whiteLabel: {
                appName: name,
                logoLight: iconUrl,
                logoDark: iconUrl,
                defaultLanguage: "en",
                mode: "dark", // whether to enable dark mode. defaultValue: false
            },
        },
    });
    web3AuthInstance.configureAdapter(openloginAdapterInstance);

    // Add Torus Wallet Plugin (optional)
    const torusPlugin = new TorusWalletConnectorPlugin({
        torusWalletOpts: {
            buttonPosition: "bottom-left",
        },
        walletInitOptions: {
            whiteLabel: {
                theme: { isDark: false, colors: { primary: "#00a8ff" } },
                logoDark: iconUrl,
                logoLight: iconUrl,
            },
            useWalletConnect: true,
            enableLogging: true,
        },
    });
    web3AuthInstance.addPlugin(torusPlugin);

    return {
        connector: new Web3AuthConnector({
            chains: chains,
            options: {
                web3AuthInstance,
                loginParams: {
                    loginProvider,
                },
            },
        }),
        web3auth: web3AuthInstance
    }
}
