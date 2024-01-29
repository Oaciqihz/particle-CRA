import { useAuthCore, useConnect } from "@particle-network/auth-core-modal";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export default function Demo4Btns(params) {
    const {
        connect,
        disconnect,
        connectionStatus,
        requestConnectCaptcha,
    } = useConnect();
    const { userInfo, needRestoreWallet } = useAuthCore();
    const { address } = useAccount();

    async function goConnect(params) {
        try {
            await connect();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("userInfo===>", userInfo);
    }, [userInfo]);

    useEffect(() => {
        console.log("address ===>", address);
    }, [address]);

    return (
        <div>
            <button onClick={goConnect}>CONNECT</button>
            <button onClick={disconnect}>DISCONNECT</button>
            <button
                onClick={() =>
                    requestConnectCaptcha({ email: "0xca79@gmail.com" })
                }
            >
                test
            </button>
        </div>
    );
}
