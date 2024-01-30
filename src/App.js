import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./router";

function App() {
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const outlet = useRoutes(routes);
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <div className="App" style={{ height: "100vh" }}>
            {outlet}
        </div>
    );
}

export default App;
