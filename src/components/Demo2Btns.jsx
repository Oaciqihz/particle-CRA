import { ConnectButton, useConnectKit, useConnectModal } from "@particle-network/connectkit";
import { useAuthCore } from '@particle-network/auth-core-modal';
import { useEffect } from "react";

export default function Demo2Btns(params) {
    const { openConnectModal } = useConnectModal();
    const { userInfo } = useAuthCore();
    useEffect(() => {
        console.log("userInfo===>", userInfo);
    }, [userInfo]);
    return (
        <div>
            <ConnectButton />
            <button onClick={openConnectModal}>CONNECT</button>
        </div>
    );
}
