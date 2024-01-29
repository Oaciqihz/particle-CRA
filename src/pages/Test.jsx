import { ConnectButton} from '@rainbow-me/rainbowkit';
import { useAuthCore, useConnect } from '@particle-network/auth-core-modal';
import { useEffect } from 'react';
// import { ConnectButton } from '@particle-network/connectkit';

import '@particle-network/connectkit/dist/index.css';

export default function Test(params) {
    const {
        userInfo,                       // user info, null is returned if not connected
        needRestoreWallet,              // whether need restore wallet, if user has set master password and not input it, will return true
        openAccountAndSecurity,         // open account and security modal
        openSetMasterPassword,          // open set master password modal
        openChangeMasterPassword,       // open change master password modal
        openRestoreByMasterPassword,    // open input master password modal
        openSetPaymentPassword,         // open set payment password modal
        openChangePaymentPassword,      // open change payment password modal
        openSetSecurityAccount,         // open set security account modal
        openLinkLoginAccount,           // open link login account modal
        openWallet,                     // open wallet in iframe
        buildWalletUrl,                 // get wallet url, used for open in custom iframe
        openBuy,                        // open buy crypto token website
    } = useAuthCore();    
    const { connect, disconnect, connectionStatus, requestConnectCaptcha } = useConnect();

    async function test(params) {
        // const userInfo = await connect();
        // console.log("====>", userInfo);
        // openWallet();
        const userInfo = await connect({
            socialType: 'google',
            prompt: 'select_account', //optional, only google, discord and microsoft support it.
        });
        console.log("===>", userInfo);
    }

    useEffect(() => {
        console.log(userInfo);
    },[userInfo])

    return (
        <>
        <ConnectButton />
        <button onClick={test}>test</button>
        <button onClick={disconnect}>testdisc</button>
        <button onClick={openWallet}>open</button>

        </>
    )
}