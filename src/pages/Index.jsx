import { useNavigate } from "react-router-dom"


export default function Index(params) {
    
    const navigateTo = useNavigate();


    return (
        <div>
            <button onClick={() => navigateTo("/demo1")}>rainbowKit</button>
            <button onClick={() => navigateTo("/demo2")}>particleKit</button>
            <button onClick={() => navigateTo("/demo3")}>particle auth-core-modal</button>
        </div>
    )
}