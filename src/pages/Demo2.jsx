import { ModalProvider } from "@particle-network/connectkit";
import { Ethereum, EthereumGoerli } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connectors";
import Demo2Btns from "../components/Demo2Btns";
import '@particle-network/connectkit/dist/index.css';

export default function Demo2(params) {


    return (
        <ModalProvider
            options={{
                projectId: '21f970b6-194d-4658-a9b6-686c67a42ae6',
                clientKey: 'cvXz9BFEbgJV7lnsPbhkJE4097cTWGGMLCDSva0A',
                appId: '7d5de8a5-c161-4241-a3c3-e05022b1acd4',
                chains: [
                    Ethereum,
                    EthereumGoerli
                ],
                wallet: {    //optional: particle wallet config
                    visible: true, //display wallet button when connect particle success.
                    supportChains:[
                        Ethereum,
                        EthereumGoerli
                    ],
                    customStyle: {}, //optional: custom wallet style
                },
                promptSettingConfig: { //optional: particle security account config
                    //prompt set payment password. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    //prompt set master password. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({ 
                    projectId: 'walletconnect projectId', //replace with walletconnect projectId
                    showQrModal: false
                 }),
            }}
            theme={'light'}
            language={'en'}   //optional：localize, default en
            walletSort={['Particle Auth']} //optional：walelt order
        >
            <Demo2Btns />
        </ModalProvider>
    )
}