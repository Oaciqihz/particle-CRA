import { ConnectButton} from '@rainbow-me/rainbowkit';
import { useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect } from 'react';

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

    useEffect(() => {
        console.log(userInfo);
    },[userInfo])

    return (
        <ConnectButton />
    )
}