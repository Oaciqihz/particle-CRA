import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { ParticleNetwork } from '@particle-network/auth';
import { particleWallet } from '@particle-network/rainbowkit-ext';
import '@rainbow-me/rainbowkit/styles.css';
import Test from './pages/Test';
import React from 'react';


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  [publicProvider()]
);
const projectId = 'YOUR_PROJECT_ID';

new ParticleNetwork({
    projectId: "21f970b6-194d-4658-a9b6-686c67a42ae6",
    clientKey: "cvXz9BFEbgJV7lnsPbhkJE4097cTWGGMLCDSva0A",
    appId: "7d5de8a5-c161-4241-a3c3-e05022b1acd4",
});

const particleWallets = [
    particleWallet({ chains, authType: 'google' }),
    particleWallet({ chains, authType: 'facebook' }),
    particleWallet({ chains, authType: 'apple' }),
    particleWallet({ chains }),
];


const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
        ...particleWallets,
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function App() {

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <div className="App">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
          {mounted && <Test />}
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
