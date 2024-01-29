import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    zora,
} from "wagmi/chains";
import Demo4Btns from "../components/Demo4Btns";

export default function Demo4(params) {
    const { chains, publicClient, webSocketPublicClient } = configureChains(
        [
            mainnet,
            polygon,
            optimism,
            arbitrum,
            base,
            zora
        ],
        [publicProvider()]
    );

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: [],
        publicClient,
        webSocketPublicClient,
    });

    return (
        <WagmiConfig config={wagmiConfig}>
            <AuthCoreContextProvider
                options={{
                    projectId: "21f970b6-194d-4658-a9b6-686c67a42ae6",
                    clientKey: "cvXz9BFEbgJV7lnsPbhkJE4097cTWGGMLCDSva0A",
                    appId: "7d5de8a5-c161-4241-a3c3-e05022b1acd4",
                    promptSettingConfig: {
                        //optional
                        //set payment password prompt: none, first, every, everyAndNotSkip.
                        promptPaymentPasswordSettingWhenSign: 1,
                        //set master password prompt: none, first, every, everyAndNotSkip.
                        promptMasterPasswordSettingWhenLogin: 1,
                    },
                    erc4337: {
                        // optional
                        name: "SIMPLE", // support 'SIMPLE', 'CYBERCONNECT', 'BICONOMY'
                        version: "1.0.0",
                    },
                    wallet: {
                        visible: true, //show wallet entrance when connect success.
                    },
                }}
            >
                <Demo4Btns />
            </AuthCoreContextProvider>
        </WagmiConfig>
    );
}
