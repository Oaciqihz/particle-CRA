import { arbitrum } from "viem/chains";
import { WagmiConfig, configureChains, createConfig, mainnet, useAccount, useConnect, useDisconnect } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Web3AuthConnectorInstance from "../components/web3auth/Web3AuthConnectorInstance";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";


const { chains, publicClient, webSocketPublicClient } = configureChains([mainnet, arbitrum], [publicProvider()]);




  function Profile({web3auth}) {
    const { address, connector, isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const { disconnect } = useDisconnect();
  
    function getKey() {
        console.log(web3auth);
        web3auth.provider.request({
            method: "eth_private_key",
        })
        .then(res => {
            console.log(res);
        })
    }

    if (isConnected) {
      return (
        <div className="main">
          <div className="title">Connected to {connector?.name}</div>
          <div>{address}</div>
          <button className="card" onClick={disconnect}>
            Disconnect
          </button>
          <button onClick={getKey}>getKey</button>
        </div>
      );
    } else {
      return (
        <div className="main">
          {connectors.map((connector) => {
            return (
              <button className="card" key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            );
          })}
          {error && <div>{error.message}</div>}
        </div>
      );
    }
  }

export default function Web3AuthDemo(params) {
    const { connector, web3auth } = Web3AuthConnectorInstance(chains, "google");
    const web3AuthConnector = connector;
    const config = createConfig({
        autoConnect: true,
        connectors: [
          new CoinbaseWalletConnector({
            chains,
            options: {
              appName: "wagmi",
            },
          }),
          new WalletConnectConnector({
            chains,
            options: {
              projectId: "3314f39613059cb687432d249f1658d2",
              showQrModal: true,
            },
          }),
          new InjectedConnector({
            chains,
            options: {
              name: "Injected",
              shimDisconnect: true,
            },
          }),
          web3AuthConnector
        //   Web3AuthConnectorInstance(chains, "discord"),
        ],
        publicClient,
        webSocketPublicClient,
      });
    
    return (
        <WagmiConfig config={config}>
        <div className="container">
          <Profile web3auth={web3auth} />
        </div>
      </WagmiConfig>
    )
}